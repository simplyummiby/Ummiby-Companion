const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('js/quran-basmalah.js', 'utf8'), context);

const basmalah = context.window.QURAN_BASMALAH;
const opening = basmalah.text;

assert.strictEqual(basmalah.shouldShowStandaloneBasmalah(1), false, 'Surah 1 keeps its inline Basmalah');
assert.strictEqual(basmalah.shouldShowStandaloneBasmalah(2), true, 'Surah 2 displays a standalone Basmalah');
assert.strictEqual(basmalah.shouldShowStandaloneBasmalah(9), false, 'Surah 9 does not display a standalone Basmalah');

assert.strictEqual(
  basmalah.displayArabic({ ayah: 1, arabic: `${opening} الم` }, 2),
  'الم',
  'Surah starts that display standalone Basmalah strip it from ayah 1 text'
);
assert.strictEqual(
  basmalah.displayArabic({ ayah: 1, arabic: `${opening} ٱلْحَمْدُ` }, 1),
  `${opening} ٱلْحَمْدُ`,
  'Surah 1 keeps the Basmalah in ayah 1 text'
);
assert.strictEqual(
  basmalah.displayArabic({ ayah: 1, arabic: 'بَرَآءَةٌ مِّنَ ٱللَّهِ' }, 9),
  'بَرَآءَةٌ مِّنَ ٱللَّهِ',
  'Surah 9 text is unchanged'
);
assert.strictEqual(
  basmalah.displayArabic({ ayah: 30, arabic: `إِنَّهُۥ مِن سُلَيْمَٰنَ وَإِنَّهُۥ ${opening}` }, 27),
  `إِنَّهُۥ مِن سُلَيْمَٰنَ وَإِنَّهُۥ ${opening}`,
  'Surah 27 ayah 30 is not affected because only ayah 1 is normalized'
);

console.log('Basmalah helper rules passed');
