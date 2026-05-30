const archiveItems = [
    {
        id: "F-124-88",
        title: "Личные дела работников машиностроительного завода",
        type: "social",
        typeLabel: "Социально-правовые",
        region: "Караганда",
        year: 1988,
        fund: "Фонд 124, опись 6",
        description: "Карточки учета сотрудников, приказы о приеме и увольнении, сведения о начислениях за 1986-1992 годы.",
        status: "Доступна справка"
    },
    {
        id: "G-42-1912",
        title: "Метрические книги Покровской церкви",
        type: "genealogy",
        typeLabel: "Генеалогия",
        region: "Алматы",
        year: 1912,
        fund: "Фонд 42, опись 1",
        description: "Записи о рождении, браке и переселении семей за дореволюционный период. Подходит для родословного поиска.",
        status: "Нужен запрос"
    },
    {
        id: "H-7-1936",
        title: "Фотохроника строительства железнодорожного узла",
        type: "history",
        typeLabel: "Исторические",
        region: "Астана",
        year: 1936,
        fund: "Фонд 7, опись 3",
        description: "Оцифрованные снимки, планы, служебная переписка и отчеты о строительстве транспортной инфраструктуры.",
        status: "Есть цифровая копия"
    },
    {
        id: "P-301-2001",
        title: "Регистрационные дела объектов недвижимости",
        type: "property",
        typeLabel: "Имущество",
        region: "Шымкент",
        year: 2001,
        fund: "Фонд 301, опись 14",
        description: "Материалы по приватизации, технические паспорта, решения комиссий и выписки по объектам недвижимости.",
        status: "Доступна выписка"
    },
    {
        id: "S-78-1974",
        title: "Документы учебных заведений и выпускные ведомости",
        type: "social",
        typeLabel: "Социально-правовые",
        region: "Алматы",
        year: 1974,
        fund: "Фонд 78, опись 9",
        description: "Ведомости студентов, приказы о зачислении и выпуске, подтверждение образования для официальных справок.",
        status: "Доступна справка"
    },
    {
        id: "H-19-1944",
        title: "Письма фронтовиков и эвакуационные списки",
        type: "history",
        typeLabel: "Исторические",
        region: "Астана",
        year: 1944,
        fund: "Фонд 19, опись 2",
        description: "Коллекция писем, карточек эвакуации, списков госпиталей и материалов военного времени.",
        status: "В читальном зале"
    }
];

const recommendations = {
    stazh: {
        title: "Архивная справка о стаже",
        text: "Подходит для подтверждения работы, зарплаты, учебы или службы. Обычно достаточно указать организацию, должность и период.",
        docs: ["Удостоверение личности", "Период работы или учебы", "Название организации", "Прежняя фамилия, если менялась"],
        cta: "Оформить справку"
    },
    copy: {
        title: "Заказ цифровой копии",
        text: "Выберите дело в каталоге или опишите документ. Копия может быть заверена и отправлена в личный кабинет.",
        docs: ["Номер фонда или описание дела", "Формат выдачи", "Контакты для ссылки", "Основание доступа при необходимости"],
        cta: "Заказать копию"
    },
    family: {
        title: "Генеалогический поиск",
        text: "Помогает найти метрические записи, сведения о переселении, браках и родственных линиях.",
        docs: ["ФИО родственников", "Примерные годы", "Населенный пункт", "Семейные факты и варианты написания фамилии"],
        cta: "Начать поиск"
    },
    property: {
        title: "Имущественный архивный запрос",
        text: "Используется для подтверждения приватизации, регистрации, решений комиссий и истории объекта.",
        docs: ["Адрес объекта", "Период владения", "Данные заявителя", "Известные номера решений или актов"],
        cta: "Подтвердить имущество"
    }
};

const state = {
    chip: "all",
    favorites: new Set(),
    selectedSlot: "09:30"
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    initCatalog();
    initRequestForm();
    initAssistant();
    initAppointment();
    initFaq();
    initModal();
});

function initTheme() {
    const savedTheme = localStorage.getItem("archivon-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    $(".theme-toggle")?.addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem("archivon-theme", document.body.classList.contains("light") ? "light" : "dark");
    });
}

