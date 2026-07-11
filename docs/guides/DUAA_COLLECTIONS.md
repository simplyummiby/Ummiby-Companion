# Duaa Collections

## Shared Collection Page

All Duaa collections use one reusable page:

`duaa/collection.html`

Example URLs:

```text
duaa/collection.html?collection=morning
duaa/collection.html?collection=evening
duaa/collection.html?collection=sleep
duaa/collection.html?collection=travel
duaa/collection.html?collection=weather
duaa/collection.html?collection=prayer
```

## Data Files

Each collection is maintained separately:

```text
js/data/
├── collection-registry.js
├── collection-loader.js
└── collections/
    ├── morning.js
    ├── evening.js
    ├── sleep.js
    ├── travel.js
    ├── weather.js
    ├── prayer.js
    └── istikharah.js
```

## Adding a New Duaa

Open the relevant collection file and add the new record to its `items` array.

For example, a Morning duaa belongs in:

`js/data/collections/morning.js`

After reloading the page, the renderer automatically:

- creates the new card
- updates the collection total
- includes it in progress when tracking is enabled
- creates the matching Focus Mode link

No collection-specific HTML card is required.

## Card Experience

Collection cards can display:

- title
- summary
- repetition guidance
- complete Arabic
- complete transliteration
- complete English translation
- source and grade
- completion checkmark for tracked collections
- Focus Mode link

## Tracking Behavior

Tracked or non-tracked behavior comes from collection metadata.

Tracked:

- Morning
- Evening
- Before Sleep

Non-tracked:

- Travel
- Weather
- Prayer
- Istikharah and future reference collections

## Focus Mode

Focus Mode can be entered from any individual duaa and begins on the selected entry.

When the user leaves Focus Mode, the return link includes the Duaa currently being viewed. The shared collection page scrolls back to that card and briefly highlights it.

The full phrase-by-phrase study and memorization experience is planned for a later version.

## Verification Metadata

Verification metadata is preserved for editorial review but does not hide entries in the current development build.

## Collection Visual Identity

All Duaa collection pages use the shared Duaa module reading theme:

- light-blue page background
- white cards
- dark-blue headings and accents
- blue buttons, links, progress indicators, and settings controls

Collection identity is supplied by a banner and circular artwork registered in `js/data/collection-registry.js`. The shared renderer loads these automatically. Do not create collection-specific HTML or use artwork colors to recolor functional UI.

### Artwork folders

```text
assets/collections/<collection-id>/banner.webp
assets/collections/<collection-id>/icon.webp
```

Recommended source artwork:

- Banner: wide landscape composition, approximately 2:1 to 2.5:1; at least 1600 pixels wide
- Icon artwork: square, at least 512 × 512 pixels; important content centered for circular cropping
- WebP is preferred for photographic or painted artwork

Every registry entry should include `banner`, `icon`, `bannerAlt`, and `iconAlt`. Shared fallback artwork is used when an asset is unavailable.

## Sticky Progress and Completion Controls

For tracked collections, the progress panel remains visible while the user scrolls through the cards. Incomplete completion circles include a soft gray checkmark to make the action clear. Completed circles use the shared Duaa blue background and white checkmark.


## Reading Typography

Collection pages load two related reading fonts:

- `Amiri Quran` for complete Arabic Duaa text
- the standard application interface font for transliteration and English reading text

Interface controls, labels, navigation, and progress text retain the existing application font so the reading content remains visually distinct from controls. Serif fallbacks remain in place if the web fonts are unavailable.

## Adding a Source Link

Every Duaa can keep its source as plain text or link that text to a verified external reference. Use the existing `sourceReference` field inside the `source` object:

```javascript
source: {
  reference: "Sahih al-Bukhari 6306",
  grade: "Sahih",
  sourceReference: "https://example.com/verified-source",
  status: "verified"
}
```

Rules:

- Add only a verified `http` or `https` address.
- Leave `sourceReference` empty when a trustworthy link has not yet been confirmed.
- The source reference remains visible as plain text when no URL is present.
- Linked sources open in a new tab so the collection position is preserved.
- Do not place descriptive labels such as `link pending` in the URL field.

The renderer also accepts a legacy `url` property, but new and updated records should use `sourceReference` consistently.


## Reading Typography and Arabic Text Size (v0.5.8)

Arabic Duaa text uses Amiri Quran with Amiri and system Arabic serif fallbacks. English and transliteration use the regular application interface font.

The user may choose Small, Medium, Large, or Extra Large Arabic text from the contextual Duaa Reading Settings modal. The choice is stored on the current device and applied to all shared Duaa collection cards. Future Focus Mode Arabic content must use the same `--duaa-arabic-size` variable.
## Reading Preferences

Collection cards support shared display preferences from Settings:

- Arabic is always displayed.
- Transliteration may be shown or hidden.
- English translation may be shown or hidden.
- Arabic text size remains independently adjustable.

New collection renderers should use the shared block classes (`arabic-block`, `transliteration-block`, and `translation-block`) so these preferences continue to work automatically.



## Duaa Reading Settings

Every collection page and Focus Mode includes a **Reading Settings** link. It opens the same shared modal without leaving the current reading position. The modal controls Arabic text size, transliteration visibility, and English translation visibility. Arabic remains visible. Preferences are stored in `ummibyDuaaPreferences` and apply only to the Duaa module.

## Collection and Focus Mode Settings

Collection pages and Focus Mode use the same Duaa Reading Settings modal design, but each context stores its own Arabic size and visibility choices. The collection page opens settings from a full secondary button with an SVG gear icon. Focus Mode keeps a text link until its interface receives a dedicated design pass.

## Date-Based Daily Tracking (v0.6.0)

Tracked collections use `js/duaa-tracking.js`. Completion is stored under the user’s local calendar date, so a new day begins with a fresh checklist without deleting earlier records.

The manual action is **Reset Today’s Progress**. It clears only the current collection for the current date. It does not alter previous days or other collections.

Existing v0.5.x progress keys are migrated once into `ummibyDuaaDailyTracking`. Collection content and item IDs must remain stable because those IDs are what the history records store.


## Bottom Status and Back to Top (v0.6.2.2)

Tracked collections show a live status beneath the Duaa cards:

- no Duaas checked today
- some Duaas checked, with the exact count and weekly-consistency confirmation
- every Duaa in the collection checked today

Reference collections do not show this status. All collection pages use the shared floating SVG back-to-top control after the user scrolls down the page. Do not add collection-specific copies of this control.

## Reference Collection Status Safeguard (v0.6.2.3)

For collections with `trackerEnabled: false`, the shared renderer removes the bottom daily-status component. Reference collections therefore show no daily completion summary. Morning, Evening, and Before Sleep continue to show live status based on today’s dated record.
