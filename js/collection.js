const params = new URLSearchParams(window.location.search);
const collectionId = params.get("collection") || "morning";
const returnToDuaa = Math.max(0, Number(params.get("returnTo")) || 0);
let collection = null;

const page = document.getElementById("collectionPage");
const list = document.getElementById("duaaList");
const title = document.getElementById("collectionTitle");
const description = document.getElementById("collectionDescription");
const eyebrow = document.getElementById("collectionEyebrow");
const focusStartLink = document.getElementById("focusStartLink");
const progressPanel = document.getElementById("progressPanel");
const resetProgressButton = document.getElementById("resetProgressButton");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const progressBar = document.getElementById("progressBar");
const progressMessage = document.getElementById("progressMessage");
const completionPanel = document.getElementById("completionPanel");
const completionTitle = document.getElementById("completionTitle");
const introText = document.getElementById("collectionIntroText");
const resetDialog = document.getElementById("resetDialog");
const confirmResetButton = document.getElementById("confirmResetButton");

function applyTheme() {
  const theme = collection?.theme || {
    accent: "#6F99B7",
    dark: "#456F8D",
    soft: "#EEF5FB",
    border: "#DCE7F0",
    pageBackground: "#F7F9FC",
    cardBackground: "#FFFFFF",
    icon: "✦",
    banner: ""
  };

  page.style.setProperty("--collection-accent", theme.accent);
  page.style.setProperty("--collection-dark", theme.dark);
  page.style.setProperty("--collection-soft", theme.soft);
  page.style.setProperty("--collection-border", theme.border);
  page.style.setProperty("--collection-page-background", theme.pageBackground);
  page.style.setProperty("--collection-card-background", theme.cardBackground);

  document.body.style.background = theme.pageBackground || "#F7F9FC";
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function storageKey() {
  return `ummibyDuaaProgress:${collectionId}`;
}

function readState() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey()) || "{}");
    if (stored.date !== todayKey() || !Array.isArray(stored.completed)) {
      return { date: todayKey(), completed: [] };
    }
    return stored;
  } catch {
    return { date: todayKey(), completed: [] };
  }
}

function saveState(state) {
  localStorage.setItem(storageKey(), JSON.stringify(state));
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  return element;
}

function repeatText(value) {
  if (!value) return "Recite once";
  const cleaned = String(value).trim();
  if (/^1x$/i.test(cleaned)) return "Recite once";
  if (/^3x$/i.test(cleaned)) return "Recite three times";
  if (/^7x$/i.test(cleaned)) return "Recite seven times";
  if (/^10x$/i.test(cleaned)) return "Recite ten times";
  return `Recite ${cleaned}`;
}

