# OkayKaba

An Expo SDK 54 / React Native wellbeing app for daily mood check-ins, journal writing and small daily tasks. Uses a warm-white / pale-blue / muted-blue palette. Text and button blue use a slightly darker shade for accessible contrast.

## Run locally

Install with `npm ci`. For a browser demo set `EXPO_PUBLIC_BROWSER_PREVIEW=true` in the ignored `.env.local`, then run `npx expo start --web --localhost --port 8083`. Open http://127.0.0.1:8083. The first visit shows swipeable onboarding and optional profile setup. Settings can replay onboarding. Demo works without Supabase credentials.

## Features

- Three onboarding pages support touch swipes, mouse dragging, page buttons and continuous dot interpolation.
- A floating bottom tab bar widens the active pill; only its label is visible. It hides when the native keyboard opens.
- Daily tasks support add/edit, completion/reopening, animated movement between lists, soft delete and Undo. The completion ring handles an empty day as 0%.
- Five custom SVG mood faces and an animated gauge save local date and timezone.
- Calendar offers Monday-first monthly mood faces, month/year navigation, daily details, Today, and Year in Pixels using saved records only. Run `npm run test:calendar` for leap-year, boundary and DST date checks.
- Journal drafts survive navigation and reloads. Saves show local/cloud status and errors.
- Demo data is retained under the original storage key, account caches are separate, and uploading demo records requires explicit confirmation in Settings.
- Motion follows the OS reduced-motion setting.

## Cloud setup

Read [Supabase setup and Clerk migration](docs/SUPABASE_SETUP.md). Versioned SQL is in `supabase/migrations/202611170001_wellbeing.sql`; public environment placeholders are in `.env.example`. Supabase Auth is the only active auth provider. Archived Clerk components and dependency entries are retained to support a controlled migration; no live users have been migrated.

Without your configured Supabase project, authentication, verification emails, password resets, deployed row security, and cloud sync cannot be verified. The UI says so. No social login buttons are shown without configured providers. No paid infrastructure was created.

## Validation

Run `npx tsc --noEmit` and `npm run lint`. Browser verification covered onboarding mouse dragging and last-page button, optional setup fields, completion persistence, task CRUD/Undo and 0%/100% calculations, task reload persistence, journal draft reload persistence, carousel indicators, mood selection and the unconfigured sign-in/recovery/demo flows. Four pre-existing import warnings remain in legacy/card components; no TypeScript or lint errors remain.

Native keyboard positioning, touch gestures, row transitions, SecureStore session persistence, and email deep links still need iOS/Android device testing. The database migration and owner-isolation policies need execution and testing against your Supabase project. Current sync uses a simple local-cache-wins conflict policy; review it before supporting concurrent editing across devices.

Previous project notes are preserved in `docs/LEGACY_README.md`. Changes remain local; nothing was pushed to GitHub.
