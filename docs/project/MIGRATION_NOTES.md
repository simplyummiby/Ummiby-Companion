# Migration Notes

## Source cleanup performed

- Removed numeric prefixes such as `1.` from transliteration and translation lines.
- Joined phrase lines into full card-readable text.
- Preserved phrase arrays for Focus Mode.
- Normalized `english` and `translation` into one translation field.
- Preserved source, grade, virtues, verification flags, and resources.
- Added stable collection-scoped IDs.

## Review needed

- Confirm suggested titles.
- Verify every Arabic text, translation, source, and grade.
- Review entries where Arabic, transliteration, and translation have different phrase counts.
- Decide how to handle the Three Protective Surahs entry, since it currently contains instructions rather than the full three surahs.
- Reconcile Ayat al-Kursi virtues and collection-specific wording.
