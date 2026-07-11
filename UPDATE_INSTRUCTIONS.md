# Update Instructions — Ummiby Companion v0.5.8.2

This package replaces v0.5.8.1.

## Install

1. Extract `ummiby-companion-v0.5.8.2-full.zip`.
2. Copy the extracted files into your local Ummiby Companion repository.
3. Choose **Replace** when prompted.
4. Review the changes in GitHub Desktop, commit, and push.

## Files Added

None.

## Files Deleted

None.

## Browser Storage

The previous `ummibyDuaaPreferences` values are copied once into:

- `ummibyDuaaCollectionPreferences`
- `ummibyDuaaFocusPreferences`

Existing Duaa completion progress is not changed.

## Test

- Open a Duaa collection and confirm Reading Settings is a matching button with an SVG gear.
- Change Arabic size or text visibility on the collection page.
- Open Focus Mode and confirm its settings can be changed independently.
- Return to the collection and confirm its earlier settings remain unchanged.
- Refresh both views and confirm each context retains its own settings.
- Confirm the footer shows Version 0.5.8.2.
