(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("aas-theme") || "light";
  root.setAttribute("data-theme", savedTheme);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("aas-theme", nextTheme);
    });
  });

  const menu = document.querySelector("[data-nav-menu]");
  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      menu?.classList.toggle("open");
    });
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.endsWith(currentPath)) {
      link.classList.add("active");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted) return;
        entry.target.dataset.counted = "true";
        const target = Number(entry.target.dataset.counter || "0");
        const suffix = entry.target.dataset.suffix || "";
        const duration = 1200;
        const start = performance.now();

        const tick = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(target * eased);
          entry.target.textContent = `${value.toLocaleString("ru-RU")}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.35 }
  );

  document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      item?.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-faq-search]").forEach((input) => {
    input.addEventListener("input", () => {
      const term = input.value.trim().toLowerCase();
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(term) ? "" : "none";
      });
    });
  });

  document.querySelectorAll("[data-documents-catalog]").forEach((catalog) => {
    const searchInput = catalog.querySelector("[data-document-search]");
    const statusSelect = catalog.querySelector("[data-document-status]");
    const branchSelect = catalog.querySelector("[data-document-branch]");
    const typeSelect = catalog.querySelector("[data-document-type]");
    const countBadge = catalog.querySelector("[data-documents-count]");
    const emptyRow = catalog.querySelector("[data-documents-empty]");
    const rows = Array.from(catalog.querySelectorAll("[data-document-row]"));

    const getValue = (control) => (control?.value || "").trim().toLowerCase();

    const updateCatalog = () => {
      const term = getValue(searchInput);
      const status = getValue(statusSelect);
      const branch = getValue(branchSelect);
      const type = getValue(typeSelect);
      let visibleCount = 0;

      rows.forEach((row) => {
        const matchesSearch = !term || (row.dataset.search || row.textContent).toLowerCase().includes(term);
        const matchesStatus = !status || row.dataset.status === status;
        const matchesBranch = !branch || row.dataset.branch === branch;
        const matchesType = !type || row.dataset.type === type;
        const isVisible = matchesSearch && matchesStatus && matchesBranch && matchesType;

        row.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (emptyRow) emptyRow.hidden = visibleCount !== 0;
      if (countBadge) {
        countBadge.textContent = `${visibleCount} құжат табылды`;
      }
    };

    [searchInput, statusSelect, branchSelect, typeSelect].forEach((control) => {
      control?.addEventListener("input", updateCatalog);
      control?.addEventListener("change", updateCatalog);
    });

    catalog.querySelector("[data-document-reset]")?.addEventListener("click", () => {
      [searchInput, statusSelect, branchSelect, typeSelect].forEach((control) => {
        if (control) control.value = "";
      });
      updateCatalog();
      searchInput?.focus();
    });

    updateCatalog();
  });

  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tab-button");
    const panels = tabs.querySelectorAll(".tab-panel");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        buttons.forEach((item) => item.classList.toggle("active", item === button));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target));
      });
    });
  });

  document.querySelectorAll("[data-demo-carousel]").forEach((carousel) => {
    const buttons = carousel.querySelectorAll(".tab-button");
    const panels = carousel.querySelectorAll(".tab-panel");
    let index = 0;
    setInterval(() => {
      if (!buttons.length) return;
      index = (index + 1) % buttons.length;
      buttons[index].click();
      panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === buttons[index].dataset.tab));
    }, 3600);
  });
})();
