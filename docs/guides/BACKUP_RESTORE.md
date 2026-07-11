# Backup & Restore Guide

## Recommended backup

**Back Up All Data** is the primary recommended action. It creates one complete Ummiby Companion backup containing recognized Qur’an, Duaa, and app-wide data.

Module-only exports remain available under **Advanced Backup Options** for cases where the user intentionally needs only Duaa or only Qur’an data.

## Export scopes

- **Duaa Data** includes dated Duaa tracking and Duaa collection/Focus Mode preferences.
- **Qur’an Data** includes recognized Qur’an and Ramadan local-storage records.
- **All App Data** includes both module sections and recognized app-wide data.

Backup files use JSON and include the app version, creation timestamp, schema version, and scope.

## Restore behavior

The app identifies and validates the file before enabling import. Import is replace-only for included sections. A Duaa restore does not alter Qur’an data; a Qur’an restore does not alter Duaa data. Invalid or unsupported files do not change storage.

## Artwork

The current hero artwork is temporary. Page title and supporting text are HTML and must not be embedded into replacement artwork. Interface controls use shared SVG icons.
