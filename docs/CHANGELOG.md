# v0.7.2.6 — Reading Journey Progress Controls

- Added completion checkmarks to the Reading Journey index without changing the unit-card visual style.
- Made index completion checkmarks toggleable so individual Reading Units can be marked complete or incomplete.
- Added a confirmed Reset Reading Progress action that clears all Reading Unit completion and returns to Unit 1.
- Removed the user-facing “Canonical Reading Journey” label.
- Added a floating Back to Top control to the Reading Journey index.
- Standardized user-facing terminology around “Reading Unit.”
- Simplified the Topics in This Unit card by removing the redundant introductory sentence.
- Modernized the Show English translation control.
- Harmonized the Index and Mark Complete controls in the Reading Workspace footer.
- Renamed the footer scroll indicator to Reading Unit progress.

# v0.7.2.6 — Reading Workspace Navigation Polish

- Renamed “Before You Read” to “Topics in This Unit.”
- Added richer curated topic lists for the opening 30 Reading Units, including a fuller outline for the Cow passage.
- Restyled the Mark Complete control while preserving Previous and Next navigation.
- Added a Reading Journey index link to the fixed footer.
- Added live passage-reading progress to the footer.
- Moved Back to Top to a floating control on the right side of the page.

# v0.7.2.6 — Reading Workspace Layout Polish

- Restored the bilingual desktop and tablet layout with English on the left and Arabic on the right.
- Kept Arabic above English on narrower screens.
- Restored the soft green Before You Read box.
- Added the wording “In this passage you'll read about:” above concise topic bullets.
- Removed ayah references from Before You Read topics because the passage reference already appears in the workspace header.
- Preserved all 294 canonical Reading Units, navigation, completion, and saved progress behavior.

# v0.7.2.6 — Reading Journey Runtime Fix

- Fixed the global JavaScript name collision that stopped the Reading Workspace and Qur’an Home interactions before initialization.
- Fixed the Reading Workspace remaining on “Loading…” without displaying Qur’an text.
- Fixed the Switch Journey dialog on the Qur’an Home page.
- Fixed the Reading Journey consistency tabs.
- Isolated the canonical Reading Journey scripts so their internal constants cannot conflict across ordinary script tags.
- Preserved the 294 canonical Reading Units and all saved journey progress.

# v0.7.2.6 — Canonical Reading Journey

- Added the frozen canonical library of 294 Qur’an Reading Units.
- Built the complete Reading Journey index with search and saved progress.
- Built the Reading Workspace with Before You Read above Arabic and English translation.
- Added previous/next unit navigation, Mark Complete, and resume by canonical unit ID.
- Updated Qur’an Home to use the real Reading Journey position and progress.
- Updated release-wide version references to v0.7.2.6.

# v0.7.1 — Home Artwork Integration

- Added the approved warm scenic artwork to the App Home hero.
- Kept “Ummiby Companion” and its tagline as accessible, editable live text rather than embedding words in the image.
- Added dedicated green Qur’an, blue Duaa, and rich-aubergine Ramadan artwork to the three Home cards.
- Increased card image height across desktop, tablet, and mobile layouts.
- Organized the new files under `assets/images/home/` with consistent descriptive names.
- Preserved all existing Home navigation and module functionality.
- Updated release-wide version references to v0.7.1.

# v0.7.0 — Unified Home Experience

- Rebuilt App Home as a calm welcome space rather than a feature-heavy dashboard.
- Added three compact, equal destinations for Qur’an, Duaa, and Ramadan Central.
- Preserved the approved wording: “Read the Qur’an in the way that fits your goal” and “Make authentic duaas part of your day.”
- Added the Ramadan description: “Prepare for and experience Ramadan with purpose.”
- Added a dedicated warm-neutral Home palette with a slate-green Home sidebar.
- Replaced the old two-module heading and navigation language with the current three-module structure.
- Preserved the existing Qur’an, Duaa, and Ramadan themes and functionality.
- Updated visible and configuration version references to v0.7.0.


## v0.6.14 — Ramadan Library & History

