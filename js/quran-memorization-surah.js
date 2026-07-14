(() => {
  const STORAGE_KEY = "ummibyMemorizationSurahStatuses";
  const labels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    memorized: "Memorized",
    "needs-revision": "Needs Revision"
  };
  const number = Math.min(114, Math.max(1, Number(new URLSearchParams(location.search).get("surah")) || 1));
  const surahSource = Array.isArray(window.QURAN_SURAHS) ? window.QURAN_SURAHS : (Array.isArray(window.QURAN_DATA) ? window.QURAN_DATA : []);
  const surah = surahSource.find(item => Number(item.number) === number);
  if (!surah) return;
  const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);

  const readStatuses = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved[number] === "needs-review") saved[number] = "needs-revision";
      if (saved[number] === "mastered") saved[number] = "memorized";
      return saved;
    } catch { return {}; }
  };
  let statuses = readStatuses();
  const getStatus = () => statuses[number] || "not-started";

  document.title = `${surah.name} Memorization | Ummiby Companion`;
  document.getElementById("surahBreadcrumb").textContent = surah.name;
  document.getElementById("detailNumber").textContent = surah.number;
  document.getElementById("detailArabic").textContent = surah.arabicName;
  document.getElementById("detailName").textContent = surah.name;
  document.getElementById("detailMeta").textContent = `${MADANI_SURAHS.has(number) ? "Madani" : "Makki"} · ${surah.ayahCount} ayat`;
  document.getElementById("readSurahLink").href = `surah-reader.html?surah=${surah.number}`;

  const statusButton = document.getElementById("detailStatusButton");
  const statusLabel = document.getElementById("detailStatusLabel");
  const modalBackdrop = document.getElementById("statusModalBackdrop");
  const modalClose = document.getElementById("statusModalClose");
  const modalSurah = document.getElementById("statusModalSurah");
  const statusOptions = [...document.querySelectorAll("[data-status-choice]")];

  function renderStatus() {
    const status = getStatus();
    statusButton.className = `status-badge status-${status}`;
    statusLabel.textContent = labels[status];
    statusButton.setAttribute("aria-label", `Change status, currently ${labels[status]}`);
  }

  function openModal() {
    modalSurah.textContent = `${surah.arabicName} · ${surah.name}`;
    const current = getStatus();
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
    statusButton.focus();
  }

  statusButton.addEventListener("click", openModal);
  statusOptions.forEach(option => option.addEventListener("click", () => {
    statuses[number] = option.dataset.statusChoice;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses)); } catch {}
    renderStatus();
    closeModal();
  }));
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });
  document.addEventListener("keydown", event => { if (!modalBackdrop.hidden && event.key === "Escape") closeModal(); });

  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses)); } catch {}
  renderStatus();
})();
