# Visual quality review
Native first-run proposal · 19 November 2026

## Inspected evidence
All four selected PNGs were saved in this folder and opened for visual inspection. The email board was reopened after its final address-label correction. The baseline remains [revision 3](../v3/review.html).

| Board | Visible improvement | Remaining verification |
| --- | --- | --- |
| Core setup, light | Compact Set up navigation; common progress treatment; optional name helper; grouped goal list; selected Good includes a marker and border | Real 48-unit targets, exact token geometry, long names/translation, native control implementation |
| Email recovery | Decorative faces/orbs removed; field errors remain with input; uncertain response shows Previous address rather than asserting a current value; distinct expired-session path | Guarded-commit timeout, escape after transport uncertainty, account reconciliation, focus and error announcements |
| Keyboard/enlarged text | Continue above the keyboard illustration; optional name helper retained; mood group wraps; all five labels and expressions remain | Actual Android keyboard avoidance, system font scaling across every text role, TalkBack and scroll reachability |
| Core setup, dark | Dark surfaces and light text; same five mood choices and selected marker; lighter denim action; grouped goal list | Measured contrast, theme transitions, dark auth/accessibility variants, OLED/device appearance |

## Mechanical design checks
- Accent: one denim family per theme is specified, with semantic error color. The yellow faces and iridescent orb are intentional mood-content/brand exceptions.
- Corners: primary capsule, 12-unit input and 16-unit grouped surface. Generated rasters approximate these; final implementation must use shared tokens.
- Emoji/decorative mood content on account chrome: removed from the selected account board.
- Extra gradients: the previous full-page pastel wash is replaced by quiet surfaces. Faint tint remains around the mood orb only. Production CTAs should be solid fills; subtle raster shading is not an instruction to add gradient buttons.
- Repeated hierarchy: one compact navigation title and one task headline; the large repeating wordmark and decorative envelope are gone.
- Label consistency: Continue advances setup, Finish setup commits it, Sign in reauthenticates. Check status reconciles an unknown account-update result before retry.
- Geometry: common header/progress treatment and bottom actions are shown; exact coordinates are specified rather than inferred from rendered images.

## Review decisions
The main design decision is the quieter background and compact navigation. The second is the proposed brief guard during an actual irreversible email commit, followed by an escapable uncertainty state. That differs from revision 3's Leave this request action and requires user review; no app behavior has changed.

The normal small mood faces and enlarged-face renderings remain generated visual references rather than one exported immutable asset set. Reuse canonical exported assets in detailed design; do not turn each generated occurrence into a separate icon.

## Limits
The Appllama MCP was unavailable. Twelve publisher preview panels were studied through the App Store, not 20–30 live screens or ten references for every screen type. Research conclusions are layout interpretations, not claims about those apps' complete navigation or conversion performance.

No app was implemented, launched in Expo Go, simulated, or recorded during this pass. The skill's implementation, light/dark simulator checks, full-motion recording, frame-by-frame review and slow-device release-performance gates remain unperformed. No measured frame-rate, accessibility-compliance, or verified-auth claim is made.

This is a static design proposal for review. Today, Journal, Mood Calendar and other remaining product screens are outside this refinement.