- Replaced the lower Explore area with a softly styled Ramadan Library.
- Added centered circular-icon cards for Ramadan Duaas, Last Ten Nights, and Eid.
- Removed the duplicate Ramadan Reading Journey card; reading access now lives in Today’s Readings.
- Added Browse All Days beside the primary reading action.
- Added Ramadan History beside Record Make-up Fast.
- Preserved each Ramadan Fast Record and added a safe Begin New Ramadan flow.
- Migrated existing single-record fasting data into the multi-Ramadan history structure without discarding progress.
# v0.6.14 — Ramadan Fast Record Prototype

### Added

- Full Ramadan Fast Record calendar on Ramadan Central
- Ramadan Settings modal with First Fast Day and optional menstruation status
- Automatic Ramadan-day and Gregorian-date mapping from the First Fast Day
- Dual Hijri-priority and Gregorian date display at the top of Ramadan Central
- Per-day fasting statuses, optional notes, and make-up-fast counting
- Make-up fast date recording that remains available after Ramadan
- Shorter hero with separate Explore Ramadan tiles below the daily sections

### Notes

This is a testable UX prototype. It plans a 30-day reading journey without stating that every Ramadan must contain 30 fasting days. Fast Record data uses the Qur’an/Ramadan backup scope.

## Version 0.6.12 — Ramadan Central Hero

- Added a wide aubergine Ramadan hero image as a real site asset.
- Changed the hero title to **Ramadan Central** and moved all wording into accessible live HTML text.
- Added compact feature links for the Reading Journey, Browse Days, Fasting Tracker, Duaa Library, and Last Ten Nights.
- Future feature links now provide an inline Coming Soon message rather than leading to missing pages.
- Preserved the Ramadan journey, saved progress, and breadcrumb structure.

# Changelog

## Version 0.6.11 — Ramadan Central Theme 1.0

- Established Ramadan Central’s official deep-aubergine, warm-ivory, and antique-gold visual identity.
- Added semantic Ramadan theme tokens for primary, accent, background, borders, progress, links, and headings.
- Restyled Ramadan Central, Browse All Days, and the prayer-portion reader without changing their functionality.
- Added a refined aubergine gradient hero with a subtle geometric texture and restrained gold crescent treatment.
- Updated Ramadan progress bars, buttons, prayer statuses, cards, active sidebar state, breadcrumbs, and reader controls.
- Kept the Qur’an Arabic and translation surfaces neutral for comfortable reading.
- Preserved all Ramadan journey data, saved positions, completion tracking, navigation, and backup compatibility.

## Version 0.6.10 — Contextual Breadcrumbs

- Replaced generic breadcrumb labels such as “Qur’an Reader,” “Duaa Collection,” and “Ramadan Reading” with the actual content context.
- Duaa collection pages now name the selected collection; Focus Mode includes its parent collection.
- Surah reading pages now identify the current surah and preserve whether the reader came from Browse by Surah or the Classic Reading Journey.
- Ramadan reading breadcrumbs now follow: App Home › Ramadan Central › Ramadan Reading Journey › Day › Prayer Reading.
- The unfinished Reading Workspace label is no longer exposed to users; its placeholder now presents the current Reading Unit and begins the transition toward a unified Reading Experience.
- App Home remains the only page without breadcrumbs.

# v0.6.9 — Navigation & Information Architecture

Status: Complete

### Changed

- Removed every **Open module** link from the shared page header.
- Removed the redundant upper-right **App Home** link, including from App Home itself.
- Added breadcrumbs to every page except App Home.
- Kept the full module-home names in breadcrumbs: **Qur’an Home**, **Duaa Home**, and **Ramadan Central**.
- Made breadcrumb ancestors clickable while leaving the current page as plain text.
- Simplified the site-wide sidebar to always show App Home, Qur’an Home, Duaa Home, Ramadan Central, Backup & Restore, and Settings.
- Expanded internal navigation only for the active Qur’an or Duaa module.
- Kept Ramadan Central as one direct sidebar destination with no submenu.
- Added shared module theme variables: Qur’an green, Duaa blue, and Ramadan purple.
- Standardized the shared top bar around breadcrumbs and the mobile menu control.

