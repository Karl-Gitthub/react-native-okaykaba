# OkayKaba project instructions

Read this file before each feature or fix. Work as an experienced Expo and React Native engineer: prefer clear, maintainable code and small, verifiable changes. The user's current instructions and explicit authorization take precedence over these project defaults.

## Product

OkayKaba is a wellbeing app for daily mood check-ins, private journaling, and small daily tasks. It targets Expo on iOS and Android, with a browser demo for design and interaction reviews.

Core flows:

- Three-page onboarding, preferred-name setup, and optional age/gender fields.
- Supabase email/password authentication, verification, and recovery.
- Home with daily mood faces, an animated gauge, and an activity carousel.
- A monthly mood calendar and Year in Pixels, with tappable recorded-day details.
- A journal with persistent drafts and clear save feedback.
- Daily tasks with To do/Done lists, an animated completion ring, editing, soft deletion, and Undo.
- Settings for profile changes, onboarding replay, account access, and explicit demo-data import.

The old subscription tracker is archived reference code, not the product direction. Keep the OkayKaba name; Lumio in design references is not our branding.

## Stack and version rules

Use the installed versions in `package.json` and `package-lock.json` as the source of truth. Current baseline:

- Expo SDK 54 (`~54.0.36`), React Native `0.81.5`, React `19.1.0`.
- TypeScript in strict mode and Expo Router 6 for navigation.
- React Context in `AuthState` and `WellbeingState` for shared state; local React state for temporary UI.
- AsyncStorage `2.2.0` for application persistence; SecureStore for native authentication sessions.
- Supabase JS for authentication and PostgreSQL access.
- Reanimated 4, React Native Animated, and React Native SVG `15.12.1` for existing motion and graphics.
- NativeWind 5 preview and React Native styles coexist; follow the styling rules below.

Clerk packages and `LegacySignIn`/`LegacySignUp` are retained for migration reference only. Supabase is the sole active authentication provider. Do not reconnect Clerk or add Zustand, analytics, another auth provider, or another styling system just to match a generic template.

Before changing Expo APIs or native integrations, read the exact SDK documentation at https://docs.expo.dev/versions/v54.0.0/ and the installed package's relevant documentation. If the URL redirects to a different SDK, identify that mismatch and consult version-matched sources or installed code; do not silently treat newer behavior as SDK 54 behavior. Check Expo's installed `bundledNativeModules.json` when adding native libraries.

Use existing dependencies first. Explain and obtain approval for a new major dependency or stack migration unless the user's request already authorizes it. Do not upgrade the SDK or NativeWind incidentally.

## Repository map

- `app/`: Expo Router routes and screen composition. `index.tsx` handles initial routing; `_layout.tsx` owns provider wiring.
- `app/(auth)/`: sign-in, sign-up, and forgot-password routes. `app/reset-password.tsx` is the recovery destination.
- `app/(tabs)/`: Home, tasks, journal, calendar, and settings. The calendar currently uses the historical `subscriptions.tsx` route name; do not rename it casually and break links.
- `components/`: reusable UI, composed wellbeing screens, auth/state providers, calendar, and floating navigation. Extract focused components when it makes changed code easier to understand.
- `components/DesignSystem.tsx`: shared buttons, rings, mood faces/gauge, carousel, and reduced-motion support.
- `components/Legacy*`: preserved earlier screens. Do not use these as active architecture or delete them as unrelated cleanup.
- `lib/`: theme tokens, Supabase client, and pure calendar helpers.
- `constants/`: centralized assets, legacy sample data, and the browser-preview flag.
- `assets/`: existing fonts, images, and icons. Reuse centralized `constants/images.ts` and `constants/icons.ts` imports for bitmap assets.
- `supabase/migrations/`: ordered SQL migrations. Never edit an already-applied migration to change a deployed schema; add a new migration.
- `tests/`: focused automated tests, currently calendar date arithmetic.
- `docs/SUPABASE_SETUP.md`: external setup, migration strategy, data separation, and verification still requiring a live backend.
- `README.md`: current run instructions and validation status. `docs/LEGACY_README.md` preserves earlier notes.

## Feature workflow

