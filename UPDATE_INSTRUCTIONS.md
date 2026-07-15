# Update Instructions — Ummiby Companion v0.7.8.2

This package updates Ummiby Companion to v0.7.8.2.

## What changed in v0.7.8.2

- Added one canonical Basmalah rendering helper shared by Browse by Surah, Reading Journey units, and Ramadan readers.
- Updated Reading Units so surah openings display the standalone Basmalah only when Browse by Surah would, while first ayah text no longer duplicates it.
- Preserved Surah 1, Surah 9, and Surah 27 ayah 30 handling.
- Updated documentation, version references, and the release QA checklist.

## After updating

1. Open `settings.html` and confirm the app shows v0.7.8.2.
2. Open `quran/surah-reader.html?surah=2` and confirm the standalone Basmalah appears once and ayah 1 does not duplicate it.
3. Open Reading Units that begin at Surah 1, enter a normal surah opening, enter Surah 9, and include Surah 27 ayah 30 to confirm canonical Basmalah behavior.
4. Export a backup from `backup-restore.html` only if you want a fresh copy after updating; this patch does not change saved reading data.
