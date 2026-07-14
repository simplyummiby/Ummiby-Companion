# Project Structure

```text
/
├── README.md
├── index.html
├── settings.html
├── assets/
├── css/
├── js/
├── quran/
├── duaa/
└── docs/
    ├── guides/
    └── project documentation
```

## Root Rule

Keep only files needed to enter or configure the application in the project root.

Feature notes and implementation guidance belong in `docs/guides/`.


## Shared App Files

- `js/app-config.js` — application name and current version
- `js/app-shell.js` — shared version footer and global preference application
- `js/duaa-reading-settings.js` — shared contextual Duaa Reading Settings modal used by collection pages and Focus Mode
- `css/duaa-reading-settings.css` — shared styles for the contextual Duaa settings modal

Every new HTML page should load `app-config.js` followed by `app-shell.js` so the version display remains automatic and consistent.

## Icon Standard

Use SVG for interface icons throughout Ummiby Companion. Do not add Unicode symbols as buttons, menu icons, status icons, or navigation icons. Pictures, banners, and decorative collection artwork are separate visual assets and are not governed by the interface-icon rule.


## Collection Artwork

```text
assets/collections/
├── fallback/
│   ├── banner.svg
│   └── icon.svg
├── morning/
│   ├── banner.webp
│   └── icon.webp
└── <other-collection-id>/
    ├── banner.webp
    └── icon.webp
```

Artwork paths are registered in `js/data/collection-registry.js` and rendered by `js/collection-artwork.js`.


### Duaa history files

- `duaa/progress.html` — monthly Duaa history page
- `css/duaa-history.css` — monthly calendar layout and responsive styles
- `js/duaa-history.js` — collection tabs, month navigation, active-day summaries, and calendar rendering
