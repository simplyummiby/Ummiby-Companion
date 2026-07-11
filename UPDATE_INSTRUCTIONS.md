# Update Instructions — Ummiby Companion v0.5.8.4

This package replaces v0.5.8.3.

## Install

1. Extract `ummiby-companion-v0.5.8.4-full.zip`.
2. Copy the extracted files into your local Ummiby Companion repository.
3. Choose **Replace** when prompted.
4. Review the changes in GitHub Desktop, commit, and push.

## Files Added

None.

## Files Replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `css/collection.css`
- `js/app-config.js`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`

## Files Deleted

None.

## Browser Storage

No browser-storage keys, daily completion records, or Duaa reading preferences are changed.

## Test

- Open a tracked Duaa collection and mark a Duaa complete.
- Confirm the completed card uses a blue accent rather than green.
- Confirm the blue completed background extends from the top of the card through the repetition pill row and stops at the horizontal divider.
- Confirm the completed check control is blue with a white checkmark.
- Confirm an incomplete card remains white with its quiet gray check control.
- Refresh the page and confirm completion state is still preserved for the current day.
- Confirm the footer shows Version 0.5.8.4.
