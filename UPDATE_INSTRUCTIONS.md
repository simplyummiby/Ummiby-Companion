# Update Instructions — Ummiby Companion v0.6.1.2

This release replaces v0.6.1.1.

## Install

1. Extract the v0.6.1.2 ZIP.
2. Copy all extracted files into your local project folder.
3. Choose **Replace** when prompted.
4. Delete the obsolete file listed below.
5. Review the changes in GitHub Desktop, commit, and push.

## File to delete

```text
duaa/daily-companion.html
```

## Main files replaced

```text
duaa/index.html
css/duaa-home.css
js/app-config.js
README.md
docs/CHANGELOG.md
docs/ROADMAP.md
docs/DECISIONS.md
docs/ARCHITECTURE.md
docs/MODULES.md
docs/guides/DUAA_HOME.md
UPDATE_INSTRUCTIONS.md
```

Navigation references were also removed from current HTML pages.

## Browser data

No browser-storage migration is required. Daily tracking history and Duaa reading preferences remain unchanged.

## Test

- Confirm the footer shows version 0.6.1.2.
- Confirm Duaa navigation no longer lists a standalone Daily Companion page.
- Confirm Morning, Evening, and Before Sleep open directly from Duaa Home.
- Confirm “Every Duaa counts” and the linked Bukhari citation appear beneath the three Daily Companion cards without a separate box.
- Confirm the sentence beneath Weekly Progress has been removed.
- Confirm each weekly tracker still displays Sunday through Saturday.
- Confirm existing daily and weekly progress remains visible.
