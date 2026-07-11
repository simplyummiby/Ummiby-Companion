# Update Instructions — Ummiby Companion v0.6.2

This release replaces v0.6.1.2.

## Install

1. Extract the v0.6.2 ZIP.
2. Copy all extracted files and folders into your local Ummiby Companion repository.
3. Choose **Replace** when prompted.
4. Review the changes in GitHub Desktop before committing.

## Files added

- `css/duaa-history.css`
- `js/duaa-history.js`

## Files replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `duaa/index.html`
- `duaa/progress.html`
- `css/duaa-home.css`
- `js/app-config.js`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/MODULES.md`
- `docs/ROADMAP.md`
- `docs/guides/DUAA_HOME.md`
- `docs/guides/PROJECT_STRUCTURE.md`

## Files deleted

None.

## Browser storage

No migration is required. Existing records under `ummibyDuaaDailyTracking` remain compatible.

## Test checklist

- Confirm every page footer shows version 0.6.2.
- Confirm Duaa Home says **Weekly Consistency**.
- Confirm the link says **View History**.
- Confirm the Daily Companion guidance and hadith use the same font family while the source remains visually distinct.
- Open View History and switch among Morning, Evening, and Before Sleep.
- Move backward and forward between months.
- Confirm the calendar begins on Sunday and active dates show exact checked-Duaa counts.
- Confirm the monthly summary shows active days only.
- Confirm existing daily and weekly tracking still works.

## Commit message

`feat(duaa): add monthly consistency history`
