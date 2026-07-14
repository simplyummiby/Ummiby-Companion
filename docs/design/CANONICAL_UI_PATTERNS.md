# Canonical UI Patterns

## Cards and Embedded Controls

- A card opens its detail page.
- A control inside the card performs only its own action.
- Embedded controls must not trigger card navigation.
- Both actions must be visually distinguishable.

## Status Selectors

Use one consistent pattern:

```text
● Memorized ▼
```

- Show current status.
- Include a visible down arrow.
- Use both color and symbol.
- Look interactive.
- Open a selector modal.

## Modal Behavior

Every modal should:

- Have a clear title.
- Show the current selection.
- Close on selection when appropriate.
- Close on backdrop click.
- Close with Escape.
- Return focus to the opener.
- Use accessible dialog semantics.
- Fit on narrow screens.

Do not use browser `alert()` or `confirm()`.

## Preview Sections

- Show up to four items.
- When more exist, show `View all X`.
- The action should open or scroll to the complete filtered list.
- Never make it look like items are missing.

## Empty States

- Use gentle language.
- Explain what will appear there.
- Offer a clear next step when useful.
- Avoid guilt or productivity pressure.

## Actions

- Primary actions use the filled style.
- Secondary actions use the outlined or quieter style.
- Disabled future placeholders must clearly say they are unavailable or coming later.
- Clickable text needs hover and focus treatment.

## Progress

- Celebrate progress without gamification.
- Use meaningful counts alongside percentages.
- Avoid pressure-based streak language.
- Use calm milestone acknowledgements.

## Navigation

- Keep breadcrumbs consistent.
- New pages must be discoverable from the expected menu and module home.
- Module home names remain consistent.

## Responsive Design

- No horizontal scrolling for core content.
- Touch targets should generally be at least 44 × 44 pixels.
- Dense grids wrap.
- Modals fit within the viewport.
- Desktop hover must have a touch equivalent.

## Accessibility

- Keyboard access is required.
- Focus styles must be visible.
- Color cannot be the only indicator.
- Controls need meaningful accessible names.
- Decorative icons should be hidden from assistive technology.

## Tone

The interface should feel gentle, calm, encouraging, respectful, clear, and uncluttered.
