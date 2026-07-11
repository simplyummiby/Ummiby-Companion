(function () {
  "use strict";

  const tracker = window.UmmibyDuaaTracking;
  const loader = window.UmmibyCollectionLoader;
  if (!tracker || !loader) return;

  const ids = [...tracker.trackedCollections];

  function statusText(summary) {
    if (summary.isComplete) return "Completed today";
    if (summary.count === 0) return "Not started today";
    return `${summary.count} of ${summary.total} completed today`;
  }

  function updateStatus(collectionId, summary) {
    document.querySelectorAll(`[data-tracking-status="${collectionId}"]`).forEach((element) => {
      element.classList.toggle("completed", summary.isComplete);
      element.replaceChildren();
      if (summary.isComplete && window.UmmibyIcons) {
        element.appendChild(window.UmmibyIcons.create("check", { className: "inline-ui-icon" }));
        element.append(" ");
      }
      element.append(statusText(summary));
    });

    document.querySelectorAll(`[data-tracking-count="${collectionId}"]`).forEach((element) => {
      element.textContent = `${summary.count} of ${summary.total}`;
    });

    document.querySelectorAll(`[data-tracking-percent="${collectionId}"]`).forEach((element) => {
      element.textContent = `${summary.percent}%`;
    });
  }

  async function loadSummaries() {
    const summaries = [];
    for (const collectionId of ids) {
      try {
        const collection = await loader.load(collectionId);
        const summary = tracker.summary(collectionId, collection.items?.length || 0);
        summaries.push(summary);
        updateStatus(collectionId, summary);
      } catch (error) {
        console.error(`Unable to load tracking summary for ${collectionId}`, error);
      }
    }

    const total = summaries.reduce((sum, item) => sum + item.total, 0);
    const count = summaries.reduce((sum, item) => sum + item.count, 0);
    const percent = total ? Math.round((count / total) * 100) : 0;

    document.querySelectorAll("[data-tracking-overall-percent]").forEach((element) => {
      element.textContent = `${percent}%`;
    });
    document.querySelectorAll("[data-tracking-overall-count]").forEach((element) => {
      element.textContent = `${count} of ${total}`;
    });
    document.querySelectorAll("[data-tracking-progress-circle]").forEach((element) => {
      element.style.setProperty("--tracking-progress", `${percent * 3.6}deg`);
      element.setAttribute("aria-label", `${percent} percent of today's tracked Duaas completed`);
    });
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
