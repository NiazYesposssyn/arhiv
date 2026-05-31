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

const officePoints = [
  {
    city: "Астана",
    name: "ЦОН Алматинского района",
    address: "проспект Тауелсиздик, 16/1",
    coords: [51.1476, 71.4759],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/astana/search/%D0%A6%D0%9E%D0%9D%20%D0%A2%D0%B0%D1%83%D0%B5%D0%BB%D1%81%D0%B8%D0%B7%D0%B4%D0%B8%D0%BA%2016%2F1"
  },
  {
    city: "Астана",
    name: "СпецЦОН для автовладельцев",
    address: "улица Сабит Муканов, 2",
    coords: [51.1216, 71.4318],
    type: "СпецЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/astana/search/%D0%A1%D0%BF%D0%B5%D1%86%D0%A6%D0%9E%D0%9D%20%D0%9C%D1%83%D0%BA%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%202"
  },
  {
    city: "Алматы",
    name: "ЦОН Ауэзовского района",
    address: "улица Ораза Жандосова, 51",
    coords: [43.2352, 76.8839],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/almaty/search/%D0%A6%D0%9E%D0%9D%20%D0%96%D0%B0%D0%BD%D0%B4%D0%BE%D1%81%D0%BE%D0%B2%D0%B0%2051"
  },
  {
    city: "Алматы",
    name: "ЦОН Турксибского района",
    address: "улица Рихарда Зорге, 9",
    coords: [43.3224, 76.9503],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/almaty/search/%D0%A6%D0%9E%D0%9D%20%D0%A0%D0%B8%D1%85%D0%B0%D1%80%D0%B4%D0%B0%20%D0%97%D0%BE%D1%80%D0%B3%D0%B5%209"
  },
  {
    city: "Шымкент",
    name: "ЦОН района Туран",
    address: "улица Мадели Кожа, 1г",
    coords: [42.3174, 69.5956],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/shymkent/search/%D0%A6%D0%9E%D0%9D%20%D0%9C%D0%B0%D0%B4%D0%B5%D0%BB%D0%B8%20%D0%9A%D0%BE%D0%B6%D0%B0%201%D0%B3"
  },
  {
    city: "Шымкент",
    name: "ЦОН Каратауского района",
    address: "улица Рыскулова, 80",
    coords: [42.3568, 69.6314],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/shymkent/search/%D0%A6%D0%9E%D0%9D%20%D0%A0%D1%8B%D1%81%D0%BA%D1%83%D0%BB%D0%BE%D0%B2%D0%B0%2080"
  },
  {
    city: "Караганда",
    name: "ЦОН",
    address: "улица Муканова, 5",
    coords: [49.8067, 73.1028],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/karaganda/search/%D0%A6%D0%9E%D0%9D%20%D0%9C%D1%83%D0%BA%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%205"
  },
  {
    city: "Караганда",
    name: "ЦОН",
    address: "улица Таттимбета, 709",
    coords: [49.7825, 73.1344],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/karaganda/search/%D0%A6%D0%9E%D0%9D%20%D0%A2%D0%B0%D1%82%D1%82%D0%B8%D0%BC%D0%B1%D0%B5%D1%82%D0%B0%20709"
  },
  {
    city: "Актобе",
    name: "ЦОН",
    address: "улица Тургенева, 109",
    coords: [50.2868, 57.1696],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/aktobe/search/%D0%A6%D0%9E%D0%9D%20%D0%A2%D1%83%D1%80%D0%B3%D0%B5%D0%BD%D0%B5%D0%B2%D0%B0%20109"
  },
  {
    city: "Актобе",
    name: "ЦОН",
    address: "проспект Санкибай батыра, 249",
    coords: [50.3158, 57.1258],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/aktobe/search/%D0%A6%D0%9E%D0%9D%20%D0%A1%D0%B0%D0%BD%D0%BA%D0%B8%D0%B1%D0%B0%D0%B9%20%D0%B1%D0%B0%D1%82%D1%8B%D1%80%D0%B0%20249"
  },
  {
    city: "Атырау",
    name: "ЦОН",
    address: "улица Баймуханова, 16а",
    coords: [47.1139, 51.8972],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/atyrau/search/%D0%A6%D0%9E%D0%9D%20%D0%91%D0%B0%D0%B9%D0%BC%D1%83%D1%85%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%2016%D0%B0"
  },
  {
    city: "Атырау",
    name: "Специализированный ЦОН",
    address: "Северная промышленная зона, 69",
    coords: [47.1392, 51.9226],
    type: "СпецЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/atyrau/firm/70000001035917715"
  },
  {
    city: "Павлодар",
    name: "Специализированный отдел",
    address: "улица Космонавтов, 2",
    coords: [52.2718, 76.9576],
    type: "СпецЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/pavlodar/search/%D0%A6%D0%9E%D0%9D%20%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82%D0%BE%D0%B2%202"
  },
  {
    city: "Усть-Каменогорск",
    name: "ЦОН",
    address: "улица Белинского, 37а",
    coords: [49.9562, 82.6081],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/ustkam/search/%D0%A6%D0%9E%D0%9D%20%D0%91%D0%B5%D0%BB%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2037%D0%B0"
  },
  {
    city: "Усть-Каменогорск",
    name: "ЦОН",
    address: "улица Казахстан, 99/1",
    coords: [49.9745, 82.6007],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/ustkam/search/%D0%A6%D0%9E%D0%9D%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD%2099%2F1"
  },
  {
    city: "Костанай",
    name: "ЦОН",
    address: "улица Тауелсыздык, 114",
    coords: [53.2199, 63.6354],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/kostanay/search/%D0%A6%D0%9E%D0%9D%20%D0%A2%D0%B0%D1%83%D0%B5%D0%BB%D1%81%D1%8B%D0%B7%D0%B4%D1%8B%D0%BA%20114"
  },
  {
    city: "Тараз",
    name: "ЦОН",
    address: "проспект Толе би, 198а",
    coords: [42.8969, 71.3659],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/taraz/search/%D0%A6%D0%9E%D0%9D%20%D0%A2%D0%BE%D0%BB%D0%B5%20%D0%B1%D0%B8%20198%D0%B0"
  },
  {
    city: "Тараз",
    name: "ЦОН",
    address: "микрорайон Алатау, 16а",
    coords: [42.8702, 71.3914],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/taraz/search/%D0%A6%D0%9E%D0%9D%20%D0%90%D0%BB%D0%B0%D1%82%D0%B0%D1%83%2016%D0%B0"
  },
  {
    city: "Кызылорда",
    name: "Отдел N1 ЦОН",
    address: "улица Гани Муратбаева, 2е",
    coords: [44.8488, 65.5093],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/kyzylorda/search/%D0%A6%D0%9E%D0%9D%20%D0%93%D0%B0%D0%BD%D0%B8%20%D0%9C%D1%83%D1%80%D0%B0%D1%82%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%202%D0%B5"
  },
  {
    city: "Кызылорда",
    name: "Отдел N2 ЦОН",
    address: "проспект Астана, 46",
    coords: [44.8395, 65.5273],
    type: "ЦОН",
    schedule: "09:00-20:00 / сб 09:00-13:00",
    link: "https://2gis.kz/kyzylorda/search/%D0%A6%D0%9E%D0%9D%20%D0%90%D1%81%D1%82%D0%B0%D0%BD%D0%B0%2046"
  },
  {
    city: "Петропавловск",
    name: "Отдел обслуживания населения N1",
    address: "улица Мухтара Ауэзова, 157",
    coords: [54.8752, 69.1578],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/petropavlovsk/firm/70000001038066401"
  },
  {
    city: "Петропавловск",
    name: "Отдел обслуживания населения N2",
    address: "улица Конституции Казахстана, 72",
    coords: [54.8726, 69.1438],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/petropavlovsk/search/%D0%A6%D0%9E%D0%9D%20%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%86%D0%B8%D0%B8%2072"
  },
  {
    city: "Кокшетау",
    name: "Отдел обслуживания населения N1",
    address: "улица Мухтара Ауэзова, 189а",
    coords: [53.2848, 69.3992],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/kokshetau/search/%D0%A6%D0%9E%D0%9D%20%D0%90%D1%83%D1%8D%D0%B7%D0%BE%D0%B2%D0%B0%20189%D0%B0"
  },
  {
    city: "Кокшетау",
    name: "Отдел обслуживания населения N2",
    address: "улица Абая Кунанбаева, 96",
    coords: [53.2892, 69.3858],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/kokshetau/search/%D0%A6%D0%9E%D0%9D%20%D0%90%D0%B1%D0%B0%D1%8F%2096"
  },
  {
    city: "Уральск",
    name: "Отдел N1 ЦОН",
    address: "улица Жамбыла, 81/2",
    coords: [51.2251, 51.3864],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/uralsk/search/%D0%A6%D0%9E%D0%9D%20%D0%96%D0%B0%D0%BC%D0%B1%D1%8B%D0%BB%D0%B0%2081%2F2"
  },
  {
    city: "Уральск",
    name: "Отдел N2 ЦОН",
    address: "улица Исатая-Махамбета, 84",
    coords: [51.2038, 51.3652],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/uralsk/search/%D0%A6%D0%9E%D0%9D%20%D0%98%D1%81%D0%B0%D1%82%D0%B0%D1%8F%20%D0%9C%D0%B0%D1%85%D0%B0%D0%BC%D0%B1%D0%B5%D1%82%D0%B0%2084"
  },
  {
    city: "Актау",
    name: "ЦОН",
    address: "15-й микрорайон, 67Б",
    coords: [43.6506, 51.1608],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/aktau/search/%D0%A6%D0%9E%D0%9D%2015%20%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%2067%D0%91"
  },
  {
    city: "Актау",
    name: "Специализированный ЦОН",
    address: "Промышленная зона 9, 57",
    coords: [43.6733, 51.1981],
    type: "СпецЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/aktau/search/%D0%A1%D0%BF%D0%B5%D1%86%D0%A6%D0%9E%D0%9D%20%D0%9F%D1%80%D0%BE%D0%BC%D0%B7%D0%BE%D0%BD%D0%B0%209%2057"
  },
  {
    city: "Семей",
    name: "Отдел N1 ЦОН",
    address: "408-й квартал, 21",
    coords: [50.4117, 80.2274],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/semey/search/%D0%A6%D0%9E%D0%9D%20408%20%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B0%D0%BB%2021"
  },
  {
    city: "Талдыкорган",
    name: "ЦОН",
    address: "улица Н. Назарбаева, 67Б",
    coords: [45.0159, 78.3773],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/taldykorgan/search/%D0%A6%D0%9E%D0%9D%20%D0%9D%D0%B0%D0%B7%D0%B0%D1%80%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2067%D0%91"
  },
  {
    city: "Туркестан",
    name: "Отдел N2 ЦОН",
    address: "улица Толе би, 65Б",
    coords: [43.3012, 68.2693],
    type: "ЦОН",
    schedule: "09:00-18:00",
    link: "https://2gis.kz/turkestan/search/%D0%A6%D0%9E%D0%9D%20%D0%A2%D0%BE%D0%BB%D0%B5%20%D0%B1%D0%B8%2065%D0%91"
  }
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
const citySelect = document.querySelector("#citySelect");
const officeList = document.querySelector("#officeList");
const showAllOffices = document.querySelector("#showAllOffices");
const assistantWidget = document.querySelector(".assistant-widget");
const assistantToggle = document.querySelector(".assistant-toggle");
const assistantPanel = document.querySelector("#assistantPanel");
const assistantClose = document.querySelector(".assistant-close");
const assistantMessages = document.querySelector("#assistantMessages");
const assistantForm = document.querySelector("#assistantForm");
const assistantInput = document.querySelector("#assistantInput");
let kazakhstanMap;
let officeMarkers = [];

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

function getVisibleOffices() {
  const city = citySelect.value;
  return city === "all" ? officePoints : officePoints.filter((office) => office.city === city);
}

function getOfficePopup(office) {
  return `
    <strong>${office.name}</strong>
    <p>${office.city}, ${office.address}</p>
    <p><b>Тип:</b> ${office.type}<br><b>График:</b> ${office.schedule}</p>
    <a href="${office.link}" target="_blank" rel="noopener">Открыть в 2ГИС</a>
  `;
}

function fitMapToOffices(offices) {
  if (!kazakhstanMap || !offices.length) {
    return;
  }

  const bounds = offices.map((office) => office.coords);
  const maxZoom = citySelect.value === "all" ? 6 : 13;
  kazakhstanMap.fitBounds(bounds, { padding: [42, 42], maxZoom });
}

function renderOfficeList(offices) {
  officeList.innerHTML = offices.map((office, index) => `
    <button class="office-item" type="button" data-office-index="${officePoints.indexOf(office)}">
      <span>${index + 1}</span>
      <div>
        <strong>${office.city}: ${office.name}</strong>
        <p>${office.address}</p>
        <small>${office.type} · ${office.schedule}</small>
      </div>
    </button>
  `).join("");
}

function renderMapMarkers() {
  if (!kazakhstanMap) {
    return;
  }

  const offices = getVisibleOffices();

  officeMarkers.forEach((marker) => marker.remove());
  officeMarkers = offices.map((office) => {
    const marker = L.marker(office.coords).addTo(kazakhstanMap);
    marker.bindPopup(getOfficePopup(office));
    marker.office = office;
    return marker;
  });

  renderOfficeList(offices);
  fitMapToOffices(offices);
}

function initCityFilter() {
  const cities = [...new Set(officePoints.map((office) => office.city))].sort((a, b) => a.localeCompare(b, "ru"));
  citySelect.insertAdjacentHTML("beforeend", cities.map((city) => `<option value="${city}">${city}</option>`).join(""));
}

function initMap() {
  if (!window.L || !document.querySelector("#kazakhstanMap")) {
    const mapElement = document.querySelector("#kazakhstanMap");
    if (mapElement) {
      mapElement.innerHTML = "<p class='map-fallback'>Карта не загрузилась. Проверьте подключение к интернету и обновите страницу.</p>";
    }
    return;
  }

  kazakhstanMap = L.map("kazakhstanMap", {
    scrollWheelZoom: true,
    zoomControl: true
  }).setView([48.1, 67.5], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(kazakhstanMap);

  initCityFilter();
  renderMapMarkers();
}

function focusOffice(office) {
  if (!kazakhstanMap) {
    return;
  }

  const marker = officeMarkers.find((item) => item.office === office);
  kazakhstanMap.setView(office.coords, 14);
  marker?.openPopup();
}

function getAssistantReply(question) {
  const text = question.toLowerCase();

  if (text.includes("цон") || text.includes("карта") || text.includes("город") || text.includes("адрес")) {
    return "Откройте раздел «Карта»: выберите город в списке, нажмите на карточку отделения или маркер. В каждой точке есть адрес, график и ссылка для открытия в 2ГИС.";
  }

  if (text.includes("иин")) {
    return "В форме заявки ИИН должен состоять ровно из 12 цифр. Если появляется ошибка, удалите пробелы, тире и проверьте количество цифр.";
  }

  if (text.includes("статус") || text.includes("номер") || text.includes("обращ")) {
    return "После отправки формы сайт показывает номер вида ARC-2026-123456. Его можно вставить в блок «Проверка обращения», чтобы увидеть этапы обработки.";
  }

  if (text.includes("документ") || text.includes("справ") || text.includes("архив")) {
    return "Для архивной справки обычно нужны ФИО, ИИН, телефон, период поиска и описание документа. Если запрос связан с персональными данными другого человека, понадобится подтверждение права на получение сведений.";
  }

  if (text.includes("срок") || text.includes("сколько")) {
    return "Срок зависит от типа услуги и сложности поиска. В каталоге рядом с каждой услугой указан ориентировочный срок: от 3 рабочих дней до 15 рабочих дней.";
  }

  if (text.includes("2гис") || text.includes("тугис")) {
    return "На карте используется интерактивный слой, а у каждого ЦОНа есть кнопка «Открыть в 2ГИС». Так можно быстро проверить маршрут, отзывы и актуальный режим работы.";
  }

  return "Я могу помочь с выбором архивной услуги, поиском ЦОНа на карте, проверкой ИИН, статусом заявки и списком документов. Напишите, что именно нужно сделать.";
}

function addAssistantMessage(message, type = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `assistant-message assistant-message--${type}`;
  bubble.textContent = message;
  assistantMessages.appendChild(bubble);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function askAssistant(question) {
  const normalizedQuestion = question.trim();

  if (!normalizedQuestion) {
    return;
  }

  addAssistantMessage(normalizedQuestion, "user");
  setTimeout(() => {
    addAssistantMessage(getAssistantReply(normalizedQuestion), "bot");
  }, 250);
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

citySelect.addEventListener("change", renderMapMarkers);

showAllOffices.addEventListener("click", () => {
  citySelect.value = "all";
  renderMapMarkers();
});

officeList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-office-index]");

  if (!item) {
    return;
  }

  const office = officePoints[Number(item.dataset.officeIndex)];
  focusOffice(office);
});

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

assistantToggle.addEventListener("click", () => {
  const isOpen = assistantWidget.classList.toggle("is-collapsed") === false;
  assistantToggle.setAttribute("aria-expanded", String(isOpen));
});

assistantClose.addEventListener("click", () => {
  assistantWidget.classList.add("is-collapsed");
  assistantToggle.setAttribute("aria-expanded", "false");
});

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askAssistant(assistantInput.value);
  assistantInput.value = "";
});

document.querySelectorAll("[data-ai-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    askAssistant(button.dataset.aiPrompt);
  });
});

renderArchiveItems();
initMap();
