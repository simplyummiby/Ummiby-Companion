# Update Instructions

Version: v0.5.5 — Collection Theme Infrastructure

## Recommended Method

1. Commit your current v0.5.4 work in GitHub Desktop.
2. Extract this zip to a temporary folder.
3. Copy the contents of the extracted folder into the repository.
4. Choose **Replace the files in the destination** when Windows prompts.
5. Review the changes in GitHub Desktop.
6. Open and test:
   - `index.html`
   - `quran/index.html`
   - `duaa/index.html`
   - `duaa/collection.html?collection=morning`
   - `duaa/collection.html?collection=evening`
7. Commit the update.

## Files to Delete

None for this version.

The v0.5.4 cleanup already removed obsolete files.

## New Files

```text
UPDATE_INSTRUCTIONS.md
```

## Main Files Replaced

```text
README.md
css/collection.css
duaa/collection.html
duaa/index.html
js/collection.js
js/data/collection-registry.js
js/data/collections/morning.js
js/data/collections/evening.js
js/data/collections/sleep.js
js/data/collections/travel.js
js/data/collections/weather.js
js/data/collections/prayer.js
js/data/collections/istikharah.js
docs/ARCHITECTURE.md
docs/CHANGELOG.md
docs/DECISIONS.md
docs/ROADMAP.md
docs/guides/DUAA_COLLECTIONS.md
```

## What to Test

### Morning

Open:

`duaa/collection.html?collection=morning`

Expected:

- warm gold/cream identity
- Morning icon
- tracking and checkmarks

### Evening

Open:

`duaa/collection.html?collection=evening`

Expected:

- twilight purple identity
- Evening icon
- tracking and checkmarks

### Before Sleep

Open:

`duaa/collection.html?collection=sleep`

Expected:

- calm powder-blue identity
- Sleep icon
- tracking and checkmarks

### Reference Collections

Open Travel, Weather, and Prayer.

Expected:

- distinct collection colors
- no checkmarks
- no daily progress panel

## Commit Message

```text
Add configurable themes for Duaa collections
```
