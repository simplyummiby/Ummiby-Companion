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

## Collection Themes

- Collection-specific themes belong in collection metadata.
- The shared renderer must not hard-code collection identities.
- A theme may define color tokens, icon, banner, and future artwork.
- Shared layout and behavior remain consistent across collections.
- Visual identity can differ without creating separate HTML pages.
