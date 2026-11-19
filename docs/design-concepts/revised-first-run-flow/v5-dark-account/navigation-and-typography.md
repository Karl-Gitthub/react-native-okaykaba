# Dark first-run refinement — review notes and navigation
19 November 2026 · One visual direction · Static mockups only

## Scope
Keep the approved dark theme, reduce the default headline emphasis, separate enlarged-text previews, and add a proposed account-choice screen. Earlier account forms, practice privacy and demo import rules remain unless specifically superseded here.

This revision does not edit app code, configure Google/Supabase, create accounts, send email or perform authentication. The account screen is a design concept until configuration and verification are complete.

## Typography specification
All sizes are logical design targets for 390 × 844 content frames, not measurements inferred from generated raster pixels.

| Role | Default | Enlarged-text demonstration |
| --- | --- | --- |
| Main question/title | 24–28, medium or semibold | Approximately 30–32, reflow allowed |
| Body | 16–17, regular | Approximately 22–24, reflow allowed |
| Input/choice label | 16, medium | Approximately 22–24 |
| Supporting text | 14, readable | Scales with user preference |
| Navigator title | 16 | Scales/reflows without collision |

Use Plus Jakarta Sans and ordinary static text. No scrolling marquee, animated heading, heavy poster-like weight, condensed text or shrink-to-fit.

The enlarged-text board is an illustrative scenario, not the default and not a measured 200% OS setting. The demonstration sizes are not font-size caps. Preserve the user's full system text enlargement; content and controls may grow and scroll. The normal and enlarged previews have separate files and separate review headings.

## Dark design system
- Base #111820; input/grouped surfaces #1C2632.
- Text #F2F5F8; secondary #B5BFCA; boundaries #617080.
- Denim accent #90BEDF with #111820 action text.
- Yellow mood faces and the existing iridescent orb remain meaningful mood content.
- Auth has no mood faces, orb, mascot or decorative provider artwork.
- Provider brand colors are a deliberate exception to the app accent; they do not change the app palette to green.
- Keep shared progress geometry and 1/2/3 step semantics from the prior design. No fabricated loading percentages.

## Account-choice action hierarchy
One screen with three states: idle, opening Google, and failed handoff.

Actions in the idle state:
1. Continue with Google.
2. Email section with Create account and Sign in.
3. Try the demo.
4. Privacy and Terms as readable document links.

Google/Gmail are not separate providers. No Apple, Facebook or X buttons are introduced.

The Google action uses a light provider-branded button against the dark app surface and the standard multicolor G. The official [Google branding guidance](https://developers.google.com/identity/branding-guidelines) permits “Continue with Google” and provides pre-approved button assets. At implementation use its SDK-rendered/pre-approved asset and required font/padding rather than exporting the generated logo. No claim of pixel-perfect brand compliance is made for an image-generated preview.

The Google provider font is a permitted branding exception to Plus Jakarta Sans. Preserve native target size and readable contrast. Terms/Privacy documents require actual reviewed content before a working app presents them.

## Route and state transitions
| Trigger | Intended destination or response |
| --- | --- |
| Back on idle account choice | Previous Welcome screen; no breathing replay |
| Create account | Existing email/password signup and verification flow |
| Sign in | Existing email/password sign-in; route by actual setup status |
| Try the demo | Existing device-storage explanation → Continue in demo → setup |
| Continue with Google | Initiate a single external provider handoff; display opening state |
| Cancel during opening | Dismiss/abandon that handoff and restore idle choices; never imply provider success |
| Provider cancellation | Restore idle choices with neutral cancellation feedback; not an error |
| Failed launch/network/provider error | Inline failure; restore Google, email and demo actions |
| Valid account session | Existing completed user → Today; incomplete/new profile → appropriate setup step |
| No valid session / incomplete callback | Stay in account flow with clear failure or status checking; no successful-sign-in screen |

Email-verification requirements must follow the auth service's confirmed identity/session policy; do not assume tapping Google proves verification. Successful session routing removes stale first-run/login screens from the Back stack.

Temporarily disable competing account/mode actions during Google handoff; Cancel provides a clear exit. Late callbacks cannot override a newer mode choice. If someone cancels and then chooses Demo, an arriving session must not silently activate account mode or import data.

The app should launch the approved native/system provider flow later, not build a fake Google credentials form or embed a password capture inside OkayKaba. No real external Google sign-in screen was generated here.

## Setup and accessibility behavior
Name continues with blank/whitespace using a neutral greeting. Practice starts unselected and creates no real mood record; its selected Good panel is an example. Continue requires selection, while Skip bypasses practice. Goal remains optional.

The five moods retain Low, Meh, Okay, Good, Great labels and corresponding expressions. At enlarged text use the wrapping choice group, preserve visible selection and accessible selected state, and never rely on expression/color alone.

Keyboard-open behavior follows existing notes: focused field and action remain clear of the keyboard; first Back dismisses keyboard. This revision's enlarged board does not add a new keyboard behavior.

## Alternatives and verification boundary
Reduced motion: stable orb, no text animation, descriptive pending text; no animated marquee. Opaque surfaces: retain dark solid input/grouped roles, readable boundaries, and the same layout without blur.

Later prototype tests: actual text scaling, TalkBack labels/order, focus after cancellation/error and external return, target measurements, safe areas, keyboard clearance, contrast, Google callback/race handling, backend identity routing, sessions, sign-out and demo isolation.

These static images cannot verify those behaviors. No authentication or cloud saving is claimed. Do not enable a working Google action until its configuration is available; keep it out of the runnable product when unavailable while retaining this proposed design for review.

## Stop point
Review this first-run typography and account-choice proposal before any app implementation or further screen design.
