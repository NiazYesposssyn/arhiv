import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { getDb } from "./db.mjs";
import "./init-db.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT || 8080);
const API_PORT = Number(process.env.API_PORT || (isProd ? PORT : 4000));

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

function refCode() {
  return `ВКО-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function getStaffCode() {
  const row = getDb()
    .prepare("SELECT value FROM settings WHERE key = 'staff_access_code'")
    .get();
  return row?.value || "ARHIV-VKO-2026";
}

function requireStaff(req, res, next) {
  const token = req.cookies.staff_session;
  if (!token) return res.status(401).json({ message: "Войдите через /staff" });
  const row = getDb()
    .prepare(
      "SELECT token FROM staff_sessions WHERE token = ? AND expires_at > datetime('now')"
    )
    .get(token);
  if (!row) return res.status(401).json({ message: "Сессия истекла" });
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, storage: "sqlite", mode: isProd ? "production" : "development" });
});

app.post("/api/requests", (req, res) => {
  try {
    const p = req.body || {};
    if (!p.applicant_name?.trim() || !p.description?.trim()) {
      return res.status(400).json({ message: "Укажите ФИО и описание" });
    }
    const id = randomUUID();
    const reference_code = refCode();
    getDb()
      .prepare(
        `INSERT INTO requests (
          id, reference_code, applicant_name, email, phone, iin, address,
          service_type, description, date_from, date_to, amount, status,
          payment_method, payment_status, card_last4, paid_at
        ) VALUES (
          @id, @reference_code, @applicant_name, @email, @phone, @iin, @address,
          @service_type, @description, @date_from, @date_to, @amount, @status,
          @payment_method, @payment_status, @card_last4, @paid_at
        )`
      )
      .run({
        id,
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
    console.error(e);
    res.status(500).json({ message: e.message || "Ошибка сохранения" });
  }
});

app.post("/api/staff/login", (req, res) => {
  const { code, password } = req.body || {};
  if (String(code || "").trim() !== getStaffCode()) {
    return res.status(403).json({ message: "Неверный служебный код" });
  }
  const hashRow = getDb()
    .prepare("SELECT value FROM settings WHERE key = 'admin_password_hash'")
    .get();
  if (!bcrypt.compareSync(String(password || ""), hashRow.value)) {
    return res.status(403).json({ message: "Неверный пароль" });
  }
  const token = randomUUID();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  getDb()
    .prepare("INSERT INTO staff_sessions (token, expires_at) VALUES (?, ?)")
    .run(token, expires);
  res.cookie("staff_session", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ ok: true });
});

app.post("/api/staff/logout", (_req, res) => {
  res.clearCookie("staff_session");
  res.json({ ok: true });
});

app.get("/api/staff/me", (req, res) => {
  const token = req.cookies.staff_session;
  if (!token) return res.json({ ok: false });
  const row = getDb()
    .prepare(
      "SELECT token FROM staff_sessions WHERE token = ? AND expires_at > datetime('now')"
    )
    .get(token);
  res.json({ ok: Boolean(row) });
});

app.get("/api/admin/requests", requireStaff, (req, res) => {
  const status = req.query.status;
  let sql = "SELECT * FROM requests ORDER BY created_at DESC LIMIT 200";
  const rows =
    status && status !== "all"
      ? getDb()
          .prepare(
            "SELECT * FROM requests WHERE status = ? ORDER BY created_at DESC LIMIT 200"
          )
          .all(status)
      : getDb().prepare(sql).all();
  res.json({ requests: rows });
});

app.get("/api/admin/stats", requireStaff, (_req, res) => {
  const rows = getDb().prepare("SELECT * FROM requests").all();
  const pending = rows.filter((r) =>
    ["new", "processing"].includes(r.status)
  ).length;
  const done = rows.filter((r) => r.status === "done").length;
  const revenue = rows
    .filter((r) => r.payment_status === "paid")
    .reduce((s, r) => s + (r.amount || 0), 0);
  res.json({
    total: rows.length,
    pending,
    done,
    revenue,
    usersServed: new Set(rows.map((r) => r.email).filter(Boolean)).size,
  });
});

app.patch("/api/admin/requests/:id", requireStaff, (req, res) => {
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ message: "status required" });
  getDb()
    .prepare("UPDATE requests SET status = ? WHERE id = ?")
    .run(status, req.params.id);
  res.json({ ok: true });
});

if (isProd) {
  const dist = path.join(ROOT, "dist");
  if (fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(dist, "index.html"));
    });
  }
}

app.listen(API_PORT, "0.0.0.0", () => {
  console.log(`API: http://127.0.0.1:${API_PORT}`);
  if (isProd) {
    console.log(`Сайт: http://127.0.0.1:${API_PORT}/`);
    console.log(`Пароль админки (по умолчанию): admin2026`);
    console.log(`Служебный код: ${getStaffCode()}`);
  } else {
    console.log(`Фронт (Vite): http://127.0.0.1:${PORT}/`);
  }
});
