/**
 * Страница «Фонды» (/collections) — вёрстка.
 * Данные: src/content/fonds.ts
 */
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { Folder, Calendar, FileStack, X, FileText } from "lucide-react";
import { useState } from "react";
import { fonds, fondCategories, fondsPageHeader, type Fund } from "@/content/fonds";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Фонды — ЦГА" },
      { name: "description", content: "Архивные фонды: исторические, личные, фотодокументальные и аудиовизуальные." },
    ],
  }),
  component: Collections,
});

function Collections() {
  const [activeCat, setActiveCat] = useState("Все");
  const [open, setOpen] = useState<Fund | null>(null);

  const filtered = activeCat === "Все" ? fonds : fonds.filter((f) => f.cat === activeCat);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHeader
        eyebrow={fondsPageHeader.eyebrow}
        title={fondsPageHeader.title}
        description={fondsPageHeader.description}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {fondCategories.map((c) => {
            const active = c === activeCat;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-gold"}`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <button
              key={f.num}
              onClick={() => setOpen(f)}
              className="group text-left rounded-xl border border-border bg-card p-6 transition hover:border-gold/60 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
                  <Folder className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.cat}
                </span>
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold">Фонд {f.num}</div>
              <h3 className="mt-1 font-serif text-lg font-semibold">{f.title}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {f.period}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileStack className="h-3.5 w-3.5" /> {f.units}
                </div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
              В категории «{activeCat}» пока нет фондов.
            </div>
          )}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur" onClick={() => setOpen(null)}>
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-border p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gold">Фонд {open.num}</div>
                <h3 className="mt-1 font-serif text-2xl font-semibold">{open.title}</h3>
                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                  <span>{open.period}</span>
                  <span>{open.units} ед. хр.</span>
                  <span>{open.cat}</span>
                </div>
              </div>
              <button onClick={() => setOpen(null)} className="rounded-lg p-2 hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm text-muted-foreground">{open.desc}</p>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Избранные дела</div>
                <ul className="space-y-2">
                  {open.items.map((it) => (
                    <li key={it.code} className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-sm">
                      <div>
                        <div className="font-mono text-xs text-muted-foreground">{it.code}</div>
                        <div className="font-medium">{it.title}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{it.pages || "—"} стр.</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/digital" className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                <FileText className="h-4 w-4" /> Открыть в электронном архиве
              </a>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
