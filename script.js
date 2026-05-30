const roleFilter = document.querySelector("#role-filter");
const typeFilter = document.querySelector("#type-filter");
const resultList = document.querySelector("#result-list");
const resultSummary = document.querySelector("#result-summary");
const requestForm = document.querySelector("#request-form");
const formMessage = document.querySelector("#form-message");
const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector("#main-menu");

const roleRank = {
    guest: 1,
    researcher: 2,
    archivist: 3,
    admin: 4,
};

const roleNames = {
    guest: "Гость",
    researcher: "Исследователь",
    archivist: "Архивист",
    admin: "Администратор",
};

const typeNames = {
    inventory: "Опись",
    case: "Дело",
    copy: "Цифровая копия",
    restricted: "Ограниченный материал",
};

const archiveItems = [
    {
        title: "Фонд 18. Опись документов городского управления",
        description: "Справочная опись дел с датами, индексами и кратким содержанием.",
        type: "inventory",
        access: 1,
        date: "1924-1938",
        relevance: 96,
    },
    {
        title: "Дело 245. Переписка о строительстве железнодорожного узла",
        description: "Текстовые документы, протоколы заседаний и сопроводительные письма.",
        type: "case",
        access: 2,
        date: "1951-1954",
        relevance: 89,
    },
    {
        title: "Цифровая копия метрической книги",
        description: "Сканированные страницы с возможностью выдачи временной ссылки.",
        type: "copy",
        access: 2,
        date: "1898",
        relevance: 82,
    },
    {
        title: "Материалы служебного расследования",
        description: "Ограниченный архивный материал с персональными данными и служебными отметками.",
        type: "restricted",
        access: 3,
        date: "1976",
        relevance: 77,
    },
    {
        title: "Закрытый протокол экспертной комиссии",
        description: "Документ доступен только администраторам и уполномоченным архивистам.",
        type: "restricted",
        access: 4,
        date: "1991",
        relevance: 71,
    },
];

function renderResults() {
    const selectedRole = roleFilter.value;
    const selectedType = typeFilter.value;
    const currentRank = roleRank[selectedRole];
    const filteredItems = archiveItems.filter((item) => {
        const matchesType = selectedType === "all" || item.type === selectedType;
        return matchesType;
    });

    resultList.innerHTML = "";

    filteredItems.forEach((item) => {
        const isAllowed = currentRank >= item.access;
        const card = document.createElement("article");
        card.className = "result-item";
        card.innerHTML = `
            <div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="tag-row">
                    <span class="tag">${typeNames[item.type]}</span>
                    <span class="tag">${item.date}</span>
                    <span class="tag ${isAllowed ? "tag--allowed" : "tag--restricted"}">
                        ${isAllowed ? "Доступ разрешен" : "Требуется согласование"}
                    </span>
                </div>
            </div>
            <span class="relevance">${item.relevance}%</span>
        `;
        resultList.append(card);
    });

    const allowedCount = filteredItems.filter((item) => currentRank >= item.access).length;
    resultSummary.textContent = `${roleNames[selectedRole]} видит ${allowedCount} из ${filteredItems.length} найденных материалов. Остальные записи остаются скрытыми или требуют согласования.`;
}

roleFilter.addEventListener("change", renderResults);
typeFilter.addEventListener("change", renderResults);

requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm);
    const topic = formData.get("topic");
    formMessage.textContent = `Заявка по теме "${topic}" сформирована. Статус: ожидает проверки архивистом.`;
    requestForm.reset();
});

navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

renderResults();
