(function () {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("archive-theme") || "light";
    root.setAttribute("data-theme", storedTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("archive-theme", next);
        });
    });

    document.querySelectorAll("[data-dropzone]").forEach((zone) => {
        const input = zone.querySelector("input[type=file]");
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

        zone.addEventListener("drop", (event) => {
            if (input && event.dataTransfer.files.length > 0) {
                input.files = event.dataTransfer.files;
                zone.querySelector("[data-file-name]").textContent = event.dataTransfer.files[0].name;
            }
        });
    });

    window.archiveCharts = {
        palette: ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        renderLine(id, labels, values) {
            const ctx = document.getElementById(id);
            if (!ctx) return;
            new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        data: values,
                        fill: true,
                        tension: 0.42,
                        borderColor: "#6366f1",
                        backgroundColor: "rgba(99,102,241,.14)",
                        pointRadius: 4,
                        pointBackgroundColor: "#6366f1"
                    }]
                },
                options: chartOptions()
            });
        },
        renderDoughnut(id, labels, values) {
            const ctx = document.getElementById(id);
            if (!ctx) return;
            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels,
                    datasets: [{ data: values, backgroundColor: this.palette, borderWidth: 0 }]
                },
                options: { plugins: { legend: { position: "bottom", labels: { usePointStyle: true } } }, cutout: "68%" }
            });
        },
        renderBar(id, labels, values) {
            const ctx = document.getElementById(id);
            if (!ctx) return;
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets: [{ data: values, backgroundColor: "#06b6d4", borderRadius: 12 }]
                },
                options: chartOptions()
            });
        }
    };

    function chartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, grid: { color: "rgba(148,163,184,.18)" } }
            }
        };
    }
})();
