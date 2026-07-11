# Changelog

All notable changes to this project are documented here.

## v0.5.8 — Duaa Reading Preferences

Status: Complete

### Added

- Persistent controls for showing or hiding Duaa transliteration
- Persistent controls for showing or hiding English translation
- Shared display-preference handling through the application preferences system

### Changed

- Duaa collection cards now honor the same reading preferences across tracked and reference collections
- Arabic remains visible at all times while optional supporting text can be simplified
- The roadmap now prioritizes reading comfort and daily tracking before memorization and the Ramadan Reading Journey

### Notes

Both display choices default to visible, preserving the existing reading experience for current users. Preferences are saved locally on the device and do not alter Duaa data or daily progress.

## v0.5.8 — Reading Experience Refinement

Status: Complete

### Added

- Arabic Text Size preference in Settings with Small, Medium, Large, and Extra Large choices
- Shared application configuration containing the current app name and version
- Shared version footer on every HTML page
- About section in Settings showing the current application version

### Changed

- Amiri typography is now reserved for Arabic Duaa text
- English and transliteration returned to the previous interface font and tighter line spacing
- Arabic text size is applied consistently through a shared CSS variable and saved locally on the device
- Future pages can receive the version footer through the shared application shell instead of hardcoded page text

### Notes

The Arabic text-size preference affects Arabic Duaa text only. It does not change English, transliteration, navigation, buttons, or other interface text. Existing progress data is unaffected.

## v0.5.7 — Reading Typography and Source Links

Status: Complete

### Added

- Amiri Quran typography for Arabic Duaa text
- Amiri typography for transliteration and English reading text
- Clickable source references when a verified `sourceReference` URL is present
- External-link accessibility text and safe new-tab behavior for source links

### Changed

- Source rendering now supports linked and unlinked references through the same reusable collection renderer
- Existing source records remain valid without requiring a URL
- Focus Mode headings now use Amiri for visual continuity with the collection experience

### Notes

This release adds the architecture for linked sources without inserting unverified URLs. Source links appear only after a real `http` or `https` address is added to a Duaa record. The fonts are loaded through Google Fonts and retain serif fallbacks when the external font service is unavailable.

## v0.5.6 — Collection Continuity Improvements

Status: Complete

### Added

- Sticky progress panel on tracked Duaa collection pages
- Soft gray checkmarks in incomplete completion circles
- Return-to-position behavior when leaving Focus Mode
- Brief visual highlight on the Duaa card returned to from Focus Mode

### Changed

- Focus Mode now returns to the Duaa currently being viewed rather than the top of the collection
- Collection cards include stable page anchors for direct return navigation

### Notes

This release improves continuity during daily use without changing collection data or adding new pages. Return position is carried in the navigation URL, so no permanent browser storage is required.

## v0.5.5 — Collection Theme Infrastructure

Status: In Progress

### Added

- Theme metadata inside every Duaa collection file
- Collection-specific accent, dark, soft, border, page background, and card background values
- Collection-specific icons
- Shared renderer support for collection-provided theme values
- Theme preview metadata in the collection registry
- Update instructions for manual repository replacement

### Changed

- Removed collection-specific colors from the shared renderer JavaScript
- The shared collection page now reads its visual identity directly from the loaded collection
- Morning, Evening, Before Sleep, Travel, Weather, Prayer, and Istikharah can now have distinct themes without separate HTML pages

### Notes

This version creates the infrastructure for unique collection identities. It does not yet add final banners or polished artwork.

## v0.5.4 — Project File Cleanup

Status: In Progress

### Changed

- Consolidated feature notes under `docs/guides/`
- Renamed feature documentation to clear guide names
- Kept only the main `README.md` in the project root
- Updated project documentation to reflect the reusable collection architecture

### Removed

- Obsolete Duaa redirect pages for Morning, Evening, Before Sleep, Travel, Weather, and Prayer
- Obsolete Morning-only stylesheet
- Obsolete Morning-only JavaScript renderer
- Redundant root-level feature README files

### Verified

- Current Duaa navigation points directly to the reusable collection page
- Remaining local HTML links resolve to existing project files
- The shared collection renderer remains the active collection experience

### Notes

This version changes file organization only. The visible design and intended application behavior remain unchanged.

## v0.5.3 — Split Duaa Collection Data

Status: In Progress

### Added

- Separate data file for each Duaa collection
- Lightweight collection registry
- Dynamic collection loader
- On-demand collection loading for the shared renderer
- On-demand loading in the Focus Mode prototype

