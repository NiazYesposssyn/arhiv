const STORAGE_KEY = "qazarchive-users";
const SESSION_KEY = "qazarchive-session";

const landing = document.getElementById("landing");
const portal = document.getElementById("portal");
const authModal = document.getElementById("authModal");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authModeLabel = document.getElementById("authModeLabel");
const authSubmit = document.getElementById("authSubmit");
const switchAuthMode = document.getElementById("switchAuthMode");
const closeModal = document.getElementById("closeModal");
const nameField = document.getElementById("nameField");
const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authStatus = document.getElementById("authStatus");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userAvatar = document.getElementById("userAvatar");
const logoutButton = document.getElementById("logoutButton");
const sidebar = document.querySelector(".portal-sidebar");

let authMode = "login";
let archiveMap;
const archiveMarkers = {};

const cityData = {
  "Астана": {
    summary: "Национальный архив Республики Казахстан - один из ключевых архивных центров страны.",
    archive: "Национальный архив Республики Казахстан",
    services: "справки, читальный зал, научно-справочный аппарат",
    status: "реальное архивное учреждение",
    lat: 51.1282,
    lng: 71.4304,
    zoom: 13,
    twoGis: "https://2gis.kz/astana/search/%D0%9D%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%20%D0%A0%D0%9A"
  },
  "Алматы": {
    summary: "Центральный государственный архив Республики Казахстан работает с историческими фондами и документами национального значения.",
    archive: "Центральный государственный архив Республики Казахстан",
    services: "исторические фонды, генеалогические запросы, копии документов",
    status: "реальное архивное учреждение",
    lat: 43.2389,
    lng: 76.8897,
    zoom: 13,
    twoGis: "https://2gis.kz/almaty/search/%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%20%D0%A0%D0%9A"
  },
  "Шымкент": {
    summary: "Крупный город юга Казахстана с региональными архивными услугами и историческими фондами.",
    archive: "Региональный архивный пункт",
    services: "социально-правовые справки, консультации, прием заявлений",
    status: "демонстрационная точка",
    lat: 42.3417,
    lng: 69.5901,
    zoom: 11,
    twoGis: "https://2gis.kz/shymkent/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Караганда": {
    summary: "Промышленный регион, где часто запрашивают сведения о стаже, предприятиях и учебных заведениях.",
    archive: "Региональный архивный пункт",
    services: "стаж, зарплата, история предприятий",
    status: "демонстрационная точка",
    lat: 49.8068,
    lng: 73.0851,
    zoom: 11,
    twoGis: "https://2gis.kz/karaganda/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Актобе": {
    summary: "Западный региональный центр с большим количеством запросов по работе, учебе и переселению.",
    archive: "Региональный архивный пункт",
    services: "справки, поиск фондов, запись на прием",
    status: "демонстрационная точка",
    lat: 50.2839,
    lng: 57.1660,
    zoom: 11,
    twoGis: "https://2gis.kz/aktobe/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Уральск": {
    summary: "Исторический город западного Казахстана с материалами по дореволюционному и советскому периодам.",
    archive: "Региональный архивный пункт",
    services: "исторические документы, справки, копии",
    status: "демонстрационная точка",
    lat: 51.2278,
    lng: 51.3865,
    zoom: 11,
    twoGis: "https://2gis.kz/uralsk/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Костанай": {
    summary: "Северный город с востребованными запросами по трудовым документам и истории организаций.",
    archive: "Региональный архивный пункт",
    services: "стаж, учеба, фонды организаций",
    status: "демонстрационная точка",
    lat: 53.2198,
    lng: 63.6354,
    zoom: 11,
    twoGis: "https://2gis.kz/kostanay/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Павлодар": {
    summary: "Региональный центр на северо-востоке страны с промышленными и социальными архивными запросами.",
    archive: "Региональный архивный пункт",
    services: "социально-правовые справки, читальный зал",
    status: "демонстрационная точка",
    lat: 52.2873,
    lng: 76.9674,
    zoom: 11,
    twoGis: "https://2gis.kz/pavlodar/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Семей": {
    summary: "Исторический центр востока Казахстана, важный для культурных и семейных исследований.",
    archive: "Региональный архивный пункт",
    services: "генеалогия, исторические справки, фотодокументы",
    status: "демонстрационная точка",
    lat: 50.4111,
    lng: 80.2275,
    zoom: 11,
    twoGis: "https://2gis.kz/semey/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Усть-Каменогорск": {
    summary: "Восточный региональный центр с фондами предприятий, учебных заведений и государственных органов.",
    archive: "Региональный архивный пункт",
    services: "копии документов, стаж, история учреждений",
    status: "демонстрационная точка",
    lat: 49.9481,
    lng: 82.6275,
    zoom: 11,
    twoGis: "https://2gis.kz/ust-kamenogorsk/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Кызылорда": {
    summary: "Город с важными материалами по истории региона, организациям и переселению.",
    archive: "Региональный архивный пункт",
    services: "исторические фонды, справки, прием заявок",
    status: "демонстрационная точка",
    lat: 44.8488,
    lng: 65.4823,
    zoom: 11,
    twoGis: "https://2gis.kz/kyzylorda/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Талдыкорган": {
    summary: "Региональный центр Жетысу с запросами по учебе, работе и семейной истории.",
    archive: "Региональный архивный пункт",
    services: "учеба, работа, генеалогия",
    status: "демонстрационная точка",
    lat: 45.0177,
    lng: 78.3804,
    zoom: 11,
    twoGis: "https://2gis.kz/taldykorgan/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Тараз": {
    summary: "Один из древнейших городов Казахстана, подходящий для исторических и краеведческих запросов.",
    archive: "Региональный архивный пункт",
    services: "краеведение, исторические справки, консультации",
    status: "демонстрационная точка",
    lat: 42.8984,
    lng: 71.3979,
    zoom: 11,
    twoGis: "https://2gis.kz/taraz/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  },
  "Актау": {
    summary: "Прикаспийский город, где востребованы запросы по предприятиям, трудовой истории и миграции.",
    archive: "Региональный архивный пункт",
    services: "стаж, предприятия, справки",
    status: "демонстрационная точка",
    lat: 43.6532,
    lng: 51.1975,
    zoom: 11,
    twoGis: "https://2gis.kz/aktau/search/%D0%B0%D1%80%D1%85%D0%B8%D0%B2"
  }
};

const allCities = [
  "Астана", "Алматы", "Шымкент", "Актобе", "Караганда", "Тараз", "Усть-Каменогорск",
  "Павлодар", "Семей", "Костанай", "Кызылорда", "Уральск", "Актау", "Атырау",
  "Петропавловск", "Кокшетау", "Талдыкорган", "Туркестан", "Жезказган", "Конаев"
];

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function setStatus(element, message, type = "info") {
  element.textContent = message;
  element.style.color = type === "error" ? "var(--red)" : type === "success" ? "var(--green)" : "var(--muted)";
}

function openAuth(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  authTitle.textContent = isRegister ? "Регистрация" : "Вход";
  authModeLabel.textContent = isRegister ? "Новый аккаунт" : "Аккаунт";
  authDescription.textContent = isRegister
    ? "Создайте аккаунт, чтобы открыть внутренний архивный портал."
    : "Введите email и пароль, чтобы открыть архивный кабинет.";
  authSubmit.textContent = isRegister ? "Зарегистрироваться и войти" : "Войти";
  switchAuthMode.textContent = isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться";
  nameField.classList.toggle("hidden", !isRegister);
  authName.required = isRegister;
  authStatus.textContent = "";
  authForm.reset();
  authModal.classList.remove("hidden");
  setTimeout(() => (isRegister ? authName : authEmail).focus(), 50);
}

function closeAuth() {
  authModal.classList.add("hidden");
}

function showPortal(user) {
  userName.textContent = user.name || "Пользователь архива";
  userEmail.textContent = user.email;
  userAvatar.textContent = (user.name || user.email || "A").trim().charAt(0).toUpperCase();
  landing.classList.add("hidden");
  portal.classList.remove("hidden");
  closeAuth();
  if (archiveMap) {
    setTimeout(() => archiveMap.invalidateSize(), 120);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  portal.classList.add("hidden");
  landing.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleAuth(event) {
  event.preventDefault();
  const email = authEmail.value.trim().toLowerCase();
  const password = authPassword.value;
  const users = getUsers();

  if (authMode === "register") {
    const name = authName.value.trim();
    if (users.some((user) => user.email === email)) {
      setStatus(authStatus, "Такой email уже зарегистрирован. Попробуйте войти.", "error");
      return;
    }

    const user = { name, email, password };
    users.push(user);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    setStatus(authStatus, "Аккаунт создан. Открываем портал...", "success");
    setTimeout(() => showPortal(user), 450);
    return;
  }

  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) {
    setStatus(authStatus, "Неверный email или пароль. Если аккаунта нет, зарегистрируйтесь.", "error");
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  setStatus(authStatus, "Вход выполнен. Открываем портал...", "success");
  setTimeout(() => showPortal(user), 350);
}

function activateSection(sectionId) {
  document.querySelectorAll("[data-section-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.id === sectionId);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });
  sidebar.classList.remove("open");
  if (sectionId === "map" && archiveMap) {
    setTimeout(() => archiveMap.invalidateSize(), 120);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateMap(city) {
  const data = cityData[city] || {
    summary: "Город отмечен как важный центр Казахстана. Для реального проекта сюда можно подключить официальный архив.",
    archive: "Городской или региональный архив",
    services: "консультации, прием заявлений, поиск фондов",
    status: "информационная точка",
    twoGis: `https://2gis.kz/search/${encodeURIComponent(`${city} архив`)}`
  };
  const mapCard = document.getElementById("mapCard");

  mapCard.innerHTML = `
    <span class="eyebrow">Выбранный город</span>
    <h3>${city}</h3>
    <p>${data.summary}</p>
    <ul>
      <li><strong>Архивная точка:</strong> ${data.archive}</li>
      <li><strong>Услуги:</strong> ${data.services}</li>
      <li><strong>Статус:</strong> ${data.status}</li>
    </ul>
    <a class="map-link" href="${data.twoGis}" target="_blank" rel="noreferrer">Открыть в 2GIS</a>
  `;

  document.querySelectorAll(".city-cloud button").forEach((button) => {
    button.classList.toggle("active", button.dataset.city === city);
  });

  if (archiveMap && data.lat && data.lng) {
    archiveMap.flyTo([data.lat, data.lng], data.zoom || 11, { duration: 0.8 });
    if (archiveMarkers[city]) {
      archiveMarkers[city].openPopup();
    }
  }
}

function buildCityCloud() {
  const cityCloud = document.getElementById("cityCloud");
  cityCloud.innerHTML = "";
  allCities.forEach((city) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.city = city;
    button.textContent = city;
    button.addEventListener("click", () => updateMap(city));
    cityCloud.append(button);
  });
  updateMap("Астана");
}

function initArchiveMap() {
  const mapElement = document.getElementById("archiveMap");
  if (!mapElement) return;

  if (typeof L === "undefined") {
    mapElement.innerHTML = '<div class="map-fallback">Карта не загрузилась. Проверьте интернет и обновите страницу.</div>';
    return;
  }

  archiveMap = L.map(mapElement, {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([48.0196, 66.9237], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap'
  }).addTo(archiveMap);

  Object.entries(cityData).forEach(([city, data]) => {
    if (!data.lat || !data.lng) return;
    const marker = L.marker([data.lat, data.lng]).addTo(archiveMap);
    marker.bindPopup(`
      <strong>${city}</strong><br>
      ${data.archive}<br>
      <a href="${data.twoGis}" target="_blank" rel="noreferrer">Открыть в 2GIS</a>
    `);
    marker.on("click", () => updateMap(city));
    archiveMarkers[city] = marker;
  });
}

function generatePdf() {
  const lines = [
    "QazArchive request template",
    "Applicant: ______________________________",
    "Document type: archive reference",
    "Period: __________________________________",
    "City / archive: __________________________",
    "Contact phone: ___________________________",
    "Description: _____________________________",
    "This demo PDF is generated inside the browser."
  ];

  const content = lines.map((line, index) => `BT /F1 13 Tf 54 ${760 - index * 26} Td (${escapePdf(line)}) Tj ET`).join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "qazarchive-request-template.pdf";
  link.click();
  URL.revokeObjectURL(url);
}

function escapePdf(value) {
  return value.replace(/[()\\]/g, "\\$&");
}

function openChecklist() {
  const template = document.getElementById("checklistTemplate").innerHTML;
  const win = window.open("", "_blank", "width=720,height=760");
  if (!win) {
    alert("Разрешите всплывающие окна, чтобы открыть чек-лист.");
    return;
  }
  win.document.write(`
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Чек-лист архивного запроса</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #162033; }
          h1 { color: #0b3c73; }
          li { margin-bottom: 12px; }
          button { padding: 12px 18px; border: 0; border-radius: 999px; background: #f4c95d; font-weight: 700; }
        </style>
      </head>
      <body>${template}<button onclick="window.print()">Печать / сохранить как PDF</button></body>
    </html>
  `);
  win.document.close();
}

function answerQuestion(question) {
  const text = question.toLowerCase();

  if (text.includes("стаж") || text.includes("работ")) {
    return "Для справки о трудовом стаже укажите ФИО, дату рождения, название организации, должность и период работы. Затем заполните онлайн-заявку или скачайте PDF-шаблон.";
  }
  if (text.includes("генеалог") || text.includes("родствен") || text.includes("сем")) {
    return "Для генеалогического поиска нужны ФИО родственника, примерные годы рождения/проживания, регион, родственные связи и любые известные документы.";
  }
  if (text.includes("алматы")) {
    return "В Алматы находится Центральный государственный архив Республики Казахстан. На карте он отмечен как реальная архивная точка.";
  }
  if (text.includes("астан") || text.includes("националь")) {
    return "В Астане отмечен Национальный архив Республики Казахстан. Через портал можно подготовить запрос и посмотреть список услуг.";
  }
  if (text.includes("pdf") || text.includes("скач")) {
    return "Откройте раздел «Справки и PDF» и нажмите «Скачать PDF». Браузер сгенерирует шаблон заявления автоматически.";
  }
  if (text.includes("документ") || text.includes("нужн")) {
    return "Обычно нужны удостоверение личности, ФИО, дата рождения, период поиска, место работы/учебы и контактные данные.";
  }
  if (text.includes("срок") || text.includes("стоим")) {
    return "В демонстрационном проекте сроки и стоимость не рассчитываются. В реальном архиве они зависят от типа услуги, объема поиска и правил учреждения.";
  }
  return "Я могу помочь со справкой о стаже, генеалогическим поиском, PDF-шаблоном, картой архивов и подготовкой заявки. Попробуйте уточнить вопрос.";
}

function addMessage(author, text) {
  const chatBox = document.getElementById("chatBox");
  const message = document.createElement("div");
  message.className = `message ${author === "Вы" ? "user" : "bot"}`;
  const authorLabel = document.createElement("strong");
  const messageText = document.createElement("p");
  authorLabel.textContent = author;
  messageText.textContent = text;
  message.append(authorLabel, messageText);
  chatBox.append(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleQuestion(question) {
  addMessage("Вы", question);
  setTimeout(() => addMessage("QazAI", answerQuestion(question)), 220);
}

function quickSearch() {
  const input = document.getElementById("globalSearch");
  const result = document.getElementById("searchResult");
  const query = input.value.trim();
  if (!query) {
    result.textContent = "Введите запрос, чтобы получить подсказку.";
    return;
  }
  result.textContent = answerQuestion(query);
}

function initForms() {
  document.getElementById("requestForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const requestType = document.getElementById("requestType").value;
    setStatus(
      document.getElementById("requestStatus"),
      `Демо-заявка «${requestType}» сохранена. В реальном проекте она отправилась бы специалисту архива.`,
      "success"
    );
    event.currentTarget.reset();
  });

  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    setStatus(document.getElementById("contactStatus"), "Сообщение принято в демонстрационную очередь.", "success");
    event.currentTarget.reset();
  });

  document.getElementById("chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("chatInput");
    const question = input.value.trim();
    if (question) {
      handleQuestion(question);
      input.value = "";
    }
  });
}

function initEvents() {
  document.querySelectorAll("[data-auth-open]").forEach((button) => {
    button.addEventListener("click", () => openAuth(button.dataset.authOpen));
  });
  closeModal.addEventListener("click", closeAuth);
  authModal.addEventListener("click", (event) => {
    if (event.target === authModal) closeAuth();
  });
  switchAuthMode.addEventListener("click", () => openAuth(authMode === "login" ? "register" : "login"));
  authForm.addEventListener("submit", handleAuth);
  logoutButton.addEventListener("click", logout);

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.section));
  });
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.scrollTarget));
  });
  document.querySelectorAll("[data-fill-request]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("requestType").value = button.dataset.fillRequest;
      document.getElementById("requestText").focus();
    });
  });

  document.querySelectorAll(".city-point").forEach((point) => {
    point.addEventListener("click", () => updateMap(point.dataset.city));
  });
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => handleQuestion(button.dataset.question));
  });

  document.getElementById("downloadPdf").addEventListener("click", generatePdf);
  document.getElementById("printChecklist").addEventListener("click", openChecklist);
  document.getElementById("searchButton").addEventListener("click", quickSearch);
  document.getElementById("globalSearch").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      quickSearch();
    }
  });
  document.getElementById("openSidebar").addEventListener("click", () => sidebar.classList.add("open"));
  document.getElementById("closeSidebar").addEventListener("click", () => sidebar.classList.remove("open"));
}

function restoreSession() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  if (!session) return;
  const user = getUsers().find((item) => item.email === session.email);
  if (user) showPortal(user);
}

initArchiveMap();
buildCityCloud();
initForms();
initEvents();
restoreSession();
