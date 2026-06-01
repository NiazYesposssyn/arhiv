import { FormEvent, useState } from "react";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Архивная справка",
    description: "",
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setMsg(null);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicant_name: form.name,
          email: form.email,
          phone: form.phone,
          service_type: form.service,
          description: form.description,
          amount: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка");
      setMsg(`Заявка принята. Номер: ${data.reference_code}`);
      setForm({ name: "", email: "", phone: "", service: "Архивная справка", description: "" });
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-serif text-3xl font-semibold">Контакты и обращения</h1>
      <form onSubmit={submit} className="card mt-8 space-y-4">
        <label className="block text-sm">
          <span className="font-medium">ФИО *</span>
          <input className="input mt-1" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">E-mail *</span>
          <input type="email" className="input mt-1" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Телефон</span>
          <input className="input mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Тема</span>
          <select className="input mt-1" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            <option>Архивная справка</option>
            <option>Генеалогический запрос</option>
            <option>Заверенная копия</option>
            <option>Другое</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium">Сообщение *</span>
          <textarea className="input mt-1 resize-none" rows={4} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        {err && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}
        {msg && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{msg}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Отправка…" : "Отправить"}
        </button>
      </form>
    </div>
  );
}