### Changed

- Removed the single monolithic `duaa-collections.js` data file
- The shared collection page now loads only the requested collection
- Editing Morning data no longer requires working inside the Evening, Sleep, Travel, Weather, Prayer, or Istikharah data

### Notes

Collection data now lives in:

`js/data/collections/`

Adding a new duaa to a collection file automatically adds it to the rendered collection when the page reloads.

## v0.5.2 — Reusable Duaa Collection Renderer

Status: In Progress

### Added

- One reusable collection page for all Duaa collections
- Shared browser-ready data bundle for Morning, Evening, Before Sleep, Travel, Weather, Prayer, and Istikharah
- Collection-specific themes, titles, descriptions, and Focus Mode links
- Automatic daily tracking only for tracked collections
- Non-tracked reference collection behavior
- Generic Focus Mode routing for every collection
- Working Find a Duaa collection directory
- Redirects from legacy individual collection page URLs

### Changed

- Morning is no longer rendered by a special one-off page
- Duaa Home and Daily Companion now link to the reusable collection renderer
- Adding a new duaa to a collection’s data automatically adds a new card on reload

### Notes

The reusable URL pattern is:

`duaa/collection.html?collection=morning`

The same page is used for every collection.

## v0.5.1 — Morning Data Integration

Status: In Progress

### Added

- All 16 extracted Morning entries to the test collection
- Browser-ready Morning data module
- Dynamic generation of collection cards from structured data
- Complete card-form Arabic, transliteration, and English text
- Dynamic titles, summaries, repetition guidance, sources, and grades
- Dynamic progress totals based on the loaded data
- Focus Mode links for every Morning entry

### Changed

- Replaced four hard-coded sample cards with data-driven rendering
- Verification flags no longer affect development visibility
- Focus Mode prototype now recognizes all Morning entries

### Notes

The structured source data remains marked for editorial review where applicable. All entries are intentionally visible in this development build for testing.

## v0.5.0 — Morning Collection

Status: In Progress

### Added

- Usable Morning Adhkar collection prototype
- Four authenticated morning adhkar with complete Arabic, transliteration, and English
- Meaningful summary for each duaa
- Repetition guidance
- Daily checkmark tracking stored locally
- Automatic daily progress reset by date
- Collection progress bar and completion message
- Reset Today confirmation
- Focus Mode entry from every individual duaa
- Focus Mode starting-position prototype
- Updated Daily Companion page

### Notes

The Morning collection page is designed primarily for straightforward daily recitation.

Focus Mode is optional and can be entered from any duaa for deeper reflection, study, and memorization.

This prototype includes four authenticated entries so the user experience can be tested immediately. The full verified Morning collection will be migrated later from the previous Duaa repository.

## v0.4.0 — Duaa Home

Status: In Progress

### Added

- Separate Duaa Home dashboard
- Daily Companion cards for Morning, Evening, and Before Sleep
- Gentle progress overview for tracked collections
- Collection shortcuts for Travel, Weather, Prayer, and Istikharah
- Recently Viewed section
- Configurable Daily Reminder prototype
- Reminder pause and resume controls
- Responsive desktop, tablet, and mobile layouts
- Placeholder destination pages so dashboard navigation remains intact

### Notes

The root `index.html` remains the shared app Home. Duaa Home lives at `duaa/index.html`.

Morning, Evening, and Before Sleep are the only tracked collections. Other collections remain available for reference without daily progress pressure.

## v0.3.0 — Qur’an Home

Status: In Progress

### Added

- Separate Qur’an Home dashboard
- Continue Reading Journey section
- Current Reading Unit and resume position
- Start Over confirmation
- Reading Journey progress summary
- Reading Unit Index and Completed Journeys shortcuts
- Reading Journey, Ramadan Reading Journey, and Read by Surah or Go to an Ayah options
- Recently Read section
- Configurable Reading Reminder prototype
- Conditional Ramadan Journey progress panel

### Notes

The root `index.html` remains the shared app Home. Qur’an Home lives at `quran/index.html`, and Duaa Home will live at `duaa/index.html`.

## v0.2.0 — Shared Home

Status: In Progress

### Added

- Root application Home page
- Shared navigation for Home, Qur’an, Duaa, and Settings
- Qur’an and Duaa workspace introductions
- Collapsible “What are Reading Units?” explanation
- Responsive layouts

## v0.1.0 — Project Foundation

Status: In Progress

### Added

- Initial repository
- Initial project documentation
