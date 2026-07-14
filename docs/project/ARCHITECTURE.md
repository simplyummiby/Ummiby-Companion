# Architecture

Home
- Quran Home
  - Reading Journey
  - Ramadan Central
    - Ramadan Home
    - 30-day Ramadan Reading Journey
    - Five prayer-based portions per day
  - Read by Surah
  - Go to Ayah
- Duaa Home
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
├── focus-mode.html
└── progress.html
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

Completed Duaa cards also use the module blue palette. Their completed background covers the title/summary header and repetition row as one visual region, ending at the divider before the reading text.


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


## Duaa Collection Identity System (v0.5.9)

Collection identity is data-driven. `js/data/collection-registry.js` stores each collection's banner path, circular artwork path, and accessible descriptions. `js/collection-artwork.js` is the shared artwork hydrator used by collection and discovery views.

Artwork lives under:

```text
assets/collections/<collection-id>/banner.webp
assets/collections/<collection-id>/icon.webp
```

Shared fallbacks live in `assets/collections/fallback/`. Missing artwork must fall back gracefully rather than exposing a broken image.

The collection banner and icon communicate collection identity; the reading page background, cards, buttons, progress controls, and settings retain the shared Duaa module visual system.

## Shared Interface Icon System

`js/app-shell.js` owns the small shared SVG icon library and hydrates elements marked with `data-ui-icon`. JavaScript-rendered components may use `window.UmmibyIcons.create(name)`. Functional icons must use this shared SVG system or another explicit SVG asset. Decorative collection artwork continues to load through the collection artwork registry.

Collection hero images use a responsive constrained height rather than their raw aspect ratio so reading content remains visible sooner.

## Date-Based Duaa Tracking (v0.6.0)

Daily tracking is centralized in:

```text
js/duaa-tracking.js
```

The service owns one versioned localStorage record:

```text
ummibyDuaaDailyTracking
```

Its conceptual structure is:

```javascript
{
  schemaVersion: 1,
  days: {
    "2026-07-11": {
      morning: { completed: ["morning-001"], updatedAt: "..." },
      evening: { completed: [], updatedAt: "..." },
      sleep: { completed: [], updatedAt: "..." }
    }
  },
  migrations: {
    legacyProgressV1: true
  }
}
```

The date key is calculated from the user’s local calendar date. Collection pages never erase a previous day when the date changes. They simply begin reading and writing the new date’s record.

`js/duaa-tracking-summary.js` provides current-day summaries to Duaa Home and `duaa/progress.html`. It loads the tracked collection data to calculate accurate totals rather than storing duplicated item counts.

Legacy keys in the form `ummibyDuaaProgress:<collection>` are migrated once. Valid legacy dates are preserved, and the old key is removed only after its completed IDs are merged into the new store.

Reference collections do not call the tracking service and do not create dated records.


## Weekly Duaa tracking summary (v0.6.1)

`js/duaa-tracking.js` continues to preserve exact completed Duaa identifiers under local-date records. Its weekly summary derives a Sunday-through-Saturday view from those dated records. A day is active when the collection record contains at least one completed Duaa. No separate streak database is created.

`js/duaa-tracking-summary.js` renders both the exact current-day counts on collection cards and the gentle weekly markers on Duaa Home and the weekly progress page.

Optional collection reflections live in collection metadata and are rendered by the shared `collection.html` renderer. This avoids collection-specific HTML pages.


## Duaa Home as the Daily Companion entry point (v0.6.1.2)

Duaa Home directly exposes Morning, Evening, and Before Sleep. A separate Daily Companion page is intentionally not maintained because it duplicated navigation without adding a distinct workflow.


## Monthly Duaa History

`duaa/progress.html` is the monthly history view. It reads the existing dated records from `js/duaa-tracking.js` and renders one Sunday-first calendar through `js/duaa-history.js`. The Morning, Evening, and Before Sleep tabs filter the same calendar without duplicating pages or storage. History is derived from `ummibyDuaaDailyTracking`; no separate summary database is maintained.


## Monthly History Layout Stability (v0.6.2.1)

`js/duaa-history.js` always renders 42 calendar cells, including hidden outside-month placeholders. This keeps the history panel at a stable six-row height across months. `css/duaa-history.css` centers each active-day marker and its singular/plural label as one activity group. The shared shell reserves scrollbar space and anchors the sidebar to the viewport top so month changes do not shift navigation.


