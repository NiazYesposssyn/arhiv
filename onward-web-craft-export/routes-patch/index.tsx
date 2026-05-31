/**
 * Главная страница (/) — вёрстка.
 * Тексты: src/content/home.ts
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/archive-hero.jpg";
import docsImg from "@/assets/documents.jpg";
import digitalImg from "@/assets/digital.jpg";
import { Search, ScrollText, ArrowRight, Clock, MapPin } from "lucide-react";
import {
  homeMeta,
  homeHero,
  homeStats,
  homeServiceCards,
  homeSections,
  homeSteps,
  homeCities,
  homeNews,
} from "@/content/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeMeta.title },
      { name: "description", content: homeMeta.description },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/50" />
        </div>
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
        <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold animate-fade-up backdrop-blur">
              <ScrollText className="h-3.5 w-3.5" /> {homeHero.badge}
            </div>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl animate-fade-up delay-100">
              {homeHero.titleLine1}{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent italic">{homeHero.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-up delay-200">{homeHero.description}</p>

            <form className="mt-8 flex items-center gap-2 rounded-full border border-border bg-background/95 p-1.5 pl-4 shadow-soft animate-fade-up delay-300">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={homeHero.searchPlaceholder}
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="btn-glow rounded-full bg-gradient-hero px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                {homeHero.searchButton}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3 animate-fade-up delay-400">
              <Link to="/services" className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground">
                {homeHero.ctaOrder} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/digital" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary hover:bg-secondary hover:-translate-y-0.5">
                {homeHero.ctaDigital}
              </Link>
              <Link to="/map" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary hover:bg-secondary hover:-translate-y-0.5">
                <MapPin className="h-4 w-4" /> {homeHero.ctaMap}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {homeStats.map((s, i) => (
            <div key={s.l} className={`text-center md:text-left animate-fade-up`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="bg-gradient-hero bg-clip-text font-serif text-3xl font-semibold text-transparent sm:text-4xl">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <div className="mb-2 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{homeSections.servicesEyebrow}</div>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{homeSections.servicesTitle}</h2>
          </div>
          <Link to="/services" className="story-link hidden text-sm font-semibold text-primary sm:inline-flex items-center gap-1">
            {homeSections.servicesAllLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeServiceCards.map((s, i) => (
            <div
              key={s.title}
              style={{ animationDelay: `${i * 80}ms` }}
              className="hover-lift group animate-fade-up rounded-2xl border border-border bg-card p-6 hover:border-primary/40"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-3">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SPLIT */}
      <section className="bg-secondary/40 paper-texture">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{homeSections.digitalEyebrow}</div>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{homeSections.digitalTitle}</h2>
            <p className="mt-4 text-muted-foreground">{homeSections.digitalDesc}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {homeSections.digitalBullets.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-warm" /> {t}
                </li>
              ))}
            </ul>
            <Link to="/digital" className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground">
              {homeSections.digitalCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <img src={digitalImg} alt="Электронный архив" loading="lazy" width={1200} height={800}
              className="rounded-3xl border border-border shadow-soft hover-lift" />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-background p-4 shadow-soft sm:block animate-float-slow">
              <div className="bg-gradient-hero bg-clip-text font-serif text-2xl font-semibold text-transparent">{homeSections.digitalBadgeValue}</div>
              <div className="text-xs text-muted-foreground">{homeSections.digitalBadgeLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mb-2 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{homeSections.howEyebrow}</div>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{homeSections.howTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {homeSteps.map((step, i) => (
            <div
              key={step.n}
              style={{ animationDelay: `${i * 100}ms` }}
              className="hover-lift animate-fade-up relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="bg-gradient-warm bg-clip-text font-serif text-5xl font-semibold text-transparent">{step.n}</div>
              <h3 className="mt-2 font-serif text-xl font-semibold">{step.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP TEASER */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-2 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{homeSections.mapEyebrow}</div>
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{homeSections.mapTitle}</h2>
              <p className="mt-4 text-muted-foreground">{homeSections.mapDesc}</p>
              <Link to="/map" className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground">
                <MapPin className="h-4 w-4" /> {homeSections.mapCta}
              </Link>
            </div>
            <div className="aspect-[4/3] rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-gold/15 p-8 shadow-soft animate-float-slow">
              <div className="grid h-full grid-cols-3 gap-3">
                {homeCities.map((c, i) => (
                  <div key={c} style={{ animationDelay: `${i*60}ms` }} className="animate-fade-up grid place-items-center rounded-2xl border border-border bg-card/80 p-2 text-xs font-medium backdrop-blur">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="mt-1 text-center">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{homeSections.newsEyebrow}</div>
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{homeSections.newsTitle}</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {homeNews.map((n, i) => (
              <article key={n.t} style={{ animationDelay: `${i*100}ms` }} className="hover-lift animate-fade-up overflow-hidden rounded-2xl border border-border bg-card">
                <img src={docsImg} alt="" loading="lazy" width={1200} height={800} className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {n.d}
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold">{n.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.e}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-primary-foreground shadow-glow sm:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-16 -left-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{homeSections.ctaTitle}</h2>
              <p className="mt-3 text-primary-foreground/85">{homeSections.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="btn-glow inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-foreground">
                {homeSections.ctaApply} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold transition hover:bg-primary-foreground/10 hover:-translate-y-0.5">
                {homeSections.ctaServices}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
