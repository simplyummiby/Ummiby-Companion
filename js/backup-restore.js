(() => {
  "use strict";
  const FORMAT = "ummiby-companion";
  const SCHEMA_VERSION = 1;
  const config = window.UmmibyAppConfig || { version: "Unknown" };

  const scopeDefinitions = Object.freeze({
    duaa: {
      label: "Duaa data",
      prefixes: ["ummibyDuaa"],
      exact: []
    },
    quran: {
      label: "Qur’an data",
      prefixes: ["ummibyQuran", "ummiby.quran", "quran", "readingJourney", "ramadanJourney"],
      exact: ["ramadanJourneyStarted"]
    },
    app: {
      label: "App-wide data",
      prefixes: ["ummibyApp"],
      exact: []
    }
  });

  const exportButtons = document.querySelectorAll("[data-export-scope]");
  const fileInput = document.getElementById("backupFile");
  const fileName = document.getElementById("backupFileName");
  const summary = document.getElementById("backupSummary");
  const restoreButton = document.getElementById("restoreButton");
  const status = document.getElementById("backupStatus");
  const dialog = document.getElementById("restoreDialog");
  const confirmRestore = document.getElementById("confirmRestore");
  const cancelRestore = document.getElementById("cancelRestore");
  let pendingBackup = null;

  function matchesDefinition(key, definition) {
    return definition.exact.includes(key) || definition.prefixes.some((prefix) => key.startsWith(prefix));
  }

  function keysForSection(section) {
    const definition = scopeDefinitions[section];
    return Object.keys(localStorage).filter((key) => matchesDefinition(key, definition));
  }

  function captureSection(section) {
    return Object.fromEntries(keysForSection(section).map((key) => [key, localStorage.getItem(key)]));
  }

  function sectionsForScope(scope) {
    if (scope === "duaa") return ["duaa"];
    if (scope === "quran") return ["quran"];
    return ["duaa", "quran", "app"];
  }

  function createBackup(scope) {
    const data = {};
    sectionsForScope(scope).forEach((section) => { data[section] = captureSection(section); });
    return {
      backupFormat: FORMAT,
      schemaVersion: SCHEMA_VERSION,
      appVersion: config.version,
      createdAt: new Date().toISOString(),
      scope,
      data
    };
  }

  function localDateStamp() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  }

  function downloadBackup(scope) {
    const backup = createBackup(scope);
    const names = { duaa: "duaa", quran: "quran", all: "full" };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ummiby-${names[scope]}-backup-${localDateStamp()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 0);
    showStatus("Backup created and downloaded to this device.", "success");
  }

  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function validateBackup(value) {
    if (!isPlainObject(value) || value.backupFormat !== FORMAT) throw new Error("This file is not an Ummiby Companion backup.");
    if (value.schemaVersion !== SCHEMA_VERSION) throw new Error("This backup uses an unsupported backup format version.");
    if (!["duaa", "quran", "all"].includes(value.scope)) throw new Error("This backup has an unrecognized scope.");
    if (!isPlainObject(value.data)) throw new Error("This backup is missing its data section.");
    const expected = sectionsForScope(value.scope);
    expected.forEach((section) => {
      if (!isPlainObject(value.data[section])) throw new Error(`This backup is missing valid ${section} data.`);
      Object.entries(value.data[section]).forEach(([key, raw]) => {
        if (typeof key !== "string" || typeof raw !== "string") throw new Error("This backup contains invalid stored data.");
        if (!matchesDefinition(key, scopeDefinitions[section])) throw new Error("This backup contains a storage key outside its declared section.");
      });
    });
    return value;
  }

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Unknown" : new Intl.DateTimeFormat([], { dateStyle: "long", timeStyle: "short" }).format(date);
  }

  function scopeLabel(scope) {
    return { duaa: "Duaa data", quran: "Qur’an data", all: "All app data" }[scope];
  }

  function includedLabels(backup) {
    return sectionsForScope(backup.scope).filter((section) => section !== "app" || Object.keys(backup.data.app || {}).length).map((section) => scopeDefinitions[section].label).join(", ");
  }

  function showSummary(backup) {
    document.getElementById("summaryCreated").textContent = formatDate(backup.createdAt);
    document.getElementById("summaryVersion").textContent = backup.appVersion || "Unknown";
    document.getElementById("summaryScope").textContent = scopeLabel(backup.scope);
    document.getElementById("summaryContains").textContent = includedLabels(backup) || scopeLabel(backup.scope);
    summary.hidden = false;
    restoreButton.hidden = false;
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status-message ${type}`;
    status.hidden = false;
  }

  function clearPending() {
    pendingBackup = null;
    summary.hidden = true;
    restoreButton.hidden = true;
    fileInput.value = "";
    fileName.textContent = "No file selected";
  }

  async function readSelectedFile(file) {
    try {
      const text = await file.text();
      pendingBackup = validateBackup(JSON.parse(text));
      showSummary(pendingBackup);
      status.hidden = true;
    } catch (error) {
      clearPending();
      showStatus(`${error.message} No data was changed.`, "error");
    }
  }

  function replaceSection(section, values) {
    keysForSection(section).forEach((key) => localStorage.removeItem(key));
    Object.entries(values).forEach(([key, raw]) => localStorage.setItem(key, raw));
  }

  function restorePendingBackup() {
    if (!pendingBackup) return;
    const sections = sectionsForScope(pendingBackup.scope);
    const previous = Object.fromEntries(sections.map((section) => [section, captureSection(section)]));
    try {
      sections.forEach((section) => replaceSection(section, pendingBackup.data[section] || {}));
      const label = scopeLabel(pendingBackup.scope);
      dialog.close();
      clearPending();
      showStatus(`${label} restored successfully. Reloading the app so the restored data can take effect…`, "success");
      setTimeout(() => window.location.reload(), 900);
    } catch {
      try { sections.forEach((section) => replaceSection(section, previous[section])); } catch { /* best-effort rollback */ }
      dialog.close();
      showStatus("The backup could not be restored. The previous data was kept whenever the browser allowed it.", "error");
    }
  }

  exportButtons.forEach((button) => button.addEventListener("click", () => downloadBackup(button.dataset.exportScope)));
  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return clearPending();
    fileName.textContent = file.name;
    readSelectedFile(file);
  });
  restoreButton.addEventListener("click", () => {
    if (!pendingBackup) return;
    document.getElementById("dialogScope").textContent = scopeLabel(pendingBackup.scope);
    dialog.showModal();
  });
  confirmRestore.addEventListener("click", restorePendingBackup);
  cancelRestore.addEventListener("click", () => dialog.close());
})();
