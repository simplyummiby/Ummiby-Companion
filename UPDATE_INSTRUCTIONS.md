# Update Instructions — Ummiby Companion v0.6.2.3

This release replaces v0.6.2.2.

## Install

1. Extract the v0.6.2.3 ZIP.
2. Copy all extracted files and folders into your local Ummiby Companion repository.
3. Choose **Replace** when prompted.
4. Review the changes in GitHub Desktop before committing.

## Files added

None.

## Files replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `css/collection.css`
- `js/app-config.js`
- `js/collection.js`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/guides/DUAA_COLLECTIONS.md`

## Files deleted

None.

## Browser storage

No migration is required. Existing dated tracking records, monthly history, and Duaa reading preferences remain compatible.

## Test checklist

- Confirm every page footer shows version 0.6.2.3.
- Open Morning, Evening, and Before Sleep and confirm the live bottom status still appears.
- Open Travel, Weather, Prayer, and Istikharah and confirm no bottom tracking-status box appears.
- Confirm reference collections still display their content and back-to-top control normally.
- Confirm checking a tracked Duaa still updates the bottom status and today’s progress.
- Confirm existing weekly consistency and monthly history data remain unchanged.

## Commit message

`fix(duaa): hide tracking status on reference collections`
