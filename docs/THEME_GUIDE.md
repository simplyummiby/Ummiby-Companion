# Ummiby Companion Theme Guide

## Purpose

Ummiby Companion uses one shared interface language with distinct module identities. Layout, typography, navigation, spacing, and component behavior remain consistent; color and restrained decorative details identify the active module.

## Official Module Identities

| Module | Primary identity | Supporting mood |
|---|---|---|
| Qur’an Home | Green | Reading, guidance, growth |
| Duaa Home | Blue | Calm daily remembrance |
| Ramadan Central | Deep aubergine with antique gold | Reflection, worship, and the quiet atmosphere of Ramadan nights |

## Semantic Theme Tokens

Module styling should prefer semantic tokens rather than literal colors:

- `--module-primary`
- `--module-primary-dark`
- `--module-primary-light`
- `--module-accent`
- `--module-background`
- `--module-border`
- `--module-progress`
- `--module-link`
- `--module-heading`

Shared controls should inherit these values from the active module whenever practical.

## Ramadan Central Palette

- Primary: deep aubergine
- Dark primary: dark plum/aubergine
- Accent: soft antique gold
- Page background: warm ivory
- Cards: white
- Borders: pale lavender-gray

Gold is an accent, not a large background color. It is appropriate for subtle dividers, progress highlights, icons, current states, and restrained decorative details.

## Ramadan Banner Guidelines

The Ramadan banner may use:

- An aubergine gradient
- A subtle geometric texture
- A small antique-gold crescent
- White type

Avoid busy decoration, cartoon imagery, glowing effects, excessive stars, and heavy lantern motifs.

## Reading Surfaces

The Arabic Qur’an text, translation, and main reading surface remain neutral and comfortable. Module themes belong primarily to the surrounding interface: breadcrumbs, headings, progress, controls, navigation, and completion feedback.

## Future Modules

A future module should receive its own palette only when the identity adds real navigational and emotional value. New themes must continue using the shared semantic tokens and must not introduce a separate component system.
