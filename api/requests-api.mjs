import { getRequestDbClient, hasServiceRole } from "./supabase-admin.mjs";

export async function createRequest(payload) {
  const db = getRequestDbClient();
  const row = {
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
  };

  const reference_code = `ВКО-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const { data, error } = await db
    .from("requests")
    .insert({ ...row, reference_code })
    .select("id,reference_code")
    .single();

  if (error) {
    if (!hasServiceRole()) {
      throw new Error(
        `${error.message || error.code || "Ошибка БД"}. ` +
          "Обход: в Supabase → SQL Editor выполните supabase/allow-public-requests.sql " +
          "или задайте SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY в .env и перезапустите npm start."
      );
    }
    throw error;
  }

  return { ok: true, id: data?.id, reference_code: data?.reference_code || reference_code };
}
