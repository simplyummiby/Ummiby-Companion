# Update Instructions — Ummiby Companion v0.5.9

This update replaces **v0.5.8.4** with **v0.5.9**.

## Recommended GitHub Desktop workflow

1. Extract `ummiby-companion-v0.5.9-full.zip` into a temporary folder.
2. Copy everything from the extracted folder into your local Ummiby Companion repository.
3. Choose **Replace the files in the destination** when prompted.
4. Open GitHub Desktop and review the changed and newly added files.
5. Test locally, then commit and push.

## Files and folders added

- `assets/collections/` and all collection artwork beneath it
- `js/collection-artwork.js`

## Files replaced

- `README.md`
- `UPDATE_INSTRUCTIONS.md`
- `css/collection.css`
- `css/duaa-home.css`
- `duaa/collection.html`
- `duaa/collections.html`
- `duaa/daily-companion.html`
- `duaa/index.html`
- `js/app-config.js`
- `js/collection.js`
- `js/data/collection-registry.js`
- `js/data/collections/morning.js`
- `js/data/collections/evening.js`
- `js/data/collections/sleep.js`
- `js/data/collections/travel.js`
- `js/data/collections/weather.js`
- `js/data/collections/prayer.js`
- `js/data/collections/istikharah.js`
- `docs/ARCHITECTURE.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/MODULES.md`
- `docs/ROADMAP.md`
- `docs/guides/DUAA_COLLECTIONS.md`
- `docs/guides/PROJECT_STRUCTURE.md`

## Files deleted

None.

## Browser storage

No browser-storage keys or saved Duaa progress are changed. Collection and Focus Mode reading preferences remain compatible.

## Testing checklist

- Confirm the footer shows Version 0.5.9.
- Open Morning, Evening, Before Sleep, Travel, Weather, Prayer, and Istikharah collection pages.
- Confirm each collection displays its own banner and circular artwork.
- Confirm the reading cards and controls remain in the shared light-blue/dark-blue Duaa theme.
- Open Duaa Home and confirm the collection cards display artwork rather than Unicode collection symbols.
- Open Daily Companion and Find a Duaa and confirm artwork loads without broken images.
- Confirm tracked completion, Reading Settings, and Focus Mode still work.
- Temporarily rename one artwork file and confirm the shared fallback appears instead of a broken image.

## Commit message

```text
feat(duaa): add data-driven collection identity artwork
```
