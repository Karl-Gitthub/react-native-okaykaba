# OkayKaba overall interface concept

Review proposal generated with the built-in image-generation tool. The running app was not changed. The boards illustrate a proposed visual direction, with sample data and a few proposed controls such as notifications and mood notes; those controls are not claims of implemented functionality.

## Visual direction

Warm white #FAFBF7 (60%), pale blue #EAF1F8 (30%), muted blue #487BA8 (10%), darker action blue #3D6C95 for contrast, charcoal #202833 type. No green, sage or purple branding. Friendly geometric typography, thin outlined icons, restrained radii, fine separators, very limited shadows. Blue ripple and rising-sun motifs give the app an identifiable illustration language.

## Concept boards

- okaykaba-01-onboarding-home.png: introduction, sign-in, optional account setup, Home and focused mood check-in.
- okaykaba-02-daily-tools.png: monthly Calendar, Year in Pixels, Journal, daily To-do and Settings.

## Motion direction

- Onboarding artwork and capsule dots follow horizontal dragging.
- Active navigation labels reveal inside smoothly widening pills.
- Mood face expressions change with selection while the gauge needle follows.
- Calendar day selection opens a detail sheet; month/year modes crossfade.
- Tasks glide between lists with the progress ring following actual completion.
- Draft and save feedback stays quiet and truthful. Reduce motion when the device setting requests it.

## Generation prompt set

Both concept boards were generated as high-fidelity flat mobile-interface overview boards: five complete front-facing phone screens in one row, consistent warm-white/blue geometric type system, precise spacing, expressive five-state mood faces, no bulky device frames, no green/sage/purple, and no glassmorphism. Large, legible English labels and a design-concept/sample-content footer were requested.

Board 1 prompt: Show OkayKaba introduction with blue ripple sunrise artwork, Get started and three-page dots; email/password sign-in with demo access; age-optional account setup with honest 2/3 step progress; personalized Home with Daily Mood, an activity carousel and recent activity; focused mood selection with a face, five-position gauge, optional note and Save check-in. Label each screen and show its intended motion below it.

Board 2 prompt: Show Monday-first November 2026 mood calendar with date navigation and a selected-day summary; twelve-month Year in Pixels with a face legend; Mind Dump journal editor with draft status and Save entry; To do and Done lists with two of four tasks complete, a 50% ring and a pinned quick-add field; profile/settings with accessible motion and privacy controls. Use a consistent floating five-tab bar with only the active label showing. Add small motion notes below the screens.

## Implementation fidelity

These raster boards are for approving the overall composition and mood. The implemented calendar will retain mathematically correct dates and leap years, a single consistent set of mood labels, semantic validation and accessibility. Do not treat tiny generated labels or illustration rendering errors as authoritative specifications. Final motion timing should be reviewed in a working prototype on a device.
