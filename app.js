(function () {
  "use strict";

  const pageNames = {
    "": "home",
    "index.html": "home",
    "about-system.html": "about-system",
    "archive.html": "archive",
    "services.html": "services",
    "pricing.html": "pricing",
    "news.html": "news",
    "faq.html": "faq",
    "contacts.html": "contacts",
    "help.html": "help",
    "privacy.html": "privacy",
    "terms.html": "terms",
    "sitemap.html": "sitemap",
    "login.html": "login",
    "register.html": "register",
    "forgot-password.html": "forgot-password",
    "two-factor.html": "two-factor",
    "email-confirmation.html": "email-confirmation",
    "dashboard.html": "dashboard",
    "documents.html": "documents",
    "requests.html": "requests",
    "analytics.html": "analytics",
    "branches-map.html": "branches-map",
    "notifications.html": "notifications",
    "activity.html": "activity",
    "reports.html": "reports",
    "profile.html": "profile",
    "settings.html": "settings",
    "users.html": "users",
    "roles.html": "roles",
    "audit-logs.html": "audit-logs",
    "admin.html": "admin",
    "support-center.html": "support-center",
    "knowledge-base.html": "knowledge-base",
    "api-documentation.html": "api-documentation",
    "backups.html": "backups",
    "security-center.html": "security-center"
  };

  const publicLinks = [
    ["index.html", "Басты бет"],
    ["archive.html", "Архив туралы"],
    ["services.html", "Қызметтер"],
    ["pricing.html", "Тарифтер"],
    ["analytics.html", "Аналитика"],
    ["contacts.html", "Байланыс"]
  ];

  const publicMega = [
    ["about-system.html", "О системе", "Архитектура, безопасность, возможности платформы"],
    ["archive.html", "Об архиве", "История, миссия, филиалы и карта"],
    ["services.html", "Услуги", "Справки, поиск документов, консультации"],
    ["news.html", "Новости", "События, объявления, публикации"],
    ["faq.html", "FAQ", "Ответы и категории вопросов"],
    ["help.html", "Справочный центр", "Инструкции, база знаний и видеоуроки"],
    ["privacy.html", "Политика", "Конфиденциальность и обработка данных"],
    ["sitemap.html", "Карта сайта", "Все разделы портала"]
  ];

  const workspaceLinks = [
    ["dashboard.html", "Dashboard"],
    ["documents.html", "Документы"],
    ["requests.html", "Запросы"],
    ["analytics.html", "Аналитика"],
    ["branches-map.html", "Карта филиалов"],
    ["notifications.html", "Уведомления"],
    ["activity.html", "История"],
    ["reports.html", "Отчеты"],
    ["profile.html", "Профиль"],
    ["settings.html", "Настройки"],
    ["support-center.html", "Support"],
    ["knowledge-base.html", "Knowledge Base"],
    ["api-documentation.html", "API"],
    ["backups.html", "Backups"],
    ["security-center.html", "Security"]
  ];

  const adminModules = [
    ["users.html", "Управление пользователями", "Сегменты, статусы, MFA, доступы", "👥"],
    ["roles.html", "Управление ролями", "RBAC, матрицы прав, политики", "🛡️"],
    ["documents.html", "Управление документами", "Импорт, OCR, ЭЦП, версии", "📄"],
    ["archive.html", "Управление архивами", "Фонды, описи, хранение", "🏛️"],
    ["branches-map.html", "Управление филиалами", "Регионы, SLA, нагрузка", "📍"],
    ["services.html", "Управление категориями", "Таксономия и справочники", "🗂️"],
    ["news.html", "Управление новостями", "Публикации и объявления", "📰"],
    ["help.html", "Управление справочником", "FAQ, инструкции, видео", "📚"],
    ["requests.html", "Управление заявками", "Очереди, статусы, исполнители", "🧾"],
    ["audit-logs.html", "Журнал аудита", "События, риски, расследования", "🔎"],
    ["notifications.html", "Управление уведомлениями", "Email, Push, шаблоны", "🔔"],
    ["pricing.html", "Управление тарифами", "Планы, лимиты, счета", "💳"],
    ["backups.html", "Резервное копирование", "Snapshots, RPO, восстановление", "💾"],
    ["settings.html", "Системные настройки", "Интеграции, языки, темы", "⚙️"],
    ["security-center.html", "Мониторинг системы", "SLA, нагрузка, безопасность", "📈"]
  ];

  const capabilityCards = [
    ["Құжаттарды басқару", "Метадеректер, нұсқалар, толықмәтінді индекстеу және қауіпсіз сақтау.", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80", "📁"],
    ["Архивтік сұраныстар", "Өтінімдерді қабылдау, SLA бақылау, мәртебелер және орындаушылар.", "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80", "🧾"],
    ["Аналитика", "KPI, аймақтық статистика, жүктеме және басқарушылық есептер.", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80", "📊"],
    ["Электрондық сақтау", "Құжаттарды ұзақмерзімді сақтау, резервтеу және lifecycle-саясаттар.", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80", "☁️"],
    ["Қауіпсіздік", "MFA, рөлдік модель, аудит, шифрлау және қауіпсіздік мониторингі.", "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80", "🔐"],
    ["Рөлдерді басқару", "Мемлекеттік ұйымдар, қызметкерлер, операторлар және сыртқы пайдаланушылар.", "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80", "👤"],
    ["Аудит журналы", "Әр әрекет тіркеледі: кіру, қарау, жүктеу, өзгерту және экспорт.", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80", "🧭"],
    ["Есептер генерациясы", "PDF, Excel, басқарушылық есептер және автоматты архивтік анықтамалар.", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80", "📑"]
  ];

  const pricingPlans = [
    ["Базалық", "0 ₸", "Жеке пайдаланушылар үшін", ["Құжат іздеу", "5 архивтік сұраныс", "Email хабарламалар", "Қазақша / Русский / English"], false],
    ["Стандарт", "19 900 ₸", "Күнделікті жұмысқа арналған", ["50 ГБ сақтау", "OCR тану", "PDF/Excel экспорт", "Push хабарламалар"], true],
    ["Кәсіптік", "89 900 ₸", "Командалар мен бөлімдерге", ["AI-поиск документов", "ЭЦП келісу", "API интеграция", "Кеңейтілген аналитика"], false],
    ["Мемлекеттік ұйымдар үшін", "келісім", "Филиалдар желісі бар ұйымдарға", ["SLA 99.9%", "Жеке контур", "Резервное копирование", "Security audit"], false]
  ];

  const faqItems = [
    ["Жүйе қалай жұмыс істейді?", "Портал құжаттарды метадеректермен қабылдайды, OCR арқылы мәтінді таниды, индекстейді және сұраныстарды автоматты workflow арқылы өңдейді."],
    ["Құжаттарды қалай жүктеуге болады?", "Жеке кабинеттегі Documents бөліміне өтіп, файлдарды drag-and-drop арқылы қосыңыз немесе API/import модулін пайдаланыңыз."],
    ["Қауіпсіздік қалай қамтамасыз етіледі?", "MFA, RBAC, шифрлау, аудит журналы, backup snapshots және қауіпсіздік мониторингі қолданылады."],
    ["Архивтік сұранысты қалай жіберуге болады?", "Қызметтер немесе Requests бөлімінде сұраныс түрін таңдаңыз, деректерді толтырыңыз және мәртебені dashboard арқылы бақылаңыз."],
    ["PDF және Excel экспорты бар ма?", "Иә, құжат тізімдері, аналитика және архивтік анықтамалар PDF/Excel форматында экспортталады."],
    ["Мультиязычность қалай қосылады?", "Профиль немесе Settings бөлімінде Қазақша, Русский немесе English тілін таңдауға болады."]
  ];

  const publicPages = {
    "about-system": {
      kicker: "Archive Access System",
      title: "Мемлекеттік деңгейдегі электрондық архив платформасы",
      text: "Archive Access System құжаттарды сақтау, іздеу, OCR, AI-поиск, архивтік сұраныстар, аналитика және қауіпсіздікті бір корпоративтік контурда біріктіреді.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["Архитектура", "Модульдік портал: public layer, identity, workflow, document storage, reporting және API gateway."],
        ["Безопасность данных", "Шифрлау, MFA, RBAC, audit trail, backup және қауіпсіздік оқиғаларын мониторингтеу."],
        ["Преимущества", "Жылдам енгізу, нақты KPI, аймақтық филиалдармен жұмыс және масштабталатын сақтау контуры."],
        ["Возможности", "Full-text search, AI-поиск, OCR, PDF/Excel экспорт, ЭЦП, Push/Email хабарламалар."]
      ]
    },
    archive: {
      kicker: "Архив туралы",
      title: "Ұлттық архив тәжірибесі және заманауи цифрлық сервис",
      text: "Портал архив тарихын, миссиясын, қор құрылымын, филиалдарды және Қазақстан бойынша интерактивті картаны бір ыңғайлы интерфейске жинайды.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["История архива", "Қорлар, опистер және тарихи құжаттар цифрлық форматқа кезең-кезеңімен көшіріледі."],
        ["Миссия", "Азаматтарға, ұйымдарға және зерттеушілерге архивтік деректерге қауіпсіз әрі жылдам қолжетімділік беру."],
        ["Структура", "Құжаттарды қабылдау, сақтау, цифрландыру, анықтамалар және филиалдар қызметі."],
        ["Филиалы", "Астана, Алматы, Шымкент, Қарағанды және Ақтөбе бөлімшелері картада көрсетіледі."]
      ]
    },
    services: {
      kicker: "Қызметтер",
      title: "Архивтік қызметтердің толық цифрлық желісі",
      text: "Архивтік анықтамалар, құжат іздеу, консультациялар, электрондық қызметтер және өтінімдерді өңдеу бір workflow ішінде орындалады.",
      image: "https://images.unsplash.com/photo-1488998527040-85054a85150e?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["Выдача архивных справок", "Автоматты шаблондар, ЭЦП, PDF генерациясы және мәртебені бақылау."],
        ["Поиск документов", "Метадеректер, толықмәтінді индекс, OCR және AI-сұрақтар арқылы іздеу."],
        ["Консультации", "Онлайн кеңес, операторға өтінім және білім базасына сілтемелер."],
        ["Обработка заявок", "SLA, орындаушылар, басымдық және аудит журналы."]
      ]
    },
    pricing: {
      kicker: "Тарифы и услуги",
      title: "Әр ұйымға сәйкес келетін SaaS-тарифтер",
      text: "Бесплатный, базовый, корпоративный және мемлекеттік ұйымдарға арналған жоспарлар нақты лимиттермен және кеңейтілген мүмкіндіктермен беріледі.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=85",
      cards: []
    },
    news: {
      kicker: "Жаңалықтар",
      title: "Соңғы жаңалықтар, хабарландырулар және оқиғалар",
      text: "Портал релиздері, архивтік жарияланымдар, оқыту сессиялары және қызмет көрсету регламенттері.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["OCR модулі жаңартылды", "Жаңа модель қолжазба және скан сапасы төмен құжаттарды жақсы таниды."],
        ["Астана филиалында ашық есік күні", "Пайдаланушыларға электрондық өтінім жіберу бойынша практикалық сессия өтті."],
        ["API v2 құжаттамасы жарияланды", "Интеграция, webhooks және экспорт endpoint-тері толық сипатталды."],
        ["Қауіпсіздік аудиті аяқталды", "RBAC және MFA сценарийлері мемлекеттік талаптарға сәйкестендірілді."]
      ]
    },
    faq: {
      kicker: "FAQ",
      title: "Жиі қойылатын сұрақтар және жылдам іздеу",
      text: "Сұрақтарды категориялар бойынша немесе іздеу жолымен табыңыз. Жауаптар пайдаланушы, ұйым және әкімші сценарийлерін қамтиды.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
      cards: []
    },
    contacts: {
      kicker: "Байланыс",
      title: "Кері байланыс, карта және байланыс деректері",
      text: "Мекенжай, телефон, email, жұмыс уақыты және өтінім қалдыру формасы бір бетте жинақталған.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      cards: []
    },
    help: {
      kicker: "Справочный центр",
      title: "Инструкции, документация, видеоуроки және база знаний",
      text: "Пайдаланушыларға арналған onboarding, операторларға арналған регламенттер және әкімшілерге арналған техникалық құжаттама.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["Инструкции", "Құжат жүктеу, сұраныс жіберу, профиль және хабарламалар."],
        ["Документация", "API, role matrix, import/export, backup policy."],
        ["Видеоуроки", "Dashboard, Documents, Requests және Analytics бойынша қысқа сабақтар."],
        ["База знаний", "Қателерді шешу, best practices және FAQ категориялары."]
      ]
    },
    privacy: {
      kicker: "Политика конфиденциальности",
      title: "Деректерді қорғау және құпиялылық қағидалары",
      text: "Портал жеке деректерді, ұйымдық құжаттарды және архивтік материалдарды қауіпсіз өңдеу қағидаларын сипаттайды.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["Деректерді жинау", "Тек қызмет көрсетуге қажетті профиль, өтінім және audit деректері өңделеді."],
        ["Сақтау", "Құжаттар шифрланған сақтау контурында және резервтік көшірмелерде сақталады."],
        ["Қолжетімділік", "Құқықтар рөлдік модель және ұйымдық саясат арқылы беріледі."],
        ["Аудит", "Дерекке қол жеткізу және өзгерту оқиғалары журналда тіркеледі."]
      ]
    },
    terms: {
      kicker: "Пользовательское соглашение",
      title: "Порталды пайдалану шарттары",
      text: "Бұл бөлім пайдаланушы құқықтары, міндеттері, қызмет шектеулері және электрондық қызметтерді пайдалану ережелерін түсіндіреді.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",
      cards: [
        ["Аккаунт", "Пайдаланушы өз логині, паролі және MFA құрылғысы үшін жауап береді."],
        ["Қызметтер", "Сұраныстар регламент, тариф және ұйым саясаты бойынша өңделеді."],
        ["Экспорт", "PDF/Excel материалдарын қолдану қолданыстағы заңнамаға сай орындалады."],
        ["Шектеулер", "Рұқсатсыз тарату, автоматты scraping және құқықтарды айналып өтуге тыйым салынады."]
      ]
    },
    sitemap: {
      kicker: "Карта сайта",
      title: "Порталдың барлық бөлімдері",
      text: "Публичная часть, авторизация, личный кабинет, админ-панель және кәсіби модульдерге жылдам өту.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
      cards: []
    }
  };

  const workspacePages = {
    dashboard: ["Dashboard", "KPI, графиктер, соңғы құжаттар, әрекеттер, сұраныстар және аймақтық статистика."],
    documents: ["Документы", "Импорт, OCR, AI-поиск, метадеректер, нұсқалар және экспорт."],
    requests: ["Архивные запросы", "Өтінімдер, SLA, мәртебелер, орындаушылар және автоматты анықтамалар."],
    analytics: ["Аналитика", "Кәсіби диаграммалар, аймақтар, сұраныс динамикасы және қауіпсіздік KPI."],
    "branches-map": ["Карта филиалов", "Қазақстан бойынша архив бөлімшелері, жүктеме және құжат саны."],
    notifications: ["Уведомления", "Email, Push, жүйелік хабарламалар және шаблондар."],
    activity: ["История действий", "Пайдаланушы әрекеттері, аудит оқиғалары және қауіпсіздік белгілері."],
    reports: ["Отчеты", "PDF/Excel экспорт, жоспарланған есептер және генерация кезегі."],
    profile: ["Профиль", "Жеке деректер, ұйым, ЭЦП, тіл және қауіпсіздік параметрлері."],
    settings: ["Настройки", "Тема, тіл, интеграциялар, кэширование, логирование және жүйелік параметрлер."],
    users: ["Управление пользователями", "Қолданушылар, сегменттер, MFA және белсенділік."],
    roles: ["Управление ролями", "Рөлдік модель, құқықтар матрицасы және approval саясаттары."],
    "audit-logs": ["Журнал аудита", "Қауіпсіздік оқиғалары, экспорттар, логиндер және өзгерістер."],
    admin: ["Панель администратора", "15 басқару модулі, мониторинг, backup, тарифтер және қауіпсіздік орталығы."],
    "support-center": ["Support Center", "Операторлар, SLA, tickets және пайдаланушыға көмек."],
    "knowledge-base": ["Knowledge Base", "Мақалалар, категориялар, бейнесабақтар және internal playbook."],
    "api-documentation": ["API Documentation", "REST API, webhooks, authentication және интеграция үлгілері."],
    backups: ["Backups", "Резервное копирование, restore drills, RPO/RTO және snapshot саясаты."],
    "security-center": ["Security Center", "MFA, аудит безопасности, аномалиялар және compliance dashboard."]
  };

  const basename = location.pathname.split("/").pop();
  const app = document.getElementById("app");
  const page = app?.dataset.page || pageNames[basename] || "home";

  function logo() {
    return `
      <a class="brand" href="index.html" aria-label="Archive Access System">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M5 9.8C5 7.7 6.7 6 8.8 6h4.7l2 2.6h7.7c2.1 0 3.8 1.7 3.8 3.8v10.8c0 2.1-1.7 3.8-3.8 3.8H8.8A3.8 3.8 0 0 1 5 23.2V9.8Z" fill="url(#g)"/>
            <path d="M9 15h14M9 19h10" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
            <defs><linearGradient id="g" x1="5" x2="27" y1="6" y2="27" gradientUnits="userSpaceOnUse"><stop stop-color="#5F7DF5"/><stop offset="1" stop-color="#7357DF"/></linearGradient></defs>
          </svg>
        </span>
        <span>Archive<span style="color:var(--primary-2)">Access</span><small>Digital Archive Portal</small></span>
      </a>`;
  }

  function header() {
    return `
      <header class="topbar">
        <div class="nav-wrap">
          ${logo()}
          <nav class="main-nav" id="mainNav" aria-label="Main navigation">
            ${publicLinks.map(([href, label]) => `<a class="nav-link" href="${href}">${label}</a>`).join("")}
            <div class="nav-item">
              <button class="nav-link" type="button">Портал ▾</button>
              <div class="mega">
                <div class="mega-highlight">
                  <h3>eGov деңгейіндегі архив сервисі</h3>
                  <p>Публичная часть, личный кабинет, админ-панель, AI/OCR, ЭЦП, есептер және қауіпсіздік модульдері.</p>
                </div>
                <div class="mega-grid">
                  ${publicMega.map(([href, title, text]) => `<a class="mega-card" href="${href}"><strong>${title}</strong><span>${text}</span></a>`).join("")}
                </div>
              </div>
            </div>
          </nav>
          <div class="nav-actions">
            <button class="icon-button" id="themeToggle" type="button" aria-label="Toggle theme">◐</button>
            <a class="btn ghost" href="login.html">Кіру</a>
            <a class="btn" href="register.html">Тіркелу</a>
            <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open menu">☰</button>
          </div>
        </div>
      </header>`;
  }

  function footer() {
    const columns = [
      ["Портал", [["index.html", "Басты бет"], ["about-system.html", "О системе"], ["archive.html", "Архив туралы"], ["services.html", "Қызметтер"]]],
      ["Сервисы", [["pricing.html", "Тарифтер"], ["faq.html", "FAQ"], ["help.html", "Справочный центр"], ["contacts.html", "Байланыс"]]],
      ["Кабинет", [["dashboard.html", "Dashboard"], ["documents.html", "Documents"], ["requests.html", "Requests"], ["analytics.html", "Analytics"]]],
      ["Құжаттар", [["privacy.html", "Политика"], ["terms.html", "Соглашение"], ["sitemap.html", "Карта сайта"], ["api-documentation.html", "API"]]]
    ];
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div>
            ${logo()}
            <p style="margin-top:18px">Электрондық мұрағат басқару жүйесі: құжаттар, сұраныстар, аналитика және қауіпсіздік бір премиум-порталда.</p>
          </div>
          <div class="footer-grid">
            ${columns.map(([title, links]) => `<div><h4>${title}</h4>${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div>`).join("")}
          </div>
        </div>
      </footer>`;
  }

  function loading() {
    return `<div class="loading-screen" id="loadingScreen"><div class="loader" aria-label="Loading"></div></div>`;
  }

  function hero() {
    return `
      <section class="hero">
        <div class="hero-inner">
          <div class="reveal">
            <span class="eyebrow">Premium SaaS • eGov style • AI/OCR ready</span>
            <h1>Электрондық мұрағат басқару жүйесі</h1>
            <p>Құжаттарды сақтау, іздеу және архивтік сұраныстарды автоматтандыруға арналған заманауи цифрлық платформа.</p>
            <div class="hero-actions">
              <a class="btn" href="dashboard.html">Жүйені бастау</a>
              <a class="btn secondary" href="#demo">Демо көру</a>
              <a class="btn secondary" href="requests.html">Подать запрос</a>
              <a class="btn secondary" href="contacts.html">Связаться с нами</a>
            </div>
            <div class="hero-stats">
              ${statItem("250000", "құжат", "Қордағы цифрланған материалдар")}
              ${statItem("18400", "пайдаланушы", "Азаматтар және ұйымдар")}
              ${statItem("10000", "өтінім", "Өңделген архивтік сұраныстар")}
              ${statItem("50", "қор", "Архивтік фондтар мен бөлімшелер")}
            </div>
          </div>
          <div class="hero-visual reveal">
            <div class="visual-card visual-main">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85" alt="Analytics dashboard on archive platform">
              <div class="dashboard-overlay">
                <div class="dash-top"><strong>Archive Command Center</strong><span class="pill">99.9% secure</span></div>
                <div class="dash-grid">
                  <div class="dash-widget"><span>KPI</span><div class="chart-bars"><i style="height:42%"></i><i style="height:70%"></i><i style="height:54%"></i><i style="height:88%"></i><i style="height:62%"></i></div></div>
                  <div class="dash-widget"><span>AI Search</span><div class="mini-list"><i style="width:88%"></i><i style="width:66%"></i><i style="width:78%"></i><i style="width:52%"></i></div></div>
                  <div class="dash-widget"><span>Requests</span><div class="chart-bars"><i style="height:78%"></i><i style="height:45%"></i><i style="height:82%"></i><i style="height:66%"></i></div></div>
                  <div class="dash-widget"><span>Regions</span><div class="mini-list"><i style="width:72%"></i><i style="width:91%"></i><i style="width:58%"></i></div></div>
                </div>
              </div>
            </div>
            <div class="visual-card visual-chip visual-docs">
              <img src="https://images.unsplash.com/photo-1532153955177-f59af40d6472?auto=format&fit=crop&w=500&q=80" alt="Archive folders">
              <div><strong>Digital folders</strong><span>OCR + metadata + lifecycle</span></div>
            </div>
            <div class="visual-card visual-chip visual-cloud">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80" alt="Server cloud infrastructure">
              <div><strong>Secure cloud</strong><span>Backup, cache, audit</span></div>
            </div>
            <div class="visual-card visual-server"><strong>API gateway</strong><div class="server-lights"><span></span><span></span><span></span><span></span></div></div>
          </div>
        </div>
      </section>`;
  }

  function statItem(value, suffix, label) {
    return `<div class="hero-stat"><strong><span data-counter="${value}">0</span>+ ${suffix}</strong><span>${label}</span></div>`;
  }

  function aboutArchiveSection() {
    return `
      <section class="section split">
        <div class="reveal">
          <span class="section-kicker">Архив туралы</span>
          <h2>Фотосуреттері бар нақты архивтік контекст</h2>
          <p style="color:var(--muted);line-height:1.75;font-size:17px">Archive Access System қағаз қорларды, цифрлық құжаттарды және азаматтық сұраныстарды бір кәсіби платформаға жинайды. Интерфейс үлкен арақашықтықпен, айқын иерархиямен және premium glassmorphism стилімен жасалған.</p>
          <div class="grid cols-2" style="margin-top:24px">
            ${[
              ["Қауіпсіз сақтау", "Шифрланған қойма және резервтік көшірмелер.", "🔐"],
              ["Жылдам іздеу", "OCR, толықмәтінді индекс және AI сұрақтары.", "⚡"],
              ["Сандық архив", "Қорлар, опистер, метадеректер және lifecycle.", "🏛️"],
              ["Онлайн сұраныстар", "Өтінімдер, SLA және автоматты анықтамалар.", "🧾"]
            ].map(([t, d, i]) => `<div class="card pad"><div class="card-icon">${i}</div><h3>${t}</h3><p>${d}</p></div>`).join("")}
          </div>
        </div>
        <div class="photo-stack reveal">
          <img class="large-photo" src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1000&q=85" alt="Modern archive reading room">
          <img class="floating-photo" src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=85" alt="Archive shelves with documents">
        </div>
      </section>`;
  }

  function capabilitiesSection() {
    return `
      <section class="section">
        <div class="section-head reveal">
          <div><span class="section-kicker">Возможности</span><h2>Кәсіби модульдер бір платформада</h2><p>Full-text search, AI-поиск документов, OCR, генерация справок, PDF/Excel экспорт, импорт, ЭЦП, API, логирование, кэширование және қауіпсіздік аудиті.</p></div>
          <a class="btn secondary" href="services.html">Барлық қызметтер</a>
        </div>
        <div class="grid cols-4">
          ${capabilityCards.map(([title, text, image, icon]) => `
            <article class="card image-card reveal">
              <img src="${image}" alt="${title}">
              <div class="card-body"><div class="card-icon">${icon}</div><h3>${title}</h3><p>${text}</p><a class="link-more" href="services.html">Толығырақ →</a></div>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function demoSection() {
    const tabs = ["Dashboard", "Documents", "Requests", "Analytics"];
    return `
      <section class="section" id="demo">
        <div class="section-head reveal">
          <div><span class="section-kicker">Interactive demo</span><h2>Өнім интерфейсінің тірі көрінісі</h2><p>Dashboard, Documents, Requests және Analytics экрандары Microsoft Azure Portal және Stripe Dashboard стилінде көрсетіледі.</p></div>
        </div>
        <div class="demo-shell card reveal">
          <div class="demo-tabs">${tabs.map((t, i) => `<button class="demo-tab ${i === 0 ? "active" : ""}" data-demo="${t}" type="button"><strong>${t}</strong><br><span>${demoDescription(t)}</span></button>`).join("")}</div>
          <div class="product-screen" id="productScreen">${screenMarkup("Dashboard")}</div>
        </div>
      </section>`;
  }

  function demoDescription(t) {
    return {
      Dashboard: "KPI және графиктер",
      Documents: "Құжаттар және OCR",
      Requests: "Өтінім workflow",
      Analytics: "Аймақтық талдау"
    }[t];
  }

  function screenMarkup(name) {
    const photo = {
      Dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      Documents: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
      Requests: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
      Analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
    }[name];
    return `
      <div class="screen-toolbar"><div class="screen-dots"><i></i><i></i><i></i></div><span class="pill">${name}</span></div>
      <div class="screen-content">
        <div class="screen-panel">
          <h3 style="margin:0 0 10px">${name} workspace</h3>
          <p style="color:rgba(255,255,255,.72);line-height:1.6;margin:0">Live metrics, document flows, automated processing and secure collaboration for archival teams.</p>
          <img class="screen-photo" src="${photo}" alt="${name} interface image">
        </div>
        <div class="screen-panel">
          <div class="chart-bars" style="height:180px"><i style="height:70%"></i><i style="height:48%"></i><i style="height:88%"></i><i style="height:62%"></i><i style="height:78%"></i></div>
          <div class="mini-list"><i style="width:90%"></i><i style="width:72%"></i><i style="width:82%"></i><i style="width:58%"></i></div>
        </div>
      </div>`;
  }

  function statsSection() {
    return `
      <section class="section compact">
        <div class="stat-band reveal">
          ${[
            ["250000", "құжат"],
            ["10000", "сұраныс"],
            ["50", "архив бөлімшесі"],
            ["99.9", "% қауіпсіздік"]
          ].map(([v, l]) => `<div class="stat-card"><strong><span data-counter="${v}">0</span>+</strong><span>${l}</span></div>`).join("")}
        </div>
      </section>`;
  }

  function mapSection() {
    const cities = [
      ["Астана", "62 000 құжат • 2 400 пайдаланушы", "55%", "31%"],
      ["Алматы", "88 500 құжат • 3 100 пайдаланушы", "45%", "61%"],
      ["Шымкент", "34 200 құжат • 1 350 пайдаланушы", "62%", "72%"],
      ["Қарағанды", "41 000 құжат • 1 720 пайдаланушы", "47%", "43%"],
      ["Ақтөбе", "24 700 құжат • 980 пайдаланушы", "30%", "48%"]
    ];
    return `
      <section class="section">
        <div class="section-head reveal">
          <div><span class="section-kicker">Карта архивов</span><h2>Қазақстан бойынша интерактивті филиалдар картасы</h2><p>Қалаға апарғанда құжат және пайдаланушы саны көрінеді. Карта визуалды түрде ақпаратты түсіндіреді, бос рамка емес.</p></div>
        </div>
        <div class="map-card reveal">
          <div class="kazakhstan-map" aria-label="Kazakhstan archive map">
            <svg viewBox="0 0 800 470" role="img" aria-label="Kazakhstan shape">
              <path d="M59 236 120 175l78 22 52-78 92 42 68-50 87 34 80-36 44 52 91 34 35 80-56 73-104-14-58 62-88-30-112 44-91-49-92 34-70-52-97 5-35-65Z" fill="rgba(255,255,255,.70)" stroke="rgba(95,125,245,.46)" stroke-width="4"/>
            </svg>
            ${cities.map(([city, info, left, top]) => `<span class="pin" style="left:${left};top:${top}" data-city="${city}: ${info}"></span>`).join("")}
          </div>
          <div class="map-list">${cities.map(([city, info]) => `<div class="map-row"><strong>${city}</strong><span>${info}</span></div>`).join("")}</div>
        </div>
      </section>`;
  }

  function pricingSection() {
    return `
      <section class="section">
        <div class="section-head reveal">
          <div><span class="section-kicker">Тарифы</span><h2>Заманауи SaaS стиліндегі тарифтік карточкалар</h2><p>Әр жоспар нақты сценарийге арналған: азаматтардан бастап мемлекеттік ұйымдарға дейін.</p></div>
        </div>
        <div class="grid cols-4">
          ${pricingPlans.map(([name, price, desc, features, featured]) => `
            <article class="card pricing-card ${featured ? "featured" : ""} reveal">
              <h3>${name}</h3><p>${desc}</p><div class="price">${price}<span>${price === "келісім" ? "" : " / ай"}</span></div>
              <ul>${features.map((f) => `<li>${f}</li>`).join("")}</ul>
              <div style="margin-top:auto;padding-top:24px"><a class="btn ${featured ? "secondary" : ""}" href="register.html">Бастау</a></div>
            </article>`).join("")}
        </div>
        <div class="table-wrap reveal" style="margin-top:28px">
          <table class="comparison">
            <thead><tr><th>Мүмкіндік</th><th>Базалық</th><th>Стандарт</th><th>Кәсіптік</th><th>Мемлекеттік</th></tr></thead>
            <tbody>
              ${[
                ["Full-text search", "✓", "✓", "✓", "✓"],
                ["OCR", "—", "✓", "✓", "✓"],
                ["AI-поиск документов", "—", "—", "✓", "✓"],
                ["ЭЦП және API", "—", "—", "✓", "✓"],
                ["Dedicated security audit", "—", "—", "—", "✓"]
              ].map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>`;
  }

  function testimonialsSection() {
    const reviews = [
      ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80", "Айдана С.", "Архив бөлімінің басшысы", "Портал арқылы сұраныс өңдеу уақыты қысқарды, операторлар Dashboard арқылы нақты жүктемені көреді."],
      ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", "Ерлан М.", "IT әкімші", "MFA, audit logs және backup модульдері жүйені өндірістік контурға дайын деңгейге жеткізеді."],
      ["https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80", "Мария К.", "Құжат айналымы маманы", "OCR және full-text search ескі скандармен жұмыс істеуді өте ыңғайлы етті."]
    ];
    return `
      <section class="section">
        <div class="section-head reveal"><div><span class="section-kicker">Отзывы</span><h2>Пайдаланушылар пікірлері</h2><p>Слайдер форматындағы нақты рөлдер: архив, IT, құжат айналымы.</p></div></div>
        <div class="testimonial-track reveal">
          ${reviews.map(([img, name, role, text]) => `<article class="card pad testimonial"><div class="avatar-row"><img src="${img}" alt="${name}"><div><strong>${name}</strong><br><span style="color:var(--muted)">${role}</span></div></div><p>${text}</p></article>`).join("")}
        </div>
      </section>`;
  }

  function faqSection() {
    return `
      <section class="section">
        <div class="section-head reveal"><div><span class="section-kicker">FAQ</span><h2>Жиі қойылатын сұрақтар</h2><p>Іздеу, категориялар және ашылатын жауаптар.</p></div></div>
        <input class="faq-search reveal" id="faqSearch" type="search" placeholder="Сұрақ бойынша іздеу...">
        <div class="grid" id="faqList">${faqItems.map(([q, a], i) => `<div class="faq-item reveal" data-faq="${q.toLowerCase()} ${a.toLowerCase()}"><button class="faq-question" type="button">${q}<span>${i === 0 ? "−" : "+"}</span></button><div class="faq-answer">${a}</div></div>`).join("")}</div>
      </section>`;
  }

  function contactsSection() {
    return `
      <section class="section">
        <div class="section-head reveal"><div><span class="section-kicker">Контакты</span><h2>Карта, форма және байланыс деректері</h2><p>Астана, Мәңгілік Ел даңғылы, 8 • +7 (7172) 00-00-00 • archive@gov.kz • Дс-Жм 09:00-18:00</p></div></div>
        <div class="contact-panel">
          <div class="card pad reveal">
            <h3>Кері байланыс формасы</h3>
            <form class="form-grid">
              <div class="field"><label>Аты-жөні</label><input placeholder="Сіздің атыңыз"></div>
              <div class="field"><label>Email</label><input type="email" placeholder="name@example.com"></div>
              <div class="field"><label>Тақырып</label><select><option>Архивтік сұраныс</option><option>Техникалық қолдау</option><option>Тарифтер</option></select></div>
              <div class="field"><label>Хабарлама</label><textarea placeholder="Қысқаша сипаттама"></textarea></div>
              <button class="btn" type="button">Жіберу</button>
            </form>
          </div>
          <div class="office-map card reveal" aria-label="Office map image"></div>
        </div>
      </section>`;
  }

  function homePage() {
    return `${header()}<main class="page-main">${hero()}${aboutArchiveSection()}${capabilitiesSection()}${demoSection()}${statsSection()}${mapSection()}${pricingSection()}${testimonialsSection()}${faqSection()}${contactsSection()}</main>${footer()}${loading()}`;
  }

  function publicPage(key) {
    const data = publicPages[key] || publicPages["about-system"];
    const cards = data.cards.length ? `
      <section class="section compact"><div class="grid cols-4">${data.cards.map(([t, d]) => `<article class="card pad reveal"><div class="card-icon">✦</div><h3>${t}</h3><p>${d}</p></article>`).join("")}</div></section>` : "";
    const special = key === "pricing" ? pricingSection() :
      key === "faq" ? faqSection() :
      key === "contacts" ? contactsSection() :
      key === "sitemap" ? sitemapSection() : "";
    const extra = key === "archive" ? mapSection() : key === "services" ? capabilitiesSection() : key === "help" ? helpBlocks() : "";
    return `
      ${header()}
      <main class="page-main">
        <section class="page-hero">
          <div class="page-title reveal">
            <div><span class="section-kicker">${data.kicker}</span><h1>${data.title}</h1><p>${data.text}</p><div class="section-actions"><a class="btn" href="register.html">Тіркелу</a><a class="btn secondary" href="contacts.html">Связаться</a></div></div>
            <img src="${data.image}" alt="${data.title}">
          </div>
        </section>
        ${cards}
        ${special}
        ${extra}
      </main>
      ${footer()}${loading()}`;
  }

  function helpBlocks() {
    return `
      <section class="section">
        <div class="grid cols-3">
          ${["Видео: Dashboard", "Инструкция: OCR импорт", "Документация: API", "Playbook: Security", "FAQ категориялары", "Support SLA"].map((t) => `<article class="card pad reveal"><div class="card-icon">▶</div><h3>${t}</h3><p>Қадамдық нұсқаулық, скриншоттар және пайдалануға дайын үлгілер.</p><a class="link-more" href="knowledge-base.html">Ашу →</a></article>`).join("")}
        </div>
      </section>`;
  }

  function sitemapSection() {
    const groups = [
      ["Публичная часть", publicMega.concat(publicLinks)],
      ["Авторизация", [["login.html", "Вход"], ["register.html", "Регистрация"], ["forgot-password.html", "Восстановление пароля"], ["two-factor.html", "2FA"], ["email-confirmation.html", "Email confirmation"]]],
      ["Личный кабинет", workspaceLinks],
      ["Админ-панель", adminModules.map(([href, title]) => [href, title])]
    ];
    return `<section class="section compact"><div class="grid cols-4">${groups.map(([title, links]) => `<article class="card pad reveal"><h3>${title}</h3>${links.map(([href, label]) => `<a class="link-more" href="${href}">${label} →</a>`).join("")}</article>`).join("")}</div></section>`;
  }

  function authPage(kind) {
    const content = {
      login: ["Қош келдіңіз", "Жүйеге кіру", "Email немесе ID", "Құпия сөз", "Кіру", "register.html", "Аккаунт ашу"],
      register: ["Тіркелу", "Жаңа ұйым немесе пайдаланушы профилін құру", "Жұмыс email", "Құпия сөз", "Тіркелу", "login.html", "Кіру"],
      "forgot-password": ["Құпия сөзді қалпына келтіру", "Email арқылы қауіпсіз сілтеме алыңыз", "Email", "Жаңа құпия сөз", "Сілтеме жіберу", "login.html", "Кіру"],
      "two-factor": ["Екі факторлы аутентификация", "Authenticator немесе SMS кодын енгізіңіз", "6 таңбалы код", "Құрылғы атауы", "Растау", "login.html", "Қайту"],
      "email-confirmation": ["Email растау", "Поштаңызға жіберілген кодты енгізіңіз", "Email коды", "Email", "Растау", "dashboard.html", "Dashboard"]
    }[kind];
    return `
      <main class="auth-page">
        <section class="auth-visual">
          ${logo()}
          <div><span class="eyebrow">Secure identity • MFA • remember me</span><h1>${content[0]}</h1><p>${content[1]}. Интерфейс екі факторлы аутентификация, remember me және email confirmation сценарийлеріне дайын.</p></div>
          <p>Archive Access System © 2026</p>
        </section>
        <section class="auth-card">
          <div class="card reveal">
            <h2 style="margin:0 0 10px;font-size:34px;letter-spacing:-.05em">${content[0]}</h2>
            <p style="color:var(--muted);line-height:1.6">${content[1]}</p>
            <form class="form-grid" style="margin-top:22px">
              <div class="field"><label>${content[2]}</label><input placeholder="${content[2]}"></div>
              <div class="field"><label>${content[3]}</label><input type="${kind === "login" || kind === "register" ? "password" : "text"}" placeholder="${content[3]}"></div>
              <div class="remember-row"><label><input type="checkbox"> Remember me</label><a href="forgot-password.html">Парольді ұмыттыңыз ба?</a></div>
              <button class="btn" type="button">${content[4]}</button>
              <a class="btn secondary" href="${content[5]}">${content[6]}</a>
            </form>
          </div>
        </section>
      </main>${loading()}`;
  }

  function workspacePage(key) {
    const meta = workspacePages[key] || workspacePages.dashboard;
    return `
      ${header()}
      <main class="app-workspace">
        <nav class="workspace-nav">${workspaceLinks.map(([href, label]) => `<a class="${pageNames[href] === key ? "active" : ""}" href="${href}">${label}</a>`).join("")}<a class="${key === "admin" ? "active" : ""}" href="admin.html">Admin</a></nav>
        <section class="section compact">
          <div class="section-head reveal"><div><span class="section-kicker">Business system</span><h2>${meta[0]}</h2><p>${meta[1]}</p></div><div class="section-actions"><a class="btn" href="requests.html">Подать запрос</a><a class="btn secondary" href="reports.html">Экспорт</a></div></div>
          ${key === "admin" ? adminPanel() : key === "branches-map" ? mapSection() : workspaceContent(key)}
        </section>
      </main>${footer()}${loading()}`;
  }

  function workspaceContent(key) {
    return `
      <div class="kpi-grid reveal">
        ${[
          ["Документы", "250K", "+12.4%"],
          ["Сұраныстар", "10.4K", "SLA 96%"],
          ["Пайдаланушылар", "18.4K", "MFA 82%"],
          ["Филиалдар", "50+", "99.9%"]
        ].map(([l, v, s]) => `<div class="kpi"><span>${l}</span><strong>${v}</strong><em style="color:var(--success);font-style:normal">${s}</em></div>`).join("")}
      </div>
      <div class="grid cols-2" style="margin-top:18px">
        <article class="card pad chart-card reveal"><h3>${key === "analytics" ? "Аймақтық аналитика" : "Өңдеу динамикасы"}</h3>${lineChart()}</article>
        <article class="card pad chart-card reveal"><h3>Құжат санаттары</h3><div class="bar-chart-ui"><span style="height:72%"></span><span style="height:42%"></span><span style="height:88%"></span><span style="height:58%"></span><span style="height:76%"></span><span style="height:64%"></span></div></article>
      </div>
      <div class="grid cols-2" style="margin-top:18px">
        <article class="card pad reveal"><h3>${tableTitle(key)}</h3><div class="table-wrap">${dataTable(key)}</div></article>
        <article class="card pad reveal"><h3>Соңғы әрекеттер</h3>${timeline()}</article>
      </div>`;
  }

  function tableTitle(key) {
    return ({
      documents: "Соңғы құжаттар",
      requests: "Соңғы сұраныстар",
      users: "Пайдаланушылар",
      roles: "Рөлдер",
      "audit-logs": "Audit events",
      reports: "Есептер",
      notifications: "Хабарламалар"
    })[key] || "Операциялық кесте";
  }

  function dataTable(key) {
    const rows = key === "users" ? [
      ["A. Sapar", "Archivist", "MFA active", "Белсенді"],
      ["E. Malik", "Admin", "High privilege", "Тексерілді"],
      ["M. Kim", "Analyst", "API access", "Белсенді"]
    ] : key === "roles" ? [
      ["Archive Admin", "128 permissions", "Approval required", "Active"],
      ["Operator", "42 permissions", "SLA queue", "Active"],
      ["Citizen", "12 permissions", "Self-service", "Active"]
    ] : [
      ["DOC-2026-0418", "Жеке құрам бойынша анықтама", "OCR дайын", "Белсенді"],
      ["REQ-8841", "Туу туралы архивтік сұраныс", "SLA 2 сағат", "Өңделуде"],
      ["REP-19", "Аймақтық құжат айналымы", "PDF/Excel", "Дайын"]
    ];
    return `<table class="data-table"><thead><tr><th>ID / Name</th><th>Сипаттама</th><th>Мәртебе</th><th>State</th></tr></thead><tbody>${rows.map((r, i) => `<tr>${r.map((c, idx) => `<td>${idx === 3 ? `<span class="status ${i === 1 ? "warn" : ""}">${c}</span>` : c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function timeline() {
    return `<div class="timeline">${[
      ["AI-поиск запросын өңдеді", "2 минут бұрын"],
      ["Құжат OCR арқылы танылды", "14 минут бұрын"],
      ["PDF анықтама ЭЦП арқылы бекітілді", "38 минут бұрын"],
      ["Backup snapshot аяқталды", "1 сағат бұрын"]
    ].map(([t, d]) => `<div class="timeline-item"><span class="timeline-dot"></span><div><strong>${t}</strong><br><span style="color:var(--muted)">${d}</span></div></div>`).join("")}</div>`;
  }

  function lineChart() {
    return `<svg class="line-chart" viewBox="0 0 520 240" role="img" aria-label="Line chart">
      <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#7357df" stop-opacity=".34"/><stop offset="1" stop-color="#59d8ff" stop-opacity="0"/></linearGradient></defs>
      <path d="M20 190 C80 150 100 170 150 120 S230 80 280 112 350 172 410 88 470 70 500 44" fill="none" stroke="#7357df" stroke-width="6" stroke-linecap="round"/>
      <path d="M20 190 C80 150 100 170 150 120 S230 80 280 112 350 172 410 88 470 70 500 44 L500 220 L20 220Z" fill="url(#area)"/>
      <g stroke="rgba(110,120,160,.2)">${[60,110,160,210].map((y) => `<line x1="20" y1="${y}" x2="500" y2="${y}"/>`).join("")}</g>
    </svg>`;
  }

  function adminPanel() {
    return `
      <div class="module-list">
        ${adminModules.map(([href, title, text, icon]) => `<a class="card pad reveal" href="${href}"><div class="card-icon">${icon}</div><h3>${title}</h3><p>${text}</p><span class="link-more">Ашу →</span></a>`).join("")}
      </div>
      <div class="grid cols-2" style="margin-top:18px">
        <article class="card pad reveal"><h3>System monitoring</h3>${lineChart()}</article>
        <article class="card pad reveal"><h3>Security audit</h3>${timeline()}</article>
      </div>`;
  }

  function boot() {
    const authPages = ["login", "register", "forgot-password", "two-factor", "email-confirmation"];
    const workspaceKeys = Object.keys(workspacePages);
    if (page === "home") app.innerHTML = homePage();
    else if (authPages.includes(page)) app.innerHTML = authPage(page);
    else if (workspaceKeys.includes(page)) app.innerHTML = workspacePage(page);
    else app.innerHTML = publicPage(page);
    initInteractions();
  }

  function initInteractions() {
    const savedTheme = localStorage.getItem("archive-theme");
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;

    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("archive-theme", next);
    });

    document.getElementById("menuToggle")?.addEventListener("click", () => {
      document.getElementById("mainNav")?.classList.toggle("open");
    });

    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointermove", (event) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty("--x", `${event.clientX - rect.left}px`);
        btn.style.setProperty("--y", `${event.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll(".demo-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".demo-tab").forEach((el) => el.classList.remove("active"));
        tab.classList.add("active");
        const screen = document.getElementById("productScreen");
        if (screen) screen.innerHTML = screenMarkup(tab.dataset.demo);
      });
    });

    document.querySelectorAll(".faq-question").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        item?.classList.toggle("open");
        button.querySelector("span").textContent = item?.classList.contains("open") ? "−" : "+";
      });
    });
    document.querySelector(".faq-item")?.classList.add("open");

    document.getElementById("faqSearch")?.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase();
      document.querySelectorAll("[data-faq]").forEach((item) => {
        item.style.display = item.dataset.faq.includes(query) ? "" : "none";
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.13 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll("[data-counter]").forEach((el) => counterObserver.observe(el));

    setTimeout(() => document.getElementById("loadingScreen")?.classList.add("hide"), 320);
  }

  function animateCounter(el) {
    const target = Number(el.dataset.counter);
    const isDecimal = el.dataset.counter.includes(".");
    const duration = 1300;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString("ru-RU");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  boot();
})();
