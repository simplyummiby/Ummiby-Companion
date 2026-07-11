# Update Instructions — Ummiby Companion v0.6.3.1

This package updates v0.6.3 to v0.6.3.1.

## Install

1. Extract the v0.6.3.1 ZIP.
2. Copy all extracted files and folders into the local Ummiby Companion repository.
3. Choose **Replace** for existing files.
4. Review the changes in GitHub Desktop, commit, and push.

## Files added

None.

## Files replaced

- `backup-restore.html`
- `css/backup-restore.css`
- `js/app-config.js`
- `README.md`
- `docs/CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/guides/BACKUP_RESTORE.md`
- `UPDATE_INSTRUCTIONS.md`

## Files deleted

None.

## Browser data

This update does not migrate, clear, or rename browser data. Backup JSON structure, validation, and restore behavior are unchanged.

## Test checklist

- Confirm **Back Up All Data** is the largest and most prominent backup action.
- Confirm the primary action downloads a full backup JSON file.
- Confirm **Advanced Backup Options** contains Duaa-only and Qur’an-only exports.
- Confirm both module-only export buttons still download valid backups.
- Confirm Restore From a Backup is unchanged and detects backup scope automatically.
- Confirm existing v0.6.3 backup files can still be selected and validated.
- Confirm the page displays Version 0.6.3.1.
