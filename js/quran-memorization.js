(() => {
  const fallback = { memorized: 0, inProgress: 0, needsReview: 0 };
  let summary = fallback;
  try { summary = { ...fallback, ...JSON.parse(localStorage.getItem("ummibyMemorizationSummary") || "{}") }; } catch {}
  document.getElementById("memorizedCount").textContent = summary.memorized || 0;
  document.getElementById("progressCount").textContent = summary.inProgress || 0;
  document.getElementById("reviewCount").textContent = summary.needsReview || 0;

  const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);
  const library = document.getElementById("memorizationLibrary");
  if (!library || !Array.isArray(window.QURAN_DATA)) return;

  const search = document.getElementById("memorizationSearch");
  const count = document.getElementById("libraryCount");
  const noResults = document.getElementById("libraryNoResults");
  let activeStatus = "all";
  let activeRevelation = "all";

  const normalize = value => String(value || "").toLowerCase().replace(/[’'\-]/g, " ").replace(/\s+/g, " ").trim();
  const getStatus = number => {
    try {
      const statuses = JSON.parse(localStorage.getItem("ummibyMemorizationSurahStatuses") || "{}");
      return statuses[number] || "not-started";
    } catch { return "not-started"; }
  };

  const surahs = window.QURAN_DATA.map(surah => ({
    number: surah.number,
    name: surah.name,
    arabicName: surah.arabicName,
    ayahCount: surah.ayahCount,
    revelation: MADANI_SURAHS.has(surah.number) ? "madani" : "makki",
    status: getStatus(surah.number)
  }));

  const labels = {"not-started":"Not Started","in-progress":"In Progress","memorized":"Memorized","needs-review":"Needs Review","mastered":"Mastered"};

  function render() {
    const query = normalize(search.value);
    const filtered = surahs.filter(surah => {
      const matchesSearch = !query || String(surah.number) === query || normalize(surah.name).includes(query) || normalize(surah.arabicName).includes(query);
      const matchesStatus = activeStatus === "all" || surah.status === activeStatus;
      const matchesRevelation = activeRevelation === "all" || surah.revelation === activeRevelation;
      return matchesSearch && matchesStatus && matchesRevelation;
    });

    count.textContent = `${filtered.length} surah${filtered.length === 1 ? "" : "s"}`;
    library.innerHTML = filtered.map(surah => `
      <a class="memorization-surah-card" href="memorization-surah.html?surah=${surah.number}" aria-label="Open ${surah.name} memorization page">
        <span class="library-surah-number">${surah.number}</span>
        <span class="library-surah-copy">
          <span class="library-surah-arabic" lang="ar" dir="rtl">${surah.arabicName}</span>
          <strong>${surah.name}</strong>
          <small>${surah.ayahCount} ayat · ${surah.revelation === "makki" ? "Makki" : "Madani"}</small>
        </span>
        <span class="library-status status-${surah.status}"><i aria-hidden="true"></i>${labels[surah.status]}</span>
        <span class="card-arrow" data-ui-icon="arrow-right" aria-hidden="true"></span>
      </a>`).join("");
    noResults.hidden = filtered.length !== 0;
  }

  document.querySelectorAll("#statusFilters .filter-chip").forEach(button => button.addEventListener("click", () => {
    activeStatus = button.dataset.status;
    document.querySelectorAll("#statusFilters .filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    render();
  }));
  document.querySelectorAll("#revelationFilters .filter-chip").forEach(button => button.addEventListener("click", () => {
    activeRevelation = button.dataset.revelation;
    document.querySelectorAll("#revelationFilters .filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    render();
  }));
  search.addEventListener("input", render);
  document.getElementById("clearLibraryFilters").addEventListener("click", () => {
    search.value = ""; activeStatus = "all"; activeRevelation = "all";
    document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.status === "all" || chip.dataset.revelation === "all"));
    render();
  });
  render();
})();