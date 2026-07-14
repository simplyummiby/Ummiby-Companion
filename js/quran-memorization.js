(() => {
  const STORAGE_KEY = "ummibyMemorizationSurahStatuses";
  const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);
  const labels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    memorized: "Memorized",
    "needs-revision": "Needs Revision"
  };

  const readStatuses = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved && typeof saved === "object") {
        Object.keys(saved).forEach(key => {
          if (saved[key] === "needs-review") saved[key] = "needs-revision";
          if (saved[key] === "mastered") saved[key] = "memorized";
        });
        return saved;
      }
    } catch {}
    return {};
  };

  let statuses = readStatuses();
  const saveStatuses = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  const getStatus = number => statuses[number] || "not-started";

  const library = document.getElementById("memorizationLibrary");
  if (!library || !Array.isArray(window.QURAN_DATA)) return;

  const search = document.getElementById("memorizationSearch");
  const count = document.getElementById("libraryCount");
  const noResults = document.getElementById("libraryNoResults");
  const modalBackdrop = document.getElementById("statusModalBackdrop");
  const modalClose = document.getElementById("statusModalClose");
  const modalSurah = document.getElementById("statusModalSurah");
  const statusOptions = [...document.querySelectorAll("[data-status-choice]")];
  let activeStatus = "all";
  let activeRevelation = "all";
  let selectedSurahNumber = null;
  let lastFocusedElement = null;

  const normalize = value => String(value || "").toLowerCase().replace(/[’'\-]/g, " ").replace(/\s+/g, " ").trim();
  const surahs = window.QURAN_DATA.map(surah => ({
    number: surah.number,
    name: surah.name,
    arabicName: surah.arabicName,
    ayahCount: surah.ayahCount,
    revelation: MADANI_SURAHS.has(surah.number) ? "madani" : "makki"
  }));

  function updateDashboard() {
    const values = surahs.map(surah => getStatus(surah.number));
    document.getElementById("memorizedCount").textContent = values.filter(status => status === "memorized").length;
    document.getElementById("progressCount").textContent = values.filter(status => status === "in-progress").length;
    document.getElementById("reviewCount").textContent = values.filter(status => status === "needs-revision").length;

    renderFocusSection("currentlyHeading", "in-progress", "Your current surahs will appear here.", "When you begin tracking a surah, this space will help you return to it quickly.");
    renderFocusSection("reviewHeading", "needs-revision", "Nothing needs revision right now.", "Surahs whose memorization has weakened will be gathered here for focused strengthening.");
  }

  function renderFocusSection(headingId, status, emptyTitle, emptyText) {
    const heading = document.getElementById(headingId);
    const section = heading?.closest(".memorization-section");
    const body = section?.querySelector(".empty-state, .focus-surah-list");
    if (!section || !body) return;
    const matches = surahs.filter(surah => getStatus(surah.number) === status).slice(0, 4);
    if (!matches.length) {
      body.className = "empty-state compact";
      body.innerHTML = `<span class="empty-icon${status === "needs-revision" ? " amber" : ""}" data-ui-icon="${status === "needs-revision" ? "history" : "book"}"></span><div><h3>${emptyTitle}</h3><p>${emptyText}</p></div>`;
      window.UmmibyAppShell?.hydrateIcons?.(body);
      return;
    }
    body.className = "focus-surah-list";
    body.innerHTML = matches.map(surah => `
      <a href="memorization-surah.html?surah=${surah.number}" class="focus-surah-card">
        <span class="focus-surah-number">${surah.number}</span>
        <span><strong>${surah.name}</strong><small>${surah.ayahCount} ayat · ${surah.revelation === "makki" ? "Makki" : "Madani"}</small></span>
        <span class="library-status status-${status}"><i aria-hidden="true"></i>${labels[status]}</span>
      </a>`).join("");
  }

  function render() {
    const query = normalize(search.value);
    const filtered = surahs.filter(surah => {
      const status = getStatus(surah.number);
      const matchesSearch = !query || String(surah.number) === query || normalize(surah.name).includes(query) || normalize(surah.arabicName).includes(query);
      const matchesStatus = activeStatus === "all" || status === activeStatus;
      const matchesRevelation = activeRevelation === "all" || surah.revelation === activeRevelation;
      return matchesSearch && matchesStatus && matchesRevelation;
    });

    count.textContent = `${filtered.length} surah${filtered.length === 1 ? "" : "s"}`;
    library.innerHTML = filtered.map(surah => {
      const status = getStatus(surah.number);
      return `
      <article class="memorization-surah-card">
        <a class="surah-card-main" href="memorization-surah.html?surah=${surah.number}" aria-label="Open ${surah.name} memorization page">
          <span class="library-surah-number">${surah.number}</span>
          <span class="library-surah-copy">
            <span class="library-surah-arabic" lang="ar" dir="rtl">${surah.arabicName}</span>
            <strong>${surah.name}</strong>
            <small>${surah.ayahCount} ayat · ${surah.revelation === "makki" ? "Makki" : "Madani"}</small>
          </span>
          <span class="card-arrow" data-ui-icon="arrow-right" aria-hidden="true"></span>
        </a>
        <button class="library-status status-${status}" type="button" data-change-status="${surah.number}" aria-label="Change ${surah.name} status, currently ${labels[status]}"><i aria-hidden="true"></i>${labels[status]}</button>
      </article>`;
    }).join("");
    window.UmmibyAppShell?.hydrateIcons?.(library);
    noResults.hidden = filtered.length !== 0;
  }

  function openModal(number, trigger) {
    const surah = surahs.find(item => item.number === number);
    if (!surah) return;
    selectedSurahNumber = number;
    lastFocusedElement = trigger || document.activeElement;
    modalSurah.textContent = `${surah.arabicName} · ${surah.name}`;
    const current = getStatus(number);
    statusOptions.forEach(option => {
      const selected = option.dataset.statusChoice === current;
      option.classList.toggle("selected", selected);
      option.setAttribute("aria-checked", String(selected));
    });
    modalBackdrop.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modalBackdrop.classList.add("open"));
    (statusOptions.find(option => option.dataset.statusChoice === current) || statusOptions[0]).focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modalBackdrop.hidden = true; }, 150);
    lastFocusedElement?.focus?.();
  }

  library.addEventListener("click", event => {
    const button = event.target.closest("[data-change-status]");
    if (!button) return;
    openModal(Number(button.dataset.changeStatus), button);
  });

  statusOptions.forEach(option => option.addEventListener("click", () => {
    if (!selectedSurahNumber) return;
    statuses[selectedSurahNumber] = option.dataset.statusChoice;
    saveStatuses();
    render();
    updateDashboard();
    closeModal();
  }));

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });
  document.addEventListener("keydown", event => {
    if (!modalBackdrop.hidden && event.key === "Escape") closeModal();
  });

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
    search.value = "";
    activeStatus = "all";
    activeRevelation = "all";
    document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.status === "all" || chip.dataset.revelation === "all"));
    render();
  });

  saveStatuses();
  render();
  updateDashboard();
})();
