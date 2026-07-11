# Update Instructions — Ummiby Companion v0.5.8.1

This package upgrades **v0.5.8** to **v0.5.8.1**.

## Install

1. Extract the v0.5.8.1 ZIP.
2. Copy all extracted files and folders into the local repository folder.
3. Choose **Replace** for existing files.
4. Delete `js/settings.js` from the repository if it remains after copying. It is obsolete in this version.
5. Review the changes in GitHub Desktop, commit, and push.

## Files added

- `css/duaa-reading-settings.css`
- `js/duaa-reading-settings.js`

## Files replaced

- `README.md`
- `settings.html`
- `duaa/collection.html`
- `duaa/focus-mode.html`
- `js/app-config.js`
- `js/app-shell.js`
- `docs/CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/guides/DUAA_COLLECTIONS.md`
- `docs/guides/PROJECT_STRUCTURE.md`
- `UPDATE_INSTRUCTIONS.md`

## Files deleted

- `js/settings.js`

## Browser storage

Existing Duaa reading choices are preserved. On first load, v0.5.8.1 copies Arabic size and text-display choices from the old `ummibyPreferences` record into the new Duaa-specific `ummibyDuaaPreferences` record. Daily progress is unchanged.

## Test

- Open a tracked collection and select **Reading Settings**.
- Change Arabic size and confirm the visible cards update immediately.
- Hide and show transliteration and English independently.
- Open Focus Mode and confirm the same settings and saved choices appear.
- Confirm returning from Focus Mode still returns to the correct Duaa.
- Open `settings.html` and confirm it shows app-wide information, not editable Duaa controls.
- Confirm the footer and About section show Version 0.5.8.1.
