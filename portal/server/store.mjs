import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const FILE = path.join(DATA_DIR, "store.json");

const DEFAULT = {
  requests: [],
  sessions: [],
  settings: {
    staff_access_code: "ARHIV-VKO-2026",
    admin_password_hash: bcrypt.hashSync("admin2026", 10),
  },
};

function read() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify(DEFAULT, null, 2), "utf8");
    return structuredClone(DEFAULT);
  }
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function write(data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
}

export function getStaffCode() {
  return read().settings.staff_access_code || "ARHIV-VKO-2026";
}

export function checkAdminPassword(password) {
  const hash = read().settings.admin_password_hash;
  return bcrypt.compareSync(String(password || ""), hash);
}

export function createSession() {
  const data = read();
  const token = randomUUID();
  const expires_at = new Date(Date.now() + 7 * 864e5).toISOString();
  data.sessions.push({ token, expires_at });
  write(data);
  return token;
}

export function hasSession(token) {
  if (!token) return false;
  const data = read();
  const now = Date.now();
  return data.sessions.some(
    (s) => s.token === token && new Date(s.expires_at).getTime() > now
  );
}

export function insertRequest(row) {
  const data = read();
  data.requests.unshift(row);
  write(data);
}

export function listRequests() {
  return read().requests;
}

export function updateRequestStatus(id, status) {
  const data = read();
  const r = data.requests.find((x) => x.id === id);
  if (!r) throw new Error("Заявка не найдена");
  r.status = status;
  write(data);
}

export function initStore() {
  read();
}
