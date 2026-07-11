# Update Instructions — Ummiby Companion v0.5.8

## Replaces

Version 0.5.8

## Installation

1. Extract the v0.5.8 ZIP file.
2. Copy all extracted files and folders into your local Ummiby Companion repository.
3. Choose **Replace** when your computer asks about files with the same names.
4. Open GitHub Desktop and review the changed files.
5. Test locally, then commit and push.

## Files Added

None.

## Files Replaced / Modified

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `settings.html`
- `css/collection.css`
- `js/app-config.js`
- `js/app-shell.js`
- `js/collection.js`
- `js/settings.js`
- `docs/CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/guides/DUAA_COLLECTIONS.md`

## Files Deleted

None.

## Browser Storage

No existing progress is deleted or migrated. Two optional values may be added to the existing `ummibyPreferences` record:

- `showTransliteration`
- `showTranslation`

When absent, both default to visible.

## Testing Checklist

- Confirm every page footer shows Version 0.5.8.
- Open Settings and verify Arabic size still works.
- Turn transliteration off and confirm it disappears from tracked and reference collection cards.
- Turn English translation off and confirm it disappears from tracked and reference collection cards.
- Turn both back on and confirm the original card view returns.
- Confirm Arabic always remains visible.
- Refresh the browser and confirm preferences persist.
- Confirm daily Duaa completion progress is unchanged.
- Confirm Focus Mode navigation and return-to-card behavior still work.
