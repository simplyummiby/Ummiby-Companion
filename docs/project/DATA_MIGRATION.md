# Data Migration

Track content migrated from previous repositories.

## Quran
- Arabic text
- Translations
- Reading Units
- Surah metadata

## Duaa
- Collections
- Verified duaas
- Sources
- Benefits
- Study resources

Record migration status as content is brought into the new repository.

## Morning Collection Prototype

Status: Partial prototype

Four authenticated morning adhkar were added manually for v0.5.0 to test the collection experience.

The complete verified Morning collection should later be migrated from the previous Duaa repository, reviewed entry by entry, and replace or reconcile these prototype records.

## Morning Data Integration

Status: Integrated for testing

All 16 extracted Morning records are now rendered dynamically through `duaa/collection.html?collection=morning`.

The development interface intentionally ignores verification status for visibility. Editorial metadata remains preserved for later review.

## v0.6.0 — Legacy Duaa Progress Migration

The first page load after installing v0.6.0 migrates these legacy keys when present:

```text
ummibyDuaaProgress:morning
ummibyDuaaProgress:evening
ummibyDuaaProgress:sleep
```

Each legacy record is merged into the matching date and collection inside:

```text
ummibyDuaaDailyTracking
```

If a legacy record contains a valid local date, that date is preserved. If its date is missing or malformed, the record is assigned to the current local date. The old key is removed only after the data is written into the new versioned store.

The migration is marked complete in the new store and will not run repeatedly.