## Collection Status and Long-Page Navigation (v0.6.2.2)

The shared Duaa collection renderer calculates the bottom status from the current local-date tracking record. The status is rendered only for tracked collections and distinguishes zero checked Duaas, partial recitation, and full collection completion. Reference collections never display tracking status.

A single floating back-to-top control is part of the shared collection page rather than individual collection data. It uses the shared SVG icon system, appears after meaningful scrolling, supports keyboard focus, and scrolls smoothly to the document top.

## Reference Collection Status Visibility (v0.6.2.3)

The shared collection renderer removes the bottom tracking-status component when `trackerEnabled` is false. CSS also explicitly enforces `display: none` for hidden completion panels. This keeps reference collections free of daily-tracking UI even if component display rules change later.


## Backup and Restore Architecture (v0.6.3)

`backup-restore.html` is an app-wide utility rather than a Qur’an- or Duaa-only page. `js/backup-restore.js` classifies recognized localStorage keys by module, exports exact stored string values, and wraps them in a versioned Ummiby backup envelope.

Backups declare `backupFormat`, `schemaVersion`, `appVersion`, `createdAt`, `scope`, and module data. Restore validates the entire envelope before changing storage. The first implementation uses replace-only semantics by included section: restoring Duaa data replaces recognized Duaa keys but leaves Qur’an keys untouched, and vice versa. Full backups replace all recognized sections.

Functional interface icons use the shared SVG icon registry. The hero illustration remains artwork and its title/copy are real HTML, so the image can be replaced later without embedding page text in the asset.


## Navigation and Information Architecture (v0.6.9)

The application uses `js/app-shell.js` as the single source for site-wide navigation and breadcrumbs.

### Primary destinations

Every sidebar includes these stable destinations in this order:

1. App Home
2. Qur’an Home
3. Duaa Home
4. Ramadan Central
5. Backup & Restore
6. Settings

Qur’an and Duaa expose their internal links only while the visitor is inside that module. Ramadan Central remains a single direct destination until its feature set grows enough to justify internal sidebar links.

### Breadcrumbs

Every page except the root App Home displays a breadcrumb in the shared top bar. The first item is App Home, followed by the full module-home name when applicable, and then the current page. Ancestor items are links; the current page is non-interactive and marked with `aria-current="page"`.

Do not add separate **Open module** or upper-right **App Home** links. Breadcrumbs are the standard return path to both App Home and the current module home.

### Official module-home names

Use these exact labels in the sidebar, breadcrumbs, page titles, and documentation:

- App Home
- Qur’an Home
- Duaa Home
- Ramadan Central

### Module themes

`app-shell.js` sets `data-app-module` on the document root. Shared components can use:

- `--module-primary`
- `--module-primary-dark`
- `--module-soft`

The current mappings are Qur’an green, Duaa blue, and Ramadan purple. New shared UI should use the module variables rather than hardcoding a module-specific accent.


## Contextual breadcrumb standard (v0.6.10)

Breadcrumbs describe the content the reader is using, not the underlying software page. Generic labels such as Reader, Viewer, Workspace, Details, and Module should not appear in user-facing breadcrumb trails. Dynamic pages derive breadcrumb labels from their URL context, including the selected duaa collection, surah, Ramadan day, and prayer portion. Ramadan reading belongs beneath Ramadan Central and Ramadan Reading Journey.

The internal `workspace.html` filename is retained temporarily to avoid premature file-path changes, but the user-facing concept is transitioning from “Reading Workspace” to a unified **Reading Experience** in which the current passage is the identity of the page and study resources support the reading in context.

## Shared Qur’an Study Library

The Study Library is journey-independent. Curated resources are attached to canonical Qur’an locations (surah or ayah range), then resolved by a shared renderer in every reading experience.

- `js/data/quran-study-library-data.js` — browser-ready curated resource data.
- `data/quran/study-resources.json` — readable authoring mirror.
- `js/quran-study-library.js` — matching, deduplication, personal storage, and shared UI.
- `css/quran-study-library.css` — shared presentation.

Any future reader can inherit the Library by supplying one or more `{ surahNumber, startAyah, endAyah }` ranges to `QURAN_STUDY_LIBRARY.render(...)`. Personal resources use the same Qur’an-location targeting and are included in Qur’an backups through the `ummiby.quran` storage prefix.
