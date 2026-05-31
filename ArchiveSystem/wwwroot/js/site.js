(() => {
    const loader = document.querySelector(".page-loader");
    if (loader) {
        window.addEventListener("load", () => loader.classList.add("loaded"));
        setTimeout(() => loader.classList.add("loaded"), 700);
    }

    const savedTheme = localStorage.getItem("archive-theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
            const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("archive-theme", next);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".glass-card,.service-card,.pricing-card,.archive-card,.metric-card,.table-panel,.form-panel")
        .forEach((element) => observer.observe(element));

    document.querySelectorAll("[data-counter]").forEach((counter) => {
        const target = Number(counter.getAttribute("data-counter"));
        let current = 0;
        const step = Math.max(1, Math.round(target / 60));
        const tick = () => {
            current = Math.min(target, current + step);
            counter.textContent = current.toLocaleString("ru-RU");
            if (current < target) requestAnimationFrame(tick);
        };
        tick();
    });

    document.querySelectorAll("[data-toast]").forEach((button) => {
        button.addEventListener("click", () => {
            const toastElement = document.getElementById("appToast");
            if (!toastElement || !window.bootstrap) return;
            toastElement.querySelector(".toast-body").textContent = button.getAttribute("data-toast");
            window.bootstrap.Toast.getOrCreateInstance(toastElement).show();
        });
    });

    document.querySelectorAll(".dropzone").forEach((zone) => {
        ["dragenter", "dragover"].forEach((eventName) => {
            zone.addEventListener(eventName, (event) => {
                event.preventDefault();
                zone.classList.add("dragover");
            });
        });
        ["dragleave", "drop"].forEach((eventName) => {
            zone.addEventListener(eventName, (event) => {
                event.preventDefault();
                zone.classList.remove("dragover");
            });
        });
    });

    const faqSearch = document.querySelector("[data-faq-search]");
    if (faqSearch) {
        faqSearch.addEventListener("input", () => {
            const value = faqSearch.value.toLowerCase();
            document.querySelectorAll("[data-faq-item]").forEach((item) => {
                item.style.display = item.textContent.toLowerCase().includes(value) ? "" : "none";
            });
        });
    }

    const documentChart = document.getElementById("documentsChart");
    if (documentChart && window.Chart) {
        new Chart(documentChart, {
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

    const requestChart = document.getElementById("requestsChart");
    if (requestChart && window.Chart) {
        new Chart(requestChart, {
            type: "doughnut",
            data: {
                labels: ["Жаңа", "Өңделуде", "Аяқталған"],
                datasets: [{
                    data: [24, 38, 72],
                    backgroundColor: ["#06b6d4", "#7c3aed", "#10b981"],
                    borderWidth: 0
                }]
            },
            options: { cutout: "72%", plugins: { legend: { position: "bottom" } } }
        });
    }

    const regionChart = document.getElementById("regionChart");
    if (regionChart && window.Chart) {
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
})();
