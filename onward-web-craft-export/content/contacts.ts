/**
 * СТРАНИЦА «КОНТАКТЫ» — адрес, телефон, почта, часы работы.
 */
import { MapPin, Phone, Mail, Clock, type LucideIcon } from "lucide-react";

export const contactPageMeta = {
  title: "Контакты — ЦГА",
  description: "Свяжитесь с архивом, подайте заявку или задайте вопрос.",
};

export const contactPageHeader = {
  eyebrow: "Связь",
  title: "Контакты и заявка",
  description: "Подайте заявку онлайн или свяжитесь с нашими специалистами.",
};

export const contactForm = {
  title: "Подать заявку",
  subtitle: "Заполните форму — мы ответим в течение 1 рабочего дня.",
  successMessage:
    "Спасибо! Ваша заявка принята. Регистрационный номер придёт на e‑mail.",
  submitLabel: "Отправить заявку",
  serviceOptions: [
    "Архивная справка",
    "Генеалогический запрос",
    "Заверенная копия",
    "Тематический запрос",
    "Другое",
  ],
};

export const contactCards: {
  icon: LucideIcon;
  t: string;
  v: string;
}[] = [
  {
    icon: MapPin,
    t: "Адрес",
    v: "г. Өскемен (Усть-Каменогорск),\nул. Бейбитшилик, 26/1",
  },
  { icon: Phone, t: "Телефон", v: "+7 (7232) 70‑00‑00" },
  { icon: Mail, t: "Электронная почта", v: "info@arhiv-vko.gov.kz" },
  { icon: Clock, t: "Часы работы", v: "Пн–Пт: 9:00–18:00\nСб: 10:00–14:00" },
];

export const contactMap = {
  iframeTitle: "Карта — ул. Бейбитшилик 26/1, Өскемен",
  embedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=82.605%2C49.940%2C82.655%2C49.960&layer=mapnik&marker=49.9483%2C82.6286",
};
