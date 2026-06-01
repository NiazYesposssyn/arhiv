import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "requests.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]\n", "utf8");
}

function readAll() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeAll(rows) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(rows, null, 2), "utf8");
}

function makeReference() {
  return `ВКО-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function useLocalRequests() {
  return process.env.SUPABASE_REQUESTS !== "1";
}

export function createLocalRequest(payload) {
  const rows = readAll();
  const reference_code = makeReference();
  const row = {
    id: randomUUID(),
    created_at: new Date().toISOString(),
    applicant_name: payload.applicant_name,
    email: payload.email,
    phone: payload.phone || null,
    service_type: payload.service_type,
    description: payload.description,
    amount: Number(payload.amount) || 0,
    status: payload.status || "new",
    iin: payload.iin || null,
    address: payload.address || null,
    date_from: payload.date_from || null,
    date_to: payload.date_to || null,
    payment_method: payload.payment_method || null,
    payment_status: payload.payment_status || null,
    card_last4: payload.card_last4 || null,
    paid_at: payload.paid_at || null,
    reference_code,
  };
  rows.unshift(row);
  writeAll(rows);
  return { ok: true, id: row.id, reference_code };
}

export function listLocalRequests() {
  return readAll().sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
}

export function updateLocalRequest(id, status) {
  const rows = readAll();
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) throw new Error("Заявка не найдена");
  rows[i] = { ...rows[i], status };
  writeAll(rows);
  return { ok: true };
}