# v0.6.8 — Unified Site Navigation

Status: Complete

### Changed

- Replaced page-by-page sidebar markup with one shared navigation system.
- Made **App Home** the consistent home destination on every page.
- Made Qur’an, Duaa, and Ramadan available from every full menu.
- Added module-aware navigation: the current module opens automatically and supplies the sidebar subtitle.
- Kept module destinations explicitly named **Qur’an Home**, **Duaa Home**, and **Ramadan Central**.
- Standardized Backup & Restore and Settings placement site-wide.
- Added the shared sidebar and mobile menu to pages that previously had no navigation shell.
- Standardized the top bar with App Home access and a clear current-module label.

# v0.6.7 — Ramadan Central 1.0

- Added Ramadan Central as its own Qur’an module destination after Read Without a Journey.
- Added a dedicated Ramadan home page rather than placing Ramadan inside the ordinary Journey selector.
- Added a 30-day, one-juz-per-day Ramadan Reading Journey.
- Divided every day into Fajr, Dhuhr, ʿAsr, Maghrib, and ʿIshāʾ reading portions using complete-ayah boundaries.
- Added compact clickable prayer rows showing the ayah range and Complete, Continue, or Start status.
- Added a Ramadan reading workspace that supports ranges crossing surah boundaries, translation visibility, automatic resume, previous/next portion navigation, and deliberate portion completion.
- Added separate Ramadan progress storage and included it automatically in Qur’an backup and restore.
- Added a Browse All Days page with independent progress for all 30 days.
- Kept live prayer times, a special Ramadan theme, last-ten-nights notices, moon-phase features, and fasting tracking outside the 1.0 scope.

# v0.6.6 — Classic Reading Journey

- Added a real persistent Classic Reading state model.
- Automatically remembers the latest visible ayah for resume.
- Added Save Place & Exit to confirm sessions and weekly consistency.
- Added a sticky green bottom reader bar with current location, surah progress, overall Quran progress, previous/next navigation, and a prepared Study Resources control.
- Added a real 114-surah Classic Reading index with completed, current, and upcoming states.
- Added deliberate surah completion and final journey completion behavior.
- Added a shared empty study resource data structure at `data/quran/study-resources.json`.
- Included the new Classic Reading state key in Quran backup and restore.

# v0.6.5.2 — Qur’an Reader Navigation Polish

- Added a left arrow to the Qur’an Home link on Quran reading pages.
- Added a floating green Back to Top button to the shared Quran reader.
- Matched the Duaa collection behavior: hidden near the top, visible after scrolling, and smooth scroll on activation.
- Changed Quran module sidebar and mobile menu styling to the Quran green theme.

# v0.6.5.1 — Qur’an Reader Text Polish

- Corrected opening basmalah display across all surahs.
- Kept Al-Fatihah’s basmalah as Ayah 1.
- Kept At-Tawbah without an opening basmalah.
- Preserved the basmalah within An-Naml 27:30 as part of the ayah.
- Added decorative Arabic ayah-number ornaments to the shared reader.

## v0.6.4 — Qur’an Reading Journeys Home

### Added

- New green Qur’an Home dashboard organized around tracked Reading Journeys and untracked reading.
- Current Reading Journey banner and modal with the reassurance that every journey’s place is always saved.
- Reading Units, Ramadan Journey, and Classic Reading as independent tracked journeys.
- Journey-specific Sunday-through-Saturday weekly consistency tabs.
- Compact progress cards showing all tracked journeys.
- Read Without a Journey section for Surah browsing, Ayah lookup, and Quran search.
- Qur’an-specific sidebar navigation with persistent Backup & Restore, Settings, and a single Duaa module switch.
- Initial Journey Index and Classic Reading destination pages.

### Removed from Qur’an Home

- Recently Read panel.
- Reading Reminder prototype.
- Large single-journey progress overview.
- Old Choose How You Would Like to Read section.


## v0.6.3 — Backup & Restore

