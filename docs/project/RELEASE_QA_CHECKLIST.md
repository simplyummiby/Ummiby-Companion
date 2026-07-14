## v0.7.7 — Ayah Memorization Tracking

- [x] Al-Fatihah renders 7 ayah tiles in code-level verification.
- [x] Al-Mulk renders 30 ayah tiles in code-level verification.
- [x] Al-Baqarah renders 286 ayah tiles in code-level verification.
- [x] No horizontal-scrolling CSS was introduced for the ayah grid.
- [x] Tile labels include ayah number, status, and suggested-next cue where applicable.
- [x] Ayah status modal includes all four statuses and closes after save, backdrop click, or Escape.
- [x] Dedicated localStorage keys are used for ayah statuses, auto-sync preference, and completion acknowledgements.
- [x] Corrupt localStorage reads fail safely through guarded JSON parsing.
- [x] Counters, progress ring, percentage, and suggested next ayah update from one render path after changes.
- [x] Bulk actions require the custom confirmation modal and support cancel.
- [x] Auto-sync preference is configurable and does not overwrite Needs Revision.
- [x] Completion message is shown only at the moment a surah becomes fully memorized and can be dismissed.
- [x] Qur’an/full backup scopes include the new ayah keys through the existing Memorization prefix.
- [x] JavaScript syntax checks pass.
- [ ] Full browser/device manual QA remains recommended before public distribution.

---

## v0.7.6.1 — Memorization Preview Counts

- [x] Currently Memorizing displays no more than four preview cards.
- [x] Needs Revision displays no more than four preview cards.
- [x] View all button appears only when more than four surahs match.
- [x] View all button includes the complete matching count.
- [x] View all applies the correct status filter.
- [x] View all scrolls to My Surahs.
- [x] Empty states remain unchanged when no surahs match.
- [x] JavaScript syntax check passes.

---

## v0.7.6 — Surah Detail Page

- [x] Every Surah Library card opens its matching detail page.
- [x] Header displays the correct Arabic and English names.
- [x] Header displays surah number, Makki/Madani, and ayah count.
- [x] Status selector still opens and saves.
- [x] Memorization summary reflects the saved status.
- [x] Started date is created only after leaving Not Started.
- [x] Started date remains stable after later status changes.
- [x] Maintenance Schedule placeholder is visible.
- [x] Personal notes save separately for each surah.
- [x] Notes character count updates.
- [x] Read This Surah opens the correct surah.
- [x] JavaScript syntax check passes.
- [x] Mobile layout rules are present.

---

## v0.7.5.3 — Memorization Status Selector UX

- [x] Surah card itself still opens the Surah Detail page.
- [x] Status control remains a separate button.
- [x] Library status button includes a visible down arrow.
- [x] Detail-page status button includes the same down arrow.
- [x] Both status controls retain accessible labels.
- [x] Hover and keyboard-focus states are visible.
- [x] JavaScript syntax checks pass.

---

# Release QA Checklist

## v0.7.5.2 — Memorization Status Tracking Fix

- [x] Memorization page loads all 114 surah cards
- [x] Search filters the Surah Library
- [x] Clear Filters restores all 114 surahs
- [x] Status filter chips work
- [x] Makki / Madani filter chips are wired
- [x] Status modal opens for a surah
- [x] Status selection updates the surah card
- [x] Dashboard statistics update immediately
- [x] Currently Memorizing and Needs Revision sections update from saved statuses
- [x] Surah cards link to the correct Surah Detail route
- [x] Surah Detail status modal opens and changes status
- [x] Status data is saved safely when browser storage is available
- [x] JavaScript syntax checks pass
- [x] Version number is updated throughout the release
