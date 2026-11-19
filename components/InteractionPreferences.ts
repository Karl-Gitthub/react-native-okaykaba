import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let live = true;
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (live) setReduced(value); }).catch(() => { if (live) setReduced(true); });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => { live = false; subscription?.remove(); };
  }, []);
  return reduced;
}

export function useSolidMaterials() {
  // Start opaque until system preferences are known; avoid an initial flash of transparency.
  const [solid, setSolid] = useState(true);
  useEffect(() => {
    let live = true;
    if (Platform.OS === 'ios') {
      let transparency = true, contrast = true;
      const update = () => { if (live) setSolid(transparency || contrast); };
      Promise.all([AccessibilityInfo.isReduceTransparencyEnabled(), AccessibilityInfo.isDarkerSystemColorsEnabled()])
        .then(([reduced, darker]) => { transparency = reduced; contrast = darker; update(); }).catch(() => {});
      const a = AccessibilityInfo.addEventListener('reduceTransparencyChanged', value => { transparency = value; update(); });
      const b = AccessibilityInfo.addEventListener('darkerSystemColorsChanged', value => { contrast = value; update(); });
      return () => { live = false; a.remove(); b.remove(); };
    }
    if (Platform.OS === 'android') {
      const update = (highContrast: boolean) => { if (live) setSolid(Number(Platform.Version) < 31 || highContrast); };
      AccessibilityInfo.isHighTextContrastEnabled().then(update).catch(() => {});
      const subscription = AccessibilityInfo.addEventListener('highTextContrastChanged', update);
      return () => { live = false; subscription.remove(); };
    }
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const transparency = window.matchMedia('(prefers-reduced-transparency: reduce)'), contrast = window.matchMedia('(prefers-contrast: more)');
      const update = () => setSolid(transparency.matches || contrast.matches);
      update(); transparency.addEventListener('change', update); contrast.addEventListener('change', update);
      return () => { transparency.removeEventListener('change', update); contrast.removeEventListener('change', update); };
    }
  }, []);
  return solid;
}