function initNavigation() {
    const menuToggle = $(".menu-toggle");
    const navLinks = $("#mainMenu");

    menuToggle?.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks?.addEventListener("click", (event) => {
        if (event.target.matches("a")) {
            document.body.classList.remove("menu-open");
            menuToggle?.setAttribute("aria-expanded", "false");
        }
    });

    $$("[data-scroll]").forEach((button) => {
        button.addEventListener("click", () => {
            $(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
        });
    });

    $("#globalSearch")?.addEventListener("input", (event) => {
        const catalogSearch = $("#catalogSearch");
        if (!catalogSearch) return;
        catalogSearch.value = event.target.value;
        renderCatalog();
    });
}

function initCatalog() {
    $("#catalogSearch")?.addEventListener("input", renderCatalog);
    $("#typeFilter")?.addEventListener("change", (event) => {
        state.chip = event.target.value;
        syncChips();
        renderCatalog();
    });
    $("#regionFilter")?.addEventListener("change", renderCatalog);
    $("#yearFilter")?.addEventListener("change", renderCatalog);
    $("#resetFilters")?.addEventListener("click", () => {
        $("#catalogSearch").value = "";
        $("#typeFilter").value = "all";
        $("#regionFilter").value = "all";
        $("#yearFilter").value = "all";
        state.chip = "all";
        syncChips();
        renderCatalog();
    });

    $$(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            state.chip = chip.dataset.chip;
            $("#typeFilter").value = state.chip;
            syncChips();
            renderCatalog();
        });
    });

    renderCatalog();
}

function renderCatalog() {
    const list = $("#archiveResults");
    const count = $("#resultCount");
    if (!list || !count) return;

    const query = ($("#catalogSearch")?.value || $("#globalSearch")?.value || "").trim().toLowerCase();
    const selectedType = $("#typeFilter")?.value || "all";
    const selectedRegion = $("#regionFilter")?.value || "all";
    const selectedYear = $("#yearFilter")?.value || "all";
    const type = state.chip !== "all" ? state.chip : selectedType;

    const filtered = archiveItems.filter((item) => {
        const haystack = `${item.title} ${item.region} ${item.year} ${item.fund} ${item.description} ${item.typeLabel}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesType = type === "all" || item.type === type;
        const matchesRegion = selectedRegion === "all" || item.region === selectedRegion;
        const matchesYear = selectedYear === "all" || isYearInRange(item.year, selectedYear);
        return matchesQuery && matchesType && matchesRegion && matchesYear;
    });

    count.textContent = formatMaterialsCount(filtered.length);

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <h3>Материалы не найдены</h3>
                <p>Попробуйте изменить фильтры или расширить период поиска.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = filtered.map((item) => `
        <article class="archive-result-card">
            <div class="result-meta">
                <span>${item.typeLabel}</span>
                <span>${item.region}</span>
                <span>${item.year}</span>
                <span>${item.fund}</span>
            </div>
            <div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="card-actions">
                <span class="status-pill">${item.status}</span>
                <button class="btn btn-glass favorite-btn ${state.favorites.has(item.id) ? "active" : ""}" type="button" data-favorite="${item.id}">
                    ${state.favorites.has(item.id) ? "В избранном" : "В избранное"}
                </button>
                <button class="btn btn-primary" type="button" data-request="${item.id}">Оформить</button>
            </div>
        </article>
    `).join("");

    $$("[data-favorite]", list).forEach((button) => {
        button.addEventListener("click", () => toggleFavorite(button.dataset.favorite));
    });

    $$("[data-request]", list).forEach((button) => {
        button.addEventListener("click", () => useCatalogItem(button.dataset.request));
    });
}

function isYearInRange(year, range) {
    if (range === "pre1950") return year < 1950;
    if (range === "1950-1990") return year >= 1950 && year <= 1990;
    if (range === "after1990") return year > 1990;
    return true;
}

function formatMaterialsCount(count) {
    if (count === 1) return "1 материал";
    if (count > 1 && count < 5) return `${count} материала`;
    return `${count} материалов`;
}

function syncChips() {
    $$(".chip").forEach((chip) => {
        chip.classList.toggle("active", chip.dataset.chip === state.chip);
    });
}

function toggleFavorite(id) {
    if (state.favorites.has(id)) {
        state.favorites.delete(id);
    } else {
        state.favorites.add(id);
    }
    $("#favoriteCount").textContent = state.favorites.size;
    renderCatalog();
}

function useCatalogItem(id) {
    const item = archiveItems.find((entry) => entry.id === id);
    const form = $("#requestForm");
    if (!item || !form) return;

    form.elements.requestType.value = item.type === "property" ? "Подтверждение имущества" : item.type === "genealogy" ? "Генеалогический поиск" : "Архивная справка";
    form.elements.region.value = item.region;
    form.elements.archiveTheme.value = `${item.title}. ${item.fund}, ${item.year}. Нужна архивная услуга по материалу ${item.id}.`;
    updateRequestSummary();
    $("#request")?.scrollIntoView({ behavior: "smooth" });
}

function initRequestForm() {
    const form = $("#requestForm");
    if (!form) return;

    form.addEventListener("input", updateRequestSummary);
    form.addEventListener("change", updateRequestSummary);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const formData = new FormData(form);
        const requestNumber = `AR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
        showModal(
            "Заявка отправлена",
            `${formData.get("fullName")}, ваше обращение ${requestNumber} принято. Услуга: ${formData.get("requestType")}. Уведомления придут на ${formData.get("email")}.`
        );
        form.reset();
        updateRequestSummary();
    });

    $("#fillDemo")?.addEventListener("click", () => {
        form.elements.fullName.value = "Садыков Алишер Маратович";
        form.elements.iin.value = "920514300000";
        form.elements.requestType.value = "Архивная справка";
        form.elements.region.value = "Караганда";
        form.elements.archiveTheme.value = "Подтвердить стаж работы на машиностроительном заводе с 1986 по 1994 год, должность инженер-технолог.";
        form.elements.delivery.value = "Электронно в личный кабинет";
        form.elements.phone.value = "+7 700 123 45 67";
        form.elements.email.value = "alisher@example.com";
        updateRequestSummary();
    });

    updateRequestSummary();
}

