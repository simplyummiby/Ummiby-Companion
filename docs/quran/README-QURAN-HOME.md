# Qur’an Home — v0.3.0

Adds the separate Qur’an Home dashboard at `quran/index.html`.

## Included
- Continue Reading Journey
- Current Reading Unit and resume position
- Start Over confirmation
- Overall Reading Journey progress
- Reading Unit Index and Completed Journeys links
- Three reading options
- Recently Read
- Functional local reminder preference
- Conditional Ramadan progress panel

The small Ramadan option remains visible year-round. The full Ramadan progress panel appears only when `localStorage.ramadanJourneyStarted` is set to `true`.

Reminder preferences are stored locally for this prototype. Browser/device notification delivery is not yet implemented.
