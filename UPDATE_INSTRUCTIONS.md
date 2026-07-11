# Update Instructions — Ummiby Companion v0.6.3

This package updates v0.6.2.3 to v0.6.3.

## Install

1. Extract the v0.6.3 ZIP.
2. Copy all extracted files and folders into the local Ummiby Companion repository.
3. Choose **Replace** for existing files.
4. Review the changes in GitHub Desktop, commit, and push.

## Files added

- `backup-restore.html`
- `css/backup-restore.css`
- `js/backup-restore.js`
- `docs/guides/BACKUP_RESTORE.md`

## Files replaced

- All HTML pages containing the shared primary menu
- `settings.html`
- `js/app-config.js`
- `js/app-shell.js`
- `README.md`
- `docs/CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/MODULES.md`
- `UPDATE_INSTRUCTIONS.md`

## Files deleted

None.

## Browser data

Installing this version does not migrate or clear existing browser data. Export and restore actions occur only when initiated by the user. Restoring a backup replaces only the sections declared by that backup.

## Test checklist

- Confirm Backup & Restore appears in the menu from shared Home, Qur’an, and Duaa pages.
- Export a Duaa backup and confirm the filename and JSON metadata.
- Export a Qur’an backup and a full backup.
- Select a valid backup and confirm the metadata summary appears before import.
- Cancel the restore and confirm no data changes.
- Try an invalid JSON file and confirm the app reports that no data changed.
- Restore a Duaa backup and confirm Qur’an data is untouched.
- Confirm the page displays Version 0.6.3.
