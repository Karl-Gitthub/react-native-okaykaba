# OkayKaba

An Expo SDK 54 / React Native wellbeing app for daily mood check-ins, private journaling and small daily tasks. The current application styling uses approximately 60% warm off-white, 30% pale lavender and 10% deep violet accents, without mascots or illustrations. The newer dark-theme/default-text direction is documented as mockups under [design reviews](docs/design-concepts/README.md); it has not been implemented in the app.

## Run locally

Install with `npm ci`, then run `npx expo start --go --lan --port 8084`. Open the terminal QR code in a compatible Android Expo Go app on the same Wi-Fi network. This project uses SDK 54; the official matching Android client is available at https://expo.dev/go?sdkVersion=54&platform=android&device=true. Select **Explore the demo without an account**, complete onboarding and preferred-name setup, and use the app without Supabase credentials. Browser demo data and phone demo data live on their respective devices; they are not transferred automatically.

Android Expo Go is the current review target. See [phone review checklist](docs/ANDROID_REVIEW.md). The optional browser preview remains available with `EXPO_PUBLIC_BROWSER_PREVIEW=true` and `npx expo start --web --localhost --port 8083`; browser automation is not required for this mobile review.

## Features

- Three onboarding pages support touch swipes, mouse dragging, page buttons and continuous dot interpolation.
- Four main tabs: Home, Insights, Calendar and Account. The active gradient pill widens and shows its label; other tabs remain icon-only. The bar hides when the native keyboard opens.
- Home activity cards swipe sideways with a partial next card visible and no pagination dots. Journal, self-care, daily tasks and daily words open from the cards.
- Daily Inspiration has swipeable quote cards, save/unsave, a saved list, optional Bible verses (off by default), native sharing, and journal prompts that append to the current draft. Reflection order uses the local date. Sharing availability depends on the platform.
- Insights summarizes actual saved moods and activity; it does not generate health assessments or sample history.
- Daily tasks support add/edit, completion/reopening, animated movement between lists, soft delete and Undo. The completion ring handles an empty day as 0%.
- Five custom SVG mood faces and an animated gauge save local date and timezone.
- Calendar offers Monday-first monthly mood faces, month/year navigation, daily details, Today, and Year in Pixels using saved records only. Run `npm run test:calendar` for leap-year, boundary and DST date checks.
- Journal drafts survive navigation and reloads. Saves show local/cloud status and errors.
- Demo data is retained under the original storage key, account caches are separate, and uploading demo records requires explicit confirmation in Settings.
- Motion follows the OS reduced-motion setting.
- Active screens use Phosphor icons through `components/AppIcon.tsx`, with consistent regular strokes and filled saved/completed states. Custom mood faces remain part of OkayKaba's identity.
- Apple-inspired navigation and controls use restrained frosted-glass materials, press feedback and interruptible springs. Older Android devices and system contrast/transparency preferences use solid surfaces. Journal and calendar content remain opaque. See [material and motion notes](docs/APPLE_DESIGN.md).

## Cloud setup

Read [Supabase setup and Clerk migration](docs/SUPABASE_SETUP.md). Apply the versioned SQL files in `supabase/migrations/` in order, including the additive inspiration-preferences migration. Public environment placeholders are in `.env.example`. Supabase Auth is the only active auth provider. Archived Clerk components and dependency entries are retained to support a controlled migration; no live users have been migrated.

Without your configured Supabase project, authentication, verification emails, password resets, deployed row security, and cloud sync cannot be verified. The UI says so. No social login buttons are shown without configured providers. No paid infrastructure was created.

## Validation

Run `npm run typecheck`, `npm run lint` and `npm test`. TypeScript and lint have no errors; four pre-existing import warnings remain in archived/card components. Fifteen logic tests cover calendar arithmetic, optional/daily inspiration and carousel release/snap decisions. The Android Hermes bundle has compiled successfully. This is a bundle check, not a production APK or evidence of execution on a phone.

Before the switch to mobile review, isolated browser checks passed onboarding/profile setup, activity dragging, mood selection, task CRUD/Undo, 0/50/100% progress, task reload persistence and journal draft persistence. The remaining browser checks were stopped when mobile testing was selected. No new browser automation is required by the current workflow.

Native keyboard positioning, touch gestures, row transitions, SecureStore session persistence, and email deep links still need iOS/Android device testing. The database migration and owner-isolation policies need execution and testing against your Supabase project. Current sync uses a simple local-cache-wins conflict policy; review it before supporting concurrent editing across devices.

Talk it through is an honest unavailable state until a secure AI backend, provider configuration, privacy controls and safety behavior are implemented and reviewed. No fake AI replies or automatic journal uploads are used.

Previous project notes are preserved in `docs/LEGACY_README.md`. The [design archive](docs/design-concepts/README.md) contains the visual proposals, first-run state boards, navigation specifications and audit findings. Proposed Google sign-in and dark-theme mockups are separate from implemented application behavior.
