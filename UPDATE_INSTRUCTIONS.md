# Update Instructions — Ummiby Companion v0.6.0

## Replaces

v0.5.9.1

## Install

1. Extract `ummiby-companion-v0.6.0-full.zip`.
2. Copy all extracted files and folders into your local Ummiby Companion repository.
3. Choose **Replace** for existing files.
4. Delete the two obsolete files listed below.
5. Open GitHub Desktop and confirm that the expected additions, modifications, and deletions appear.
6. Test locally, commit, and push.

## Files Added

```text
js/duaa-tracking.js
js/duaa-tracking-summary.js
```

## Files Replaced / Modified

```text
README.md
UPDATE_INSTRUCTIONS.md
css/duaa-home.css
docs/ARCHITECTURE.md
docs/CHANGELOG.md
docs/DATA_MIGRATION.md
docs/DECISIONS.md
docs/MODULES.md
docs/ROADMAP.md
docs/guides/DUAA_COLLECTIONS.md
docs/guides/DUAA_HOME.md
duaa/collection.html
duaa/daily-companion.html
duaa/index.html
duaa/progress.html
js/app-config.js
js/collection.js
```

## Files to Delete

```text
duaa/recent.html
js/duaa-home.js
```

Copying files over the existing folder will not remove these obsolete files automatically. Delete them manually so GitHub Desktop records them as deletions.

## Browser Storage Changes

v0.6.0 introduces the versioned storage key:

```text
ummibyDuaaDailyTracking
```

On first load, existing Morning, Evening, and Before Sleep progress from these legacy keys is migrated safely:

```text
ummibyDuaaProgress:morning
ummibyDuaaProgress:evening
ummibyDuaaProgress:sleep
```

Earlier dated records are preserved. The legacy keys are removed after successful migration.

The old Duaa reminder preference, if one exists, is left untouched in browser storage but is no longer read or shown. Duaa reading preferences, artwork, content, and Focus Mode settings are not changed.

## Testing Checklist

- Confirm every page footer shows **v0.6.0**.
- Open Morning, check one or more Duaas, refresh, and confirm today’s checks remain.
- Confirm Duaa Home shows the real Morning count rather than sample progress.
- Repeat with Evening and Before Sleep.
- Open Daily Companion and confirm each card shows today’s actual status.
- Open Today’s Progress and confirm its totals match the three collection pages.
- Use **Reset Today’s Progress** in one collection and confirm only that collection’s current-day checks clear.
- Confirm other tracked collections remain unchanged.
- Confirm Travel, Weather, Prayer, and Istikharah do not show daily completion controls.
- Confirm Recently Viewed and Duaa Reminder sections no longer appear on Duaa Home.
- Confirm no link points to `duaa/recent.html`.
- Confirm collection artwork, Reading Settings, Focus Mode, and return-to-card behavior still work.
- For a rollover test, temporarily change the computer date in a test browser/profile or seed a prior-date record, then confirm the current local date begins with a fresh checklist while the prior record remains in `ummibyDuaaDailyTracking`.

## Commit Message

```text
feat(duaa): add date-based daily tracking
```
