(() => {
  const STATUS_STORAGE_KEY = "ummibyMemorizationSurahStatuses";
  const STARTED_STORAGE_KEY = "ummibyMemorizationSurahStartedDates";
  const NOTES_STORAGE_KEY = "ummibyMemorizationSurahNotes";
  const AYAH_STORAGE_KEY = "ummibyMemorizationAyahStatuses";
  const AUTO_SYNC_KEY = "ummibyMemorizationAutoSurahStatus";
  const COMPLETION_KEY = "ummibyMemorizationAyahCompletionAcknowledgements";

  const labels = {"not-started":"Not Started","in-progress":"In Progress",memorized:"Memorized","needs-revision":"Needs Revision"};
  const ayahLabels = {"not-started":"Not Started",learning:"Learning",memorized:"Memorized","needs-revision":"Needs Revision"};
  const ayahSymbols = {"not-started":"○",learning:"•",memorized:"✓","needs-revision":"↺"};
  const ayahDescriptions = {
    "not-started":"This ayah has not been started yet.",
    learning:"I am currently memorizing this ayah.",
    memorized:"I can recite this ayah from memory.",
    "needs-revision":"I memorized this ayah, but it needs strengthening."
  };
  const ayahStatusList = ["not-started", "learning", "memorized", "needs-revision"];

  const number = Math.min(114, Math.max(1, Number(new URLSearchParams(location.search).get("surah")) || 1));
  const surahSource = Array.isArray(window.QURAN_SURAHS) ? window.QURAN_SURAHS : (Array.isArray(window.QURAN_DATA) ? window.QURAN_DATA : []);
  const surah = surahSource.find(item => Number(item.number) === number);
  if (!surah) return;
  const ayahTotal = Number(surah.ayahCount) || 0;
  const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);

  const safeReadObject = key => { try { const value = JSON.parse(localStorage.getItem(key) || "{}"); return value && typeof value === "object" && !Array.isArray(value) ? value : {}; } catch { return {}; } };
  const safeWriteObject = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };

  let statuses = safeReadObject(STATUS_STORAGE_KEY);
  let startedDates = safeReadObject(STARTED_STORAGE_KEY);
  let notes = safeReadObject(NOTES_STORAGE_KEY);
  let ayahStatuses = safeReadObject(AYAH_STORAGE_KEY);
  let autoSync = safeReadObject(AUTO_SYNC_KEY);
  let completions = safeReadObject(COMPLETION_KEY);

  if (statuses[number] === "needs-review") statuses[number] = "needs-revision";
  if (statuses[number] === "mastered") statuses[number] = "memorized";

  const getStatus = () => statuses[number] || "not-started";
  const getAyahMap = () => {
    const map = ayahStatuses[String(number)];
    return map && typeof map === "object" && !Array.isArray(map) ? map : {};
  };
  const getAyahStatus = ayah => ayahStatusList.includes(getAyahMap()[String(ayah)]) ? getAyahMap()[String(ayah)] : "not-started";
  const hasTrackedAyahs = () => Object.values(getAyahMap()).some(status => status && status !== "not-started");
  const revelation = MADANI_SURAHS.has(number) ? "Madani" : "Makki";

  document.title = `${surah.name} Memorization | Ummiby Companion`;
  document.getElementById("surahBreadcrumb").textContent = surah.name;
  document.getElementById("detailNumber").textContent = surah.number;
  document.getElementById("detailNumberInline").textContent = surah.number;
  document.getElementById("detailArabic").textContent = surah.arabicName;
  document.getElementById("detailName").textContent = surah.name;
  document.getElementById("detailRevelation").textContent = revelation;
  document.getElementById("detailAyahCount").textContent = `${ayahTotal} ayat`;
  document.getElementById("readSurahLink").href = `surah-reader.html?surah=${surah.number}`;

  const statusButton = document.getElementById("detailStatusButton"), statusLabel = document.getElementById("detailStatusLabel"), summaryStatus = document.getElementById("summaryStatus"), summaryAyahCount = document.getElementById("summaryAyahCount"), summaryProgressFill = document.getElementById("summaryProgressFill"), summaryPercentText = document.getElementById("summaryPercentText"), startedDateValue = document.getElementById("startedDateValue"), startedDateHelp = document.getElementById("startedDateHelp"), ring = document.getElementById("ayahProgressRing"), ringMemorized = document.getElementById("ringMemorized"), ringTotal = document.getElementById("ringTotal"), countsEl = document.getElementById("ayahSummaryCounts"), ayahGrid = document.getElementById("ayahGrid"), firstUse = document.getElementById("ayahFirstUse"), legend = document.getElementById("ayahStatusLegend"), completionMessage = document.getElementById("completionMessage"), completionText = document.getElementById("completionText");
  const modalBackdrop = document.getElementById("statusModalBackdrop"), modalClose = document.getElementById("statusModalClose"), modalSurah = document.getElementById("statusModalSurah"), statusOptions = [...document.querySelectorAll("[data-status-choice]")];
  const ayahModalBackdrop = document.getElementById("ayahModalBackdrop"), ayahModalClose = document.getElementById("ayahModalClose"), ayahModalTitle = document.getElementById("ayahModalTitle"), ayahStatusOptions = document.getElementById("ayahStatusOptions");
  const bulkButton = document.getElementById("bulkActionsButton"), bulkMenu = document.getElementById("bulkActionsMenu"), bulkBackdrop = document.getElementById("bulkConfirmBackdrop"), bulkText = document.getElementById("bulkConfirmText"), bulkConfirm = document.getElementById("bulkConfirm"), bulkCancel = document.getElementById("bulkCancel"), bulkClose = document.getElementById("bulkConfirmClose");
  let notesSaveTimer = null, activeAyah = null, lastAyahTile = null, pendingBulk = null, lastBulkFocus = null;

  const formatDate = isoDate => { if (!isoDate) return ""; const parsed = new Date(`${isoDate}T12:00:00`); return Number.isNaN(parsed.getTime()) ? isoDate : new Intl.DateTimeFormat(undefined,{month:"long",day:"numeric",year:"numeric"}).format(parsed); };
  const ensureStartedDate = status => { if (status === "not-started" || startedDates[number]) return; startedDates[number] = new Date().toISOString().slice(0, 10); safeWriteObject(STARTED_STORAGE_KEY, startedDates); };
  const calculateCounts = () => { const counts = {"not-started":0,learning:0,memorized:0,"needs-revision":0}; for (let i=1;i<=ayahTotal;i+=1) counts[getAyahStatus(i)] += 1; return counts; };

  function setAyahMap(map) { ayahStatuses[String(number)] = map; safeWriteObject(AYAH_STORAGE_KEY, ayahStatuses); }
  function setAyahStatus(ayah, status) { const map = {...getAyahMap()}; if (status === "not-started") delete map[String(ayah)]; else map[String(ayah)] = status; setAyahMap(map); }
  function syncSurahStatus(counts) {
    if (autoSync.enabled !== true || getStatus() === "needs-revision") return;
    let next = getStatus();
    if (counts.memorized === ayahTotal && ayahTotal > 0) next = "memorized";
    else if (counts.learning > 0 || counts.memorized > 0) next = "in-progress";
    else if (getStatus() === "not-started") next = "not-started";
    statuses[number] = next; ensureStartedDate(next); safeWriteObject(STATUS_STORAGE_KEY, statuses);
  }

  function renderStatus() {
    const status = getStatus(), label = labels[status] || labels["not-started"];
    statusButton.className = `status-badge status-${status}`; statusLabel.textContent = label; statusButton.setAttribute("aria-label", `Change status, currently ${label}`); summaryStatus.textContent = label; summaryStatus.className = `summary-status-text status-text-${status}`;
    const started = startedDates[number]; startedDateValue.textContent = started ? formatDate(started) : "Not started yet"; startedDateHelp.textContent = started ? "This date was recorded when the surah first moved beyond Not Started." : "The date will be added when this surah first moves into In Progress, Memorized, or Needs Revision.";
  }
  function renderAyahProgress() {
    const counts = calculateCounts(), percent = ayahTotal ? Math.round((counts.memorized / ayahTotal) * 100) : 0;
    summaryAyahCount.textContent = `${counts.memorized} of ${ayahTotal} ayat memorized`; summaryPercentText.textContent = `${percent}% Memorized`; summaryProgressFill.style.width = `${percent}%`; ring.style.setProperty("--progress", `${percent}%`); ring.setAttribute("aria-label", `${counts.memorized} of ${ayahTotal} ayat memorized, ${percent}% Memorized`); ringMemorized.textContent = counts.memorized; ringTotal.textContent = `of ${ayahTotal}`;
    countsEl.innerHTML = ayahStatusList.map(status => `<span class="ayah-count-pill ayah-${status}"><strong>${counts[status]}</strong> ${ayahLabels[status]}</span>`).join("") + `<span class="ayah-count-pill total"><strong>${ayahTotal}</strong> Total ayat</span>`;
    firstUse.hidden = hasTrackedAyahs();
    const nextAyah = Array.from({length: ayahTotal}, (_, i) => i + 1).find(i => getAyahStatus(i) === "not-started");
    ayahGrid.innerHTML = Array.from({length: ayahTotal}, (_, i) => {
      const ayah = i + 1, status = getAyahStatus(ayah), suggested = ayah === nextAyah, label = `Ayah ${ayah}, ${ayahLabels[status]}${suggested ? ", suggested next ayah" : ""}`;
      return `<button class="ayah-tile ayah-${status}${suggested ? " suggested" : ""}" type="button" data-ayah="${ayah}" aria-label="${label}"><span class="ayah-number">${ayah}</span><span class="ayah-symbol" aria-hidden="true">${ayahSymbols[status]}</span></button>`;
    }).join("");
    renderStatus();
  }
  legend.innerHTML = ayahStatusList.map(status => `<span class="legend-item ayah-${status}"><span aria-hidden="true">${ayahSymbols[status]}</span>${ayahLabels[status]}</span>`).join("");
  ayahStatusOptions.innerHTML = ayahStatusList.map(status => `<button type="button" class="status-option ayah-option ayah-${status}" data-ayah-status="${status}" role="radio"><span class="status-option-mark">${ayahSymbols[status]}</span><span><strong>${ayahLabels[status]}</strong><small>${ayahDescriptions[status]}</small></span></button>`).join("");

  function openModal() { modalSurah.textContent = `${surah.arabicName} · ${surah.name}`; const current = getStatus(); statusOptions.forEach(option => { const selected = option.dataset.statusChoice === current; option.classList.toggle("selected", selected); option.setAttribute("aria-checked", String(selected)); }); modalBackdrop.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => modalBackdrop.classList.add("open")); (statusOptions.find(option => option.dataset.statusChoice === current) || statusOptions[0]).focus(); }
  function closeModal() { modalBackdrop.classList.remove("open"); document.body.classList.remove("modal-open"); setTimeout(() => { modalBackdrop.hidden = true; }, 150); statusButton.focus(); }
  statusButton.addEventListener("click", openModal);
  statusOptions.forEach(option => option.addEventListener("click", () => { const nextStatus = option.dataset.statusChoice; statuses[number] = nextStatus; ensureStartedDate(nextStatus); safeWriteObject(STATUS_STORAGE_KEY, statuses); renderStatus(); closeModal(); }));
  modalClose.addEventListener("click", closeModal); modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });

  function openAyahModal(ayah, trigger) { activeAyah = ayah; lastAyahTile = trigger; ayahModalTitle.textContent = `Ayah ${ayah}`; const current = getAyahStatus(ayah); ayahStatusOptions.querySelectorAll("[data-ayah-status]").forEach(option => { const selected = option.dataset.ayahStatus === current; option.classList.toggle("selected", selected); option.setAttribute("aria-checked", String(selected)); }); ayahModalBackdrop.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => ayahModalBackdrop.classList.add("open")); (ayahStatusOptions.querySelector(`[data-ayah-status="${current}"]`) || ayahStatusOptions.firstElementChild)?.focus(); }
  function closeAyahModal() { ayahModalBackdrop.classList.remove("open"); document.body.classList.remove("modal-open"); setTimeout(() => { ayahModalBackdrop.hidden = true; }, 150); lastAyahTile?.focus?.(); }
  ayahGrid.addEventListener("click", event => { const tile = event.target.closest("[data-ayah]"); if (tile) openAyahModal(Number(tile.dataset.ayah), tile); });
  ayahStatusOptions.addEventListener("click", event => { const option = event.target.closest("[data-ayah-status]"); if (!option || !activeAyah) return; const before = calculateCounts(); setAyahStatus(activeAyah, option.dataset.ayahStatus); const after = calculateCounts(); syncSurahStatus(after); renderAyahProgress(); closeAyahModal(); if (before.memorized < ayahTotal && after.memorized === ayahTotal && !completions[number]) { completions[number] = true; safeWriteObject(COMPLETION_KEY, completions); completionText.textContent = `Alhamdulillah! You have memorized Surah ${surah.name}.`; completionMessage.hidden = false; } });
  ayahModalClose.addEventListener("click", closeAyahModal); ayahModalBackdrop.addEventListener("click", e => { if (e.target === ayahModalBackdrop) closeAyahModal(); });

  document.querySelectorAll('[name="autoSyncStatus"]').forEach(input => { input.checked = autoSync.enabled === (input.value === "yes"); input.addEventListener("change", () => { autoSync = { enabled: input.value === "yes", updatedAt: new Date().toISOString() }; safeWriteObject(AUTO_SYNC_KEY, autoSync); if (autoSync.enabled) { syncSurahStatus(calculateCounts()); renderStatus(); } }); });
  document.getElementById("completionDismiss").addEventListener("click", () => { completionMessage.hidden = true; });

  function openBulkConfirm(action, trigger) { pendingBulk = action; lastBulkFocus = trigger; const text = action === "memorized" ? `Mark all ${ayahTotal} ayat of Surah ${surah.name} as Memorized?` : action === "not-started" ? `Mark all ${ayahTotal} ayat of Surah ${surah.name} as Not Started?` : `Clear ayah progress for Surah ${surah.name}?`; bulkText.textContent = text; bulkBackdrop.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => bulkBackdrop.classList.add("open")); bulkCancel.focus(); }
  function closeBulk() { bulkBackdrop.classList.remove("open"); document.body.classList.remove("modal-open"); setTimeout(() => { bulkBackdrop.hidden = true; }, 150); lastBulkFocus?.focus?.(); }
  bulkButton.addEventListener("click", () => { const open = bulkMenu.hidden; bulkMenu.hidden = !open; bulkButton.setAttribute("aria-expanded", String(open)); });
  bulkMenu.addEventListener("click", e => { const b = e.target.closest("[data-bulk-action]"); if (!b) return; bulkMenu.hidden = true; bulkButton.setAttribute("aria-expanded", "false"); openBulkConfirm(b.dataset.bulkAction, bulkButton); });
  bulkConfirm.addEventListener("click", () => { if (pendingBulk === "clear") delete ayahStatuses[String(number)]; else if (pendingBulk === "not-started") ayahStatuses[String(number)] = {}; else ayahStatuses[String(number)] = Object.fromEntries(Array.from({length: ayahTotal}, (_, i) => [String(i + 1), "memorized"])); safeWriteObject(AYAH_STORAGE_KEY, ayahStatuses); const counts = calculateCounts(); syncSurahStatus(counts); renderAyahProgress(); closeBulk(); if (pendingBulk === "memorized" && !completions[number]) { completions[number] = true; safeWriteObject(COMPLETION_KEY, completions); completionText.textContent = `Alhamdulillah! You have memorized Surah ${surah.name}.`; completionMessage.hidden = false; } });
  [bulkCancel, bulkClose].forEach(b => b.addEventListener("click", closeBulk)); bulkBackdrop.addEventListener("click", e => { if (e.target === bulkBackdrop) closeBulk(); });
  document.addEventListener("click", e => { if (!bulkMenu.hidden && !e.target.closest(".bulk-actions-wrap")) { bulkMenu.hidden = true; bulkButton.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { if (!modalBackdrop.hidden) closeModal(); if (!ayahModalBackdrop.hidden) closeAyahModal(); if (!bulkBackdrop.hidden) closeBulk(); if (!bulkMenu.hidden) { bulkMenu.hidden = true; bulkButton.setAttribute("aria-expanded", "false"); } } });

  const notesField = document.getElementById("surahNotes"), notesStatus = document.getElementById("notesStatus"), notesCount = document.getElementById("notesCount");
  const renderNotesCount = () => { notesCount.textContent = `${notesField.value.length} / 3000`; };
  notesField.value = typeof notes[number] === "string" ? notes[number] : ""; renderNotesCount();
  notesField.addEventListener("input", () => { renderNotesCount(); notesStatus.textContent = "Saving…"; clearTimeout(notesSaveTimer); notesSaveTimer = setTimeout(() => { notes[number] = notesField.value; notesStatus.textContent = safeWriteObject(NOTES_STORAGE_KEY, notes) ? "Saved." : "Could not save on this device."; }, 350); });

  renderAyahProgress();
})();
