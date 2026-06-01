import { getRequestDbClient, hasServiceRole } from "./supabase-admin.mjs";
import {
  createLocalRequest,
  useLocalRequests,
} from "./local-requests.mjs";

export async function createRequest(payload) {
  if (useLocalRequests()) {
    return createLocalRequest(payload);
  }

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
      return createLocalRequest(payload);
    }
    throw error;
  }

  return { ok: true, id: data?.id, reference_code: data?.reference_code || reference_code };
}
