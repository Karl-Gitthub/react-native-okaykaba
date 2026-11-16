import { Platform } from 'react-native';

// Opt-in local browser preview; never bypass authentication on native builds.
export const isBrowserPreview = Platform.OS === 'web' &&
  process.env.EXPO_PUBLIC_BROWSER_PREVIEW === 'true';
