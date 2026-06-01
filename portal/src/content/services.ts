export type Service = {
  slug: string;
  title: string;
  desc: string;
  price: number;
  paid: boolean;
  documents: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "social-legal",
    title: "Социально-правовые справки",
    desc: "Справки для пенсий, труда, судов и социальных выплат.",
    price: 2500,
    paid: false,
    documents: [
      "Удостоверение личности",
      "Доверенность (при обращении представителя)",
      "Документы, подтверждающие родство или право на информацию",
    ],
  },
  {
    slug: "genealogy",
    title: "Генеалогические запросы",
    desc: "Поиск сведений о предках и родственных связях.",
    price: 8000,
    paid: true,
    documents: [
      "Удостоверение личности",
      "Сведения об искомых лицах (ФИО, даты, места)",
      "Документы, подтверждающие родство",
    ],
  },
  {
    slug: "certified-copy",
    title: "Заверенные копии",
    desc: "Заверенные копии документов из фондов архива.",
    price: 5000,
    paid: true,
    documents: ["Удостоверение личности", "Реквизиты дела или описи"],
  },
  {
    slug: "thematic",
    title: "Тематические запросы",
    desc: "Подбор документов по теме, периоду или организации.",
    price: 4500,
    paid: true,
    documents: ["Удостоверение личности", "Обоснование темы запроса"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
