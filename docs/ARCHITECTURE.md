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

## Duaa Module Visual Identity

The Duaa reading environment uses shared module tokens from `css/duaa-shell.css`:

```css
--duaa-page
--duaa
--duaa-dark
--duaa-soft
```

`duaa/collection.html` and `duaa/focus-mode.html` use the same light-blue page surface, white reading cards, and blue/dark-blue functional accents. `js/collection.js` no longer applies collection-specific color tokens to buttons, progress, links, cards, or page backgrounds.

Collection data may still include banner or decorative metadata so a Morning, Evening, Sleep, Travel, Weather, Prayer, or Istikharah collection can have recognizable artwork. Decorative identity must not create a separate functional color system for each collection.


## Duaa Collection Navigation Continuity

Focus Mode includes the currently displayed Duaa number when linking back to the shared collection renderer:

```text
duaa/collection.html?collection=morning&returnTo=8#duaa-8
```

The collection renderer assigns stable anchors to rendered cards, scrolls to the requested card after rendering, and briefly highlights it. This navigation state is temporary and URL-based; it does not require localStorage or sessionStorage.


## Duaa Reading Typography and Sources (v0.5.7)

Duaa collection typography is centralized in `css/collection.css`. Arabic content uses Amiri Quran, while transliteration and English reading text use Amiri. Interface typography remains separate.

Source links are data-driven. `js/collection.js` reads `source.sourceReference` and creates a safe external link only for valid HTTP or HTTPS URLs. Records without URLs continue to render as plain source text, so source-link adoption can happen gradually during verification.


## Shared Application Configuration and Preferences (v0.5.8)

- `js/app-config.js` is the single source of truth for the application name and version.
- `js/app-shell.js` applies shared preferences and inserts the version footer on every page.
- Arabic Duaa text size is stored in the Duaa-specific `ummibyDuaaPreferences` localStorage record and applied through `--duaa-arabic-size`.
- Pages must not hardcode independent version values. New pages should load the shared configuration and application shell.
## Shared Reading Preferences

`js/app-shell.js` owns Duaa reading preferences. It applies Arabic size and optional text visibility as data attributes and CSS variables on the document root. The reusable collection renderer labels transliteration and translation blocks consistently, allowing every collection to honor the same settings without collection-specific logic.



## Contextual module preferences (v0.5.8.1)

Duaa reading preferences are owned by the Duaa module and are edited through one shared modal used by collection pages and Focus Mode. The main Settings page is reserved for app-wide settings and About information. Qur’an preferences must use a separate storage namespace and interface.

## Context-Specific Duaa Reading Preferences

The shared Duaa reading-settings component accepts a reading context. Collection pages and Focus Mode reuse the same modal implementation and controls while reading from and writing to separate local-storage records. This preserves reuse without forcing both reading experiences to share identical display choices.

## Interface Icon Standard

Application controls and navigation use SVG icons. Do not use Unicode characters as icons. SVG icons may be inline or stored as reusable assets, depending on the surrounding architecture. Decorative pictures and collection artwork are not treated as interface icons.