function updateRequestSummary() {
    const form = $("#requestForm");
    const summary = $("#requestSummary");
    if (!form || !summary) return;

    const type = form.elements.requestType.value || "Архивная справка";
    const delivery = form.elements.delivery.value || "Электронно";
    const days = type.includes("Генеалогический") ? 15 : type.includes("Цифровая") ? 3 : 5;

    summary.innerHTML = `
        <div>
            <span>Услуга</span>
            <strong>${type}</strong>
        </div>
        <div>
            <span>Срок</span>
            <strong>${days} рабочих дней</strong>
        </div>
        <div>
            <span>Выдача</span>
            <strong>${delivery}</strong>
        </div>
    `;
}

function initAssistant() {
    $$(".intent").forEach((button) => {
        button.addEventListener("click", () => {
            $$(".intent").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            renderRecommendation(button.dataset.intent);
        });
    });
    renderRecommendation("stazh");
}

function renderRecommendation(intent) {
    const card = $("#recommendationCard");
    const data = recommendations[intent];
    if (!card || !data) return;

    card.innerHTML = `
        <span class="status-pill">Рекомендация</span>
        <h3>${data.title}</h3>
        <p>${data.text}</p>
        <ul>
            ${data.docs.map((doc) => `<li>${doc}</li>`).join("")}
        </ul>
        <button class="btn btn-primary btn-lg" type="button" data-scroll="#request">${data.cta}</button>
    `;

    $("[data-scroll]", card)?.addEventListener("click", () => {
        $("#request")?.scrollIntoView({ behavior: "smooth" });
    });
}

function initAppointment() {
    const form = $("#appointmentForm");
    const dateInput = form?.elements.date;
    if (!form || !dateInput) return;

    dateInput.min = new Date().toISOString().split("T")[0];

    $$(".slot").forEach((slot) => {
        slot.addEventListener("click", () => {
            $$(".slot").forEach((item) => item.classList.remove("active"));
            slot.classList.add("active");
            state.selectedSlot = slot.textContent.trim();
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const branch = form.elements.branch.value;
        const date = formatDate(form.elements.date.value);
        $("#appointmentResult").textContent = `Запись подтверждена: ${branch}, ${date}, ${state.selectedSlot}. Номер талона Q-${Math.floor(1000 + Math.random() * 9000)}.`;
        showModal("Визит забронирован", `Вы записаны в ${branch} на ${date} в ${state.selectedSlot}.`);
    });
}

function formatDate(value) {
    if (!value) return "выбранную дату";
    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(`${value}T12:00:00`));
}

function initFaq() {
    $$("#faqList .faq-item button").forEach((button) => {
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");
            item.classList.toggle("open");
        });
    });
}

function initModal() {
    const modal = $("#successModal");
    $(".modal-close")?.addEventListener("click", closeModal);
    $("#modalOk")?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });
}

function showModal(title, text) {
    $("#modalTitle").textContent = title;
    $("#modalText").textContent = text;

    const modal = $("#successModal");
    if (!modal) return;

    if (typeof modal.showModal === "function") {
        modal.showModal();
    } else {
        alert(`${title}\n\n${text}`);
    }
}

function closeModal() {
    const modal = $("#successModal");
    if (modal?.open) {
        modal.close();
    }
}
