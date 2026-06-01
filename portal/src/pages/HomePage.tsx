import { Link } from "react-router-dom";
import { SERVICES } from "../content/services";

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e3a8a33,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Государственный архив
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Центральный государственный архив Восточно-Казахстанской области
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Подача заявок на архивные справки, генеалогические запросы и услуги
            читального зала — онлайн, без сторонних сервисов.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services" className="btn-primary">
              Услуги архива
            </Link>
            <Link to="/contact" className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20">
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-serif text-2xl font-semibold">Популярные услуги</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="card transition hover:border-blue-200 hover:shadow-md"
            >
              <h3 className="font-serif font-semibold text-blue-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              <p className="mt-3 text-xs font-semibold text-blue-700">
                {s.paid ? `от ${s.price.toLocaleString("ru-RU")} ₸` : "Бесплатно"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
          {[
            { v: "12.4M", l: "Единиц хранения" },
            { v: "1 723", l: "Архивных фондов" },
            { v: "98 лет", l: "На страже истории" },
          ].map((x) => (
            <div key={x.l} className="text-center">
              <div className="font-serif text-3xl font-semibold text-blue-900">{x.v}</div>
              <div className="mt-1 text-sm text-slate-600">{x.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
