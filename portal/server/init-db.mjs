import bcrypt from "bcryptjs";
import { getDb } from "./db.mjs";

const db = getDb();

db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    reference_code TEXT NOT NULL UNIQUE,
    applicant_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    iin TEXT,
    address TEXT,
    service_type TEXT NOT NULL,
    description TEXT NOT NULL,
    date_from TEXT,
    date_to TEXT,
    amount REAL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'new',
    payment_method TEXT,
    payment_status TEXT,
    card_last4 TEXT,
    paid_at TEXT
  );

  CREATE TABLE IF NOT EXISTS staff_sessions (
    token TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

const staffCode = process.env.STAFF_ACCESS_CODE || "ARHIV-VKO-2026";
db.prepare(
  `INSERT INTO settings (key, value) VALUES ('staff_access_code', ?)
   ON CONFLICT(key) DO NOTHING`
).run(staffCode);

const adminHash = bcrypt.hashSync("admin2026", 10);
db.prepare(
  `INSERT INTO settings (key, value) VALUES ('admin_password_hash', ?)
   ON CONFLICT(key) DO UPDATE SET value = excluded.value`
).run(adminHash);

