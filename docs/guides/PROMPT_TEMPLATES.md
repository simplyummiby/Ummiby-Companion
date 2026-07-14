# Codex Prompt Templates

Use these with `CODEX_DEVELOPMENT_GUIDE.md`.

## Feature Implementation

```text
You are working in the Ummiby Companion repository.

Follow:
- docs/guides/CODEX_DEVELOPMENT_GUIDE.md
- docs/design/CANONICAL_UI_PATTERNS.md
- the relevant module roadmap

Feature:
[FEATURE NAME]

Goal:
[USER-FACING GOAL]

Current release:
[CURRENT VERSION]

Target release:
[NEXT VERSION]

Before editing:
1. Inspect the repository.
2. Read the relevant roadmap, changelog, QA checklist, HTML, CSS, JavaScript, data, and backup files.
3. Confirm version references.
4. Identify existing patterns to reuse.

Scope:
[WHAT TO BUILD]

Required behavior:
[DETAILED INTERACTIONS]

Data/storage:
[KEYS, SHAPE, MIGRATION, BACKUP]

Responsive requirements:
[DESKTOP, TABLET, MOBILE]

Accessibility:
[KEYBOARD, FOCUS, ARIA, COLOR]

Do not change:
[OUT-OF-SCOPE AREAS]

Documentation:
[ROADMAP, CHANGELOG, QA, README, UPDATE INSTRUCTIONS, VERSION]

QA:
[FEATURE-SPECIFIC CHECKLIST]

Deliverables:
1. Implemented code
2. Updated documentation
3. QA report
4. Suggested commit message
5. Full-project ZIP with no outer wrapper folder

Do not mark complete unless all required interactions are implemented and verified.
```

## Bug Fix

```text
You are working in the Ummiby Companion repository.

Follow docs/guides/CODEX_DEVELOPMENT_GUIDE.md.

Bug:
[PROBLEM]

Observed:
[CURRENT BEHAVIOR]

Expected:
[EXPECTED BEHAVIOR]

Requirements:
- Find the root cause.
- Make the smallest safe fix.
- Preserve saved data.
- Test the original failure path.
- Test nearby interactions for regression.

QA:
[CHECKLIST]

Deliverables:
- Root cause
- Fix summary
- Files changed
- QA completed
- Suggested commit message
- ZIP if requested
```

## UI Polish

```text
You are working in the Ummiby Companion repository.

Follow:
- docs/guides/CODEX_DEVELOPMENT_GUIDE.md
- docs/design/CANONICAL_UI_PATTERNS.md

Area:
[PAGE OR COMPONENT]

Problem:
[WHAT FEELS UNCLEAR]

Requested improvement:
[DESIGN CHANGE]

Preserve:
[BEHAVIOR THAT MUST NOT CHANGE]

QA:
[VISUAL AND INTERACTION CHECKLIST]

Deliverables:
- Updated UI
- Accessibility review
- QA report
- Suggested commit message
- ZIP if requested
```

## Documentation-Only

```text
You are working in the Ummiby Companion repository.

Follow docs/guides/CODEX_DEVELOPMENT_GUIDE.md.

Documentation task:
[WHAT TO ADD, MOVE, OR UPDATE]

Requirements:
- Avoid duplicate canonical documents.
- Preserve relative links.
- Update docs/INDEX.md.
- Do not change the app version unless the repository policy requires it.
- Do not modify application code.

QA:
- All linked files exist.
- Relative links resolve.
- No obsolete duplicate copies remain.

Deliverables:
- Updated documentation
- List of created, moved, and removed files
- Suggested commit message
```
