/**
 * МЕНЮ, ШАПКА, ПОДВАЛ и общие подписи (русский язык).
 * Используется в SiteHeader, SiteFooter и других страницах через useI18n().
 */
export type TextDict = Record<string, string>;

export const textsRu: TextDict = {
  "nav.home": "Главная",
  "nav.services": "Услуги",
  "nav.collections": "Фонды",
  "nav.digital": "Электронный архив",
  "nav.map": "Карта",
  "nav.about": "О нас",
  "nav.contact": "Контакты",
  "nav.login": "Войти",
  "nav.signup": "Регистрация",
  "nav.logout": "Выйти",
  "nav.menu": "Меню",

  "brand.short": "ГА ВКО",
  "brand.full": "Государственный архив Восточно-Казахстанской области",

  "hero.badge": "Официальный портал архива — Өскемен",
  "hero.title.1": "История края —",
  "hero.title.2": "в надёжных руках",
  "hero.desc":
    "Архивные справки, заверенные копии и доступ к историческим документам — онлайн или в наших читальных залах в Өскемене.",
  "hero.search": "Поиск по фондам, описям, документам…",
  "hero.find": "Найти",
  "hero.cta.order": "Заказать справку",
  "hero.cta.digital": "Электронный архив",
  "hero.cta.map": "Карта архивов",

  "stats.units": "Единиц хранения",
  "stats.funds": "Архивных фондов",
  "stats.years": "На страже истории",
  "stats.requests": "Запросов в год",

  "section.services.eyebrow": "Услуги",
  "section.services.title": "Что мы предлагаем",
  "section.services.all": "Все услуги",

  "section.digital.eyebrow": "Электронный архив",
  "section.digital.title": "Миллионы документов — в один клик",
  "section.digital.desc":
    "Мы оцифровали более 2,8 миллионов страниц документов. Ищите по фондам, описям и единицам хранения, заказывайте копии и справки онлайн.",
  "section.digital.cta": "Перейти в каталог",

  "section.how.eyebrow": "Как это работает",
  "section.how.title": "Получите услугу за 4 шага",

  "section.map.eyebrow": "География",
  "section.map.title": "Архивы по всему Казахстану",
  "section.map.desc":
    "Главный адрес — Өскемен, ул. Бейбитшилик 26/1. Также показаны филиалы и архивы других городов.",
  "section.map.cta": "Открыть карту",

  "section.news.eyebrow": "Новости",
  "section.news.title": "Из жизни архива",

  "cta.title": "Нужна архивная справка?",
  "cta.desc": "Подайте заявку онлайн — мы свяжемся с вами в течение одного рабочего дня.",
  "cta.apply": "Подать заявку",
  "cta.services": "Все услуги",

  "footer.about":
    "Государственный архив Восточно-Казахстанской области хранит и предоставляет доступ к историческим документам региона.",
  "footer.sections": "Разделы",
  "footer.contacts": "Контакты",
  "footer.address": "ул. Бейбитшилик 26/1, Өскемен (Усть-Каменогорск)",
  "footer.rights": "© 2026 Государственный архив ВКО. Все права защищены.",

  "services.title": "Услуги архива",
  "services.subtitle": "Полный перечень государственных и платных услуг.",
  "services.price": "Стоимость",
  "services.term": "Срок",
  "services.details": "Подробнее",
  "services.back": "К списку услуг",

  "auth.title": "Личный кабинет",
  "auth.tab.login": "Вход",
  "auth.tab.signup": "Регистрация",
  "auth.email": "Электронная почта",
  "auth.password": "Пароль",
  "auth.name": "Ваше имя",
  "auth.submit.login": "Войти",
  "auth.submit.signup": "Создать аккаунт",
  "auth.check.email":
    "Мы отправили письмо для подтверждения на ваш email. Перейдите по ссылке, чтобы активировать аккаунт.",
  "auth.error": "Ошибка",
  "auth.welcome": "С возвращением",
};
