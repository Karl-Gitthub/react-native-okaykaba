# OkayKaba final design proposal — review pending

Prepared November 18, 2026. This proposal is a static three-screen mockup created with the built-in image-generation tool. It is not a screenshot of the running app and has not been implemented. The title's word 'final' describes a consolidated proposal, not user approval.

## Deliverables

- `okaykaba-home-journal-calendar-v1.png`: Home, Journal and Mood Calendar.
- `generation-prompt.md`: the exact generation prompt, including sample content and calendar coordinates.

## Visual system to review

- Approximately 60% off-white `#FAF9FC`, 30% pale lavender `#EEE7FC`, 10% violet/magenta accents. This is an approximate visual hierarchy, not a literal pixel quota.
- Brand gradient `#7D7CF9` to `#C621E5`; interactive purple `#5500FF`; dark text `#17141E`. Raster colors are illustrative; implementation should use the defined tokens and check text contrast.
- Existing Plus Jakarta Sans, consistent outline icons, modest rounding, fine borders and restrained shadows. Phone-frame outlines belong to the presentation and should not become borders around every app screen.
- Original OkayKaba branding, functional mood faces, no mascots, no illustrations and no borrowed app artwork.
- Primary inspiration: Stoic's focus and typographic restraint; How We Feel's clear check-in interaction; Gentler Streak's readable information grouping. Source research is in `../inspiration-research/APP-REFERENCES.md`.

## Screen decisions

### Home

Compact profile/bell header, greeting, five labeled mood faces, then one horizontally swipeable activity strip. Two full cards and a clipped next card communicate horizontal scrolling; no pagination dots. A compact reflection panel has Save and Read & reflect actions. Talk it through remains labeled Coming soon until a real AI service is available.

Four main navigation destinations remain Home, Insights, Calendar and Account. Only the active tab shows its label. Every active pill must have a complete background and readable full label on Android. Use a stable SVG viewport for the gradient while animating the clipping container, rather than relying on percentage SVG width inside an animated parent.

### Journal

Writing is the main content. This proposal uses a dedicated secondary screen with a back arrow, a large editor, actual draft-save status, a primary Save entry action and a quiet recent-entry row. Unlike the current implementation, the proposed writing screen does not show the main bottom tab bar. This navigation change requires design approval before implementation.

### Mood Calendar

Monthly and Year in Pixels modes stay visible. The sample is Monday-first November 2026; November 1 falls on Sunday and November 18 on Wednesday. Exactly nine sample check-ins appear on dates 3, 5, 7, 10, 12, 14, 16, 17 and 18. Later dates stay empty. The selected day is Good on November 18, with Asia/Manila shown. Use real saved records in the app, never seed this sample history into an existing user's records.

## Interaction handoff, if approved

- Activity strip follows the finger; taps open the existing activity. Swipes must not also activate a card.
- Active navigation pill changes width smoothly without clipping its label or moving the outer bar.
- Calendar selection reveals that day's actual record; empty days remain empty.
- Journal draft survives navigation and reload, with truthful saving/error states. Save must not report cloud success without cloud verification.
- Keep comfortable targets, safe-area clearance, large-text support and reduced-motion behavior. The board shows the keyboard closed; keyboard-open behavior still requires Android testing.

Review the overall proportions, heading weights, card treatment and Journal navigation before implementation. Image generation may approximate typography and spacing; a reviewed implementation should be compared against this specific board on the actual phone.

No application code, dependencies, persistence or Git remote were changed for this proposal.
