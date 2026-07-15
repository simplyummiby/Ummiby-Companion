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
    return Number(ayah?.ayah ?? ayah?.number ?? ayah?.ayahNumber) || 0;
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

  function displayArabic(ayah, surahNumber) {
    const number = normalizeSurahNumber(surahNumber ?? ayah?.surah ?? ayah?.surahNumber);
    if (normalizeAyahNumber(ayah) !== 1 || !shouldShowStandaloneBasmalah(number)) return ayah?.arabic || '';
    return stripOpeningBasmalah(ayah.arabic);
  }

  function standaloneBasmalahHtml(className = 'surah-basmalah') {
    return `<div class="${className}" lang="ar" dir="rtl">${BASMALAH}</div>`;
  }

  window.QURAN_BASMALAH = Object.freeze({
    text: BASMALAH,
    shouldShowStandaloneBasmalah,
    stripOpeningBasmalah,
    displayArabic,
    standaloneBasmalahHtml
  });
})();
