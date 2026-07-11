# Update Instructions

Version: v0.5.6 — Collection Continuity Improvements

## Recommended Method

Because this release does not delete any project files, you may safely copy the extracted v0.5.6 files over the existing v0.5.5 repository and choose **Replace the files in the destination** when prompted.

1. Commit your current v0.5.5 work in GitHub Desktop.
2. Extract the v0.5.6 ZIP to a temporary folder.
3. Copy everything from the extracted folder into the repository.
4. Choose **Replace the files in the destination** when Windows prompts.
5. Review the changes in GitHub Desktop.
6. Complete the tests below.
7. Commit the update.

## Files to Delete

None.

## New Files

None.

## Files Replaced

```text
README.md
UPDATE_INSTRUCTIONS.md
css/collection.css
duaa/focus-mode.html
js/collection.js
docs/ARCHITECTURE.md
docs/CHANGELOG.md
docs/DECISIONS.md
docs/ROADMAP.md
docs/guides/DUAA_COLLECTIONS.md
```

## What to Test

### Sticky Progress Panel

1. Open `duaa/collection.html?collection=morning`.
2. Scroll through the collection.
3. Confirm the progress panel remains visible near the top of the viewport.
4. Repeat on a phone-sized browser window and confirm it remains compact and does not cover the card being read.

### Completion Circles

1. Confirm incomplete circles display a soft gray checkmark.
2. Select a Duaa.
3. Confirm the completed state still uses a green circle with a white checkmark.
4. Select it again and confirm it returns to the incomplete gray state.

### Focus Mode Return Position

1. Open Morning or Evening collection.
2. Enter Focus Mode from a Duaa in the middle of the collection.
3. Use Previous or Next to move to another Duaa.
4. Select **Return to Collection**.
5. Confirm the collection scrolls to the Duaa last viewed in Focus Mode.
6. Confirm that card briefly highlights and then returns to its normal appearance.

### Reference Collections

Open Travel, Weather, or Prayer and confirm:

- no daily progress panel appears
- no completion circles appear
- Focus Mode return positioning still works

## Commit Message

```text
Improve Duaa collection progress and Focus Mode continuity
```
