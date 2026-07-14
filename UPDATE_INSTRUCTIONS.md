# Update Instructions — Ummiby Companion v0.7.8

This package updates Ummiby Companion to v0.7.8.

## What changed in v0.7.8

- Added an Ayah Workspace toolbar above the ayah grid on Surah Detail pages.
- Added status filters for All, Not Started, Learning, Memorized, and Needs Revision.
- Added a persistent Hide Memorized view preference.
- Added jump controls for the next Not Started ayah, first Learning ayah, and first Needs Revision ayah.
- Added Go to Ayah navigation with inline validation and smooth focus behavior.
- Added per-surah resume-position storage and a Resume action.
- Added a distinct current-working ayah cue and temporary target highlight.
- Updated documentation, version references, and the release QA checklist.

## After updating

1. Open `settings.html` and confirm the app shows v0.7.8.
2. Open `quran/memorization-surah.html?surah=2` and verify the Ayah Workspace appears above the ayah grid.
3. Test filters, Hide Memorized, jump controls, Go to Ayah, and Resume behavior.
4. Export a Qur’an backup from `backup-restore.html` if you want a fresh copy of the new workspace state.
