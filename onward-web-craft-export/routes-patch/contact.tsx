/**
 * Страница «Контакты» (/contact) — вёрстка.
 * Тексты: src/content/contacts.ts
 */
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import {
  contactPageMeta,
  contactPageHeader,
  contactForm,
  contactCards,
  contactMap,
} from "@/content/contacts";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contactPageMeta.title },
      { name: "description", content: contactPageMeta.description },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHeader
        eyebrow={contactPageHeader.eyebrow}
        title={contactPageHeader.title}
        description={contactPageHeader.description}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold">{contactForm.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{contactForm.subtitle}</p>
          {sent ? (
            <div className="mt-6 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm">
              {contactForm.successMessage}
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="ФИО"><input required className="input" placeholder="Иванов Иван Иванович" /></Field>
                <Field label="E‑mail"><input required type="email" className="input" placeholder="you@mail.com" /></Field>
                <Field label="Телефон"><input className="input" placeholder="+7 ___ ___ __ __" /></Field>
                <Field label="Тип услуги">
                  <select className="input">
                    {contactForm.serviceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Опишите запрос">
                <textarea required rows={5} className="input resize-none" placeholder="Укажите период, ФИО, организацию и другие детали…" />
              </Field>
              <button className="w-full btn-glow rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-primary-foreground">
                {contactForm.submitLabel}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {contactCards.map((c) => (
            <div key={c.t} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.t}</div>
                <div className="mt-1 whitespace-pre-line font-medium">{c.v}</div>
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title={contactMap.iframeTitle}
              src={contactMap.embedUrl}
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 15%, transparent); }
      `}</style>

      <SiteFooter />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
