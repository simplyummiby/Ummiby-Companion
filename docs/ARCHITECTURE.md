# Architecture

Home
- Quran Home
  - Reading Journey
  - Ramadan Reading Journey
  - Read by Surah
  - Go to Ayah
- Duaa Home
  - Daily Companion
  - Find a Duaa
- Settings

## Reusable Duaa Collection Architecture

All Duaa collections use one renderer:

- `duaa/collection.html`
- `js/collection.js`
- `js/data/duaa-collections.js`

The query string selects the collection:

- `?collection=morning`
- `?collection=evening`
- `?collection=sleep`
- `?collection=travel`

Tracked collection behavior is controlled by collection metadata rather than separate page code.

## Split Duaa Collection Data

Duaa collection content is separated by collection:

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

The registry contains lightweight metadata. The loader injects only the requested collection file. The shared collection renderer remains responsible for creating the user interface.

## Current Duaa Page Structure

```text
duaa/
├── index.html
├── collection.html
├── collections.html
├── daily-companion.html
├── focus-mode.html
├── progress.html
└── recent.html
```

Individual Morning, Evening, Sleep, Travel, Weather, and Prayer HTML pages are not required. Their content is selected through the reusable collection page query parameter.
