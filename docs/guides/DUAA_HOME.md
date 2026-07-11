# Duaa Home

## Location

`duaa/index.html`

## Purpose

The Duaa Home is the dashboard and launch point for daily adhkar and reference collections.

## Current Sections

- Daily Companion: Morning, Evening, and Before Sleep
- Real current-day progress across the tracked collections
- Explore More Duaa Collections

Recently Viewed and the Duaa Reminder prototype were removed in v0.6.0. They should not be shown again until each feature has a purposeful, working implementation.

## Tracking

Only these collections use daily progress tracking:

- Morning
- Evening
- Before Sleep

Duaa Home loads their actual collection totals and reads completion from the central dated tracking store. Statuses therefore reflect the user’s current local day rather than sample values.

Reference collections remain available without completion pressure.


## Daily Companion navigation

Morning, Evening, and Before Sleep are opened directly from Duaa Home. There is no separate Daily Companion page.
