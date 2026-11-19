# Android Expo Go review

## Open the current build

1. Keep this computer and your Android phone on the same Wi-Fi network.
2. In the repository run `npx expo start --go --lan --port 8084` and scan the terminal QR with Expo Go. The current session is `exp://192.168.100.13:8084`; the address can change with the Wi-Fi network.
3. If Expo Go reports an incompatible SDK, use Expo's official SDK 54 Android download: https://expo.dev/go?sdkVersion=54&platform=android&device=true. Do not upgrade the project SDK just to bypass that message.
4. Choose **Explore the demo without an account** on the sign-in screen. The browser-preview environment flag never bypasses native authentication. New device demo records remain separate from the browser's records.

## Device checks still to perform

- Swipe all three onboarding pages. Confirm continuous dots, Next/Get started, Skip and remembered completion. Set a preferred name; leave age and gender optional.
- Swipe the Home activity row horizontally and scroll Home vertically. Releasing a swipe must not open a card. Tapping a card must open the correct activity. Switch through all four main tabs and confirm every active pill fills its full width and displays its complete label, especially Insights and Calendar. Inspiration and Talk screens use their back arrow and do not show the main tab bar.
- Save each mood and open Calendar. Tap the selected mood again on Home to inspect the mood gauge, then close its dialog. Check the selected day, previous/next month, Today and Year in Pixels. Days without records stay empty.
- Add two tasks; complete, reopen, edit, delete and undo. Check 0%, 50% and 100% progress. Focus quick-add and task editing with the Android keyboard open; confirm input, rows and controls remain reachable and the floating tabs hide.
- Type a journal draft, switch screens and reopen the app. Confirm the draft remains. Save an entry and check actual save status. Open a reflection prompt and confirm existing draft text is preserved.
- Swipe inspiration cards, save and unsave, inspect Saved, try the native share sheet, and turn optional Bible verses on/off. Reopen the app to check saved preferences.
- Try the phone's reduced-motion setting, larger text and a shorter screen. Check status-bar contrast, safe areas and the bottom navigation.
- Review the new frosted controls over scrolling content. Enable increased text contrast to confirm the opaque fallback. On Android below API 31 the opaque fallback is used automatically. Try a slow drag, quick flick, pause before releasing, reversal during settling, cancellation and a deliberate tap immediately after a swipe. The motion unit tests do not replace these physical checks. See `APPLE_DESIGN.md` for implementation details.
- Open Talk it through. It must clearly say AI is not connected and must not pretend to send messages.

Record the screen, steps, expected result, actual result, phone model and Expo Go version for any issue. Phone touch/keyboard verification is pending until these steps are performed on an actual device.

## Engineering checks

`npm run typecheck`, `npm run lint`, `npm test`, and `git diff --check` should pass (apart from the four existing import warnings). `npx expo export --platform android --output-dir ../native-validation/android` verifies native bundling. Export output remains outside the repository.

The current dependency check suggests Expo `~54.0.37` and expo-constants `~18.0.14` patch updates; installed versions remain `54.0.36` and `18.0.13`. No SDK or dependency migration was performed. Reassess these patches if a device error points to them.

Supabase email delivery, account sessions, deployed RLS and cloud sync require a configured backend. Apply both versioned migrations before verifying cloud preferences. AI conversations require a server-side integration; never embed a provider secret in the app.

## Workflow and the PDF guide

The project follows the guide's main loop: read AGENTS.md, define a focused change, preserve working code, review the diff, run automated checks, test the actual phone flow, fix the specific issue, and commit only when authorized. The approved design references and mockups guide the UI. The user's chosen Supabase Auth and existing Context state take precedence over the guide's example Clerk/Zustand stack. Analytics and paid tools are not added automatically.

Expo Go is the development review stage. Before release, independently review the code, test edge cases and permissions, scan for secrets, and test an actual production binary on a phone. A successful development bundle is not release approval.
