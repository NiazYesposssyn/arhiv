import { getAdminClient, getUserClient, hasServiceRole } from "./supabase-admin.mjs";
import { listLocalRequests, updateLocalRequest, useLocalRequests } from "./local-requests.mjs";

function staffAccessCode() {
  return process.env.STAFF_ACCESS_CODE || "ARHIV-VKO-2026";
}

const FN = {
  "7238c8c495c0f7211ccc86e52f8e7cbf3b5255f07bf3b0c015a0ea569b926833": verifyStaffCode,
  bc043367e3258bc0750efadc2962d5983ded7a90f892e25e8da034f07aee469d: getMyRoles,
  "4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d": getAdminStats,
  "793cc6a521581f9bbd39d9e71e86d3eb88d732d7b8782623c6e43a4b95c81a82": listAdminRequests,
  e5c0d6ea7dc3bc9867e1856a96d83ab10b1626673d3cabae446f712b148916ab: updateRequest,
};

export async function handleServerFn(id, req) {
  const handler = FN[id];
  if (!handler) {
    return jsonError(404, `Unknown server function: ${id}`);
  }
  try {
    const body = await readRequestPayload(req);
    const data = body?.data ?? body?.payload?.data ?? body;
    const result = await handler({ req, data, body });
    return jsonOk(result);
  } catch (err) {
    console.error(`[server-fn ${id}]`, err);
    return jsonError(500, err.message || "Server error");
  }
}

async function verifyStaffCode({ data }) {
  const code = String(data?.code || "").trim();
  return { ok: code.length > 0 && code === staffAccessCode() };
}

async function getMyRoles({ req, body }) {
  const token = bearerToken(req) || tokenFromBody(body);
  if (!token) return { isStaff: false, isAdmin: false };

  return resolveRoles(token);
}

async function getAdminStats({ req }) {
  await assertStaff(req);
  const rows = await fetchAllRequests();
  return buildStats(rows);
}

async function listAdminRequests({ data, req }) {
  await assertStaff(req);
  const limit = Number(data?.limit) || 100;
  const status = data?.status ? String(data.status) : "";
  const search = data?.search ? String(data.search).toLowerCase() : "";

  let rows = await fetchAllRequests();
  if (status) rows = rows.filter((r) => r.status === status);
  if (search) {
    rows = rows.filter((r) => {
      const hay = [
        r.applicant_name,
        r.email,
        r.phone,
        r.service_type,
        r.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(search);
    });
  }
  return { requests: rows.slice(0, limit) };
}

async function updateRequest({ data, req }) {
  await assertStaff(req);
  const id = data?.id;
  const status = data?.status;
  if (!id || !status) throw new Error("id and status required");

  if (useLocalRequests()) {
    return updateLocalRequest(id, status);
  }

  const db = getAdminClient();
  const { error } = await db.from("requests").update({ status }).eq("id", id);
  if (error) throw error;
  return { ok: true };
}

async function resolveRoles(accessToken) {
  const userClient = getUserClient(accessToken);
  const {
    data: { user },
    error,
  } = await userClient.auth.getUser();
  if (error || !user) return { isStaff: false, isAdmin: false };

  if (hasServiceRole()) {
    const db = getAdminClient();
    const { data: profile } = await db
      .from("profiles")
      .select("is_staff,is_admin,role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      return {
        isStaff: Boolean(profile.is_staff),
        isAdmin: Boolean(profile.is_admin || profile.role === "admin"),
      };
    }
  }

  const meta = user.app_metadata || user.user_metadata || {};
  const role = meta.role || meta.user_role;
  return {
    isStaff: meta.is_staff === true || role === "staff" || role === "admin",
    isAdmin: meta.is_admin === true || role === "admin",
  };
}

async function assertStaff(req) {
  const token = bearerToken(req);
  if (!token) throw new Error("Unauthorized");
  const { isStaff, isAdmin } = await resolveRoles(token);
  if (!isStaff && !isAdmin) throw new Error("Forbidden");
}

async function fetchAllRequests() {
  if (useLocalRequests()) {
    return listLocalRequests();
  }
  const db = getAdminClient();
  const { data, error } = await db
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

function buildStats(rows) {
  const now = new Date();
  const month = now.getUTCMonth();
  const year = now.getUTCFullYear();

  const pending = rows.filter((r) =>
    ["new", "pending", "processing", "в_обработке"].includes(
      String(r.status || "").toLowerCase()
    )
  ).length;
  const done = rows.filter((r) =>
    ["done", "completed", "выполнено", "paid"].includes(
      String(r.status || "").toLowerCase()
    )
  );
  const revenue = done.reduce((s, r) => s + Number(r.amount || 0), 0);
  const thisMonth = rows.filter((r) => {
    const d = new Date(r.created_at || 0);
    return d.getUTCMonth() === month && d.getUTCFullYear() === year;
  });
  const thisMonthRevenue = thisMonth.reduce(
    (s, r) => s + Number(r.amount || 0),
    0
  );
  const users = new Set(rows.map((r) => r.email).filter(Boolean));

  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Date.UTC(year, month - i, 1));
    const count = rows.filter((r) => {
      const x = new Date(r.created_at || 0);
      return (
        x.getUTCMonth() === d.getUTCMonth() &&
        x.getUTCFullYear() === d.getUTCFullYear()
      );
    }).length;
    months.push({
      label: d.toLocaleString("ru-RU", { month: "short", year: "2-digit" }),
      count,
    });
  }

  const total = rows.length;
  const completionRate = total ? Math.round((done.length / total) * 100) : 0;
  const avgAmount = done.length ? Math.round(revenue / done.length) : 0;

  return {
    usersServed: users.size,
    total,
    revenue,
    pending,
    thisMonthCount: thisMonth.length,
    thisMonthRevenue,
    completionRate,
    avgAmount,
    months,
  };
}

function bearerToken(req) {
  const h = req.headers.authorization || req.headers.Authorization;
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}

async function readRequestPayload(req) {
  const url = new URL(req.url || "/", "http://localhost");
  const qp = url.searchParams.get("payload");
  if (qp) {
    try {
      return JSON.parse(decodeURIComponent(qp));
    } catch {
      try {
        return JSON.parse(qp);
      } catch {
        /* ignore */
      }
    }
  }

  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function tokenFromBody(body) {
  return (
    body?.context?.accessToken ||
    body?.context?.session?.access_token ||
    body?.accessToken ||
    body?.session?.access_token ||
    null
  );
}

function jsonOk(result) {
  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "x-tss-serialized": "false",
    },
    body: JSON.stringify(result),
  };
}

function jsonError(status, message) {
  return {
    status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  };
}
