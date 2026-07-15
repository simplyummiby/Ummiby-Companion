## v0.7.8.1 — Basmalah Rendering Patch

### BASMALAH RENDERING

- [x] Browse by Surah still displays standalone Basmalah for normal surah openings.
- [x] Browse by Surah still keeps Surah 1 ayah 1 unchanged.
- [x] Browse by Surah still suppresses standalone Basmalah for Surah 9.
- [x] Reading Unit entirely within one surah renders without extra Basmalah insertion.
- [x] Reading Unit beginning at Surah 1 keeps the inline Basmalah in ayah 1.
- [x] Reading Unit entering a new normal surah displays one standalone Basmalah and strips the duplicated opening text from ayah 1.
- [x] Reading Unit entering Surah 9 follows the Browse by Surah exception.
- [x] Reading Unit including Surah 27 ayah 30 preserves the in-ayah Basmalah because only opening ayah 1 is normalized.
- [x] Ramadan reading portions now use the same canonical helper and retain existing transition behavior.

### REGRESSION

- [x] Reading progress logic unchanged.
- [x] Bookmarks, notes, memorization features, reading unit calculations, translation rendering, and navigation were not changed.
- [x] JavaScript syntax checks pass.
- [x] Basmalah helper regression test passes.

## v0.7.8 — Ayah Workspace

### AYAH FILTERS

- [x] All shows all ayahs.
- [x] Not Started filter works.
- [x] Learning filter works.
- [x] Memorized filter works.
- [x] Needs Revision filter works.
- [x] Active filter is clear through visible styling and `aria-pressed`.
- [x] Empty filtered state works.
- [x] Filters do not change saved statuses.

### HIDE MEMORIZED

- [x] Hide Memorized removes memorized ayahs except when the Memorized filter is active.
- [x] Preference survives refresh through `ummibyMemorizationHideMemorized`.
- [x] Memorized filter behavior is predictable: it temporarily ignores Hide Memorized so memorized ayahs can be inspected.
- [x] Empty state works when all visible ayahs are hidden.

### JUMP CONTROLS

- [x] Next Ayah jumps to first Not Started.
- [x] First Learning jumps correctly.
- [x] First Needs Revision jumps correctly.
- [x] Buttons disable and include explanatory labels when no target exists.
- [x] Target tile receives focus.
- [x] Target tile gets a temporary highlight.
- [x] Sticky toolbar scroll margin prevents covering the target on desktop/tablet; mobile uses a non-sticky safe layout.

### GO TO AYAH

- [x] Valid ayah number works.
- [x] Minimum boundary works.
- [x] Maximum boundary works.
- [x] Invalid number shows inline status text.
- [x] Hidden target behavior is clear and automatically switches to an All-visible view.
- [x] Target receives focus and highlight.

### STICKY TOOLBAR

- [x] Sticks correctly on desktop.
- [x] Does not cover content due to tile scroll margins.
- [x] Wraps on tablet.
- [x] Remains usable on phone with non-sticky layout to avoid consuming the viewport.
- [x] No horizontal scrolling introduced.

### RESUME POSITION

- [x] Last meaningful ayah is stored.
- [x] Each surah stores independently in `ummibyMemorizationAyahWorkspacePosition`.
- [x] Resume action appears when appropriate.
- [x] Resume scrolls and focuses correctly.
- [x] Invalid stored data fails safely.
- [x] Page does not force-scroll unexpectedly.

### CURRENT WORKING AYAH

- [x] Working ayah cue is visible.
- [x] Cue differs from status colors.
- [x] Accessible label is accurate.
- [x] Cue updates after status changes and jumps.

### PROGRESS

- [x] Compact progress summary updates.
- [x] Full progress ring still updates.
- [x] Counters still update.
- [x] No duplicate or conflicting calculations.

### REGRESSION

- [x] Ayah status modal still works.
- [x] Bulk actions still work.
- [x] Completion message still works.
- [x] Surah-level status synchronization still works.
- [x] Personal notes still save.
- [x] Started date still works.
- [x] Maintenance placeholder remains.
- [x] Read This Surah works.
- [x] Memorization Home remains linked.
- [x] Surah Library search and filters remain unchanged.
- [x] Backup and restore still include Memorization-prefixed keys.
- [x] JavaScript syntax checks pass.

### LONG-SURAH TESTS

- [x] Al-Fatihah works by ayah count boundaries.
- [x] Al-Mulk works by ayah count boundaries.
- [x] Al-Baqarah works by ayah count boundaries.
- [x] Filtering uses a single render pass and no major lag is expected.
- [x] No horizontal scrolling introduced in the workspace CSS.
- [x] Jumping near the end of Al-Baqarah works through Go to Ayah max boundary 286.

### ACCESSIBILITY

- [x] Filter chips expose active state.
- [x] Checkbox is labeled.
- [x] Go to Ayah validation is announced through a live status message.
- [x] Jumped-to tile receives focus.
- [x] Focus indicators are visible.
- [x] Keyboard navigation works for buttons, checkbox, input, and modal flows.
- [x] Status remains understandable without color through labels and symbols.
