import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getService } from "../content/services";

export function ApplyPage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;
  const [step, setStep] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    iin: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    dateFrom: "",
    dateTo: "",
  });

  if (!service) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl">Услуга не найдена</h1>
        <Link to="/services" className="btn-primary mt-6">К услугам</Link>
      </div>
    );
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.description.trim()) {
      setErr("Заполните ФИО, e-mail и описание");
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicant_name: form.name,
          iin: form.iin || null,
          email: form.email,
          phone: form.phone || null,
          address: form.address || null,
          service_type: service.title,
          description: form.description,
          date_from: form.dateFrom || null,
          date_to: form.dateTo || null,
          amount: service.price,
          payment_status: service.paid ? "unpaid" : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка");
      setDone(data.reference_code);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="card">
          <h1 className="font-serif text-2xl font-semibold text-emerald-800">Заявка принята</h1>
          <p className="mt-2 text-slate-600">Номер заявки:</p>
          <p className="mt-2 font-mono text-xl font-bold">{done}</p>
          <Link to="/" className="btn-primary mt-8">На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link to={`/services/${service.slug}`} className="text-sm font-semibold text-blue-800">
        ← {service.title}
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-semibold">Заявка: {service.title}</h1>
      <p className="text-sm text-slate-600">
        {service.paid ? `Платная услуга · ${service.price.toLocaleString("ru-RU")} ₸` : "Бесплатная услуга"}
      </p>

      <form onSubmit={submit} className="card mt-8 space-y-4">
        {step === 0 && (
          <>
            <h2 className="font-semibold">Данные заявителя</h2>
            <input className="input" placeholder="ФИО *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="ИИН" value={form.iin} onChange={(e) => setForm({ ...form, iin: e.target.value })} />
            <input className="input" type="email" placeholder="E-mail *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="input" placeholder="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="input" placeholder="Адрес" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <button type="button" className="btn-primary" onClick={() => setStep(1)}>Далее</button>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="font-semibold">Детали запроса</h2>
            <textarea className="input resize-none" rows={5} placeholder="Описание *" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="input" type="date" value={form.dateFrom} onChange={(e) => setForm({ ...form, dateFrom: e.target.value })} />
              <input className="input" type="date" value={form.dateTo} onChange={(e) => setForm({ ...form, dateTo: e.target.value })} />
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <div className="flex gap-3">
              <button type="button" className="btn-outline" onClick={() => setStep(0)}>Назад</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                {loading ? "Отправка…" : "Отправить заявку"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