- Added an app-wide Backup & Restore destination to the main menu.
- Added scoped JSON exports for Duaa data, Qur’an data, and all recognized app data.
- Added validated import with metadata preview and explicit confirmation.
- Restore operations replace only the sections included in the selected backup.
- Added versioned backup metadata and stable filenames.
- Added a temporary Backup & Restore hero image while keeping all page title text in accessible HTML.

# Changelog

## v0.6.2.3 — Reference Collection Status Fix

### Fixed

- Prevented the bottom daily-tracking status from appearing on untracked reference collections.
- The shared collection renderer now removes the status component entirely for reference collections.
- Added an explicit hidden-state CSS safeguard so hidden completion panels cannot be displayed by component layout rules.

### Notes

- Morning, Evening, and Before Sleep retain their live current-day status.
- Tracking storage, history, Duaa content, reading preferences, and back-to-top behavior are unchanged.

## v0.6.2.2 — Collection Usability Polish

### Changed

- Replaced the hard-coded collection-complete message with a live current-day status for Morning, Evening, and Before Sleep.
- The bottom status now distinguishes no activity, partial recitation, and full collection completion.
- Removed the bottom tracking status from all untracked reference collections.
- Added an accessible floating SVG back-to-top control to shared Duaa collection pages.

### Notes

- Daily tracking storage and history data are unchanged.
- The back-to-top control appears only after scrolling and uses smooth scrolling.

## v0.6.2.1 — History Calendar Polish

### Changed

- Centered the active-day count circle and Duaa/Duaas label inside each calendar cell.
- Reserved a consistent six-week calendar grid for every month.
- Stabilized the page scrollbar gutter and sidebar positioning to prevent navigation movement when changing months.
- Kept all history markers in the shared Duaa blue palette.

### Notes

- Tracking logic, dated records, and browser storage are unchanged.

## v0.6.2 — Duaa History and Consistency

### Added

- Monthly Duaa history calendar for Morning, Evening, and Before Sleep
- Collection tabs within one shared calendar
- Previous and next month navigation
- Exact checked-Duaa counts inside active calendar dates
- Monthly active-day summary without total-Duaa statistics

### Changed

- Renamed “Weekly Progress” to “Weekly Consistency” on Duaa Home
- Renamed the weekly-panel link to “View History”
- Unified the guidance and hadith font family in Daily Companion
- Kept the source link visually distinct from the guidance and hadith text

### Notes

- Existing date-based tracking storage remains unchanged.
- A day is active when at least one Duaa is checked in that collection.
- Calendar weeks run Sunday through Saturday.

## v0.6.1.2 — Duaa Home Navigation and Layout Refinement

- Removed the standalone Daily Companion page and its navigation links.
- Kept direct access to Morning, Evening, and Before Sleep on Duaa Home.
- Moved the “Every Duaa counts” guidance and linked Sahih al-Bukhari 6464 reminder into the Daily Companion section as simple text.
- Removed the redundant sentence beneath the Weekly Progress heading.
- Left Sunday-through-Saturday labels inside each weekly tracker unchanged.
- Preserved all tracking logic, dated history, and browser storage.

## v0.6.1 — Gentle Weekly Progress

- Replaced the Duaa Home daily percentage summary with Sunday-through-Saturday weekly progress for Morning, Evening, and Before Sleep.
- Defined a successful tracked day as checking at least one Duaa in that collection.
- Kept exact per-day Duaa counts in history while using participation for weekly markers.
- Added the message: “Every Duaa counts. Checking at least one Duaa marks the day as complete.”
- Added the consistency hadith from Sahih al-Bukhari 6464 with a linked source.
- Added a Morning-only reflection featuring Ibn Taymiyyah’s description of his morning remembrance as his breakfast, linked to the supplied source.
- Kept daily collection cards showing the exact number recited today.

## v0.6.0 — Daily Duaa Tracking Foundation

### Added

- Shared `js/duaa-tracking.js` service with local-date-based daily records.
- Preserved daily history for Morning, Evening, and Before Sleep.
- One-time migration from legacy `ummibyDuaaProgress:<collection>` records.
- Shared live tracking summaries for Duaa Home, Daily Companion, and Today’s Progress.
- Local-date refresh checks when a tracked page regains focus, becomes visible, or remains open across a date change.

