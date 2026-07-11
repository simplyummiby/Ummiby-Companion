# Update Instructions — Ummiby Companion v0.6.2.1

This release replaces v0.6.2.

## Install

1. Extract the v0.6.2.1 ZIP.
2. Copy all extracted files and folders into your local Ummiby Companion repository.
3. Choose **Replace** when prompted.
4. Review the changes in GitHub Desktop before committing.

## Files added

None.

## Files replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `css/duaa-history.css`
- `css/duaa-shell.css`
- `js/app-config.js`
- `js/duaa-history.js`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`

## Files deleted

None.

## Browser storage

No migration is required. Existing records under `ummibyDuaaDailyTracking` remain compatible.

## Test checklist

- Confirm every page footer shows version 0.6.2.1.
- Open Duaa History and switch among Morning, Evening, and Before Sleep.
- Move through months with different calendar layouts, including May 2026.
- Confirm the left navigation remains fixed in place.
- Confirm each active-day circle is centered in its calendar cell.
- Confirm the `Duaa` or `Duaas` label is centered beneath the circle on desktop.
- Confirm the calendar keeps a stable six-row height when changing months.
- Confirm markers remain in the shared Duaa blue.
- Confirm existing tracking data is unchanged.

## Commit message

`style(duaa): polish monthly history calendar`
