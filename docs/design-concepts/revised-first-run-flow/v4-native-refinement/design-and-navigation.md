# OkayKaba — native first-run refinement
Design proposal · 19 November 2026 · Mockups only

## Scope and grounding
This revision improves the existing first-run setup, keyboard/enlarged-text layouts, and email-change recovery. The base flow and earlier account/demo privacy contract remain. It adds a dark counterpart for the three core setup screens. App source, dependencies and backend configuration are untouched.

The explicitly invoked [Appllama App Design skill](C:/Users/laran/.agents/skills/appllama-app-design-skill/SKILL.md) guided this pass. Appllama MCP was not connected. Twelve publisher preview panels were visually reviewed in the in-app browser: four from [How We Feel](https://apps.apple.com/us/app/how-we-feel/id1562706384) and eight from [Daylio](https://apps.apple.com/us/app/daylio-journal-mood-tracker/id1194023242). They are publisher marketing previews, not a live walkthrough or a comprehensive ten-screens-per-screen-type research set.

Observed patterns and adopted decisions:
- How We Feel: mood vocabulary is the main interaction; journal, calendar and tools are visually distinct destinations. Adopt: one obvious decision per setup page.
- Daylio: compact mood selection; grouped activities; light content surfaces; calendar and chart data presented without competing decoration. Adopt: quiet surrounding UI and one grouped goal list.
- Daylio's PIN and keyboard/composer previews: direct input takes precedence over branding. Adopt: labels, input and keyboard clearance instead of large envelope illustrations on forms.

These are design interpretations of the visible previews. The designs do not copy competitors' layouts or data. Headspace search results were not used as visual evidence because its official image assets did not load in this research path.

## What improves
- Compact native-style navigator title, replacing the repeated large wordmark. The app remains OkayKaba.
- One display size per page, role-based hierarchy and reduced headline weight.
- Warm-white content backgrounds; pale brand tint confined mainly to the mood area. The orb retains Option 1 identity.
- One denim accent family. No separate electric-blue selected radios or teal gradient buttons.
- Shared header/progress component, consistent control sizes and a small radius scale.
- One grouped goal list with separators instead of unrelated floating cards.
- Keyboard-open and enlarged-text compositions with the same mood-face family.
- Clear separation of pending, uncertain outcome and expired authorization.
- Dark setup counterparts without inverting the mood faces.

## Native design contract
These are review targets, not runtime measurements or official Apple constants.

| Token or role | Light | Dark |
| --- | --- | --- |
| Base background | #FAFBF7 | #111820 |
| Input/grouped surface | #FFFFFF | #1C2632 |
| Primary text | #17202C | #F2F5F8 |
| Secondary text | #5D6775 | #B5BFCA |
| Accent/action | #155579 | #90BEDF |
| Action foreground | #FFFFFF | #111820 |
| Boundary | Cool neutral grey | #617080 |
| Error | Semantic rust/red with text | Legible semantic error, with text |

Use semantic roles in the eventual implementation; named hexes anchor the mockup proposal. The lighter dark-theme accent belongs to the same denim family. Yellow faces are mood content, not a second navigation accent. The iridescent orb is a deliberate brand exception; do not extend it to every field, card or CTA.

Typography: preserve Plus Jakarta Sans; headline 28 semibold, body 16, supporting text 14, navigation title 16. Enlarged layouts increase body/control labels and reflow. Do not force-fit by shrinking text.

Geometry: 8-unit rhythm, 24-unit side gutters, input radius 12, grouped surface radius 16, primary action capsule. Keep the shared 180 × 4 progress track centered with consistent top placement. Step 1/2/3 indicates current position, not successful persistence.

Android is the target for later Expo Go review. Use native Android text entry and selection conventions. Retain one icon family; final icon-library choice should respect the existing Phosphor preference rather than mix SF, Material and Phosphor glyphs on the same screen. The mockups depict consistent line-icon roles, not an installed library change.

## Navigation and first-run behavior
- Optional breathing and Welcome account/demo choice are unchanged by this focused pass.
- Name, Practice and Goal remain sequential setup pages. Back returns to the prior meaningful page and retains appropriate in-session values.
- Skip is available only on optional setup steps; it never selects a mood or imports data.
- Name accepts blank/whitespace and uses a neutral greeting.
- Practice starts unselected; the illustrated Good selection is an example. Continue requires selection; Skip bypasses practice. Practice is discarded and never enters real mood history.
- Goal is optional and single-choice. Finish setup works with no goal; every activity stays available.
- Successful setup completion and sign-in are one-way transitions: replace the completed flow. Android Back from the app root exits rather than reopening Login or onboarding. Opening an account flow from an existing feature later is a different modal context and must return to that feature.
- First Back while the keyboard is open dismisses it; the next Back follows navigation.
- Setup has no app tab bar. Later top-level tabs remain peers and retain their own stacks; their redesign is outside this pass.

## Email update — proposed navigation refinement for review
The design changes the short committing state from the earlier Leave action to a brief guarded update. This is a proposal, not an implemented behavior.

1. Invalid address: remain on the field; persistent label and error text; submit only after correction.
2. Updating: preserve form geometry; disable editing and duplicate submit. The short irreversible commit has no normal Back/mode switch. Do not imply that Back cancels a server mutation.
3. Slow or interrupted request: never trap the person behind an indefinite spinner. Resolve into an uncertain-outcome state with Check status and Back to verification. Timeout comes from the actual transport policy; there is no fake countdown or percentage.
4. Couldn't confirm: retain the typed address, avoid claiming it is unchanged, and reconcile actual account status before retrying. Check status may lead to accepted/verified, still pending, confirmed rejection or expired session.
5. Confirmed rejection: explain the service's specific safe failure, preserve editable input and enable an explicit retry. Use unchanged-address copy only when the service proves that outcome.
6. Expired session: require sign-in; no active mutation or new-signup shortcut. Reauthenticate the same intended account before resuming. Back to welcome exits; do not carry a typed address/password into a different account.
7. Success: replace the edit route with the new verification destination. Back must not reopen a stale mutation screen.
8. An uncertain request never creates another account and never silently imports demo journals.

During a safely cancellable status check, ordinary Back remains available. Guarding removal is limited to the brief actual commit; it is not a general funnel lock.

## Material, accessibility and motion
Keep glass limited to meaningful layered chrome/orb content. Reduced transparency uses solid surfaces with the same spacing and readable boundaries. Provide text errors and selected markers in addition to color.

Reduced motion uses stable orb expressions, immediate or brief-fade state changes, and static descriptive pending text. No automatic looping pulse or decorative entrance is needed for these repeated screens. Native screen transitions remain platform-controlled. No haptic-only feedback; optional selection haptics complement the visible selection once per action.

Visible mockups cannot verify safe-area insets, physical target dimensions, screen-reader associations, actual system font scaling or keyboard animation. Dark setup frames are a visual proposal, not simulator validation. Dark auth/accessibility variants and the full remaining state matrix must be checked during detailed design/implementation.

## Design review boundary
This pass delivers improved static screens and navigation intent. The skill's simulator, full-motion recording and release-device performance gates are not completed: app implementation remains explicitly out of scope until design review. No 60fps, native-control implementation or accessibility-compliance claim is made.

Review the quieter surface treatment, compact navigation and guarded email-commit proposal. First-run approval remains with the user. Today, Journal and Mood Calendar designs have not been started.