### Changed

- Morning, Evening, and Before Sleep now read and write today’s dated record instead of overwriting one undated current state.
- A new local day naturally displays a fresh checklist while earlier records remain saved.
- The manual control is now labeled **Reset Today’s Progress** and clears only today’s record for the current collection.
- Duaa Home progress figures now reflect real current-day completion instead of sample values.
- `duaa/progress.html` now shows real current-day details and explains that weekly history is forthcoming.

### Removed

- Static Recently Viewed dashboard section.
- Placeholder `duaa/recent.html` page.
- Duaa reminder prototype, modal, and reminder-only script behavior.
- Obsolete `js/duaa-home.js` reminder script.

### Compatibility

- Existing Duaa content, artwork, reading preferences, and Focus Mode navigation remain unchanged.
- Legacy completion records are migrated once and removed only after they are incorporated into the dated history store.

# Version 0.5.9.1 — Collection Artwork Refinement

- Reduced Duaa collection hero height responsively so artwork introduces the collection without pushing reading content too far down the page.
- Centered artwork, titles, descriptions, and actions in the Duaa Home “Explore More Duaa Collections” cards.
- Replaced remaining Unicode interface symbols with shared inline SVG icons across current application pages and JavaScript-rendered Duaa controls.
- Preserved collection illustrations, banners, and circular artwork as image assets rather than treating them as UI icons.

## Version 0.5.9 — Duaa Collection Identity System

- Added standardized artwork folders for Morning, Evening, Before Sleep, Travel, Weather, Prayer, and Istikharah.
- Added the supplied Resources and Backup & Restore banners for future utility-page use.
- Added shared fallback banner and icon artwork so missing assets never create broken images.
- Moved collection artwork paths and accessible descriptions into the collection registry.
- Removed obsolete Unicode collection-icon fields from the individual collection theme records.
- Updated the reusable collection renderer to load collection banners and circular artwork automatically.
- Updated Duaa Home, Daily Companion, and Find a Duaa cards to use the same registry-driven artwork.
- Preserved the shared light-blue/dark-blue Duaa reading interface beneath every collection identity.

## Version 0.5.8.4 — Completed Duaa Card Refinement

- Changed completed Duaa card accents from green to the shared Duaa blue palette.
- Extended the completed header treatment through the repetition row to the horizontal divider.
- Changed the completed check control to a blue circle with a white SVG checkmark.
- Preserved all completion logic, progress storage, and uncompleted-card behavior.

## Version 0.5.8.3 — Shared Duaa Visual Identity

- Standardized Duaa collection and Focus Mode page backgrounds to the shared light-blue Duaa surface.
- Standardized buttons, progress indicators, links, pills, borders, and reading accents to the dark-blue/blue Duaa palette.
- Stopped collection color metadata from recoloring the shared reading interface.
- Reserved collection-specific visual variation for banners and decorative imagery.
- Replaced the collection hero's data-driven Unicode symbol with a shared inline SVG decoration.

## Version 0.5.8.2 — Context-Specific Duaa Preferences

- Separated Duaa collection-page preferences from Focus Mode preferences.
- Migrated the v0.5.8.1 Duaa preferences into both reading contexts on first load.
- Replaced the collection-page settings text link with a matching secondary button and SVG gear icon.
- Kept the Focus Mode settings control as a text link until the Focus Mode interface is developed further.
- Added the project-wide rule that interface icons use SVG rather than Unicode symbols.

# Changelog


## Version 0.5.8.1 — Contextual Duaa Reading Settings

- Moved Duaa reading preferences out of the app-wide Settings page and into the Duaa reading experience.
- Added a shared **Reading Settings** modal to every Duaa collection page and Focus Mode.
- Kept Arabic text size, transliteration visibility, and English translation visibility synchronized across Duaa views.
- Established a separate `ummibyDuaaPreferences` browser record so future Qur’an preferences can remain independent.
- Added one-time migration from the former general preferences record so existing choices are preserved.
- Returned the main Settings page to app-wide information and About/version details.

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
