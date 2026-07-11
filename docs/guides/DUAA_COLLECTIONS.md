# Duaa Collections

## Shared Collection Page

All Duaa collections use one reusable page:

`duaa/collection.html`

Example URLs:

```text
duaa/collection.html?collection=morning
duaa/collection.html?collection=evening
duaa/collection.html?collection=sleep
duaa/collection.html?collection=travel
duaa/collection.html?collection=weather
duaa/collection.html?collection=prayer
```

## Data Files

Each collection is maintained separately:

```text
js/data/
├── collection-registry.js
├── collection-loader.js
└── collections/
    ├── morning.js
    ├── evening.js
    ├── sleep.js
    ├── travel.js
    ├── weather.js
    ├── prayer.js
    └── istikharah.js
```

## Adding a New Duaa

Open the relevant collection file and add the new record to its `items` array.

For example, a Morning duaa belongs in:

`js/data/collections/morning.js`

After reloading the page, the renderer automatically:

- creates the new card
- updates the collection total
- includes it in progress when tracking is enabled
- creates the matching Focus Mode link

No collection-specific HTML card is required.

## Card Experience

Collection cards can display:

- title
- summary
- repetition guidance
- complete Arabic
- complete transliteration
- complete English translation
- source and grade
- completion checkmark for tracked collections
- Focus Mode link

## Tracking Behavior

Tracked or non-tracked behavior comes from collection metadata.

Tracked:

- Morning
- Evening
- Before Sleep

Non-tracked:

- Travel
- Weather
- Prayer
- Istikharah and future reference collections

## Focus Mode

Focus Mode can be entered from any individual duaa and begins on the selected entry.

The full phrase-by-phrase study and memorization experience is planned for a later version.

## Verification Metadata

Verification metadata is preserved for editorial review but does not hide entries in the current development build.
