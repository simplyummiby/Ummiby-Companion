# Update Instructions — Ummiby Companion v0.5.7.1

This package updates Ummiby Companion from **v0.5.7** to **v0.5.7.1**.

## Recommended Manual Update

Because this release adds shared JavaScript files and updates many HTML pages, the safest manual method is:

1. Make a backup copy of your current project folder.
2. Extract `ummiby-companion-v0.5.7.1-full.zip`.
3. Copy all extracted files and folders into the existing project folder.
4. Choose **Replace** when prompted.
5. Do not delete browser storage; existing Duaa completion data remains compatible.

## Files Added

- `js/app-config.js`
- `js/app-shell.js`
- `js/settings.js`

## Files Replaced or Modified

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `settings.html`
- every existing `.html` page, to load the shared version configuration and footer
- `css/collection.css`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/guides/DUAA_COLLECTIONS.md`
- `docs/guides/PROJECT_STRUCTURE.md`

## Files Deleted

None.

## Browser Data

- Existing daily Duaa progress is not changed.
- A new `ummibyPreferences` localStorage record is created after the user changes Arabic Text Size.
- The default Arabic size is Medium when no preference has been saved.

## Testing Checklist

- Open Shared Home and confirm the footer shows Version 0.5.7.1.
- Open Qur’an Home and confirm the same footer version.
- Open Duaa Home and confirm the same footer version.
- Open Settings and confirm the About section shows v0.5.7.1.
- Change Arabic Text Size and confirm the preview changes.
- Open a tracked Duaa collection and confirm only Arabic text changes size.
- Confirm English and transliteration use the previous font and tighter line spacing.
- Refresh the page and confirm the chosen Arabic size remains saved.
- Open a reference collection and confirm the same Arabic preference applies.
- Open Focus Mode and confirm existing navigation and return behavior still work.

## Commit Message

`feat(settings): refine Duaa typography and add shared version display`
