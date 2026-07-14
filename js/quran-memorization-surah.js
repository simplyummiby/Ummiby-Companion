(() => {
  const STATUS_STORAGE_KEY = "ummibyMemorizationSurahStatuses";
  const STARTED_STORAGE_KEY = "ummibyMemorizationSurahStartedDates";
  const NOTES_STORAGE_KEY = "ummibyMemorizationSurahNotes";
  const AYAH_STORAGE_KEY = "ummibyMemorizationAyahStatuses";
  const AUTO_SYNC_KEY = "ummibyMemorizationAutoSurahStatus";
  const COMPLETION_KEY = "ummibyMemorizationAyahCompletionAcknowledgements";
  const HIDE_MEMORIZED_KEY = "ummibyMemorizationHideMemorized";
  const WORKSPACE_POSITION_KEY = "ummibyMemorizationAyahWorkspacePosition";

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
  const filterList = ["all", ...ayahStatusList];

  const number = Math.min(114, Math.max(1, Number(new URLSearchParams(location.search).get("surah")) || 1));
  const surahSource = Array.isArray(window.QURAN_SURAHS) ? window.QURAN_SURAHS : (Array.isArray(window.QURAN_DATA) ? window.QURAN_DATA : []);
  const surah = surahSource.find(item => Number(item.number) === number);
  if (!surah) return;
  const ayahTotal = Number(surah.ayahCount) || 0;
  const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);

  const safeReadObject = key => { try { const value = JSON.parse(localStorage.getItem(key) || "{}"); return value && typeof value === "object" && !Array.isArray(value) ? value : {}; } catch { return {}; } };
  const safeWriteObject = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const safeReadBoolean = key => { try { return localStorage.getItem(key) === "true"; } catch { return false; } };
  const safeWriteBoolean = (key, value) => { try { localStorage.setItem(key, value ? "true" : "false"); return true; } catch { return false; } };

  let statuses = safeReadObject(STATUS_STORAGE_KEY);
  let startedDates = safeReadObject(STARTED_STORAGE_KEY);
  let notes = safeReadObject(NOTES_STORAGE_KEY);
  let ayahStatuses = safeReadObject(AYAH_STORAGE_KEY);
  let autoSync = safeReadObject(AUTO_SYNC_KEY);
  let completions = safeReadObject(COMPLETION_KEY);
  let workspacePositions = safeReadObject(WORKSPACE_POSITION_KEY);
  let activeFilter = "all";
  let hideMemorized = safeReadBoolean(HIDE_MEMORIZED_KEY);
  let currentWorkingAyah = null;

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
  const ayahRange = () => Array.from({length: ayahTotal}, (_, i) => i + 1);

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
  const workspaceProgress = document.getElementById("workspaceProgress"), filterChips = document.getElementById("workspaceFilterChips"), hideMemorizedToggle = document.getElementById("hideMemorizedToggle"), workspaceMessage = document.getElementById("workspaceMessage"), workspaceEmpty = document.getElementById("ayahWorkspaceEmpty"), clearWorkspaceFilter = document.getElementById("clearWorkspaceFilter"), goToAyahForm = document.getElementById("goToAyahForm"), goToAyahInput = document.getElementById("goToAyahInput"), workspaceResume = document.getElementById("workspaceResume"), workspaceResumeText = document.getElementById("workspaceResumeText"), workspaceResumeButton = document.getElementById("workspaceResumeButton");
  const jumpButtons = {"not-started": document.getElementById("jumpNextAyah"), learning: document.getElementById("jumpLearningAyah"), "needs-revision": document.getElementById("jumpRevisionAyah")};
  let notesSaveTimer = null, activeAyah = null, lastAyahTile = null, pendingBulk = null, lastBulkFocus = null, highlightTimer = null, messageTimer = null;

  goToAyahInput.max = String(ayahTotal);
  filterChips.innerHTML = filterList.map(filter => `<button class="filter-chip workspace-filter-chip" type="button" data-workspace-filter="${filter}" aria-pressed="false">${filter === "all" ? "All" : ayahLabels[filter]}</button>`).join("");
  hideMemorizedToggle.checked = hideMemorized;

  const formatDate = isoDate => { if (!isoDate) return ""; const parsed = new Date(`${isoDate}T12:00:00`); return Number.isNaN(parsed.getTime()) ? isoDate : new Intl.DateTimeFormat(undefined,{month:"long",day:"numeric",year:"numeric"}).format(parsed); };
  const ensureStartedDate = status => { if (status === "not-started" || startedDates[number]) return; startedDates[number] = new Date().toISOString().slice(0, 10); safeWriteObject(STARTED_STORAGE_KEY, startedDates); };
  const calculateCounts = () => { const counts = {"not-started":0,learning:0,memorized:0,"needs-revision":0}; for (let i=1;i<=ayahTotal;i+=1) counts[getAyahStatus(i)] += 1; return counts; };
  const isValidAyah = ayah => Number.isInteger(ayah) && ayah >= 1 && ayah <= ayahTotal;
  const findFirstAyahByStatus = status => ayahRange().find(i => getAyahStatus(i) === status);
  const shouldShowAyah = ayah => {
    const status = getAyahStatus(ayah);
    if (activeFilter !== "all" && status !== activeFilter) return false;
    // The Memorized filter intentionally ignores Hide Memorized so users can still inspect memorized ayahs.
    if (hideMemorized && activeFilter !== "memorized" && status === "memorized") return false;
    return true;
  };
  const setWorkspaceMessage = text => { clearTimeout(messageTimer); workspaceMessage.textContent = text || ""; if (text) messageTimer = setTimeout(() => { workspaceMessage.textContent = ""; }, 4500); };
  const saveWorkspacePosition = ayah => { if (!isValidAyah(ayah)) return; workspacePositions[String(number)] = { ayah, updatedAt: new Date().toISOString() }; safeWriteObject(WORKSPACE_POSITION_KEY, workspacePositions); renderResume(); };
  const setWorkingAyah = ayah => { currentWorkingAyah = isValidAyah(ayah) ? ayah : null; };
  const getSavedResumeAyah = () => { const record = workspacePositions[String(number)]; const ayah = Number(record?.ayah); return isValidAyah(ayah) ? ayah : null; };

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
  function renderWorkspaceControls(counts) {
    workspaceProgress.textContent = `${counts.memorized} / ${ayahTotal} Memorized`;
    filterChips.querySelectorAll("[data-workspace-filter]").forEach(button => { const active = button.dataset.workspaceFilter === activeFilter; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
    hideMemorizedToggle.checked = hideMemorized;
    Object.entries(jumpButtons).forEach(([status, button]) => { const target = findFirstAyahByStatus(status); button.disabled = !target; button.title = target ? `Jump to Ayah ${target}` : `No ${ayahLabels[status]} ayahs right now.`; button.setAttribute("aria-label", target ? `${button.textContent}, Ayah ${target}` : `${button.textContent}. No ${ayahLabels[status]} ayahs right now.`); });
  }
  function renderResume() {
    const resumeAyah = getSavedResumeAyah();
    workspaceResume.hidden = !resumeAyah;
    if (resumeAyah) workspaceResumeText.textContent = `Resume near Ayah ${resumeAyah}`;
  }
  function renderAyahProgress() {
    const counts = calculateCounts(), percent = ayahTotal ? Math.round((counts.memorized / ayahTotal) * 100) : 0;
    summaryAyahCount.textContent = `${counts.memorized} of ${ayahTotal} ayat memorized`; summaryPercentText.textContent = `${percent}% Memorized`; summaryProgressFill.style.width = `${percent}%`; ring.style.setProperty("--progress", `${percent}%`); ring.setAttribute("aria-label", `${counts.memorized} of ${ayahTotal} ayat memorized, ${percent}% Memorized`); ringMemorized.textContent = counts.memorized; ringTotal.textContent = `of ${ayahTotal}`;
    countsEl.innerHTML = ayahStatusList.map(status => `<span class="ayah-count-pill ayah-${status}"><strong>${counts[status]}</strong> ${ayahLabels[status]}</span>`).join("") + `<span class="ayah-count-pill total"><strong>${ayahTotal}</strong> Total ayat</span>`;
    firstUse.hidden = hasTrackedAyahs();
    if (!currentWorkingAyah) setWorkingAyah(getSavedResumeAyah() || findFirstAyahByStatus("not-started"));
    const visibleAyahs = ayahRange().filter(shouldShowAyah);
    ayahGrid.hidden = visibleAyahs.length === 0;
    workspaceEmpty.hidden = visibleAyahs.length > 0;
    ayahGrid.innerHTML = visibleAyahs.map(ayah => {
      const status = getAyahStatus(ayah), working = ayah === currentWorkingAyah, label = `Ayah ${ayah}, ${ayahLabels[status]}${working ? ", current working ayah" : ""}`;
      return `<button class="ayah-tile ayah-${status}${working ? " current-working" : ""}" type="button" data-ayah="${ayah}" aria-label="${label}"><span class="ayah-number">${ayah}</span><span class="ayah-symbol" aria-hidden="true">${ayahSymbols[status]}</span></button>`;
    }).join("");
    renderWorkspaceControls(counts);
    renderResume();
    renderStatus();
  }
  legend.innerHTML = ayahStatusList.map(status => `<span class="legend-item ayah-${status}"><span aria-hidden="true">${ayahSymbols[status]}</span>${ayahLabels[status]}</span>`).join("");
  ayahStatusOptions.innerHTML = ayahStatusList.map(status => `<button type="button" class="status-option ayah-option ayah-${status}" data-ayah-status="${status}" role="radio"><span class="status-option-mark">${ayahSymbols[status]}</span><span><strong>${ayahLabels[status]}</strong><small>${ayahDescriptions[status]}</small></span></button>`).join("");

  function revealAyah(ayah, reason = "jump") {
    if (!isValidAyah(ayah)) return false;
    if (!shouldShowAyah(ayah)) {
      activeFilter = "all";
      if (getAyahStatus(ayah) === "memorized" && hideMemorized) hideMemorized = false;
      safeWriteBoolean(HIDE_MEMORIZED_KEY, hideMemorized);
      setWorkspaceMessage(`Ayah ${ayah} was hidden by the current view, so All ayahs are shown now.`);
      renderAyahProgress();
    }
    setWorkingAyah(ayah);
    saveWorkspacePosition(ayah);
    renderAyahProgress();
    const tile = ayahGrid.querySelector(`[data-ayah="${ayah}"]`);
    if (!tile) return false;
    clearTimeout(highlightTimer);
    tile.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => tile.focus({ preventScroll: true }), 320);
    tile.classList.add("target-highlight");
    highlightTimer = setTimeout(() => tile.classList.remove("target-highlight"), 2200);
    if (reason === "jump") setWorkspaceMessage(`Moved to Ayah ${ayah}.`);
    return true;
  }
  function openModal() { modalSurah.textContent = `${surah.arabicName} · ${surah.name}`; const current = getStatus(); statusOptions.forEach(option => { const selected = option.dataset.statusChoice === current; option.classList.toggle("selected", selected); option.setAttribute("aria-checked", String(selected)); }); modalBackdrop.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => modalBackdrop.classList.add("open")); (statusOptions.find(option => option.dataset.statusChoice === current) || statusOptions[0]).focus(); }
  function closeModal() { modalBackdrop.classList.remove("open"); document.body.classList.remove("modal-open"); setTimeout(() => { modalBackdrop.hidden = true; }, 150); statusButton.focus(); }
  statusButton.addEventListener("click", openModal);
  statusOptions.forEach(option => option.addEventListener("click", () => { const nextStatus = option.dataset.statusChoice; statuses[number] = nextStatus; ensureStartedDate(nextStatus); safeWriteObject(STATUS_STORAGE_KEY, statuses); renderStatus(); closeModal(); }));
  modalClose.addEventListener("click", closeModal); modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });

  function openAyahModal(ayah, trigger) { activeAyah = ayah; lastAyahTile = trigger; setWorkingAyah(ayah); saveWorkspacePosition(ayah); renderAyahProgress(); ayahModalTitle.textContent = `Ayah ${ayah}`; const current = getAyahStatus(ayah); ayahStatusOptions.querySelectorAll("[data-ayah-status]").forEach(option => { const selected = option.dataset.ayahStatus === current; option.classList.toggle("selected", selected); option.setAttribute("aria-checked", String(selected)); }); ayahModalBackdrop.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => ayahModalBackdrop.classList.add("open")); (ayahStatusOptions.querySelector(`[data-ayah-status="${current}"]`) || ayahStatusOptions.firstElementChild)?.focus(); }
  function closeAyahModal() { ayahModalBackdrop.classList.remove("open"); document.body.classList.remove("modal-open"); setTimeout(() => { ayahModalBackdrop.hidden = true; }, 150); (ayahGrid.querySelector(`[data-ayah="${activeAyah}"]`) || lastAyahTile)?.focus?.(); }
  ayahGrid.addEventListener("click", event => { const tile = event.target.closest("[data-ayah]"); if (tile) openAyahModal(Number(tile.dataset.ayah), tile); });
  ayahStatusOptions.addEventListener("click", event => { const option = event.target.closest("[data-ayah-status]"); if (!option || !activeAyah) return; const before = calculateCounts(); setAyahStatus(activeAyah, option.dataset.ayahStatus); setWorkingAyah(activeAyah); saveWorkspacePosition(activeAyah); const after = calculateCounts(); syncSurahStatus(after); renderAyahProgress(); closeAyahModal(); if (before.memorized < ayahTotal && after.memorized === ayahTotal && !completions[number]) { completions[number] = true; safeWriteObject(COMPLETION_KEY, completions); completionText.textContent = `Alhamdulillah! You have memorized Surah ${surah.name}.`; completionMessage.hidden = false; } });
  ayahModalClose.addEventListener("click", closeAyahModal); ayahModalBackdrop.addEventListener("click", e => { if (e.target === ayahModalBackdrop) closeAyahModal(); });

  filterChips.addEventListener("click", event => { const button = event.target.closest("[data-workspace-filter]"); if (!button) return; activeFilter = button.dataset.workspaceFilter; renderAyahProgress(); setWorkspaceMessage(activeFilter === "all" ? "Showing all ayahs." : `Showing ${ayahLabels[activeFilter]} ayahs.`); });
  clearWorkspaceFilter.addEventListener("click", () => { activeFilter = "all"; hideMemorized = false; safeWriteBoolean(HIDE_MEMORIZED_KEY, hideMemorized); renderAyahProgress(); setWorkspaceMessage("Showing all ayahs."); });
  hideMemorizedToggle.addEventListener("change", () => { hideMemorized = hideMemorizedToggle.checked; safeWriteBoolean(HIDE_MEMORIZED_KEY, hideMemorized); renderAyahProgress(); setWorkspaceMessage(hideMemorized ? "Memorized ayahs are hidden in this view." : "Memorized ayahs are visible again."); });
  Object.entries(jumpButtons).forEach(([status, button]) => button.addEventListener("click", () => { const ayah = findFirstAyahByStatus(status); if (ayah) revealAyah(ayah); else setWorkspaceMessage(`No ${ayahLabels[status]} ayahs right now.`); }));
  goToAyahForm.addEventListener("submit", event => { event.preventDefault(); const ayah = Number(goToAyahInput.value); if (!isValidAyah(ayah)) { setWorkspaceMessage(`Enter an ayah number from 1 to ${ayahTotal}.`); goToAyahInput.focus(); return; } revealAyah(ayah, "go"); });
  workspaceResumeButton.addEventListener("click", () => { const ayah = getSavedResumeAyah(); if (ayah) revealAyah(ayah, "resume"); });

  document.querySelectorAll('[name="autoSyncStatus"]').forEach(input => { input.checked = autoSync.enabled === (input.value === "yes"); input.addEventListener("change", () => { autoSync = { enabled: input.value === "yes", updatedAt: new Date().toISOString() }; safeWriteObject(AUTO_SYNC_KEY, autoSync); if (autoSync.enabled) { syncSurahStatus(calculateCounts()); renderStatus(); } }); });
  document.getElementById("completionDismiss").addEventListener("click", () => { completionMessage.hidden = true; });

  function openBulkConfirm(action, trigger) { pendingBulk = action; lastBulkFocus = trigger; const text = action === "memorized" ? `Mark all ${ayahTotal} ayat of Surah ${surah.name} as Memorized?` : action === "not-started" ? `Mark all ${ayahTotal} ayat of Surah ${surah.name} as Not Started?` : `Clear ayah progress for Surah ${surah.name}?`; bulkText.textContent = text; bulkBackdrop.hidden = false; document.body.classList.add("modal-open"); requestAnimationFrame(() => bulkBackdrop.classList.add("open")); bulkCancel.focus(); }
  function closeBulk() { bulkBackdrop.classList.remove("open"); document.body.classList.remove("modal-open"); setTimeout(() => { bulkBackdrop.hidden = true; }, 150); lastBulkFocus?.focus?.(); }
  bulkButton.addEventListener("click", () => { const open = bulkMenu.hidden; bulkMenu.hidden = !open; bulkButton.setAttribute("aria-expanded", String(open)); });
  bulkMenu.addEventListener("click", e => { const b = e.target.closest("[data-bulk-action]"); if (!b) return; bulkMenu.hidden = true; bulkButton.setAttribute("aria-expanded", "false"); openBulkConfirm(b.dataset.bulkAction, bulkButton); });
  bulkConfirm.addEventListener("click", () => { if (pendingBulk === "clear") delete ayahStatuses[String(number)]; else if (pendingBulk === "not-started") ayahStatuses[String(number)] = {}; else ayahStatuses[String(number)] = Object.fromEntries(ayahRange().map(i => [String(i), "memorized"])); safeWriteObject(AYAH_STORAGE_KEY, ayahStatuses); const counts = calculateCounts(); syncSurahStatus(counts); setWorkingAyah(findFirstAyahByStatus("not-started") || 1); renderAyahProgress(); closeBulk(); if (pendingBulk === "memorized" && !completions[number]) { completions[number] = true; safeWriteObject(COMPLETION_KEY, completions); completionText.textContent = `Alhamdulillah! You have memorized Surah ${surah.name}.`; completionMessage.hidden = false; } });
  [bulkCancel, bulkClose].forEach(b => b.addEventListener("click", closeBulk)); bulkBackdrop.addEventListener("click", e => { if (e.target === bulkBackdrop) closeBulk(); });
  document.addEventListener("click", e => { if (!bulkMenu.hidden && !e.target.closest(".bulk-actions-wrap")) { bulkMenu.hidden = true; bulkButton.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { if (!modalBackdrop.hidden) closeModal(); if (!ayahModalBackdrop.hidden) closeAyahModal(); if (!bulkBackdrop.hidden) closeBulk(); if (!bulkMenu.hidden) { bulkMenu.hidden = true; bulkButton.setAttribute("aria-expanded", "false"); } } });

  const notesField = document.getElementById("surahNotes"), notesStatus = document.getElementById("notesStatus"), notesCount = document.getElementById("notesCount");
  const renderNotesCount = () => { notesCount.textContent = `${notesField.value.length} / 3000`; };
  notesField.value = typeof notes[number] === "string" ? notes[number] : ""; renderNotesCount();
  notesField.addEventListener("input", () => { renderNotesCount(); notesStatus.textContent = "Saving…"; clearTimeout(notesSaveTimer); notesSaveTimer = setTimeout(() => { notes[number] = notesField.value; notesStatus.textContent = safeWriteObject(NOTES_STORAGE_KEY, notes) ? "Saved." : "Could not save on this device."; }, 350); });

  renderAyahProgress();
})();
