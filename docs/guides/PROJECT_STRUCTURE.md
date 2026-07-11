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
- `js/settings.js` — Settings page controls for Arabic text size

Every new HTML page should load `app-config.js` followed by `app-shell.js` so the version display remains automatic and consistent.
