(function(){
  const BASMALAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
  const BASMALAH_VARIANTS = [
    BASMALAH,
    'بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'
  ];

  function normalizeSurahNumber(value) {
    return Number(value) || 0;
  }

  function normalizeAyahNumber(ayah) {
    return Number(ayah?.ayah ?? ayah?.number ?? ayah?.ayahNumber ?? ayah) || 0;
  }

  function shouldShowStandaloneBasmalah(surahNumber) {
    const number = normalizeSurahNumber(surahNumber);
    return number > 0 && number !== 1 && number !== 9;
  }

  function stripOpeningBasmalah(arabic) {
    const text = String(arabic || '');
    const variant = BASMALAH_VARIANTS.find(item => text.startsWith(item));
    return variant ? text.slice(variant.length).trimStart() : text;
  }

  function standaloneBasmalahHtml(className = 'surah-basmalah') {
    return `<div class="${className}" lang="ar" dir="rtl">${BASMALAH}</div>`;
  }

  function prepareAyahForDisplay({ surahNumber, ayahNumber, arabicText, startsNewSurah = true } = {}) {
    const normalizedSurah = normalizeSurahNumber(surahNumber);
    const normalizedAyah = normalizeAyahNumber(ayahNumber);
    const isOpeningAyah = normalizedAyah === 1;
    // Basmalah is shown once before each normal surah opening; Al-Fatihah keeps it as ayah 1 and At-Tawbah has no opening Basmalah.
    const showStandaloneBasmalah = Boolean(startsNewSurah && isOpeningAyah && shouldShowStandaloneBasmalah(normalizedSurah));
    // Only strip an opening Basmalah when a standalone one is rendered, which preserves the Qur'anic Basmalah inside An-Naml 27:30.
    const cleanedArabicText = showStandaloneBasmalah ? stripOpeningBasmalah(arabicText) : String(arabicText || '');
    return {
      showStandaloneBasmalah,
      cleanedArabicText,
      standaloneBasmalahHtml: showStandaloneBasmalah ? standaloneBasmalahHtml() : ''
    };
  }

  function displayArabic(ayah, surahNumber) {
    return prepareAyahForDisplay({
      surahNumber: surahNumber ?? ayah?.surah ?? ayah?.surahNumber,
      ayahNumber: ayah,
      arabicText: ayah?.arabic,
      startsNewSurah: true
    }).cleanedArabicText;
  }

  window.QURAN_BASMALAH = Object.freeze({
    text: BASMALAH,
    shouldShowStandaloneBasmalah,
    stripOpeningBasmalah,
    displayArabic,
    standaloneBasmalahHtml,
    prepareAyahForDisplay
  });
})();
