const languageButtons = document.querySelectorAll(".language-switcher__item");
const themeToggle = document.querySelector(".theme-toggle");
const requestDialog = document.querySelector("#request-dialog");
const openRequestButtons = document.querySelectorAll("[data-open-request]");
const closeRequestButton = document.querySelector("[data-close-request]");
const requestForm = document.querySelector("#request-form");
const formMessage = document.querySelector("#form-message");
const translatedNodes = document.querySelectorAll("[data-i18n]");

const translations = {
    kk: {
        title: "Archive Access System",
        subtitle: "Мұрағаттық құжаттарды басқарудың ақылды платформасы",
        description: "Қауіпсіз мұрағаттандыру, электрондық құжаттарды сақтау, сұрауларды өңдеу және нәтижелерді жылдам жеткізу жүйесі.",
        primaryAction: "Жүйеге кіру",
        secondaryAction: "Таныстыру",
        securityTitle: "Қауіпсіздік",
        securityText: "JWT, 2FA, рөлдік қолжетімділік",
        docsTitle: "Құжаттар",
        docsText: "PDF, DOCX, XLSX сақтау",
        analyticsTitle: "Аналитика",
        analyticsText: "Real-time дашбордтар",
        autoTitle: "Автоматтандыру",
        autoText: "Сұрауларды өңдеу",
        langTitle: "Көптілдік",
        langText: "KZ / RU / EN",
        auditTitle: "Аудит",
        auditText: "Іс-әрекеттер журналы",
        requestKicker: "Сұрауды өңдеу",
        requestTitle: "Архивтік ақпаратқа өтінім",
        requestText: "Жүйе пайдаланушы рөлін, құжат түрін және қолжетімділік деңгейін тексеріп, нәтижені қауіпсіз түрде дайындайды.",
        topicLabel: "Сұрау тақырыбы",
        roleLabel: "Пайдаланушы рөлі",
        submitAction: "Өңдеу",
        themeDark: "Түн",
        themeLight: "Күн",
        formMessage: "Сұрау қабылданды. Қолжетімділік тексеріліп, нәтиже дайындалады.",
    },
    ru: {
        title: "Archive Access System",
        subtitle: "Интеллектуальная платформа управления архивными документами",
        description: "Система для безопасного хранения электронных документов, обработки запросов и быстрой выдачи результатов.",
        primaryAction: "Войти в систему",
        secondaryAction: "Презентация",
        securityTitle: "Безопасность",
        securityText: "JWT, 2FA, ролевой доступ",
        docsTitle: "Документы",
        docsText: "Хранение PDF, DOCX, XLSX",
        analyticsTitle: "Аналитика",
        analyticsText: "Real-time дашборды",
        autoTitle: "Автоматизация",
        autoText: "Обработка запросов",
        langTitle: "Мультиязычность",
        langText: "KZ / RU / EN",
        auditTitle: "Аудит",
        auditText: "Журнал действий",
        requestKicker: "Обработка запроса",
        requestTitle: "Заявка на архивную информацию",
        requestText: "Система проверяет роль пользователя, тип документа и уровень доступа, затем безопасно готовит результат.",
        topicLabel: "Тема запроса",
        roleLabel: "Роль пользователя",
        submitAction: "Обработать",
        themeDark: "Түн",
        themeLight: "Күн",
        formMessage: "Запрос принят. Доступ будет проверен, результат подготовлен.",
    },
    en: {
        title: "Archive Access System",
        subtitle: "Smart archive document management platform",
        description: "A secure platform for storing electronic documents, processing requests, and delivering archive results quickly.",
        primaryAction: "Sign in",
        secondaryAction: "Overview",
        securityTitle: "Security",
        securityText: "JWT, 2FA, role-based access",
        docsTitle: "Documents",
        docsText: "PDF, DOCX, XLSX storage",
        analyticsTitle: "Analytics",
        analyticsText: "Real-time dashboards",
        autoTitle: "Automation",
        autoText: "Request processing",
        langTitle: "Multilingual",
        langText: "KZ / RU / EN",
        auditTitle: "Audit",
        auditText: "Action logs",
        requestKicker: "Request processing",
        requestTitle: "Archive information request",
        requestText: "The system checks user role, document type, and access level, then prepares a secure result.",
        topicLabel: "Request topic",
        roleLabel: "User role",
        submitAction: "Process",
        themeDark: "Night",
        themeLight: "Day",
        formMessage: "Request accepted. Access will be checked and the result prepared.",
    },
};

let activeLanguage = "kk";

function applyLanguage(language) {
    activeLanguage = language;
    document.documentElement.lang = language;

    translatedNodes.forEach((node) => {
        const key = node.dataset.i18n;
        node.textContent = translations[language][key];
    });

    languageButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.lang === language);
    });

    updateThemeText();
}

function updateThemeText() {
    const isLight = document.body.classList.contains("light-theme");
    themeToggle.textContent = isLight
        ? translations[activeLanguage].themeLight
        : translations[activeLanguage].themeDark;
    themeToggle.setAttribute("aria-pressed", String(isLight));
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    updateThemeText();
});

openRequestButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (typeof requestDialog.showModal === "function") {
            requestDialog.showModal();
            return;
        }

        requestDialog.setAttribute("open", "");
    });
});

closeRequestButton.addEventListener("click", () => {
    requestDialog.close();
});

requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = translations[activeLanguage].formMessage;
    requestForm.reset();
});

applyLanguage(activeLanguage);
