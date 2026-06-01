import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import {
  checkAdminPassword,
  createSession,
  getStaffCode,
  hasSession,
  initStore,
  insertRequest,
  listRequests,
  updateRequestStatus,
} from "./store.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT || 8080);
const API_PORT = Number(process.env.API_PORT || (isProd ? PORT : 4000));

initStore();

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

function refCode() {
  return `ВКО-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function requireStaff(req, res, next) {
  if (!hasSession(req.cookies.staff_session)) {
    return res.status(401).json({ message: "Войдите через /staff" });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, storage: "json-file" });
});

app.post("/api/requests", (req, res) => {
  try {
    const p = req.body || {};
    if (!p.applicant_name?.trim() || !p.description?.trim()) {
      return res.status(400).json({ message: "Укажите ФИО и описание" });
    }
    const id = randomUUID();
    const reference_code = refCode();
    insertRequest({
      id,
      created_at: new Date().toISOString(),
      reference_code,
      applicant_name: String(p.applicant_name).trim(),
      email: p.email || null,
      phone: p.phone || null,
      iin: p.iin || null,
      address: p.address || null,
      service_type: p.service_type || "Заявка",
      description: String(p.description).trim(),
      date_from: p.date_from || null,
      date_to: p.date_to || null,
      amount: Number(p.amount) || 0,
      status: "new",
      payment_method: p.payment_method || null,
      payment_status: p.payment_status || null,
      card_last4: p.card_last4 || null,
      paid_at: p.paid_at || null,
    });
    res.json({ ok: true, id, reference_code });
  } catch (e) {
    res.status(500).json({ message: e.message || "Ошибка" });
  }
});

app.post("/api/staff/login", (req, res) => {
  const { code, password } = req.body || {};
  if (String(code || "").trim() !== getStaffCode()) {
    return res.status(403).json({ message: "Неверный служебный код" });
  }
  if (!checkAdminPassword(password)) {
    return res.status(403).json({ message: "Неверный пароль" });
  }
  const token = createSession();
  res.cookie("staff_session", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 864e5,
  });
  res.json({ ok: true });
});

app.post("/api/staff/logout", (_req, res) => {
  res.clearCookie("staff_session");
  res.json({ ok: true });
});

app.get("/api/staff/me", (req, res) => {
  res.json({ ok: hasSession(req.cookies.staff_session) });
});

app.get("/api/admin/requests", requireStaff, (_req, res) => {
  res.json({ requests: listRequests().slice(0, 200) });
});

app.get("/api/admin/stats", requireStaff, (_req, res) => {
  const rows = listRequests();
  const pending = rows.filter((r) => ["new", "processing"].includes(r.status)).length;
  const done = rows.filter((r) => r.status === "done").length;
  res.json({
    total: rows.length,
    pending,
    done,
    revenue: 0,
    usersServed: new Set(rows.map((r) => r.email).filter(Boolean)).size,
  });
});

app.patch("/api/admin/requests/:id", requireStaff, (req, res) => {
  try {
    updateRequestStatus(req.params.id, req.body?.status);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

if (isProd) {
  const dist = path.join(ROOT, "dist");
  if (!fs.existsSync(dist)) {
    console.error("Нет папки dist. Запустите: npm run build");
    process.exit(1);
  }
  app.use(express.static(dist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(dist, "index.html"));
  });
}

function startServer(port) {
  const server = app.listen(port, "0.0.0.0", () => {
    console.log("========================================");
    console.log("  ЦГА ВКО — сервер запущен");
    console.log("  Сайт: http://127.0.0.1:" + port + "/");
    console.log("  Код: ARHIV-VKO-2026  Пароль: admin2026");
    console.log("========================================");
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const next = [8080, 8081, 3000, 5000].find((p) => p !== port);
      if (next) {
        console.log("Порт " + port + " занят, пробую " + next + "...");
        return startServer(next);
      }
    }
    console.error("ОШИБКА:", err.message);
    process.exit(1);
  });
}

startServer(API_PORT);
