# Backup & Restore Guide

## Export scopes

- **Duaa Data** includes dated Duaa tracking and Duaa collection/Focus Mode preferences.
- **Qur’an Data** includes recognized Qur’an and Ramadan local-storage records.
- **All App Data** includes both module sections and recognized app-wide data.

Backup files use JSON and include the app version, creation timestamp, schema version, and scope.

## Restore behavior

The app identifies and validates the file before enabling import. Import is replace-only for included sections. A Duaa restore does not alter Qur’an data; a Qur’an restore does not alter Duaa data. Invalid or unsupported files do not change storage.

## Artwork

The current hero artwork is temporary. Page title and supporting text are HTML and must not be embedded into replacement artwork. Interface controls use shared SVG icons.

## Qur’an memorization ayah tracking data

As of v0.7.7, Qur’an and full backups include ayah-by-ayah memorization records through the existing `ummibyMemorization` backup prefix. The included keys are:

- `ummibyMemorizationAyahStatuses`
- `ummibyMemorizationAutoSurahStatus`
- `ummibyMemorizationAyahCompletionAcknowledgements`

Older backups that do not contain these keys still restore safely; missing ayah data is treated as empty progress.
