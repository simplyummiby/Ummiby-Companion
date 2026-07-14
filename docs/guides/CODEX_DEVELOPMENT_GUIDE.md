# Codex Development Guide

> **Project:** Ummiby Companion  
> **Purpose:** Define the standard process Codex must follow when implementing, fixing, or polishing features.

## Core Approach

- Inspect the repository before editing.
- Read the relevant roadmap and current implementation.
- Preserve terminology, navigation, styling, storage, and behavior unless explicitly changing them.
- Reuse established components and interaction patterns.
- Avoid unrelated refactors.
- Never claim completion until required interactions are verified.

## Scope Rules

### Do

- Implement only the requested release or fix.
- Preserve working features.
- Maintain backward compatibility with saved data.
- Fail gracefully when storage or imported data is invalid.

### Do Not

- Rename or move files without need.
- Change approved terminology.
- Replace working UI patterns without approval.
- Remove intentional placeholders.
- Mark roadmap items complete before QA passes.

## Approved Terminology

Use terms such as:

- Reading Journey
- Reading Unit
- Memorization
- In Progress
- Memorized
- Needs Revision
- Maintenance
- Maintenance Schedule
- Ramadan Central
- Duaa

Avoid alternate terms such as Mastered or Needs Review when an approved term already exists.

## UI Standards

Follow `docs/design/CANONICAL_UI_PATTERNS.md`.

- Clickable elements must look clickable.
- Cards open detail pages.
- Embedded controls perform only their own action.
- Status selectors use the same pattern everywhere.
- Modal behavior must include backdrop click, Escape, focus management, and keyboard access.
- Preview sections must show `View all X` when more items exist.
- Status cannot rely on color alone.
- Mobile layouts must not require horizontal scrolling.

## Data and Storage

- Preserve existing storage keys unless migration is required.
- Use clear module-specific keys.
- Missing values use safe defaults.
- Corrupt data must not break the page.
- Existing users must not lose saved progress.
- Backup and restore must include new user data where required.
- Older backups should continue to import safely.

## Version and Release Rules

Update version references everywhere applicable:

- `README.md`
- `docs/project/CHANGELOG.md`
- `UPDATE_INSTRUCTIONS.md`
- Settings, footer, or About page
- `js/app-config.js`
- Backup metadata
- Relevant roadmap
- Release QA checklist
- ZIP filename

Do not increase the app version for editorial-only changes when the editorial guide says not to.

The ZIP must contain project files directly without an unnecessary wrapper folder.

## QA Requirements

Verify at minimum:

- Navigation
- Buttons and cards
- Modal behavior
- Persistence after refresh
- Search and filters
- Dashboard updates
- Backup and restore
- JavaScript syntax
- Responsive layout
- Keyboard accessibility
- Visible focus
- Meaningful ARIA labels
- No regression in nearby features

## Required Final Report

Codex should return:

1. Release version
2. Summary
3. Files changed
4. Documentation updated
5. QA completed
6. Limitations or deferred work
7. Suggested commit message
8. ZIP path when packaging is requested

Never call a release complete if required behavior remains unimplemented or unverified.
