(function(){
const { units: READING_UNITS, getById: getReadingUnitById } = window.QURAN_READING_LIBRARY;
const { read: readJourneyState, setCurrent: setCurrentUnit, completeUnit } = window.QURAN_READING_JOURNEY_STATE;

const params = new URLSearchParams(location.search);
const requestedId = params.get('unit') || readJourneyState().currentUnitId;
const unit = getReadingUnitById(requestedId) || READING_UNITS[0];
const index = READING_UNITS.findIndex(item => item.id === unit.id);
const previous = READING_UNITS[index - 1] || null;
const next = READING_UNITS[index + 1] || null;
const quran = window.QURAN_DATA || [];

setCurrentUnit(unit.id);

document.title = `Reading Unit ${unit.order}: ${unit.title} | Ummiby Companion`;
document.getElementById('unitNumber').textContent = `Reading Unit ${unit.order} of ${READING_UNITS.length}`;
document.getElementById('unitTitle').textContent = unit.title;
document.getElementById('unitReference').textContent = `${unit.surahName} · ${unit.reference}`;
document.getElementById('topUnitLabel').textContent = `Unit ${unit.order} of ${READING_UNITS.length}`;
document.getElementById('unitProgressText').textContent = `${Math.round((unit.order / READING_UNITS.length) * 100)}% through the Reading Journey`;
document.getElementById('unitProgressFill').style.width = `${(unit.order / READING_UNITS.length) * 100}%`;

const topicParts = unit.title
  .replace(/^The Opening of /, '')
  .replace(/^The Closing of /, '')
  .replace(/^The Closing Supplication of /, 'The closing supplication of ')
  .replace(/^The Whole Surah$/, unit.surahName)
  .split(/,|\band\b|\bthrough\b/i)
  .map(topic => topic.trim())
  .filter(Boolean);

const topics = [...new Set(topicParts)];
const beforeCard = document.querySelector('.before-you-read');
if (topics.length) {
  document.getElementById('beforeTopics').innerHTML = topics
    .slice(0, 5)
    .map(topic => `<li>${topic}</li>`)
    .join('');
} else {
  beforeCard.hidden = true;
}

const surah = quran[unit.surahNumber - 1];
const ayahs = surah?.ayahs?.filter(ayah => ayah.ayah >= unit.startAyah && ayah.ayah <= unit.endAyah) || [];
const arabicDigits = number => String(number).replace(/\d/g, digit => '٠١٢٣٤٥٦٧٨٩'[digit]);

document.getElementById('workspaceAyahs').innerHTML = ayahs.length ? ayahs.map(ayah => `<article class="workspace-ayah">
  <div class="workspace-ayah-reference">${unit.surahNumber}:${ayah.ayah}</div>
  <div class="workspace-ayah-content">
    <div class="workspace-arabic-column">
      <p class="workspace-arabic" lang="ar" dir="rtl">${ayah.arabic}<span class="workspace-ayah-marker">۝${arabicDigits(ayah.ayah)}</span></p>
    </div>
    <div class="workspace-translation">
      <p>${ayah.translation}</p>${ayah.footnotes ? `<details><summary>Translation notes</summary><p>${ayah.footnotes.replace(/\n/g,'<br>')}</p></details>` : ''}
    </div>
  </div>
</article>`).join('') : '<p class="empty-state">The Qur’an text could not be loaded. Please refresh the page.</p>';

document.getElementById('translationToggle').addEventListener('change', event => document.body.classList.toggle('hide-workspace-translation', !event.target.checked));

const previousButton = document.getElementById('previousUnit');
const nextButton = document.getElementById('nextUnit');
previousButton.disabled = !previous;
nextButton.disabled = !next;
document.getElementById('previousLabel').textContent = previous ? `Unit ${previous.order}` : 'Beginning';
document.getElementById('nextLabel').textContent = next ? `Unit ${next.order}` : 'Journey complete';
previousButton.addEventListener('click', () => { if (previous) location.href = `workspace.html?unit=${previous.id}`; });
nextButton.addEventListener('click', () => { if (next) location.href = `workspace.html?unit=${next.id}`; });

document.getElementById('completeUnit').addEventListener('click', () => {
  completeUnit(unit.id, next?.id || unit.id);
  const card = document.getElementById('completionCard');
  card.hidden = false;
  document.getElementById('completeUnit').textContent = 'Completed';
  card.scrollIntoView({ behavior:'smooth', block:'center' });
});

window.UmmibyIcons?.hydrate(document);
})();
