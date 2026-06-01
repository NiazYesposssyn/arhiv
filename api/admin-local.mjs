import {
  listLocalRequests,
  updateLocalRequest,
  useLocalRequests,
} from "./local-requests.mjs";

function staffAccessCode() {
  return process.env.STAFF_ACCESS_CODE || "ARHIV-VKO-2026";
}

function checkCode(code) {
  return String(code || "").trim() === staffAccessCode();
}

export function handleAdminLocal(body) {
  if (!useLocalRequests()) {
    return { status: 400, body: { message: "Локальная панель только в режиме без Supabase" } };
  }
  if (!checkCode(body?.code)) {
    return { status: 403, body: { message: "Неверный служебный код" } };
  }

  if (body.action === "list") {
    return { status: 200, body: { requests: listLocalRequests() } };
  }

  if (body.action === "update" && body.id && body.status) {
    updateLocalRequest(body.id, body.status);
    return { status: 200, body: { ok: true } };
  }

  return { status: 400, body: { message: "Неизвестное действие" } };
}
