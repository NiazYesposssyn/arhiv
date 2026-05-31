import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { textsRu } from "@/content/texts.ru";

export type Lang = "ru" | "kz" | "en";

type Dict = Record<string, string>;

const ru: Dict = textsRu;

const kz: Dict = {
  "nav.home": "Басты бет",
  "nav.services": "Қызметтер",
  "nav.collections": "Қорлар",
  "nav.digital": "Электрондық мұрағат",
  "nav.map": "Карта",
  "nav.about": "Біз туралы",
  "nav.contact": "Байланыс",
  "nav.login": "Кіру",
  "nav.signup": "Тіркелу",
  "nav.logout": "Шығу",
  "nav.menu": "Мәзір",

  "brand.short": "ШҚО МA",
  "brand.full": "Шығыс Қазақстан облыстық мемлекеттік мұрағаты",

  "hero.badge": "Мұрағаттың ресми порталы — Өскемен",
  "hero.title.1": "Өлкенің тарихы —",
  "hero.title.2": "сенімді қолда",
  "hero.desc": "Мұрағаттық анықтамалар, расталған көшірмелер және тарихи құжаттарға қол жеткізу — онлайн немесе Өскемендегі оқу залдарымызда.",
  "hero.search": "Қорлар, тізімдемелер, құжаттар бойынша іздеу…",
  "hero.find": "Іздеу",
  "hero.cta.order": "Анықтама тапсырыс беру",
  "hero.cta.digital": "Электрондық мұрағат",
  "hero.cta.map": "Мұрағаттар картасы",

  "stats.units": "Сақтау бірлігі",
  "stats.funds": "Мұрағат қоры",
  "stats.years": "Тарих күзетінде",
  "stats.requests": "Жылдық сұраныс",

  "section.services.eyebrow": "Қызметтер",
  "section.services.title": "Біз ұсынатын қызметтер",
  "section.services.all": "Барлық қызметтер",

  "section.digital.eyebrow": "Электрондық мұрағат",
  "section.digital.title": "Миллиондаған құжат — бір шертумен",
  "section.digital.desc": "Біз 2,8 миллионнан астам бетті цифрладық. Қорлар мен тізімдемелер бойынша іздеп, көшірмелер мен анықтамаларды онлайн тапсырыс беріңіз.",
  "section.digital.cta": "Каталогқа өту",

  "section.how.eyebrow": "Қалай жұмыс істейді",
  "section.how.title": "Қызметті 4 қадаммен алыңыз",

  "section.map.eyebrow": "География",
  "section.map.title": "Қазақстан бойынша мұрағаттар",
  "section.map.desc": "Негізгі мекенжай — Өскемен, Бейбітшілік к-сі 26/1. Басқа қалалардың филиалдары да көрсетілген.",
  "section.map.cta": "Картаны ашу",

  "section.news.eyebrow": "Жаңалықтар",
  "section.news.title": "Мұрағат өмірінен",

  "cta.title": "Мұрағаттық анықтама керек пе?",
  "cta.desc": "Онлайн өтінім қалдырыңыз — бір жұмыс күні ішінде хабарласамыз.",
  "cta.apply": "Өтінім беру",
  "cta.services": "Барлық қызметтер",

  "footer.about": "Шығыс Қазақстан облыстық мемлекеттік мұрағаты өңірдің тарихи құжаттарын сақтайды және қолжетімді етеді.",
  "footer.sections": "Бөлімдер",
  "footer.contacts": "Байланыс",
  "footer.address": "Бейбітшілік к-сі 26/1, Өскемен",
  "footer.rights": "© 2026 ШҚО мемлекеттік мұрағаты. Барлық құқық қорғалған.",

  "services.title": "Мұрағат қызметтері",
  "services.subtitle": "Мемлекеттік және ақылы қызметтердің толық тізімі.",
  "services.price": "Құны",
  "services.term": "Мерзімі",
  "services.details": "Толығырақ",
  "services.back": "Қызметтер тізіміне",

  "auth.title": "Жеке кабинет",
  "auth.tab.login": "Кіру",
  "auth.tab.signup": "Тіркелу",
  "auth.email": "Электрондық пошта",
  "auth.password": "Құпиясөз",
  "auth.name": "Атыңыз",
  "auth.submit.login": "Кіру",
  "auth.submit.signup": "Аккаунт жасау",
  "auth.check.email": "Сіздің email-ге растау хаты жіберілді. Аккаунтты белсендіру үшін сілтемеге өтіңіз.",
  "auth.error": "Қате",
  "auth.welcome": "Қош келдіңіз",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.collections": "Collections",
  "nav.digital": "Digital archive",
  "nav.map": "Map",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.login": "Sign in",
  "nav.signup": "Sign up",
  "nav.logout": "Sign out",
  "nav.menu": "Menu",

  "brand.short": "EKR SA",
  "brand.full": "State Archive of East Kazakhstan Region",

  "hero.badge": "Official archive portal — Öskemen",
  "hero.title.1": "The region's history —",
  "hero.title.2": "in trusted hands",
  "hero.desc": "Archive certificates, certified copies and access to historical documents — online or in our reading rooms in Öskemen.",
  "hero.search": "Search funds, inventories, documents…",
  "hero.find": "Search",
  "hero.cta.order": "Order a certificate",
  "hero.cta.digital": "Digital archive",
  "hero.cta.map": "Archives map",

  "stats.units": "Storage units",
  "stats.funds": "Archive funds",
  "stats.years": "Years of service",
  "stats.requests": "Requests per year",

  "section.services.eyebrow": "Services",
  "section.services.title": "What we offer",
  "section.services.all": "All services",

  "section.digital.eyebrow": "Digital archive",
  "section.digital.title": "Millions of documents — one click away",
  "section.digital.desc": "We have digitised over 2.8 million pages. Search funds, inventories and items, order copies and certificates online.",
  "section.digital.cta": "Open catalogue",

  "section.how.eyebrow": "How it works",
  "section.how.title": "Get the service in 4 steps",

  "section.map.eyebrow": "Geography",
  "section.map.title": "Archives across Kazakhstan",
  "section.map.desc": "Main address — Öskemen, Beibitshilik St. 26/1. Branches and archives in other cities are also shown.",
  "section.map.cta": "Open map",

  "section.news.eyebrow": "News",
  "section.news.title": "Archive life",

  "cta.title": "Need an archive certificate?",
  "cta.desc": "Submit a request online — we'll get back to you within one business day.",
  "cta.apply": "Submit request",
  "cta.services": "All services",

  "footer.about": "The State Archive of East Kazakhstan Region preserves and provides access to the region's historical documents.",
  "footer.sections": "Sections",
  "footer.contacts": "Contacts",
  "footer.address": "26/1 Beibitshilik St., Öskemen (Ust-Kamenogorsk)",
  "footer.rights": "© 2026 State Archive of EKR. All rights reserved.",

  "services.title": "Archive services",
  "services.subtitle": "Full list of state and paid services.",
  "services.price": "Price",
  "services.term": "Term",
  "services.details": "Details",
  "services.back": "Back to services",

  "auth.title": "Account",
  "auth.tab.login": "Sign in",
  "auth.tab.signup": "Sign up",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.name": "Your name",
  "auth.submit.login": "Sign in",
  "auth.submit.signup": "Create account",
  "auth.check.email": "We've sent a confirmation email. Follow the link to activate your account.",
  "auth.error": "Error",
  "auth.welcome": "Welcome back",
};

const DICTS: Record<Lang, Dict> = { ru, kz, en };

type I18nCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored && (stored === "ru" || stored === "kz" || stored === "en")) setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang === "kz" ? "kk" : lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  const t = (key: string) => DICTS[lang][key] ?? DICTS.ru[key] ?? key;

  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) return { lang: "ru" as Lang, setLang: () => {}, t: (k: string) => DICTS.ru[k] ?? k };
  return ctx;
}
