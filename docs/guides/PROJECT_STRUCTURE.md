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
    ├── INDEX.md
    ├── project/
    ├── design/
    ├── quran/
    ├── duaa/
    ├── home/
    └── guides/
```

## Documentation Structure

- `docs/INDEX.md` — linked documentation homepage and starting point for development sessions
- `docs/project/` — vision, architecture, decisions, modules, roadmap, changelog, and migration records
- `docs/design/` — shared design philosophy and theme standards
- `docs/quran/` — Qur’an feature roadmaps, guides, and historical release notes
- `docs/duaa/` — Duaa feature guides and historical release notes
- `docs/home/` — shared Home documentation
- `docs/guides/` — app-wide operational guides that do not belong to one module

## Root Rule

Keep only files needed to enter, configure, or explain the application in the project root. Detailed documentation belongs under `docs/` and should be linked from `docs/INDEX.md`.

## Documentation Rule

Working roadmaps belong in the folder for the feature they govern. Reference documents belong in `docs/project/` or `docs/design/`. When a document is moved, update links and repository guidance in the same change.

## Shared App Files

- `js/app-config.js` — application name and current version
- `js/app-shell.js` — shared version footer and global preference application
- `js/duaa-reading-settings.js` — shared contextual Duaa Reading Settings modal used by collection pages and Focus Mode
- `css/duaa-reading-settings.css` — shared styles for the contextual Duaa settings modal

Every new HTML page should load `app-config.js` followed by `app-shell.js` so the version display remains automatic and consistent.

## Icon Standard

Use SVG files for functional interface icons. Decorative artwork may use appropriate image assets, but Unicode characters should not substitute for interface icons.
