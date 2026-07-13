(function(){
const { units: READING_UNITS } = window.QURAN_READING_LIBRARY;
const { read: readJourneyState, toggleUnit, resetProgress } = window.QURAN_READING_JOURNEY_STATE;

const list = document.getElementById('unitList');
const search = document.getElementById('unitSearch');
const resetButton = document.getElementById('resetJourneyProgress');
const backToTop = document.getElementById('journeyBackToTop');
let state = readJourneyState();
let completed = new Set(state.completedUnitIds);

function unitStatus(unit) {
  if (completed.has(unit.id)) return 'completed';
  if (unit.id === state.currentUnitId) return 'current';
  return '';
}

function updateOverview() {
  const completeCount = completed.size;
  const percent = Math.round((completeCount / READING_UNITS.length) * 100);
  document.getElementById('completedCount').textContent = completeCount;
  document.getElementById('remainingCount').textContent = READING_UNITS.length - completeCount;
  document.getElementById('journeyPercent').textContent = `${percent}%`;
  document.getElementById('journeyProgressFill').style.width = `${percent}%`;
  const current = READING_UNITS.find(unit => unit.id === state.currentUnitId) || READING_UNITS[0];
  const continueLink = document.getElementById('continueJourney');
  continueLink.href = `workspace.html?unit=${current.id}`;
  continueLink.lastChild.textContent = ` Continue with Reading Unit ${current.order}`;
}

function render(query = '') {
  const needle = query.trim().toLowerCase();
  const units = READING_UNITS.filter(unit => !needle || [unit.id, unit.title, unit.surahName, unit.reference, unit.type].join(' ').toLowerCase().includes(needle));
  list.innerHTML = units.map(unit => {
    const status = unitStatus(unit);
    const isComplete = status === 'completed';
    return `<article class="reading-unit-card ${status}">
      <span class="unit-order">${String(unit.order).padStart(3,'0')}</span>
      <a class="unit-card-link" href="workspace.html?unit=${unit.id}" aria-label="Read Unit ${unit.order}: ${unit.title}">
        <span class="unit-card-copy"><small>${unit.surahName} · ${unit.reference}</small><strong>${unit.title}</strong><em>${unit.type}</em></span>
        <span class="unit-card-status">Read Unit ${unit.order}<span data-ui-icon="arrow-right" aria-hidden="true"></span></span>
      </a>
      <div class="unit-status-control">
        <span class="unit-status-label">Status</span>
        <button class="unit-completion-toggle" type="button" data-unit-id="${unit.id}" aria-pressed="${isComplete}" aria-label="Mark Reading Unit ${unit.order} ${isComplete ? 'incomplete' : 'complete'}" title="${isComplete ? 'Mark incomplete' : 'Mark complete'}">
          <span class="unit-checkmark" aria-hidden="true"><span data-ui-icon="check"></span></span>
        </button>
      </div>
    </article>`;
  }).join('') || '<p class="empty-state">No Reading Units match that search.</p>';
  window.UmmibyIcons?.hydrate(document);
}

list.addEventListener('click', event => {
  const toggle = event.target.closest('.unit-completion-toggle');
  if (!toggle) return;
  state = toggleUnit(toggle.dataset.unitId);
  completed = new Set(state.completedUnitIds);
  updateOverview();
  render(search.value);
});

resetButton?.addEventListener('click', () => {
  const confirmed = window.confirm('Reset all Reading Journey progress? This will uncheck every completed Reading Unit and return the journey to Unit 1.');
  if (!confirmed) return;
  state = resetProgress();
  completed = new Set();
  updateOverview();
  render(search.value);
});

search.addEventListener('input', () => render(search.value));
window.addEventListener('scroll', () => backToTop?.classList.toggle('is-visible', window.scrollY > 420), { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

updateOverview();
render();
})();
