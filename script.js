const YIELD_HISTORY = [
  { year: "2020", pct: 8.1 },
  { year: "2021", pct: 11.4 },
  { year: "2022", pct: 13.8 },
  { year: "2023", pct: 16.2 },
  { year: "2024", pct: 18.7 },
  { year: "2025", pct: 21.3 },
  { year: "2026", pct: 24.1 },
];
function yieldChartMarkup(width = 600, height = 300) {
  const w = Math.max(180, width),
    h = Math.max(140, height),
    left = 44,
    right = w,
    top = 0,
    bottom = h - 30;
  const min = 6,
    max = 24.1,
    ticks = [6, 11, 16, 24.1];
  const points = YIELD_HISTORY.map((v, i) => [
    left + (i * (right - left)) / 6,
    bottom - ((v.pct - min) / (max - min)) * (bottom - top),
  ]);
  const slopes = points
    .slice(1)
    .map((p, i) => (p[1] - points[i][1]) / (p[0] - points[i][0]));
  const tangents = points.map((p, i) => {
    if (i === 0 || i === 6) return 0;
    const a = slopes[i - 1],
      b = slopes[i],
      average = (a + b) / 2;
    return (
      (Math.sign(a) + Math.sign(b)) *
      Math.min(Math.abs(a), Math.abs(b), Math.abs(average) / 2)
    );
  });
  tangents[0] = (3 * slopes[0] - tangents[1]) / 2;
  tangents[6] = (3 * slopes[5] - tangents[5]) / 2;
  let line = `M${points[0].join(",")}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1],
      b = points[i],
      dx = (b[0] - a[0]) / 3;
    line += ` C${a[0] + dx},${a[1] + dx * tangents[i - 1]} ${b[0] - dx},${b[1] - dx * tangents[i]} ${b.join(",")}`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" role="img" aria-label="Rendimiento anual histórico 2020 a 2026" class="yield-chart" style="font-family:'DM Mono',monospace"><title>Rendimiento anual histórico 2020 a 2026</title>${ticks
    .map((value) => {
      const y = bottom - ((value - min) / (max - min)) * (bottom - top);
      return `<line x1="${left}" x2="${right}" y1="${y}" y2="${y}" stroke="#D9D9D9"/><text x="${left - 8}" y="${Math.max(9.95, y + 3.2)}" text-anchor="end" fill="#666666" font-size="9">${value}%</text>`;
    })
    .join(
      "",
    )}${points.map((p) => `<line x1="${p[0]}" x2="${p[0]}" y1="${top}" y2="${bottom}" stroke="#D9D9D9"/>`).join("")}<line class="chart-cursor" x1="0" x2="0" y1="${top}" y2="${bottom}" stroke="#aaa" visibility="hidden"/><path d="${line}" fill="none" stroke="#0A244A" stroke-width="2.5"/>${YIELD_HISTORY.map((item, i) => `<text x="${i === 6 ? points[i][0] - 10 : points[i][0]}" y="${h - 15.6}" text-anchor="middle" fill="#666666" font-size="9">${item.year}</text><circle cx="${points[i][0]}" cy="${points[i][1]}" r="4" fill="#0A244A" stroke="white" stroke-width="2"/><circle cx="${points[i][0]}" cy="${points[i][1]}" r="12" fill="transparent" class="chart-point" tabindex="0" role="img" aria-label="${item.year}: ${item.pct}%" data-year="${item.year}" data-value="${item.pct}"/>`).join("")}</svg>`;
}
if (typeof module !== "undefined") module.exports = { yieldChartMarkup };

/* El servidor recibe el formulario y confirma su guardado en Google Sheets. */
const LANDING_CONFIG = Object.freeze({
  formEndpoint: "/api/leads",
  countdownSeconds: 420,
});

