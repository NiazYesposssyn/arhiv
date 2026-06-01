/** Чтение секретов Supabase из .env (несколько имён + новый формат sb_secret_). */
export function serviceRoleKey() {
  const names = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
    "SERVICE_ROLE_KEY",
  ];
  for (const name of names) {
    const v = cleanEnv(process.env[name]);
    if (v) return v;
  }
  return "";
}

export function anonKey() {
  return (
    cleanEnv(process.env.SUPABASE_ANON_KEY) ||
    cleanEnv(process.env.SUPABASE_PUBLISHABLE_KEY) ||
    "sb_publishable_s5tZ2F3yvTih_nvLcEP2Qw_nhXCFxBI"
  );
}

export function supabaseUrl() {
  return (
    cleanEnv(process.env.SUPABASE_URL) || "https://rycgzckzrxedsbpwvzbh.supabase.co"
  );
}

export function hasServiceRole() {
  return Boolean(serviceRoleKey());
}

function cleanEnv(value) {
  if (value === undefined || value === null) return "";
  let s = String(value).trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}
