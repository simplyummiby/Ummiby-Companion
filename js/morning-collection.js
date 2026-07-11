const STORAGE_KEY = "ummibyMorningProgress";
const collection = window.UMMIBY_MORNING_COLLECTION;
const list = document.getElementById("duaaList");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const progressBar = document.getElementById("progressBar");
const progressMessage = document.getElementById("progressMessage");
const completionPanel = document.getElementById("completionPanel");
const resetProgressButton = document.getElementById("resetProgressButton");
const resetDialog = document.getElementById("resetDialog");
const confirmResetButton = document.getElementById("confirmResetButton");
const collectionTitle = document.getElementById("collectionTitle");

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function readState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (stored.date !== todayKey() || !Array.isArray(stored.completed)) {
      return { date: todayKey(), completed: [] };
    }
    return stored;
  } catch {
    return { date: todayKey(), completed: [] };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function sourceText(item) {
  const source = item.source || {};
  const pieces = [];
  if (source.reference) pieces.push(source.reference);
  if (source.grade && source.grade !== "N/A") pieces.push(`Grade: ${source.grade}`);
  return pieces.length ? pieces.join(" · ") : "Source review pending";
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

function buildCard(item, index) {
  const card = createElement("article", "duaa-card");
  card.dataset.duaaId = item.id;

  const header = createElement("header", "duaa-card-header");
  const headingWrap = createElement("div");
  headingWrap.appendChild(createElement("p", "card-number", `Duaa ${index + 1}`));
  headingWrap.appendChild(createElement("h2", "", item.suggestedTitle || item.legacyLabel || `Duaa ${index + 1}`));
  if (item.summary) headingWrap.appendChild(createElement("p", "summary", item.summary));

  const checkButton = createElement("button", "check-button");
  checkButton.type = "button";
  checkButton.setAttribute("aria-label", `Mark ${item.suggestedTitle || `Duaa ${index + 1}`} complete`);
  checkButton.setAttribute("aria-pressed", "false");
  checkButton.appendChild(createElement("span", "", "✓"));
  checkButton.firstChild.setAttribute("aria-hidden", "true");

  header.append(headingWrap, checkButton);
  card.appendChild(header);

  const repeatRow = createElement("div", "repeat-row");
  repeatRow.appendChild(createElement("span", "repeat-pill", repeatText(item.repeat)));
  card.appendChild(repeatRow);

  const cardText = item.cardText || {};
  addTextBlock(card, "Arabic", cardText.arabic, { className: "arabic-block", ariaLabel: "Arabic", arabic: true });
  addTextBlock(card, "Transliteration", cardText.transliteration);
  addTextBlock(card, "English", cardText.translation, { className: "translation-block" });

  const footer = createElement("footer", "duaa-card-footer");
  footer.appendChild(createElement("p", "source", sourceText(item)));

  const focusLink = createElement("a", "", "Study in Focus Mode →");
  focusLink.href = `focus-mode.html?collection=morning&duaa=${index + 1}`;
  footer.appendChild(focusLink);
  card.appendChild(footer);

  checkButton.addEventListener("click", () => toggleCompleted(item.id));
  return card;
}

function renderCards() {
  if (!collection || !Array.isArray(collection.items)) {
    list.appendChild(createElement("p", "data-error", "The Morning data could not be loaded."));
    return;
  }

  collectionTitle.textContent = collection.title || "Morning Adhkar";
  list.replaceChildren(...collection.items.map(buildCard));
  renderProgress();
}

function toggleCompleted(id) {
  const state = readState();
  const completed = new Set(state.completed);
  if (completed.has(id)) completed.delete(id);
  else completed.add(id);
  saveState({ date: todayKey(), completed: [...completed] });
  renderProgress();
}

function renderProgress() {
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

resetProgressButton?.addEventListener("click", () => resetDialog.showModal());

confirmResetButton?.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderProgress();
});

renderCards();
