(() => {
  const STATUS_STORAGE_KEY = "ummibyMemorizationSurahStatuses";
  const STARTED_STORAGE_KEY = "ummibyMemorizationSurahStartedDates";
  const NOTES_STORAGE_KEY = "ummibyMemorizationSurahNotes";

  const labels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    memorized: "Memorized",
    "needs-revision": "Needs Revision"
  };

  const number = Math.min(
    114,
    Math.max(1, Number(new URLSearchParams(location.search).get("surah")) || 1)
  );

  const surahSource = Array.isArray(window.QURAN_SURAHS)
    ? window.QURAN_SURAHS
    : (Array.isArray(window.QURAN_DATA) ? window.QURAN_DATA : []);

  const surah = surahSource.find(item => Number(item.number) === number);
  if (!surah) return;

  const MADANI_SURAHS = new Set([
    2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110
  ]);

  const safeReadObject = key => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  };

  const safeWriteObject = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  let statuses = safeReadObject(STATUS_STORAGE_KEY);
  let startedDates = safeReadObject(STARTED_STORAGE_KEY);
  let notes = safeReadObject(NOTES_STORAGE_KEY);

  if (statuses[number] === "needs-review") statuses[number] = "needs-revision";
  if (statuses[number] === "mastered") statuses[number] = "memorized";

  const getStatus = () => statuses[number] || "not-started";
  const revelation = MADANI_SURAHS.has(number) ? "Madani" : "Makki";

  document.title = `${surah.name} Memorization | Ummiby Companion`;
  document.getElementById("surahBreadcrumb").textContent = surah.name;
  document.getElementById("detailNumber").textContent = surah.number;
  document.getElementById("detailNumberInline").textContent = surah.number;
  document.getElementById("detailArabic").textContent = surah.arabicName;
  document.getElementById("detailName").textContent = surah.name;
  document.getElementById("detailRevelation").textContent = revelation;
  document.getElementById("detailAyahCount").textContent = `${surah.ayahCount} ayat`;
  document.getElementById("readSurahLink").href = `surah-reader.html?surah=${surah.number}`;

  const statusButton = document.getElementById("detailStatusButton");
  const statusLabel = document.getElementById("detailStatusLabel");
  const summaryStatus = document.getElementById("summaryStatus");
  const summaryAyahCount = document.getElementById("summaryAyahCount");
  const summaryProgressFill = document.getElementById("summaryProgressFill");
  const startedDateValue = document.getElementById("startedDateValue");
  const startedDateHelp = document.getElementById("startedDateHelp");

  const modalBackdrop = document.getElementById("statusModalBackdrop");
  const modalClose = document.getElementById("statusModalClose");
  const modalSurah = document.getElementById("statusModalSurah");
  const statusOptions = [...document.querySelectorAll("[data-status-choice]")];

  const notesField = document.getElementById("surahNotes");
  const notesStatus = document.getElementById("notesStatus");
  const notesCount = document.getElementById("notesCount");
  let notesSaveTimer = null;

  const formatDate = isoDate => {
    if (!isoDate) return "";
    const parsed = new Date(`${isoDate}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return isoDate;
    return new Intl.DateTimeFormat(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(parsed);
  };

  const ensureStartedDate = status => {
    if (status === "not-started" || startedDates[number]) return;
    startedDates[number] = new Date().toISOString().slice(0, 10);
    safeWriteObject(STARTED_STORAGE_KEY, startedDates);
  };

  function renderStatus() {
    const status = getStatus();
    const label = labels[status] || labels["not-started"];

    statusButton.className = `status-badge status-${status}`;
    statusLabel.textContent = label;
    statusButton.setAttribute("aria-label", `Change status, currently ${label}`);
    summaryStatus.textContent = label;
    summaryStatus.className = `summary-status-text status-text-${status}`;

    const futureTracked = status === "not-started" ? 0 : 0;
    summaryAyahCount.textContent = `${futureTracked} of ${surah.ayahCount} ayat tracked`;
    summaryProgressFill.style.width = "0%";

    const started = startedDates[number];
    startedDateValue.textContent = started ? formatDate(started) : "Not started yet";
    startedDateHelp.textContent = started
      ? "This date was recorded when the surah first moved beyond Not Started."
      : "The date will be added when this surah first moves into In Progress, Memorized, or Needs Revision.";
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

    const selectedOption =
      statusOptions.find(option => option.dataset.statusChoice === current) ||
      statusOptions[0];
    selectedOption.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      modalBackdrop.hidden = true;
    }, 150);
    statusButton.focus();
  }

  statusButton.addEventListener("click", openModal);

  statusOptions.forEach(option => {
    option.addEventListener("click", () => {
      const nextStatus = option.dataset.statusChoice;
      statuses[number] = nextStatus;
      ensureStartedDate(nextStatus);
      safeWriteObject(STATUS_STORAGE_KEY, statuses);
      renderStatus();
      closeModal();
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modalBackdrop.hidden) closeModal();
  });

  const renderNotesCount = () => {
    notesCount.textContent = `${notesField.value.length} / 3000`;
  };

  notesField.value = typeof notes[number] === "string" ? notes[number] : "";
  renderNotesCount();

  notesField.addEventListener("input", () => {
    renderNotesCount();
    notesStatus.textContent = "Saving…";
    clearTimeout(notesSaveTimer);

    notesSaveTimer = setTimeout(() => {
      notes[number] = notesField.value;
      const saved = safeWriteObject(NOTES_STORAGE_KEY, notes);
      notesStatus.textContent = saved ? "Saved." : "Could not save on this device.";
    }, 350);
  });

  renderStatus();
})();