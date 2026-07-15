# Update Instructions — Ummiby Companion v0.7.8.3

This package updates Ummiby Companion to v0.7.8.3.

## What changed in v0.7.8.3

- Fixed the Memorization Surah Detail Bulk Actions menu so it is hidden by default.
- Preserved the existing Bulk Actions confirmation dialogs and ayah memorization behavior.
- Updated documentation, version references, and the release QA checklist.

## After updating

1. Open `settings.html` and confirm the app shows v0.7.8.3.
2. Open `quran/memorization-surah.html?surah=1` and confirm the Bulk Actions menu is hidden on load.
3. Click Bulk Actions to confirm the menu opens, then click it again, click outside, and press Escape to confirm it closes.
4. Select each bulk action and confirm the menu closes while the confirmation dialog still opens.
5. Export a backup from `backup-restore.html` only if you want a fresh copy after updating; this patch does not change saved app data.
