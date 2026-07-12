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
      .nav-group summary::after{content:"";width:16px;height:16px;background:currentColor;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='m7 9 5 5 5-5' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/contain no-repeat;transition:transform .18s ease;flex:0 0 auto}
      .nav-group[open] summary::after{transform:rotate(180deg)}
      .nav-link.active{background:rgba(255,255,255,.16);color:#fff;font-weight:750}
      .topbar{justify-content:flex-start;gap:18px}
      .module-nav-block{display:grid;gap:2px}.module-nav-block .module-submenu{padding-top:2px;padding-bottom:6px}.module-home-link.active{background:rgba(255,255,255,.16);color:#fff;font-weight:750}
      .breadcrumbs{display:flex;align-items:center;flex-wrap:wrap;gap:.45rem;color:var(--muted,#657785);font-size:.88rem;line-height:1.4}.breadcrumbs a{color:var(--muted,#657785);text-decoration:none;font-weight:650}.breadcrumbs a:hover{color:var(--module-primary,var(--navy,#17324a));text-decoration:underline;text-underline-offset:3px}.breadcrumb-current{color:var(--ink,#243746);font-weight:750}.breadcrumb-separator{color:#9aa8b2}.app-home-topbar{min-height:52px}
      html[data-app-module="quran"]{--module-primary:var(--quran,#477b69);--module-primary-dark:var(--quran-dark,#315f51);--module-soft:var(--quran-soft,#eaf4ef)}
      html[data-app-module="duaa"]{--module-primary:var(--duaa,#6f99b7);--module-primary-dark:var(--duaa-dark,#4e7d9d);--module-soft:var(--duaa-soft,#edf5fa)}
      html[data-app-module="ramadan"]{--module-primary:var(--ramadan,#76558f);--module-primary-dark:var(--ramadan-dark,#563a70);--module-soft:var(--ramadan-soft,#f3edf7)}
      @media(max-width:620px){.breadcrumbs{font-size:.8rem;gap:.32rem}.app-home-topbar{min-height:58px}}
    `;
    document.head.appendChild(style);
  }



  function getNavigationContext() {
    const path = window.location.pathname.replace(/\\/g, "/");
    const inQuran = path.includes("/quran/");
    const inDuaa = path.includes("/duaa/");
    const file = path.split("/").pop() || "index.html";
    const inRamadan = inQuran && file.startsWith("ramadan-");
    return {
      path,
      file,
      prefix: inQuran || inDuaa ? "../" : "",
      module: inRamadan ? "ramadan" : inQuran ? "quran" : inDuaa ? "duaa" : "app"
    };
  }

  function ensureAppShell() {
    if (document.querySelector(".app-shell")) return;
    const main = document.querySelector("body > main");
    if (!main) return;
    const shell = document.createElement("div");
    shell.className = "app-shell";
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    sidebar.id = "sidebar";
    sidebar.setAttribute("aria-label", "Primary navigation");
    const page = document.createElement("section");
    page.className = "page";
    const topbar = document.createElement("header");
    topbar.className = "topbar";
    page.append(topbar, main);
    shell.append(sidebar, page);
    document.body.insertBefore(shell, document.body.firstChild);
  }

  function navHref(prefix, href) {
    return `${prefix}${href}`;
  }

  function isCurrent(href) {
    const current = window.location.pathname.replace(/\\/g, "/");
    const target = new URL(href, window.location.href).pathname.replace(/\\/g, "/");
    return current === target;
  }

  function navItem(href, label, icon, extraClass = "") {
    const active = isCurrent(href);
    return `<a class="nav-link${active ? " active" : ""}${extraClass ? ` ${extraClass}` : ""}" href="${href}"${active ? ' aria-current="page"' : ""}><span data-ui-icon="${icon}" aria-hidden="true"></span>${label}</a>`;
  }

  function submenuItem(href, label) {
    const active = isCurrent(href);
    return `<a href="${href}"${active ? ' class="submenu-active" aria-current="page"' : ""}>${label}</a>`;
  }

  const routeLabels = Object.freeze({
    "backup-restore.html": "Backup & Restore",
    "settings.html": "Settings",
    "quran/index.html": "Qur’an Home",
    "quran/reading-units.html": "Reading Units",
    "quran/reading-journey.html": "Reading Journey",
    "quran/reading-journeys.html": "Journey Index",
    "quran/classic-reading.html": "Classic Reading",
    "quran/workspace.html": "Reading Workspace",
    "quran/completed-journeys.html": "Completed Journeys",
    "quran/history.html": "Reading History",
    "quran/surahs.html": "Browse by Surah",
    "quran/surah-reader.html": "Qur’an Reader",
    "quran/go-to-ayah.html": "Jump to an Ayah",
    "quran/ramadan-journey.html": "Ramadan Central",
    "quran/ramadan-days.html": "Browse All Days",
    "quran/ramadan-reader.html": "Ramadan Reading",
    "duaa/index.html": "Duaa Home",
    "duaa/collections.html": "Find a Duaa",
    "duaa/collection.html": "Duaa Collection",
    "duaa/focus-mode.html": "Focus Mode",
    "duaa/progress.html": "Duaa Progress"
  });

  function relativeRoute() {
    const path = window.location.pathname.replace(/\\/g, "/");
    const parts = path.split("/").filter(Boolean);
    const quranIndex = parts.lastIndexOf("quran");
    const duaaIndex = parts.lastIndexOf("duaa");
    if (quranIndex >= 0) return parts.slice(quranIndex).join("/");
    if (duaaIndex >= 0) return parts.slice(duaaIndex).join("/");
    return parts[parts.length - 1] || "index.html";
  }

  function currentPageLabel() {
    const route = relativeRoute();
    if (routeLabels[route]) return routeLabels[route];
    const title = (document.title || "").split("|")[0].trim();
    return title || "Current Page";
  }

  function renderModuleSection({ active, homeHref, homeLabel, icon, links = [] }) {
    if (!active || !links.length) return navItem(homeHref, homeLabel, icon);
    return `
      <div class="module-nav-block active-module">
        ${navItem(homeHref, homeLabel, icon, "module-home-link")}
        <div class="nav-submenu module-submenu">
          ${links.map(({ href, label }) => submenuItem(href, label)).join("")}
        </div>
      </div>`;
  }

  function renderSharedNavigation() {
    ensureAppShell();
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;
    const ctx = getNavigationContext();
    const p = ctx.prefix;
    const quranOpen = ctx.module === "quran";
    const duaaOpen = ctx.module === "duaa";
    const ramadanOpen = ctx.module === "ramadan";
    const subtitle = ramadanOpen ? "Ramadan Central" : quranOpen ? "Qur’an Companion" : duaaOpen ? "Duaa Companion" : "Qur’an & Duaa";

    const quranLinks = [
      { href: navHref(p, "quran/reading-units.html"), label: "Reading Units" },
      { href: navHref(p, "quran/classic-reading.html"), label: "Classic Reading" },
      { href: navHref(p, "quran/reading-journeys.html"), label: "Journey Index" },
      { href: navHref(p, "quran/surahs.html"), label: "Browse by Surah" },
      { href: navHref(p, "quran/go-to-ayah.html"), label: "Jump to an Ayah" }
    ];
    const duaaLinks = [
      { href: navHref(p, "duaa/collections.html"), label: "Find a Duaa" },
      { href: navHref(p, "duaa/progress.html"), label: "Duaa Progress" }
    ];

    sidebar.innerHTML = `
      <div class="brand">
        <span class="brand-mark" data-ui-icon="${ramadanOpen ? "moon" : "brand"}" aria-hidden="true"></span>
        <div><p class="brand-name">Ummiby Companion</p><p class="brand-subtitle">${subtitle}</p></div>
      </div>
      <nav class="main-nav" aria-label="App navigation">
        ${navItem(navHref(p, "index.html"), "App Home", "home")}
        ${renderModuleSection({ active: quranOpen, homeHref: navHref(p, "quran/index.html"), homeLabel: "Qur’an Home", icon: "book", links: quranLinks })}
        ${renderModuleSection({ active: duaaOpen, homeHref: navHref(p, "duaa/index.html"), homeLabel: "Duaa Home", icon: "sparkle", links: duaaLinks })}
        ${navItem(navHref(p, "quran/ramadan-journey.html"), "Ramadan Central", "moon")}
        ${navItem(navHref(p, "backup-restore.html"), "Backup & Restore", "database")}
        ${navItem(navHref(p, "settings.html"), "Settings", "settings")}
      </nav>`;
  }

  function breadcrumbItem(href, label, current = false) {
    if (current) return `<span class="breadcrumb-current" aria-current="page">${label}</span>`;
    return `<a href="${href}">${label}</a>`;
  }

  function createBreadcrumb(ctx) {
    const route = relativeRoute();
    if (route === "index.html" && ctx.module === "app") return "";
    const p = ctx.prefix;
    const items = [breadcrumbItem(navHref(p, "index.html"), "App Home")];

    if (ctx.module === "quran") {
      if (route === "quran/index.html") items.push(breadcrumbItem("", "Qur’an Home", true));
      else {
        items.push(breadcrumbItem(navHref(p, "quran/index.html"), "Qur’an Home"));
        items.push(breadcrumbItem("", currentPageLabel(), true));
      }
    } else if (ctx.module === "duaa") {
      if (route === "duaa/index.html") items.push(breadcrumbItem("", "Duaa Home", true));
      else {
        items.push(breadcrumbItem(navHref(p, "duaa/index.html"), "Duaa Home"));
        items.push(breadcrumbItem("", currentPageLabel(), true));
      }
    } else if (ctx.module === "ramadan") {
      if (route === "quran/ramadan-journey.html") items.push(breadcrumbItem("", "Ramadan Central", true));
      else {
        items.push(breadcrumbItem(navHref(p, "quran/ramadan-journey.html"), "Ramadan Central"));
        items.push(breadcrumbItem("", currentPageLabel(), true));
      }
    } else {
      items.push(breadcrumbItem("", currentPageLabel(), true));
    }

    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${items.join('<span class="breadcrumb-separator" aria-hidden="true">›</span>')}</nav>`;
  }

  function normalizeTopbar() {
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;
    const ctx = getNavigationContext();
    document.documentElement.dataset.appModule = ctx.module;
    const breadcrumb = createBreadcrumb(ctx);
    topbar.classList.toggle("app-home-topbar", !breadcrumb);
    topbar.innerHTML = `
      <button class="menu-button" id="menuButton" type="button" aria-controls="sidebar" aria-expanded="false"><span class="sr-only">Open navigation</span><span data-ui-icon="menu" aria-hidden="true"></span></button>
      ${breadcrumb}`;
  }

  function wireSharedMenu() {
    const sidebar = document.getElementById("sidebar");
    const button = document.getElementById("menuButton");
    if (!sidebar || !button) return;
    let backdrop = document.getElementById("sidebarBackdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "sidebarBackdrop";
      backdrop.className = "sidebar-backdrop";
      backdrop.hidden = true;
      document.body.appendChild(backdrop);
    }
    const close = () => { sidebar.classList.remove("open"); button.setAttribute("aria-expanded", "false"); backdrop.hidden = true; };
    button.addEventListener("click", () => {
      const open = !sidebar.classList.contains("open");
      sidebar.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      backdrop.hidden = !open;
    });
    backdrop.addEventListener("click", close);
    sidebar.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
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
    renderSharedNavigation();
    normalizeTopbar();
    hydrateIcons();
    wireSharedMenu();
    createFooter();
    document.querySelectorAll("[data-app-version]").forEach((element) => {
      element.textContent = config.version;
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
