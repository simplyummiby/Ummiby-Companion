# Decisions

- Shared Home introduces the workspaces; it is not a dashboard.
- Quran and Duaa each have their own Home page.
- Reading Units preserve the exact order and text of the Qur'an.
- Quran study resources remain on the Reading Workspace.
- Duaa Collections are for recitation.
- Focus Mode is for study, reflection, and memorization.
- Morning, Evening, and Before Sleep support gentle tracking.

## Duaa Home and Collection Experience

- Duaa Home is a dashboard separate from the shared root Home.
- Morning, Evening, and Before Sleep are the only collections with daily tracking.
- Non-tracked collections are available for reference without completion pressure.
- Collection pages will support straightforward recitation using full duaa cards.
- Focus Mode can be entered from any individual duaa for reflection, study, and memorization.
- Duaa reminders should use gentle wording and support pause/resume.

## Morning Collection Pattern

- The collection page is the primary daily recitation experience.
- Every duaa card displays the complete Arabic, transliteration, and English translation.
- Cards use meaningful summaries rather than truncated duaa excerpts.
- Morning, Evening, and Before Sleep cards include completion checkmarks.
- Progress is daily and gently resets by date.
- Repetition guidance appears clearly on each card.
- Focus Mode can be entered from any individual duaa and starts on that duaa.
- Sources remain visible in a small, unobtrusive line for authenticity.

## Shared Collection Renderer

- All Duaa collections use one reusable collection page.
- Collection identity comes from a URL query parameter.
- Tracked or non-tracked behavior comes from collection metadata.
- New duaas appear automatically when added to the collection data.
- Legacy individual collection URLs redirect to the shared renderer.

## Collection Data Files

- Each Duaa collection has its own data file.
- The application should not require editing one large combined Duaa data file.
- A lightweight registry maps collection IDs to their files and basic metadata.
- The collection renderer loads only the requested collection.
- Adding or editing content should normally require changing only the relevant collection file.

## Repository Cleanliness

- Only the main project `README.md` remains in the repository root.
- Feature-specific guides belong in `docs/guides/`.
- Obsolete redirect pages should not be retained in this new repository.
- One-off files should be removed after a shared renderer replaces them.

## Duaa Module Visual Identity

- Duaa collection pages and Focus Mode share one light-blue page background and dark-blue/blue interface palette.
- Buttons, progress indicators, links, reading cards, settings controls, and other functional UI do not change color by collection.
- Collection identity is expressed through its title, banner, and decorative imagery rather than recoloring the reading interface.
- Collection data may retain decorative metadata for future banners, but the shared renderer does not apply collection color tokens to functional UI.
- The Qur’an module will maintain its own separate visual identity.

## Collection Continuity

- The progress panel remains visible while scrolling tracked collections.
- Incomplete completion controls display a quiet gray checkmark so their purpose is clear.
- Focus Mode return navigation follows the Duaa currently displayed in Focus Mode.
- Return position is carried through the URL rather than saved permanently.
- The collection renderer scrolls to and briefly highlights the returned card.


## v0.5.7 — Reading Fonts and Source URLs

- Use Amiri Quran specifically for Arabic Duaa text.
- Use Amiri for transliteration and English reading passages, while retaining the existing interface font for controls and navigation.
- Reuse the existing `source.sourceReference` field for verified source URLs instead of introducing another required property.
- Keep source URLs optional so unverified entries never receive placeholder or guessed links.
- Open external source references in a new tab to preserve the user's place in the collection.


## v0.5.8 Decisions

### Amiri is for Arabic Duaa text only
English and transliteration use the established interface font with tighter spacing. This keeps supporting text easy to scan while allowing Arabic to remain visually distinct.

### Arabic size is the only user-controlled reading preference at this stage
The Settings page offers four controlled Arabic text sizes. The setting does not alter English, transliteration, or interface typography.

### Version information comes from one shared configuration
Every page loads the shared application version and displays it in a subtle footer. Settings also includes an About section. Future releases and Codex prompts must update the shared version rather than hardcoding versions page by page.
## Duaa Reading Display Preferences (v0.5.8)

- Arabic Duaa text always remains visible.
- Users may independently show or hide transliteration and English translation.
- Display preferences are stored in the Duaa-specific `ummibyDuaaPreferences` browser record rather than page-specific keys.
- Both optional text layers default to visible so existing users retain the familiar experience.
- Memorization and the Ramadan Reading Journey remain later priorities while reading comfort and daily tracking are refined.



## Duaa reading settings remain inside the Duaa experience

**Decision:** Duaa reading preferences open from collection pages and Focus Mode through one shared modal. They do not live as editable controls on the app-wide Settings page. Qur’an preferences will be separate.

**Why:** Readers can adjust the current experience without navigating away, and module-specific preferences cannot be confused with application-wide settings.

## v0.5.8.2 — Context-Specific Duaa Preferences and SVG Icons

- Collection pages and Focus Mode use the same modal design and shared settings component, but save independent preference values.
- Collection preferences use `ummibyDuaaCollectionPreferences`; Focus Mode uses `ummibyDuaaFocusPreferences`.
- Existing v0.5.8.1 Duaa preferences migrate into both contexts so the update does not unexpectedly change the reader's current setup.
- Interface icons must use SVG assets or inline SVG. Unicode characters must not be introduced as interface icons. Pictures and decorative artwork remain separate from the icon system.

## v0.5.8.3 — Module Identity Takes Priority

The Duaa module's shared visual identity takes priority over collection-level color themes. Collection banners or artwork may vary, but the reading environment remains consistently light blue with dark blue accents. This makes every Duaa collection feel like part of one companion while preserving recognizable collection imagery.


## v0.5.8.4 — Completed States Use the Duaa Palette

Completed Duaa cards use the shared Duaa blue palette rather than a separate green success color. The completed background spans the complete card header area, including the repetition row, and ends at the horizontal divider before the reading text. This keeps completion clear while preserving the Duaa module's cohesive visual identity.
