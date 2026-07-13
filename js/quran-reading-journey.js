(function(){
const { units: READING_UNITS } = window.QURAN_READING_LIBRARY;
const { read: readJourneyState } = window.QURAN_READING_JOURNEY_STATE;

const list = document.getElementById('unitList');
const search = document.getElementById('unitSearch');
const state = readJourneyState();
const completed = new Set(state.completedUnitIds);

function unitStatus(unit) {
  if (completed.has(unit.id)) return 'completed';
  if (unit.id === state.currentUnitId) return 'current';
  return '';
}

function render(query = '') {
  const needle = query.trim().toLowerCase();
  const units = READING_UNITS.filter(unit => !needle || [unit.id, unit.title, unit.surahName, unit.reference, unit.type].join(' ').toLowerCase().includes(needle));
  list.innerHTML = units.map(unit => {
    const status = unitStatus(unit);
    const statusText = status === 'completed' ? 'Completed' : status === 'current' ? 'Current unit' : `Unit ${unit.order}`;
    return `<a class="reading-unit-card ${status}" href="workspace.html?unit=${unit.id}">
      <span class="unit-order">${String(unit.order).padStart(3,'0')}</span>
      <span class="unit-card-copy"><small>${unit.surahName} · ${unit.reference}</small><strong>${unit.title}</strong><em>${unit.type}</em></span>
      <span class="unit-card-status">${statusText}<span data-ui-icon="arrow-right" aria-hidden="true"></span></span>
    </a>`;
  }).join('') || '<p class="empty-state">No Reading Units match that search.</p>';
  window.UmmibyIcons?.hydrate(document);
}

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
search.addEventListener('input', () => render(search.value));
render();
})();
