(() => {
  const config = window.UmmibyAppConfig || { name: "Ummiby Companion", version: "Unknown" };
  const duaaCollectionPreferenceKey = "ummibyDuaaCollectionPreferences";
  const duaaFocusPreferenceKey = "ummibyDuaaFocusPreferences";
  const previousDuaaPreferenceKey = "ummibyDuaaPreferences";
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

  function keyForContext(context) {
    return context === "focus" ? duaaFocusPreferenceKey : duaaCollectionPreferenceKey;
  }

  function migrateLegacyDuaaPreferences() {
    const previous = parseStored(previousDuaaPreferenceKey);
    const older = parseStored(legacyPreferenceKey);
    const source = Object.keys(previous).length ? previous : older;
    const migrated = {};
    if (allowedArabicSizes.includes(source.arabicTextSize)) migrated.arabicTextSize = source.arabicTextSize;
    if (typeof source.showTransliteration === "boolean") migrated.showTransliteration = source.showTransliteration;
    if (typeof source.showTranslation === "boolean") migrated.showTranslation = source.showTranslation;
    [duaaCollectionPreferenceKey, duaaFocusPreferenceKey].forEach((key) => {
      if (localStorage.getItem(key) === null && Object.keys(migrated).length) {
        localStorage.setItem(key, JSON.stringify(migrated));
      }
    });
  }

  function readPreferences(context = "collection") {
    return parseStored(keyForContext(context));
  }

  function writePreferences(context, preferences) {
    localStorage.setItem(keyForContext(context), JSON.stringify(preferences));
    window.dispatchEvent(new CustomEvent("ummiby:duaa-preferences-changed", { detail: { context, preferences } }));
    return preferences;
  }

  function applyArabicTextSize(size) {
    const selected = allowedArabicSizes.includes(size) ? size : "medium";
    document.documentElement.dataset.arabicTextSize = selected;
    document.documentElement.style.setProperty("--duaa-arabic-size", arabicSizeValues[selected]);
    return selected;
  }

  function applyReadingDisplay(preferences = {}) {
    const showTransliteration = preferences.showTransliteration !== false;
    const showTranslation = preferences.showTranslation !== false;
    document.documentElement.dataset.showTransliteration = String(showTransliteration);
    document.documentElement.dataset.showTranslation = String(showTranslation);
    return { showTransliteration, showTranslation };
  }

  function applyContext(context = "collection") {
    const preferences = readPreferences(context);
    applyArabicTextSize(preferences.arabicTextSize);
    applyReadingDisplay(preferences);
    document.documentElement.dataset.duaaReadingContext = context;
    return preferences;
  }

  function saveArabicTextSize(context, size) {
    const selected = applyArabicTextSize(size);
    const preferences = readPreferences(context);
    preferences.arabicTextSize = selected;
    writePreferences(context, preferences);
    return selected;
  }

  function saveReadingDisplay(context, name, value) {
    if (!["showTransliteration", "showTranslation"].includes(name)) return applyReadingDisplay(readPreferences(context));
    const preferences = readPreferences(context);
    preferences[name] = Boolean(value);
    writePreferences(context, preferences);
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
  const pageContext = document.documentElement.dataset.duaaReadingContext || "collection";
  applyContext(pageContext);

  window.UmmibyDuaaPreferences = {
    keys: { collection: duaaCollectionPreferenceKey, focus: duaaFocusPreferenceKey },
    allowedArabicSizes,
    read: readPreferences,
    applyContext,
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
