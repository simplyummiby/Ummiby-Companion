# Update Instructions — Ummiby Companion v0.6.2.2

This release replaces v0.6.2.1.

## Install

1. Extract the v0.6.2.2 ZIP.
2. Copy all extracted files and folders into your local Ummiby Companion repository.
3. Choose **Replace** when prompted.
4. Review the changes in GitHub Desktop before committing.

## Files added

None.

## Files replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `duaa/collection.html`
- `css/collection.css`
- `js/app-config.js`
- `js/app-shell.js`
- `js/collection.js`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/guides/DUAA_COLLECTIONS.md`

## Files deleted

None.

## Browser storage

No migration is required. Existing dated tracking records and Duaa reading preferences remain compatible.

## Test checklist

- Confirm every page footer shows version 0.6.2.2.
- Open Morning with no checks and confirm the bottom status says no Duaas have been checked today.
- Check one Morning Duaa and confirm the bottom status shows the exact count and says the day counts toward weekly consistency.
- Check every Duaa in a tracked collection and confirm the full-completion message appears.
- Open Evening or Before Sleep and confirm their status reflects their own current-day records.
- Open Travel, Weather, Prayer, or Istikharah and confirm no bottom tracking status appears.
- Scroll down a long collection and confirm the SVG back-to-top button appears.
- Activate the button with mouse, touch, and keyboard and confirm it scrolls smoothly to the top.
- Confirm existing daily and monthly history data is unchanged.

## Commit message

`fix(duaa): correct collection status and add back-to-top control`
