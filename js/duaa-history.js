
(function () {
  "use strict";

  const tracker = window.UmmibyDuaaTracking;
  if (!tracker) return;

  const labels = Object.freeze({ morning: "Morning", evening: "Evening", sleep: "Before Sleep" });
  const tabs = [...document.querySelectorAll("[data-history-collection]")];
  const monthTitle = document.querySelector("[data-history-month-title]");
  const summary = document.querySelector("[data-history-summary]");
  const calendar = document.querySelector("[data-history-calendar]");
  const previousButton = document.querySelector("[data-history-previous]");
  const nextButton = document.querySelector("[data-history-next]");
  if (!monthTitle || !summary || !calendar || !previousButton || !nextButton) return;

  let activeCollection = "morning";
  const today = new Date();
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  function dateKey(year, month, day) {
    return [year, String(month + 1).padStart(2, "0"), String(day).padStart(2, "0")].join("-");
  }

  function isAfterCurrentMonth(date) {
    return date.getFullYear() > today.getFullYear() ||
      (date.getFullYear() === today.getFullYear() && date.getMonth() > today.getMonth());
  }

  function render() {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const history = tracker.readHistory();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = tracker.localDateKey(today);
    let activeDays = 0;

    monthTitle.textContent = new Intl.DateTimeFormat([], { month: "long", year: "numeric" }).format(visibleMonth);
    calendar.replaceChildren();

    for (let index = 0; index < firstDayIndex; index += 1) {
      const spacer = document.createElement("div");
      spacer.className = "calendar-day outside";
      spacer.setAttribute("aria-hidden", "true");
      calendar.appendChild(spacer);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const key = dateKey(year, month, day);
      const count = Array.isArray(history[key]?.[activeCollection]?.completed)
        ? history[key][activeCollection].completed.length
        : 0;
      const cellDate = new Date(year, month, day);
      const isFuture = cellDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (count > 0) activeDays += 1;

      const cell = document.createElement("div");
      cell.className = "calendar-day";
      if (count > 0) cell.classList.add("active");
      if (isFuture) cell.classList.add("future");
      if (key === todayKey) cell.classList.add("today");
      cell.setAttribute("aria-label", `${key}: ${count > 0 ? `${count} Duaa${count === 1 ? "" : "s"} checked` : isFuture ? "future date" : "no Duaa checked"}`);

      const dateNumber = document.createElement("span");
      dateNumber.className = "calendar-date";
      dateNumber.textContent = String(day);
      cell.appendChild(dateNumber);

      if (count > 0) {
        const countBadge = document.createElement("span");
        countBadge.className = "calendar-count";
        countBadge.textContent = String(count);
        const countLabel = document.createElement("span");
        countLabel.className = "calendar-count-label";
        countLabel.textContent = count === 1 ? "Duaa" : "Duaas";
        cell.append(countBadge, countLabel);
      }
      calendar.appendChild(cell);
    }

    summary.textContent = `${labels[activeCollection]} · ${activeDays} active ${activeDays === 1 ? "day" : "days"}`;
    nextButton.disabled = isAfterCurrentMonth(new Date(year, month + 1, 1));
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.historyCollection === activeCollection)));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeCollection = tab.dataset.historyCollection;
      render();
    });
  });

  previousButton.addEventListener("click", () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    render();
  });

  nextButton.addEventListener("click", () => {
    const next = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
    if (isAfterCurrentMonth(next)) return;
    visibleMonth = next;
    render();
  });

  render();
})();