1. Inspect Git status and the relevant code. Preserve unrelated edits and existing data.
2. State the feature's scope, acceptance criteria, files likely to change, and what must keep working. Use attached designs or the relevant current documentation.
3. Implement the smallest complete version of that feature. For an authorized multi-feature request, work through small stages; do not require repeated permission for already-authorized steps.
4. Review the diff for unrelated changes, regressions, accidental secrets, and misleading UI states.
5. Verify the changed feature and the existing flows it directly affects. Fix errors caused by the change before moving on.
6. Summarize what changed, what was checked, and any remaining external setup or device testing.
7. When commits are authorized, keep them focused on one working feature or cohesive change. Commit/push only within the user's authorized scope; avoid bundling unrelated future work into a large commit.

When fixing a bug, identify actual versus expected behavior and make a targeted fix. Do not broadly rewrite working screens, state management, or dependencies under the label of cleanup.

## UI and styling

Use `lib/theme.ts` as the shared palette. The approved direction is approximately 60% warm off-white (`#FCFAF8`), 30% pale lavender (`#EEE7F8`), and 10% deep violet accents (`#5423A6`). Use matte lavender for activity cards, deep violet for primary controls, and the subtle violet gradient for the active navigation pill and progress rings.

- No green or sage brand surfaces, mascots or character illustrations. Mood faces use distinct expressions, labels and lavender tones so color is not the only signal.
- Match the user's approved layout, hierarchy, spacing, proportions, typography, and interactions. If an asset or transition detail cannot be inspected, explain the specific approximation instead of claiming an exact match.
- Use existing Plus Jakarta Sans font families. Keep a calm, restrained layout with readable text, consistent icons, modest corner radii, and minimal shadows. Limit gradients to the approved accents and avoid generic dashboard cards.
- Preserve the centered mobile-width browser preview and native safe areas. Support shorter viewports with scrolling; keep content and inputs clear of the keyboard and floating tabs.
- The four main tabs are Home, Insights, Calendar and Account. Journal and daily tasks remain reachable from Home activities; retain their historical URLs. Only the active floating tab shows its label, with smoothly animated pill sizing. The activity strip shows two cards and a partial next card without dots. Quote cards swipe without dots. Onboarding retains scroll-linked indicators. Respect the OS reduced-motion preference.
- Give interactive controls accessible roles, names, selection/checked state, adequate targets, and keyboard access where relevant.
- Use `AppIcon` for Phosphor icons on active screens: regular weight for controls, fill for saved/completed states. Keep per-icon direct imports in that shared component so Metro does not load the full catalogue. Preserve the custom SVG mood faces and leave archived icon implementations alone.
- Continue the styling approach of the component being changed. Existing wellbeing components use StyleSheet/inline styles; older components use NativeWind. Do not translate the entire app between them during a feature task.
- Use shared tokens for new static colors and spacing patterns where practical. Inline/animated styles are appropriate for dynamic values, pressed states, platform behavior, and motion.
- Apple-inspired craft uses `GlassSurface` for navigation, back controls, modal chrome and the conversation composer. Keep reading/writing surfaces opaque. This is an Expo blur treatment compatible with SDK 54, not Apple's native Liquid Glass renderer. `InteractionPreferences` provides reduced-motion and solid-material fallbacks; `lib/motion.ts` keeps snap/velocity calculations testable. Preserve interruptible springs and normal button activation. Spring resting thresholds must match the animated value's units (pixels versus normalized progress or scale).
- `browser-preview.css` is a scoped compatibility stylesheet compiled from `global.css`. Avoid layering new global overrides over active screen styles or changing that generated file without understanding its source and browser cascade.

## State and persistence invariants

- Use `WellbeingState` for shared mood records, entries, drafts, tasks, profile, save status, and persistence. Do not write a second competing store or bypass it from a screen.
- Keep temporary input, expansion, selected calendar day, and carousel position local unless they need to survive navigation.
- Preserve the original demo key `okaykaba.wellbeing.preview.v1`. Account cache keys include the Supabase user UUID. Never mix one account's data into another account or silently copy demo records into an account.
- Import demo records only after the signed-in user's explicit in-app confirmation. Preserve source demo data and existing account records with matching IDs/dates.
- Preserve drafts while navigating. Distinguish unsaved changes, local saving, successful cloud sync, and failure. Never show cloud success based only on a local update.
- Record mood dates as local date keys plus timezone. Use `lib/calendar.ts` for calendar arithmetic; account for Monday-first weeks, leap years, month/year boundaries, and daylight-saving time. Do not derive local day keys by truncating UTC timestamps.
- Empty calendar days stay empty; do not populate fake check-ins. Monthly and yearly views must use the same saved records.
- Daily task progress is completed visible tasks divided by total visible tasks; no tasks means 0%. Preserve completion timestamps, ordering, soft deletion, and Undo.
- Current sync favors cached device records during reconciliation. Treat multi-device conflict handling as a known limitation, not a solved capability.
- AsyncStorage is unencrypted application storage. Do not describe it or the current cloud design as end-to-end encrypted.

