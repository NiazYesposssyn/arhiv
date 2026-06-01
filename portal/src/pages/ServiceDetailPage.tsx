import { Link, useParams } from "react-router-dom";
import { getService } from "../content/services";

export function ServiceDetailPage() {
  const { slug } = useParams();
  const s = slug ? getService(slug) : undefined;
  if (!s) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl">Услуга не найдена</h1>
        <Link to="/services" className="btn-primary mt-6">
          К услугам
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/services" className="text-sm font-semibold text-blue-800">
        ← Услуги
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold">{s.title}</h1>
      <p className="mt-3 text-slate-600">{s.desc}</p>
      <p className="mt-4 font-semibold text-blue-900">
        {s.paid ? `Стоимость: ${s.price.toLocaleString("ru-RU")} ₸` : "Бесплатная услуга"}
      </p>
      <ul className="mt-6 list-inside list-disc text-sm text-slate-700">
        {s.documents.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <Link to={`/apply/${s.slug}`} className="btn-primary mt-8">
        Оформить заявку
      </Link>
    </div>
  );
}