(() => {
  "use strict";
  const form = document.querySelector("#lead-form");
  const status = document.querySelector("#form-status");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  // Siete minutos desde cada carga, como en el código original.
  const deadline = Date.now() + LANDING_CONFIG.countdownSeconds * 1000;
  function updateCountdown() {
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const parts = { min: Math.floor(seconds / 60), seg: seconds % 60 };
    document.querySelectorAll("[data-countdown-part]").forEach((element) => {
      element.textContent = String(
        parts[element.dataset.countdownPart],
      ).padStart(2, "0");
    });
    if (!seconds) clearInterval(countdownInterval);
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  document
    .querySelector('[data-action="go-to-form"]')
    .addEventListener("click", () => {
      document
        .querySelector("#registro")
        .scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
          block: "center",
        });
      form.elements.name.focus({ preventScroll: true });
    });
  const today = new Date();
  form.elements.dob.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.hidden = false;
    status.className = "form-status";
    if (!LANDING_CONFIG.formEndpoint) {
      status.textContent =
        "El formulario aún no está conectado a un servicio de envío. Tus datos no se han enviado.";
      return;
    }
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    status.textContent = "Enviando tus datos…";
    try {
      const response = await window.LandingLeads.submit(form, LANDING_CONFIG.formEndpoint);
      if (!response.ok) throw new Error("No se pudo enviar");
      status.textContent =
        "Recibimos tus datos. El equipo se pondrá en contacto contigo.";
      form.reset();
    } catch {
      status.textContent =
        "No se pudo enviar el formulario. Inténtalo de nuevo.";
    } finally {
      button.disabled = false;
    }
  });

  // Avisos de ejemplo entregados en el ZIP, sin actividad en vivo.
  const activity = [
    {
      name: "Martín A.",
      city: "Buenos Aires",
      amount: "USD 5.000",
      ago: "hace 2 min",
    },
    {
      name: "Valentina R.",
      city: "Montevideo",
      amount: "USD 12.000",
      ago: "hace 4 min",
    },
    {
      name: "Felipe O.",
      city: "Santiago",
      amount: "USD 8.500",
      ago: "hace 7 min",
    },
    { name: "Lucía M.", city: "Lima", amount: "USD 3.200", ago: "hace 11 min" },
    {
      name: "Andrés C.",
      city: "Bogotá",
      amount: "USD 20.000",
      ago: "hace 14 min",
    },
    {
      name: "Carla V.",
      city: "Miami",
      amount: "USD 15.000",
      ago: "hace 18 min",
    },
  ];
  const toastHost = document.querySelector("#social-proof");
  const toastTemplate = document.querySelector("#toast-template");
  let activityIndex = 0,
    hideToastTimeout;
  function hideToast() {
    toastHost.hidden = true;
    clearTimeout(hideToastTimeout);
  }
  function showToast() {
    if (document.hidden) return;
    const item =
      activity[(activityIndex = (activityIndex + 1) % activity.length)];
    toastHost.replaceChildren(toastTemplate.content.cloneNode(true));
    for (const key of ["name", "city", "amount", "ago"]) {
      toastHost.querySelector(`[data-toast="${key}"]`).textContent = item[key];
    }
    toastHost.hidden = false;
    clearTimeout(hideToastTimeout);
    hideToastTimeout = setTimeout(hideToast, 5500);
  }
  toastHost.addEventListener("click", (event) => {
    if (event.target.closest('[data-action="close-toast"]')) hideToast();
  });
  setTimeout(showToast, 4000);
  setInterval(showToast, 13000);

  const host = document.querySelector('[data-chart="yield"]');
  const tooltip = document.createElement("div");
  tooltip.className = "chart-tooltip";
  tooltip.hidden = true;
  host.append(tooltip);
  function drawChart() {
    const { width, height } = host.getBoundingClientRect();
    const size = `${Math.round(width)}x${Math.round(height)}`;
    if (width < 1 || height < 1 || host.dataset.size === size) return;
    host.dataset.size = size;
    host.querySelector("svg").outerHTML = yieldChartMarkup(
      Math.round(width),
      Math.round(height),
    );
  }
  drawChart();
  new ResizeObserver(drawChart).observe(host);
  function showChartTooltip(event) {
    const point = event.target.closest(".chart-point");
    if (!point) return;
    tooltip.textContent = `${point.dataset.year} · Rendimiento: ${point.dataset.value}%`;
    tooltip.hidden = false;
    tooltip.style.left = `${Math.max(0, Math.min(host.clientWidth - tooltip.offsetWidth, Number(point.getAttribute("cx")) - 40))}px`;
    tooltip.style.top = `${Math.max(0, Number(point.getAttribute("cy")) - 40)}px`;
    const cursor = host.querySelector(".chart-cursor");
    cursor.setAttribute("x1", point.getAttribute("cx"));
    cursor.setAttribute("x2", point.getAttribute("cx"));
    cursor.setAttribute("visibility", "visible");
  }
  function hideChartTooltip() {
    tooltip.hidden = true;
    host.querySelector(".chart-cursor").setAttribute("visibility", "hidden");
  }
  host.addEventListener("pointerover", showChartTooltip);
  host.addEventListener("focusin", showChartTooltip);
  host.addEventListener("pointerleave", hideChartTooltip);
  host.addEventListener("focusout", hideChartTooltip);
})();
