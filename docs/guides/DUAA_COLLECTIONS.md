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

When the user leaves Focus Mode, the return link includes the Duaa currently being viewed. The shared collection page scrolls back to that card and briefly highlights it.

The full phrase-by-phrase study and memorization experience is planned for a later version.

## Verification Metadata

Verification metadata is preserved for editorial review but does not hide entries in the current development build.

## Collection Themes

Each collection file includes a `theme` object.

Example:

```javascript
theme: {
  accent: "#C58A17",
  dark: "#8A5E0B",
  soft: "#FFF4DC",
  border: "#E8D9B8",
  pageBackground: "#FFFDF8",
  cardBackground: "#FFFFFF",
  icon: "☀",
  banner: ""
}
```

The shared collection page reads these values automatically.

To change the Morning theme, edit only:

`js/data/collections/morning.js`

To change the Evening theme, edit only:

`js/data/collections/evening.js`

No HTML changes are required.


## Sticky Progress and Completion Controls

For tracked collections, the progress panel remains visible while the user scrolls through the cards. Incomplete completion circles include a soft gray checkmark to make the action clear. Completed circles retain the green background and white checkmark.


## Reading Typography

Collection pages load two related reading fonts:

- `Amiri Quran` for complete Arabic Duaa text
- `Amiri` for transliteration and English reading text

Interface controls, labels, navigation, and progress text retain the existing application font so the reading content remains visually distinct from controls. Serif fallbacks remain in place if the web fonts are unavailable.

## Adding a Source Link

Every Duaa can keep its source as plain text or link that text to a verified external reference. Use the existing `sourceReference` field inside the `source` object:

```javascript
source: {
  reference: "Sahih al-Bukhari 6306",
  grade: "Sahih",
  sourceReference: "https://example.com/verified-source",
  status: "verified"
}
```

Rules:

- Add only a verified `http` or `https` address.
- Leave `sourceReference` empty when a trustworthy link has not yet been confirmed.
- The source reference remains visible as plain text when no URL is present.
- Linked sources open in a new tab so the collection position is preserved.
- Do not place descriptive labels such as `link pending` in the URL field.

The renderer also accepts a legacy `url` property, but new and updated records should use `sourceReference` consistently.
