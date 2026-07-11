# Ummiby Companion v0.5.7 Update Instructions

## Version

Update from **v0.5.6** to **v0.5.7 — Reading Typography and Source Links**.

## Recommended Manual Update

Because this package contains the complete project, extract it and copy its contents over the existing repository. Choose **Replace** when prompted.

## Files Added

None.

## Files Replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `duaa/collection.html`
- `duaa/focus-mode.html`
- `css/collection.css`
- `js/collection.js`
- `docs/CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/guides/DUAA_COLLECTIONS.md`

## Files Deleted

None.

## Important Data Note

No collection data files are changed in this release. Existing Duaa records continue to work unchanged. To make a source clickable later, add a verified URL to that entry's existing `source.sourceReference` field.

## Test Checklist

1. Open Morning, Evening, Before Sleep, and at least one reference collection.
2. Confirm Arabic Duaa text uses the Amiri Quran style and remains readable on desktop and mobile widths.
3. Confirm transliteration and English text use the Amiri reading style.
4. Confirm ordinary source references remain visible when `sourceReference` is blank.
5. Temporarily add a trusted HTTP or HTTPS URL to one local test entry's `sourceReference` field and confirm the source becomes clickable and opens in a new tab. Remove the temporary URL afterward if it was only for testing.
6. Confirm completion tracking, sticky progress, and Focus Mode return behavior from v0.5.6 still work.
7. Confirm the browser console contains no errors.

## Commit Message

```text
Improve Duaa typography and source references
```
