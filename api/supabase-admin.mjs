import { createClient } from "@supabase/supabase-js";
import { anonKey, hasServiceRole, serviceRoleKey, supabaseUrl } from "./env-keys.mjs";

export { hasServiceRole, serviceRoleKey, supabaseUrl, anonKey };

export function getAdminClient() {
  const key = serviceRoleKey();
  if (!key) {
    throw new Error(
      "Секретный ключ Supabase не задан. См. .env.example или supabase/allow-public-requests.sql"
    );
  }
  return createClient(supabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getAnonClient() {
  return createClient(supabaseUrl(), anonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getRequestDbClient() {
  return hasServiceRole() ? getAdminClient() : getAnonClient();
}

export function getUserClient(accessToken) {
  return createClient(supabaseUrl(), anonKey(), {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
