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


  const iconPaths = Object.freeze({
    brand: '<path d="M12 2 14.8 9.2 22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M20 4.5A2.5 2.5 0 0 0 17.5 2H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5v-17Z"/>',
    sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.7 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.5 4.7a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.36.36.7.6 1 .3.3.68.46 1.1.5h.1v4h-.1A1.7 1.7 0 0 0 19.4 15Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'arrow-left': '<path d="m14 6-6 6 6 6"/><path d="M8 12h12"/>',
    'arrow-right': '<path d="m10 6 6 6-6 6"/><path d="M4 12h12"/>',
    'arrow-up': '<path d="m6 14 6-6 6 6"/><path d="M12 20V8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    progress: '<path d="M12 3a9 9 0 1 0 9 9h-9V3Z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15V3.5Z"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    journey: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    chevron: '<path d="m7 9 5 5 5-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    upload: '<path d="M12 17V5"/><path d="m7 10 5-5 5 5"/><path d="M5 21h14"/>',
    shield: '<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/>'
  });

  function createIcon(name, options = {}) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("ui-icon");
    if (options.className) svg.classList.add(...options.className.split(/\s+/).filter(Boolean));
    svg.innerHTML = iconPaths[name] || iconPaths.sparkle;
    return svg;
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll("[data-ui-icon]").forEach((element) => {
      const icon = createIcon(element.dataset.uiIcon, { className: element.dataset.iconClass || "" });
      element.replaceChildren(icon);
    });
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
      .ui-icon{display:inline-block;width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;vertical-align:-.14em;flex:0 0 auto}
      [data-ui-icon]{display:inline-flex;align-items:center;justify-content:center}
      .inline-ui-icon{margin-inline:.18em}
    `;
    document.head.appendChild(style);
  }

  migrateLegacyDuaaPreferences();
  const pageContext = document.documentElement.dataset.duaaReadingContext || "collection";
  applyContext(pageContext);

  window.UmmibyIcons = { create: createIcon, hydrate: hydrateIcons };

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
    hydrateIcons();
    createFooter();
    document.querySelectorAll("[data-app-version]").forEach((element) => {
      element.textContent = config.version;
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
