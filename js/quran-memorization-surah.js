(() => {
  const number = Math.min(114, Math.max(1, Number(new URLSearchParams(location.search).get("surah")) || 1));
  const surah = (window.QURAN_DATA || []).find(item => item.number === number);
  if (!surah) return;
  const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);
  document.title = `${surah.name} Memorization | Ummiby Companion`;
  document.getElementById("surahBreadcrumb").textContent = surah.name;
  document.getElementById("detailNumber").textContent = surah.number;
  document.getElementById("detailArabic").textContent = surah.arabicName;
  document.getElementById("detailName").textContent = surah.name;
  document.getElementById("detailMeta").textContent = `${MADANI_SURAHS.has(number) ? "Madani" : "Makki"} · ${surah.ayahCount} ayat`;
  document.getElementById("readSurahLink").href = `surah-reader.html?surah=${surah.number}`;
})();