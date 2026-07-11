# Update Instructions — Ummiby Companion v0.6.1

## Replaces

v0.6.0

## Installation

1. Extract the v0.6.1 ZIP.
2. Copy all extracted files into the local Ummiby Companion repository folder.
3. Choose **Replace** for existing files.
4. No files need to be deleted for this release.
5. Review the changes in GitHub Desktop, commit, and push.

## Files added

None.

## Files replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `css/collection.css`
- `css/duaa-home.css`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/VISION.md`
- `duaa/collection.html`
- `duaa/index.html`
- `duaa/progress.html`
- `js/app-config.js`
- `js/collection.js`
- `js/duaa-tracking.js`
- `js/duaa-tracking-summary.js`
- `js/data/collections/morning.js`

## Files deleted

None.

## Browser storage

No storage migration is required. Existing dated Duaa history remains compatible. Weekly progress is calculated from the records already stored under `ummibyDuaaDailyTracking`.

## Testing checklist

- Confirm the footer shows version 0.6.1.
- On Duaa Home, confirm daily cards still show exact counts such as “1 of 15 recited today.”
- Confirm Weekly Progress runs Sunday through Saturday.
- Check one Morning Duaa and confirm today receives a Morning weekly marker.
- Confirm checking one Duaa is enough to mark the day, without requiring full collection completion.
- Confirm Evening and Before Sleep track independently.
- Confirm future days appear muted and unmarked.
- Open Weekly Progress and confirm it matches Duaa Home.
- Open Morning and confirm the Morning Reflection appears with a working source link.
- Confirm other collections do not show the Morning-only reflection.
- Confirm existing collection, Focus Mode, artwork, and reading preference behavior remains intact.
