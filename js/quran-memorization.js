(() => {
  const fallback = { memorized: 0, inProgress: 0, needsReview: 0 };
  let data = fallback;
  try { data = { ...fallback, ...JSON.parse(localStorage.getItem("ummibyMemorizationSummary") || "{}") }; } catch {}
  document.getElementById("memorizedCount").textContent = data.memorized || 0;
  document.getElementById("progressCount").textContent = data.inProgress || 0;
  document.getElementById("reviewCount").textContent = data.needsReview || 0;
})();
