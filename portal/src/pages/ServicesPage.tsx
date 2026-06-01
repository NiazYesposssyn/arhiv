import { Link } from "react-router-dom";
import { SERVICES } from "../content/services";

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-3xl font-semibold">Услуги архива</h1>
      <p className="mt-2 text-slate-600">
        Выберите услугу и оформите заявку онлайн.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <article key={s.slug} className="card flex flex-col">
            <h2 className="font-serif text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-600">{s.desc}</p>
            <div className="mt-4 flex gap-3">
              <Link to={`/apply/${s.slug}`} className="btn-primary text-xs">
                Подать заявку
              </Link>
              <Link to={`/services/${s.slug}`} className="btn-outline text-xs">
                Подробнее
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
