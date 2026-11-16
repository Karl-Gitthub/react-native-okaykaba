# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# react-native-okaykaba

## Local browser design preview

The ignored `.env.local` sets `EXPO_PUBLIC_BROWSER_PREVIEW=true` for the local browser preview. Start with `npx expo start --web --localhost`. This opens the sample dashboard without an account; native builds still use Clerk. Set the flag to `false` and restart Expo to restore browser authentication.

The preview uses the existing app theme at a maximum width of 430px. `browser-preview.css` contains scoped CSS compiled from `global.css` to prevent React Native Web defaults from overriding the theme. If the theme changes, regenerate this stylesheet with PostCSS and the existing Tailwind plugin.

Subscription management, journal persistence, account settings, and See All actions are unfinished and labelled in the preview. No native-only features were added or verified.

## Wellbeing design implementation (Figma review)

Reference: https://www.figma.com/proto/RJeG4rJ6mcb47jqgRGFhIK/Okaykaba-

Reviewed the Home frame 996:5231, Journal frame 996:5374, and the alternate setup-progress frame 996:8186. Home to Journal is linked; the Save now target did not expose a destination during review. Several tested activity targets reused the journal frame. Exact transition durations and original assets were not available through the prototype viewer.

Implemented the verified Home and Journal appearance with white surfaces, purple accents, gradient browser activity cards, mood choices, a search field, and a Mind Dump editor. Added browser-local saving, mood history, validation, and a short 200ms screen fade with reduced-motion support. Mood history and the self-care panel are practical preview additions, not verified Figma destination screens. Avatar and emoji artwork are placeholders; fonts use the existing project assets. The setup-progress animation is not implemented because it does not expose a complete setup flow, and the preview continues to open Home without login.

Browser data uses localStorage under okaykaba.wellbeing.preview.v1. It is local to this browser and origin, is not encrypted, and does not sync to an account. Native builds currently retain session data only; persistence and cross-device behavior need follow-up. Browser gradients have a solid-purple fallback on native. A clearly labeled journal test entry and mood check-in were created for validation.

Previous components are preserved as components/LegacySubscriptionDashboard.tsx and components/LegacyJournal.tsx. Existing authentication code remains. No GitHub push was performed.