## Authentication, database, and secrets

- Use Supabase Auth for passwords and sessions. Do not store passwords in application tables or implement a custom authentication backend.
- The browser-preview environment flag is web-only. Native users may explicitly enter demo mode through the auth UI; do not weaken account access controls to simplify previews.
- Keep native session tokens in the existing chunked SecureStore adapter. Preserve session recovery, sign-out, and deep-link handling when changing auth flows.
- Do not display social providers until configured and working. Missing credentials must leave the local demo usable and show an honest setup message.
- Preserve owner-only row-level security on profiles, moods, journals, tasks, and preferences. Schema changes need ownership, constraints, indexes, and appropriate policies.
- Use public project URL/publishable configuration on the client. Never put Supabase service-role keys, SMTP credentials, or other privileged tokens in `EXPO_PUBLIC_*`, client code, logs, screenshots, or commits.
- Keep local credentials in ignored environment files; use `.env.example` for empty public placeholders. Do not print secret values during diagnosis. Audit staged files before publishing; do not assume an existing tracked environment file contains only safe values.
- Production Clerk-to-Supabase migration requires a separate verified identity/data migration and rollback plan. Do not delete users, reset their credentials, run destructive migrations, or upload personal demo data implicitly.
- Prefer free-tier services for development. Explain external setup and possible charges before adding billable infrastructure. Do not buy domains, enable paid plans, or add SMS as incidental setup.

## Verification and completion

The user's current review target is Android in Expo Go. Do not routinely launch browser automation unless the user requests browser testing again. Keep browser compatibility, but use TypeScript, lint, focused logic tests and native bundle checks during development, followed by actual Expo Go phone checks for touch, animation, keyboard and safe-area behavior. A bundle compiling successfully does not prove it ran on a phone.

For application changes, run the relevant checks:

```sh
npx tsc --noEmit
npm run lint
npm run test:calendar  # when calendar/date behavior changes
git diff --check
```

Do not add `any`, disable strict checking, or suppress a real error to make checks pass. The existing baseline has four import warnings in archived/card components; distinguish those from new issues. Add focused tests for meaningful logic and edge cases, not tests that merely mirror styling or implementation.

Run the app and verify the changed interaction, persistence where relevant, and directly affected existing flows. For calendar work, include empty days, saved moods, date navigation, and leap/DST boundaries. For tasks, include 0/partial/full progress, completion/reopening, edit, delete/Undo, and keyboard clearance. For onboarding/navigation, check swiping, indicators, last-page behavior, and completion persistence.

Browser checks do not prove native keyboard positioning, touch behavior, SecureStore, or email deep links. Do not claim those passed without testing on iOS/Android. Likewise, migrations, deployed RLS isolation, email delivery, live authentication, and cloud sync require a configured Supabase project and actual verification.

For a local browser review, use the existing origin when possible so browser demo data remains visible. A phone cannot reach a computer's `localhost`: Expo Go requires a reachable LAN/tunnel address and a compatible SDK version. Report the address actually started, not a guessed URL.

Before a release, require real-device primary-flow and edge-case testing, independent code review, a secret scan covering the shipped code/history, removal of development-only data/utilities from production, and a tested production binary. Analytics requires a deliberate privacy-conscious product decision; do not add it automatically from a tutorial.

For documentation-only changes, verify accuracy against the current repo and review the Markdown diff; application builds are unnecessary unless code or configuration also changes.

Keep final updates concise: outcome, how to open/test it, checks performed, and material limitations. Clearly separate implemented code from unverified services or approximate design details. Update these instructions when the user approves a lasting project convention.
