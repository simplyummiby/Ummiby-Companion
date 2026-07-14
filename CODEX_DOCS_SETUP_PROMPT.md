# Codex Prompt — Add Development Workflow Documents

```text
You are working in the Ummiby Companion repository.

This is a documentation-only task.

Goal:
Add a small, practical Codex workflow documentation set without creating unnecessary duplicate documents.

Create:

1. docs/guides/CODEX_DEVELOPMENT_GUIDE.md
2. docs/guides/PROMPT_TEMPLATES.md
3. docs/guides/PROMPT_LIBRARY_INDEX.md
4. docs/design/CANONICAL_UI_PATTERNS.md

Use the supplied contents exactly unless repository paths must be adjusted.

Then update docs/INDEX.md with:

## Development Workflow

- Codex Development Guide
- Prompt Templates
- Prompt Library Index
- Canonical UI Patterns

Requirements:

- Inspect the current documentation structure first.
- Do not create duplicates if equivalent canonical documents already exist.
- If an equivalent exists, merge the new material into it and update links.
- Preserve existing documentation.
- Verify every relative link.
- Do not change the app version.
- Do not modify application code.
- Do not reorganize unrelated files.

QA:

- All four documents exist or were merged into clear canonical equivalents.
- docs/INDEX.md links to each final canonical document.
- Every relative link resolves.
- No obsolete duplicate copies remain.
- Markdown headings and code fences render correctly.
- Git shows only intended documentation changes.

Return:

1. Files created
2. Files updated
3. Content merged instead of duplicated
4. Link-check results
5. Suggested commit message

Suggested commit message:

Add Codex workflow guides and prompt templates
```
