# OkayKaba material and motion refinement

Implemented November 18, 2026 using the explicitly requested apple-design skill and its web-craft references, adapted to the existing Expo/React Native app. The brand palette, Plus Jakarta Sans, routes, working features and stored records are retained. No account/backend migration or GitHub publication is part of this change.

## Materials

Glass is confined to the floating navigation, back/header controls, modal chrome and the conversation composer. Journal writing, quotes, calendar and data panels retain opaque reading surfaces. This follows the distinction between controls and content described in [Apple's material guidance](https://developer.apple.com/design/human-interface-guidelines/materials).

`GlassSurface.tsx` uses Expo Blur 15.0.8, matching SDK 54's installed dependency map. This is a glass-inspired blur/tint/highlight treatment; Apple's native iOS Liquid Glass renderer and refraction are not implemented. Android blur is experimental in this Expo version, so API levels below 31 use the solid fallback. Increased text contrast also forces solid materials on Android. iOS reduced transparency/increased contrast and supported web preference queries use the same opaque fallback. The app remains a light-theme design; a dark theme is not introduced here.

The SDK 54 documentation URL currently redirects to newer documentation with different Android APIs. This implementation was checked against [the SDK 54 source](https://github.com/expo/expo/blob/sdk-54/packages/expo-blur/src/BlurView.types.ts) and the installed 15.0.8 types. It uses `experimentalBlurMethod`, not the newer `BlurTargetView` API. No SDK upgrade was made.

## Navigation and typography

- Preserve the four main destinations and active-label pill.
- Use a stable SVG viewport inside the animated pill so Android labels do not lose their background.
- Grow the active label area with font scale, permit two lines and reserve space for all four touch targets. Compact tab labels scale up to 2x; body text is not capped.
- Apply contact feedback immediately, retain normal onPress/keyboard semantics and show focus rings.
- Account for enlarged navigation and safe-area clearance in shared screen padding.
- Slightly lighter section weights and more readable captions preserve the chosen brand typography.

## Carousel behavior

`lib/motion.ts` provides release-velocity estimation, projected snap selection and overscroll resistance. On interruption, the surface uses its current visible offset instead of its previous target. Index-state echoes do not restart the spring. A paused finger does not retain stale fling velocity. Cancellation settles to a valid point; a new deliberate press clears prior drag-click suppression.

Spring coefficients and projection values are app tuning choices, not official Apple values. The installed React Native spring integrates time in seconds, so pixels/millisecond release velocity is converted to pixels/second. Rest thresholds differ for pixel translation and normalized progress/scale. Reduced motion sets the final state directly without overscroll animations. Inspiration includes a Next/First action inside its card so reading another reflection does not require dragging; onboarding keeps its page controls and keyboard arrows remain available on web.

## Verification and remaining device review

Automated tests cover slow release, flicks, reversal, bounds, partial last cards, a paused release, duplicate timestamps, resistance and cancellation snap decisions. They verify the math, not physical touch or blur rendering. TypeScript, lint and an Android Hermes export check the implementation. Four existing import warnings remain in archived/card components. Installing the single Expo Blur package left other lockfile entries intact; npm reported dependency-audit findings that still need separate review before release, without applying broad dependency upgrades in this UI task.

On the actual Android phone, check slow dragging, flicks, reversal while settling, release after holding still, vertical scroll coexistence and repeated taps after a swipe. Check every active tab label, large text, keyboard clearance and the device's contrast setting. Test busy content scrolling behind the glass bar and watch for blur artifacts or slow frames. Compare reduced-motion behavior. Review native modal dismissal and the share sheet. These physical-device checks are pending; no browser automation was run for this refinement.

AI chat remains explicitly unavailable until a secure backend exists. Appearance changes do not turn the draft composer into a working AI conversation.
