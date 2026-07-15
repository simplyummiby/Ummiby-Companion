(function(){
const { units: READING_UNITS, getById: getReadingUnitById } = window.QURAN_READING_LIBRARY;
const { read: readJourneyState, setCurrent: setCurrentUnit, completeUnit, toggleUnit } = window.QURAN_READING_JOURNEY_STATE;

const params = new URLSearchParams(location.search);
const requestedId = params.get('unit') || readJourneyState().currentUnitId;
const unit = getReadingUnitById(requestedId) || READING_UNITS[0];
const index = READING_UNITS.findIndex(item => item.id === unit.id);
const previous = READING_UNITS[index - 1] || null;
const next = READING_UNITS[index + 1] || null;
const quran = window.QURAN_DATA || [];

const TOPICS_BY_UNIT = {
  P0001: ["Praise and gratitude to Allah", "Allah's mercy and lordship", "Worship and reliance upon Allah", "Guidance to the Straight Path"],
  P0002: ["The qualities of the believers", "The condition of those who reject faith", "The signs and behavior of the hypocrites"],
  P0003: ["The call to worship Allah alone", "Allah's signs in creation", "The challenge concerning the Qur'an", "The consequences of belief and disbelief"],
  P0004: ["The creation of Adam", "The command to the angels", "The refusal of Iblīs", "Life in Paradise", "Repentance and guidance"],
  P0005: ["Allah's favors upon the Children of Israel", "The covenant and the call to faith", "Patience and prayer", "Lessons from their disobedience and deliverance"],
  P0006: ["The command to sacrifice a cow", "The people's repeated questioning", "The murder that was concealed", "Allah bringing the truth to light", "The hardening of hearts after clear signs"],
  P0007: ["Distorting and concealing revelation", "Breaking the covenant", "Selective obedience to Allah's commands", "The consequences of preferring worldly life"],
  P0008: ["The sending of messengers and scripture", "Rejection driven by pride and envy", "Claims about exclusive salvation", "Longing for worldly life"],
  P0009: ["Jibrīl and the revelation", "Repeated breaking of covenants", "Magic and the trial of Hārūt and Mārūt", "The harm of exchanging faith for false knowledge"],
  P0010: ["Guidance for the believers", "The response of the People of the Book", "Allah's ownership of revelation and guidance", "The legacy and warnings of the Children of Israel"],
  P0011: ["Ibrāhīm being tested", "The Kaʿbah as a place of worship", "The prayer for Makkah", "The raising of the House's foundations", "The supplication for a messenger"],
  P0012: ["The religion of Ibrāhīm", "Submission to Allah", "The guidance given to his descendants", "The unity of the prophets' message"],
  P0013: ["The change of the qiblah", "The purpose of the believing community", "Following the Messenger", "Remembering Allah with gratitude"],
  P0014: ["Seeking help through patience and prayer", "Steadfastness during trials", "The reward of those who return to Allah"],
  P0015: ["Ṣafā and Marwah among Allah's symbols", "Voluntary good deeds", "The warning against concealing revelation", "Repentance and correction"],
  P0016: ["The oneness of Allah", "Signs throughout creation", "False objects of worship", "Regret on the Day of Judgment"],
  P0017: ["Eating what is lawful and good", "Avoiding the footsteps of Shayṭān", "Blindly following tradition", "The meaning of true righteousness"],
  P0018: ["Legal retribution", "Mercy and restraint", "The obligation of making a will", "Justice in carrying out a bequest"],
  P0019: ["The obligation of fasting", "Ramadan and the revelation of the Qur'an", "Allah's nearness and answering supplication", "The limits and rulings of the fast"],
  P0020: ["The new moons and sacred times", "Entering homes with righteousness", "Fighting within Allah's limits", "The rites and remembrance of Hajj"],
  P0021: ["Sincere and deceptive speech", "Submitting fully to Islam", "Trials faced by earlier believers", "Spending and striving in Allah's cause"],
  P0022: ["What and whom to spend upon", "Fighting when it is disliked", "Intoxicants and gambling", "Care for orphans"],
  P0023: ["Marriage and family boundaries", "Menstruation and marital relations", "Oaths and separation", "Divorce and reconciliation", "Waiting periods, nursing, and care for widows"],
  P0024: ["A people who fled from death", "Ṭālūt chosen as king", "The test at the river", "Faith and steadfastness before Jālūt", "Dāwūd's victory"],
  P0025: ["The ranks of Allah's messengers", "Spending before the Day of Judgment", "Allah's complete life and authority in Āyat al-Kursī", "No compulsion in religion", "Allah as the protector of the believers"],
  P0026: ["The dispute with Ibrāhīm about lordship", "The man shown a sign of resurrection", "Ibrāhīm asking how the dead are brought to life"],
  P0027: ["The multiplied reward of charity", "Giving without reminders or harm", "Sincere and insincere spending", "Giving openly and secretly", "Seeking out those in quiet need"],
  P0028: ["The prohibition of ribā", "The difference between trade and usury", "Repentance from unlawful gain", "Giving relief to a debtor", "Preparing for the final return to Allah"],
  P0029: ["Writing and witnessing debts", "Fairness in contracts", "Responsibility when traveling", "Trust and honest testimony"],
  P0030: ["Allah's ownership of all things", "Accountability for what hearts conceal", "Faith in Allah and His messengers", "The believers' closing supplication for mercy and help"]
};

setCurrentUnit(unit.id);

document.title = `Reading Unit ${unit.order}: ${unit.title} | Ummiby Companion`;
document.getElementById('unitNumber').textContent = `Reading Unit ${unit.order} of ${READING_UNITS.length}`;
document.getElementById('unitTitle').textContent = unit.title;
document.getElementById('unitReference').textContent = `${unit.surahName} · ${unit.reference}`;
document.getElementById('topUnitLabel').textContent = `Reading Unit ${unit.order}`;
const initialJourneyState = readJourneyState();
const completedCount = initialJourneyState.completedUnitIds.length;
const journeyPercent = Math.round((completedCount / READING_UNITS.length) * 100);
document.getElementById('unitProgressText').textContent = `${completedCount} of ${READING_UNITS.length} Reading Units complete · ${journeyPercent}% through the Reading Journey`;
document.getElementById('unitProgressFill').style.width = `${journeyPercent}%`;

let isUnitComplete = initialJourneyState.completedUnitIds.includes(unit.id);

const topicParts = unit.title
  .replace(/^The Opening of /, '')
  .replace(/^The Closing of /, '')
  .replace(/^The Closing Supplication of /, 'The closing supplication of ')
  .replace(/^The Whole Surah$/, unit.surahName)
  .split(/,|\band\b|\bthrough\b/i)
  .map(topic => topic.trim())
  .filter(Boolean);

const topics = TOPICS_BY_UNIT[unit.id] || [...new Set(topicParts)];
const topicsCard = document.querySelector('.before-you-read');
if (topics.length) {
  document.getElementById('beforeTopics').innerHTML = topics
    .slice(0, 6)
    .map(topic => `<li>${topic}</li>`)
    .join('');
} else {
  topicsCard.hidden = true;
}

const surah = quran[unit.surahNumber - 1];
const ayahs = surah?.ayahs?.filter(ayah => ayah.ayah >= unit.startAyah && ayah.ayah <= unit.endAyah) || [];
const arabicDigits = number => String(number).replace(/\d/g, digit => '٠١٢٣٤٥٦٧٨٩'[digit]);
const basmalah = window.QURAN_BASMALAH;

const workspaceAyahSelect = document.getElementById('workspaceAyahSelect');
if (workspaceAyahSelect) {
  workspaceAyahSelect.innerHTML = ayahs.map(ayah => `<option value="${ayah.ayah}">Ayah ${ayah.ayah}</option>`).join('');
  workspaceAyahSelect.addEventListener('change', () => {
    document.getElementById(`workspace-ayah-${workspaceAyahSelect.value}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

document.getElementById('workspaceAyahs').innerHTML = ayahs.length ? ayahs.map((ayah, ayahIndex) => {
  const ayahSurahNumber = Number(ayah.surah ?? ayah.surahNumber ?? unit.surahNumber);
  const previousSurahNumber = Number(ayahs[ayahIndex - 1]?.surah ?? ayahs[ayahIndex - 1]?.surahNumber ?? unit.surahNumber);
  const startsNewSurah = ayahIndex === 0 || previousSurahNumber !== ayahSurahNumber;
  const preparedAyah = basmalah.prepareAyahForDisplay({
    surahNumber: ayahSurahNumber,
    ayahNumber: ayah.ayah,
    arabicText: ayah.arabic,
    startsNewSurah
  });
  return `${preparedAyah.standaloneBasmalahHtml}<article class="workspace-ayah" id="workspace-ayah-${ayah.ayah}">
  <div class="workspace-ayah-reference">${ayahSurahNumber}:${ayah.ayah}</div>
  <div class="workspace-ayah-content">
    <div class="workspace-arabic-column">
      <p class="workspace-arabic" lang="ar" dir="rtl">${preparedAyah.cleanedArabicText}<span class="workspace-ayah-marker">۝${arabicDigits(ayah.ayah)}</span></p>
    </div>
    <div class="workspace-translation">
      <p>${ayah.translation}</p>${ayah.footnotes ? `<details><summary>Translation notes</summary><p>${ayah.footnotes.replace(/\n/g,'<br>')}</p></details>` : ''}
    </div>
  </div>
</article>`;
}).join('') : '<p class="empty-state">The Qur’an text could not be loaded. Please refresh the page.</p>';

document.getElementById('translationToggle').addEventListener('change', event => document.body.classList.toggle('hide-workspace-translation', !event.target.checked));

const previousButton = document.getElementById('previousUnit');
const nextButton = document.getElementById('nextUnit');
previousButton.disabled = !previous;
nextButton.disabled = !next;
document.getElementById('previousLabel').textContent = previous ? `Unit ${previous.order}` : 'Beginning';
document.getElementById('nextLabel').textContent = next ? `Unit ${next.order}` : 'Journey complete';
previousButton.addEventListener('click', () => { if (previous) location.href = `workspace.html?unit=${previous.id}`; });
nextButton.addEventListener('click', () => { if (next) location.href = `workspace.html?unit=${next.id}`; });

const completeButton = document.getElementById('completeUnit');
function updateCompleteButton() {
  completeButton.classList.toggle('is-complete', isUnitComplete);
  completeButton.setAttribute('aria-pressed', String(isUnitComplete));
  completeButton.querySelector('span:last-child').textContent = isUnitComplete ? 'Completed' : 'Mark Complete';
}
updateCompleteButton();

completeButton.addEventListener('click', () => {
  if (isUnitComplete) {
    toggleUnit(unit.id);
    isUnitComplete = false;
    document.getElementById('completionCard').hidden = true;
  } else {
    completeUnit(unit.id, next?.id || unit.id);
    isUnitComplete = true;
    const card = document.getElementById('completionCard');
    card.hidden = false;
    card.scrollIntoView({ behavior:'smooth', block:'center' });
  }
  updateCompleteButton();
  const updatedState = readJourneyState();
  const updatedCount = updatedState.completedUnitIds.length;
  const updatedPercent = Math.round((updatedCount / READING_UNITS.length) * 100);
  document.getElementById('unitProgressText').textContent = `${updatedCount} of ${READING_UNITS.length} Reading Units complete · ${updatedPercent}% through the Reading Journey`;
  document.getElementById('unitProgressFill').style.width = `${updatedPercent}%`;
});

const passageProgressFill = document.getElementById('passageProgressFill');
const passageProgressText = document.getElementById('passageProgressText');
const readingSection = document.querySelector('.workspace-reading');
const backToTop = document.getElementById('quranBackToTop');

function updatePassageProgress() {
  if (!readingSection) return;
  const start = readingSection.offsetTop;
  const end = start + readingSection.offsetHeight - window.innerHeight;
  const distance = Math.max(1, end - start);
  const percent = Math.max(0, Math.min(100, ((window.scrollY - start) / distance) * 100));
  passageProgressFill.style.width = `${percent}%`;
  passageProgressText.textContent = `${Math.round(percent)}%`;
  backToTop.classList.toggle('is-visible', window.scrollY > 420);
}

window.addEventListener('scroll', updatePassageProgress, { passive: true });
window.addEventListener('resize', updatePassageProgress);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
updatePassageProgress();

window.QURAN_STUDY_LIBRARY?.render({
  container: '#workspaceStudyLibrary',
  shortcut: '#workspaceLibraryShortcut',
  sectionId: 'workspaceStudyLibrary',
  context: {
    readingUnitId: unit.id,
    surahNumber: unit.surahNumber,
    startAyah: unit.startAyah,
    endAyah: unit.endAyah,
    fullSurah: unit.startAyah === 1 && unit.endAyah === surah?.ayahCount,
    journey: 'reading-unit'
  }
});

window.UmmibyIcons?.hydrate(document);
})();