function sourceUrl(item) {
  const source = item.source || {};
  const candidate = String(source.sourceReference || source.url || "").trim();
  if (!candidate) return "";

  try {
    const url = new URL(candidate, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function buildSource(item) {
  const source = item.source || {};
  const wrapper = createElement("p", "source");
  const reference = source.reference || "Source review pending";
  const url = sourceUrl(item);

  if (url) {
    const link = createElement("a", "source-link", reference);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${reference} (opens source in a new tab)`);
    link.appendChild(createElement("span", "source-link-icon", "↗"));
    wrapper.appendChild(link);
  } else {
    wrapper.appendChild(document.createTextNode(reference));
  }

  if (source.grade && source.grade !== "N/A") {
    wrapper.appendChild(document.createTextNode(` · Grade: ${source.grade}`));
  }

  return wrapper;
}

function addTextBlock(card, label, text, options = {}) {
  if (!text) return;

  const section = createElement("section", `text-block${options.className ? ` ${options.className}` : ""}`);
  if (options.ariaLabel) section.setAttribute("aria-label", options.ariaLabel);

  section.appendChild(createElement("p", "block-label", label));

  const paragraph = createElement("p", options.arabic ? "arabic" : "", text);
  if (options.arabic) {
    paragraph.lang = "ar";
    paragraph.dir = "rtl";
  }
  section.appendChild(paragraph);
  card.appendChild(section);
}

function isTracked() {
  return Boolean(collection?.trackerEnabled);
}

function buildCard(item, index) {
  const card = createElement("article", "duaa-card");
  card.dataset.duaaId = item.id || `${collectionId}-${index + 1}`;
  card.id = `duaa-${index + 1}`;

  const header = createElement("header", "duaa-card-header");
  const headingWrap = createElement("div");
  headingWrap.appendChild(createElement("p", "card-number", `Duaa ${index + 1}`));
  headingWrap.appendChild(createElement("h2", "", item.suggestedTitle || item.legacyLabel || `Duaa ${index + 1}`));
  if (item.summary) headingWrap.appendChild(createElement("p", "summary", item.summary));
  header.appendChild(headingWrap);

  if (isTracked()) {
    const checkButton = createElement("button", "check-button");
    checkButton.type = "button";
    checkButton.setAttribute("aria-label", `Mark ${item.suggestedTitle || `Duaa ${index + 1}`} complete`);
    checkButton.setAttribute("aria-pressed", "false");
    const mark = createElement("span", "", "✓");
    mark.setAttribute("aria-hidden", "true");
    checkButton.appendChild(mark);
    checkButton.addEventListener("click", () => toggleCompleted(card.dataset.duaaId));
    header.appendChild(checkButton);
  }

  card.appendChild(header);

  const repeatRow = createElement("div", "repeat-row");
  repeatRow.appendChild(createElement("span", "repeat-pill", repeatText(item.repeat)));
  card.appendChild(repeatRow);

  const cardText = item.cardText || {};
  addTextBlock(card, "Arabic", cardText.arabic, { className: "arabic-block", ariaLabel: "Arabic", arabic: true });
  addTextBlock(card, "Transliteration", cardText.transliteration, { className: "transliteration-block" });
  addTextBlock(card, "English", cardText.translation, { className: "translation-block" });

  const footer = createElement("footer", "duaa-card-footer");
  footer.appendChild(buildSource(item));

  const focusLink = createElement("a", "", "Study in Focus Mode →");
  focusLink.href = `focus-mode.html?collection=${encodeURIComponent(collectionId)}&duaa=${index + 1}`;
  footer.appendChild(focusLink);
  card.appendChild(footer);

  return card;
}

function toggleCompleted(id) {
  if (!isTracked()) return;
  const state = readState();
  const completed = new Set(state.completed);
  if (completed.has(id)) completed.delete(id);
  else completed.add(id);
  saveState({ date: todayKey(), completed: [...completed] });
  renderProgress();
}

function renderProgress() {
  if (!isTracked()) return;

  const cards = [...document.querySelectorAll(".duaa-card")];
  const completed = new Set(readState().completed);

  cards.forEach((card) => {
    const checked = completed.has(card.dataset.duaaId);
    card.classList.toggle("completed", checked);
    card.querySelector(".check-button")?.setAttribute("aria-pressed", String(checked));
  });

  const validIds = new Set(cards.map((card) => card.dataset.duaaId));
  const count = [...completed].filter((id) => validIds.has(id)).length;
  const total = cards.length;
  const percent = total ? Math.round((count / total) * 100) : 0;

  totalCount.textContent = total;
  completedCount.textContent = count;
  progressBar.style.width = `${percent}%`;
  completionPanel.hidden = total === 0 || count !== total;

  if (count === 0) progressMessage.textContent = "Begin wherever you are ready.";
  else if (count < total) progressMessage.textContent = "Continue gently when you are ready.";
  else progressMessage.textContent = "Collection complete for today.";
}

function restoreCollectionPosition() {
  if (!returnToDuaa) return;

  const card = document.getElementById(`duaa-${returnToDuaa}`);
  if (!card) return;

  requestAnimationFrame(() => {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    card.classList.add("return-highlight");
    window.setTimeout(() => card.classList.remove("return-highlight"), 1800);
  });
}

function renderCollection() {
  applyTheme();

  if (!collection || !Array.isArray(collection.items)) {
    title.textContent = "Collection not found";
    description.textContent = "The requested Duaa collection could not be loaded.";
    list.appendChild(createElement("p", "data-error", "Check the collection name in the address."));
    focusStartLink.hidden = true;
    return;
  }

  document.title = `${collection.title || "Duaa Collection"} | Ummiby Companion`;
  title.textContent = collection.title || "Duaa Collection";
  description.textContent = collection.description || "Read through this collection at your own pace.";
  eyebrow.textContent = isTracked() ? "Daily Companion" : "Duaa Collection";
  const heroIcon = document.getElementById("collectionHeroIcon");
  if (heroIcon) heroIcon.textContent = collection.theme?.icon || "✦";
  focusStartLink.href = `focus-mode.html?collection=${encodeURIComponent(collectionId)}&duaa=1`;
  completionTitle.textContent = `${collection.shortTitle || collection.title || "Collection"} complete`;

  if (isTracked()) {
    progressPanel.hidden = false;
    resetProgressButton.hidden = false;
    introText.textContent = "Each card includes the complete duaa. Tap the checkmark when you finish reciting it. Your progress is saved on this device for today.";
  } else {
    progressPanel.hidden = true;
    resetProgressButton.hidden = true;
    introText.textContent = "Each card includes the complete duaa. Read through the collection freely without daily progress tracking.";
  }

  list.replaceChildren(...collection.items.map(buildCard));
  renderProgress();
  restoreCollectionPosition();
}

resetProgressButton?.addEventListener("click", () => resetDialog.showModal());

confirmResetButton?.addEventListener("click", () => {
  localStorage.removeItem(storageKey());
  renderProgress();
});

window.UmmibyCollectionLoader.load(collectionId)
  .then((loadedCollection) => {
    collection = loadedCollection;
    renderCollection();
  })
  .catch((error) => {
    console.error(error);
    applyTheme();
    title.textContent = "Collection not found";
    description.textContent = "The requested Duaa collection could not be loaded.";
    list.appendChild(createElement("p", "data-error", "Check the collection name or data file."));
    focusStartLink.hidden = true;
  });
