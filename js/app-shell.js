(() => {
  const config = window.UmmibyAppConfig || { name: "Ummiby Companion", version: "Unknown" };
  const duaaPreferenceKey = "ummibyDuaaPreferences";
  const legacyPreferenceKey = "ummibyPreferences";
  const allowedArabicSizes = ["small", "medium", "large", "extra-large"];
  const arabicSizeValues = {
    small: "1.65rem",
    medium: "2rem",
    large: "2.35rem",
    "extra-large": "2.75rem"
  };

  function parseStored(key) {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || "{}");
      return stored && typeof stored === "object" ? stored : {};
    } catch {
      return {};
    }
  }

  function migrateLegacyDuaaPreferences() {
    if (localStorage.getItem(duaaPreferenceKey) !== null) return;
    const legacy = parseStored(legacyPreferenceKey);
    const migrated = {};
    if (allowedArabicSizes.includes(legacy.arabicTextSize)) migrated.arabicTextSize = legacy.arabicTextSize;
    if (typeof legacy.showTransliteration === "boolean") migrated.showTransliteration = legacy.showTransliteration;
    if (typeof legacy.showTranslation === "boolean") migrated.showTranslation = legacy.showTranslation;
    if (Object.keys(migrated).length) localStorage.setItem(duaaPreferenceKey, JSON.stringify(migrated));
  }

  function readPreferences() {
    return parseStored(duaaPreferenceKey);
  }

  function writePreferences(preferences) {
    localStorage.setItem(duaaPreferenceKey, JSON.stringify(preferences));
    window.dispatchEvent(new CustomEvent("ummiby:duaa-preferences-changed", { detail: preferences }));
    return preferences;
  }

  function applyArabicTextSize(size) {
    const selected = allowedArabicSizes.includes(size) ? size : "medium";
    document.documentElement.dataset.arabicTextSize = selected;
    document.documentElement.style.setProperty("--duaa-arabic-size", arabicSizeValues[selected]);
    return selected;
  }

  function applyReadingDisplay(preferences = readPreferences()) {
    const showTransliteration = preferences.showTransliteration !== false;
    const showTranslation = preferences.showTranslation !== false;
    document.documentElement.dataset.showTransliteration = String(showTransliteration);
    document.documentElement.dataset.showTranslation = String(showTranslation);
    return { showTransliteration, showTranslation };
  }

  function saveArabicTextSize(size) {
    const selected = applyArabicTextSize(size);
    const preferences = readPreferences();
    preferences.arabicTextSize = selected;
    writePreferences(preferences);
    return selected;
  }

  function saveReadingDisplay(name, value) {
    if (!["showTransliteration", "showTranslation"].includes(name)) return applyReadingDisplay();
    const preferences = readPreferences();
    preferences[name] = Boolean(value);
    writePreferences(preferences);
    return applyReadingDisplay(preferences);
  }

  function createFooter() {
    if (document.querySelector("[data-app-version-footer]")) return;
    const footer = document.createElement("footer");
    footer.className = "app-version-footer";
    footer.dataset.appVersionFooter = "";
    footer.innerHTML = `<span>${config.name}</span><span aria-hidden="true">·</span><span>Version ${config.version}</span>`;
    document.body.appendChild(footer);
  }

  function injectSharedStyles() {
    if (document.getElementById("ummiby-shared-shell-styles")) return;
    const style = document.createElement("style");
    style.id = "ummiby-shared-shell-styles";
    style.textContent = `
      .app-version-footer{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:.45rem;padding:18px 20px 24px;color:#71818d;font:600 .78rem/1.4 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center}
      .app-version-footer span[aria-hidden="true"]{opacity:.55}
    `;
    document.head.appendChild(style);
  }

  migrateLegacyDuaaPreferences();
  const preferences = readPreferences();
  applyArabicTextSize(preferences.arabicTextSize);
  applyReadingDisplay(preferences);

  window.UmmibyDuaaPreferences = {
    key: duaaPreferenceKey,
    allowedArabicSizes,
    read: readPreferences,
    applyArabicTextSize,
    applyReadingDisplay,
    saveArabicTextSize,
    saveReadingDisplay
  };

  function initialize() {
    injectSharedStyles();
    createFooter();
    document.querySelectorAll("[data-app-version]").forEach((element) => {
      element.textContent = config.version;
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
