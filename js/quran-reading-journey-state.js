(function(){
const STORAGE_KEY = 'ummibyCanonicalReadingJourneyV1';

function readJourneyState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return {
      currentUnitId: saved?.currentUnitId || 'P0001',
      completedUnitIds: Array.isArray(saved?.completedUnitIds) ? saved.completedUnitIds : [],
      lastReadAt: saved?.lastReadAt || null,
      completedJourneys: Number(saved?.completedJourneys) || 0
    };
  } catch {
    return { currentUnitId: 'P0001', completedUnitIds: [], lastReadAt: null, completedJourneys: 0 };
  }
}

function saveJourneyState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function setCurrentUnit(id) {
  const state = readJourneyState();
  state.currentUnitId = id;
  state.lastReadAt = new Date().toISOString();
  return saveJourneyState(state);
}

function completeUnit(id, nextId = null) {
  const state = readJourneyState();
  if (!state.completedUnitIds.includes(id)) state.completedUnitIds.push(id);
  state.currentUnitId = nextId || id;
  state.lastReadAt = new Date().toISOString();
  return saveJourneyState(state);
}

function restartJourney() {
  const state = readJourneyState();
  if (state.completedUnitIds.length === 294) state.completedJourneys += 1;
  state.currentUnitId = 'P0001';
  state.completedUnitIds = [];
  state.lastReadAt = new Date().toISOString();
  return saveJourneyState(state);
}

window.QURAN_READING_JOURNEY_STATE = Object.freeze({
  read: readJourneyState,
  save: saveJourneyState,
  setCurrent: setCurrentUnit,
  completeUnit,
  restart: restartJourney
});
})();
