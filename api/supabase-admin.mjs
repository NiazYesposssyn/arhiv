import { createClient } from "@supabase/supabase-js";

function supabaseUrl() {
  return process.env.SUPABASE_URL || "https://rycgzckzrxedsbpwvzbh.supabase.co";
}

function serviceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function hasServiceRole() {
  return Boolean(serviceRoleKey());
}

export function getAdminClient() {
  const key = serviceRoleKey();
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY не задан. Создайте файл .env (см. .env.example)."
    );
  }
  return createClient(supabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getUserClient(accessToken) {
  const anon =
    process.env.SUPABASE_ANON_KEY || "sb_publishable_s5tZ2F3yvTih_nvLcEP2Qw_nhXCFxBI";
  return createClient(supabaseUrl(), anon, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
