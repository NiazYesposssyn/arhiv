const publicLinks = [
  ["index.html", "Басты бет"],
  ["archive.html", "Архив туралы"],
  ["services.html", "Қызметтер"],
  ["pricing.html", "Тарифтер"],
  ["analytics.html", "Аналитика"],
  ["contacts.html", "Байланыс"],
  ["help-center.html", "Көмек"],
  ["login.html", "Кіру"],
  ["register.html", "Тіркелу"]
];

const adminLinks = [
  ["dashboard.html", "Dashboard"],
  ["documents.html", "Documents"],
  ["requests.html", "Requests"],
  ["analytics.html", "Analytics"],
  ["users.html", "Users"],
  ["roles.html", "Roles"],
  ["audit-logs.html", "Audit Logs"],
  ["notifications.html", "Notifications"],
  ["reports.html", "Reports"],
  ["settings.html", "Settings"],
  ["profile.html", "Profile"],
  ["support.html", "Support Center"],
  ["api-docs.html", "API Documentation"],
  ["backups.html", "Backups"],
  ["security.html", "Security Center"]
];

function currentFile() {
  const file = window.location.pathname.split("/").pop();
  return file || "index.html";
}

function initTheme() {
  const saved = localStorage.getItem("archive-static-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("archive-static-theme", next);
    });
  });
}

function renderPublicNav() {
  const root = document.querySelector("[data-public-nav]");
  if (!root) return;
  const active = currentFile();
  root.innerHTML = `
    <div class="topbar">
      <nav class="nav">
        <a class="brand" href="index.html"><span class="brand-icon">A</span><span>Archive Access</span></a>
        <button class="menu-toggle" data-menu-toggle>☰</button>
        <div class="nav-links" data-nav-links>
          ${publicLinks.map(([href, label]) => `<a class="${active === href ? "badge" : ""}" href="${href}">${label}</a>`).join("")}
        </div>
        <div class="nav-actions">
          <button class="theme-toggle" data-theme-toggle>◐</button>
        </div>
      </nav>
    </div>`;
}

function renderFooter() {
  const root = document.querySelector("[data-footer]");
  if (!root) return;
  root.innerHTML = `
    <footer class="footer">
      <div class="container grid-3">
        <div>
          <a class="brand" href="index.html"><span class="brand-icon">A</span><span>Archive Access System</span></a>
          <p class="muted">Интеллектуальная платформа для хранения архивных документов, онлайн-сұраныстар және аналитики.</p>
        </div>
        <div>
          <h3>Платформа</h3>
          <p class="muted"><a href="about-system.html">О системе</a><br><a href="archive.html">Об архиве</a><br><a href="pricing.html">Тарифы</a></p>
        </div>
        <div>
          <h3>Қолдау</h3>
          <p class="muted"><a href="faq.html">FAQ</a><br><a href="help-center.html">Справочный центр</a><br><a href="privacy.html">Политика</a></p>
        </div>
      </div>
    </footer>`;
}

function renderAdminShell() {
  const sidebar = document.querySelector("[data-admin-sidebar]");
  if (!sidebar) return;
  const active = currentFile();
  sidebar.innerHTML = `
    <a class="brand" href="dashboard.html"><span class="brand-icon">A</span><span>Archive Console</span></a>
    <nav class="admin-menu">
      ${adminLinks.map(([href, label]) => `<a class="${active === href ? "badge" : ""}" href="${href}">${label}</a>`).join("")}
    </nav>`;
}

function initMenu() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-menu-toggle]");
    if (!button) return;
    document.querySelector("[data-nav-links]")?.classList.toggle("open");
  });
}

function initFaq() {
  document.querySelectorAll("[data-faq-question]").forEach((button) => {
    button.addEventListener("click", () => button.closest(".faq-item")?.classList.toggle("open"));
  });
  const search = document.querySelector("[data-faq-search]");
  if (search) {
    search.addEventListener("input", () => {
      const value = search.value.toLowerCase();
      document.querySelectorAll("[data-faq-item]").forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(value) ? "" : "none";
      });
    });
  }
}

function initToast() {
  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      let toast = document.querySelector(".toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
      }
      toast.textContent = button.dataset.toast || "Операция орындалды";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2600);
    });
  });
}

function initDropzone() {
  document.querySelectorAll(".dropzone").forEach((zone) => {
    ["dragenter", "dragover"].forEach((name) => {
      zone.addEventListener(name, (event) => {
        event.preventDefault();
        zone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((name) => {
      zone.addEventListener(name, (event) => {
        event.preventDefault();
        zone.classList.remove("dragover");
      });
    });
  });
}

function initCharts() {
  if (!window.Chart) return;

  const documentsChart = document.getElementById("documentsChart");
  if (documentsChart) {
    new Chart(documentsChart, {
      type: "line",
      data: {
        labels: ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Маус"],
        datasets: [{
          label: "Құжаттар",
          data: [920, 1120, 1380, 1620, 1890, 2140],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, .12)",
          tension: .42,
          fill: true
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  const requestsChart = document.getElementById("requestsChart");
  if (requestsChart) {
    new Chart(requestsChart, {
      type: "doughnut",
      data: {
        labels: ["Жаңа", "Өңделуде", "Аяқталған"],
        datasets: [{ data: [24, 38, 72], backgroundColor: ["#06b6d4", "#7c3aed", "#10b981"], borderWidth: 0 }]
      },
      options: { cutout: "72%", plugins: { legend: { position: "bottom" } } }
    });
  }

  const regionChart = document.getElementById("regionChart");
  if (regionChart) {
    new Chart(regionChart, {
      type: "bar",
      data: {
        labels: ["Астана", "Алматы", "Шымкент", "Қарағанды", "Ақтөбе"],
        datasets: [{
          label: "Сұраныстар",
          data: [420, 560, 310, 280, 240],
          backgroundColor: ["#2563eb", "#7c3aed", "#06b6d4", "#db2777", "#10b981"],
          borderRadius: 14
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderPublicNav();
  renderFooter();
  renderAdminShell();
  initTheme();
  initMenu();
  initFaq();
  initToast();
  initDropzone();
  initCharts();
});
