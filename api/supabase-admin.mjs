import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "https://rycgzckzrxedsbpwvzbh.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function hasServiceRole() {
  return Boolean(serviceKey);
}

export function getAdminClient() {
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY не задан. Создайте файл .env (см. .env.example)."
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getUserClient(accessToken) {
  const anon =
    process.env.SUPABASE_ANON_KEY || "sb_publishable_s5tZ2F3yvTih_nvLcEP2Qw_nhXCFxBI";
  return createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
