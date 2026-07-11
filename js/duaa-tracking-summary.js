(function () {
  "use strict";

  const tracker = window.UmmibyDuaaTracking;
  const loader = window.UmmibyCollectionLoader;
  if (!tracker || !loader) return;

  const ids = [...tracker.trackedCollections];
  const labels = { morning: "Morning", evening: "Evening", sleep: "Before Sleep" };
  const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];

  function statusText(summary) {
    if (summary.count === 0) return `0 of ${summary.total} recited today`;
    return `${summary.count} of ${summary.total} recited today`;
  }

  function updateDailyStatus(collectionId, summary) {
    document.querySelectorAll(`[data-tracking-status="${collectionId}"]`).forEach((element) => {
      element.classList.toggle("completed", summary.count > 0);
      element.replaceChildren();
      if (summary.count > 0 && window.UmmibyIcons) {
        element.appendChild(window.UmmibyIcons.create("check", { className: "inline-ui-icon" }));
        element.append(" ");
      }
      element.append(statusText(summary));
    });

    document.querySelectorAll(`[data-tracking-count="${collectionId}"]`).forEach((element) => {
      element.textContent = `${summary.count} of ${summary.total}`;
    });
  }

  function buildWeekRow(collectionId) {
    const week = tracker.weekSummary(collectionId);
    const activeDays = week.filter((day) => day.active).length;
    const article = document.createElement("article");
    article.className = "weekly-collection-row";

    const heading = document.createElement("div");
    heading.className = "weekly-row-heading";
    const title = document.createElement("h3");
    title.textContent = labels[collectionId] || collectionId;
    const count = document.createElement("span");
    count.textContent = `${activeDays} ${activeDays === 1 ? "day" : "days"} this week`;
    heading.append(title, count);

    const days = document.createElement("div");
    days.className = "weekly-days";
    days.setAttribute("aria-label", `${labels[collectionId]}: ${activeDays} active days this week`);

    week.forEach((day, index) => {
      const dayItem = document.createElement("div");
      dayItem.className = "weekly-day";
      if (day.active) dayItem.classList.add("active");
      if (day.isToday) dayItem.classList.add("today");
      if (day.isFuture) dayItem.classList.add("future");

      const letter = document.createElement("span");
      letter.className = "weekly-day-label";
      letter.textContent = dayLetters[index];
      const marker = document.createElement("span");
      marker.className = "weekly-day-marker";
      marker.setAttribute("aria-label", `${day.date}: ${day.active ? `${day.completedCount} Duaa${day.completedCount === 1 ? "" : "s"} checked` : day.isFuture ? "future day" : "no Duaa checked"}`);
      if (day.active && window.UmmibyIcons) marker.appendChild(window.UmmibyIcons.create("check"));
      dayItem.append(letter, marker);
      days.appendChild(dayItem);
    });

    article.append(heading, days);
    return article;
  }

  function renderWeeklyProgress() {
    document.querySelectorAll("[data-weekly-progress]").forEach((container) => {
      container.replaceChildren();
      ids.forEach((collectionId) => container.appendChild(buildWeekRow(collectionId)));
    });
  }

  async function loadSummaries() {
    for (const collectionId of ids) {
      try {
        const collection = await loader.load(collectionId);
        const summary = tracker.summary(collectionId, collection.items?.length || 0);
        updateDailyStatus(collectionId, summary);
      } catch (error) {
        console.error(`Unable to load tracking summary for ${collectionId}`, error);
      }
    }

    renderWeeklyProgress();
    document.querySelectorAll("[data-tracking-date]").forEach((element) => {
      element.textContent = new Intl.DateTimeFormat([], { weekday: "long", month: "long", day: "numeric" }).format(new Date());
    });
  }

  let renderedDate = tracker.localDateKey();
  loadSummaries();

  function refreshForLocalDateChange() {
    const currentDate = tracker.localDateKey();
    if (currentDate === renderedDate) return;
    renderedDate = currentDate;
    loadSummaries();
  }

  window.addEventListener("focus", refreshForLocalDateChange);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshForLocalDateChange();
  });
  window.setInterval(refreshForLocalDateChange, 60000);
})();
