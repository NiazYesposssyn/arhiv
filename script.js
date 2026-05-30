const archiveItems = [
  {
    title: "Справка о трудовом стаже",
    description: "Подтверждение периода работы по архивным документам организаций.",
    category: "work",
    badge: "Трудовой архив",
    term: "3-5 рабочих дней"
  },
  {
    title: "Копия приказа о приеме или увольнении",
    description: "Поиск и выдача заверенной копии кадрового приказа.",
    category: "work",
    badge: "Кадры",
    term: "до 7 рабочих дней"
  },
  {
    title: "Справка о заработной плате",
    description: "Архивная справка для пенсионных, социальных и личных целей.",
    category: "work",
    badge: "Зарплата",
    term: "5 рабочих дней"
  },
  {
    title: "Архивная выписка о регистрации",
    description: "Подтверждение проживания, регистрации или состава семьи.",
    category: "personal",
    badge: "Личные данные",
    term: "3 рабочих дня"
  },
  {
    title: "Документы об образовании",
    description: "Поиск сведений о выпуске, обучении и академических справках.",
    category: "education",
    badge: "Образование",
    term: "до 10 рабочих дней"
  },
  {
    title: "Имущественные архивные дела",
    description: "Сведения о правах, технических документах и старых регистрационных записях.",
    category: "property",
    badge: "Имущество",
    term: "7-15 рабочих дней"
  }
];

const statusSteps = [
  ["Заявка зарегистрирована", "Система приняла обращение и присвоила ему номер."],
  ["Проверка данных", "Специалист сверяет личные данные и период поиска."],
  ["Поиск в архивном фонде", "Идет подбор документов в электронном и бумажном архиве."],
  ["Ответ готовится к выдаче", "Результат будет направлен выбранным способом получения."]
];

const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const archiveList = document.querySelector("#archiveList");
const catalogSearch = document.querySelector("#catalogSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const requestForm = document.querySelector("#requestForm");
const requestResult = document.querySelector("#requestResult");
const statusForm = document.querySelector("#statusForm");
const statusTimeline = document.querySelector("#statusTimeline");

function renderArchiveItems() {
  const query = catalogSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filteredItems = archiveItems.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const text = `${item.title} ${item.description} ${item.badge}`.toLowerCase();
    return matchesCategory && text.includes(query);
  });

  archiveList.innerHTML = filteredItems.length
    ? filteredItems.map((item) => `
      <article class="archive-item">
        <span class="archive-item__badge">${item.badge}</span>
        <div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
        <span class="archive-item__meta">${item.term}</span>
      </article>
    `).join("")
    : `<p class="archive-item">Ничего не найдено. Попробуйте изменить запрос или категорию.</p>`;
}

function generateRequestNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ARC-2026-${random}`;
}

function normalizeDigits(value) {
  return value.replace(/\D/g, "");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-search-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = new FormData(form).get("query")?.toString().trim() || "";
    catalogSearch.value = query;
    categoryFilter.value = "all";
    renderArchiveItems();
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
  });
});

catalogSearch.addEventListener("input", renderArchiveItems);
categoryFilter.addEventListener("change", renderArchiveItems);

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(requestForm);
  const iin = normalizeDigits(formData.get("iin")?.toString() || "");

  if (iin.length !== 12) {
    requestResult.textContent = "Проверьте ИИН: нужно ввести ровно 12 цифр.";
    requestResult.style.color = "#b42318";
    return;
  }

  const requestNumber = generateRequestNumber();
  requestResult.style.color = "#067647";
  requestResult.textContent = `Заявка принята. Ваш номер обращения: ${requestNumber}`;
  statusForm.querySelector("input").value = requestNumber;
  requestForm.reset();
});

statusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = statusForm.querySelector("input").value.trim();

  if (!value) {
    return;
  }

  statusTimeline.innerHTML = statusSteps.map((step, index) => `
    <div class="timeline__item ${index < 3 ? "timeline__item--active" : ""}">
      <span></span>
      <div>
        <strong>${step[0]}</strong>
        <p>${step[1]} Номер: ${value}</p>
      </div>
    </div>
  `).join("");
});

document.querySelectorAll(".accordion__item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("is-open");
  });
});

renderArchiveItems();
