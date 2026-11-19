import React from 'react';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';
import { useSolidMaterials } from './InteractionPreferences';
import { palette as c } from '@/lib/theme';

// Glass belongs to controls above content. Reading/writing surfaces stay opaque.
export function GlassBackground({ radius = 28, strong = false }: { radius?: number; strong?: boolean }) {
  const solid = useSolidMaterials();
  return <View pointerEvents="none" accessible={false} importantForAccessibility="no-hide-descendants" style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden', backgroundColor: solid ? c.glassSolid : 'transparent' }]}>
    {!solid && <BlurView tint="systemMaterialLight" intensity={strong ? 55 : 38} experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : 'none'} style={StyleSheet.absoluteFill}/>}
    {!solid && <View style={[StyleSheet.absoluteFill, { backgroundColor: strong ? c.glassStrong : c.glassTint }]}/>}
    <View style={[StyleSheet.absoluteFill, { borderWidth: 1, borderColor: solid ? c.line : c.glassEdge, borderRadius: radius }]}/>
    {!solid && <View style={{ position: 'absolute', left: 16, right: 16, top: 1, height: 1, borderRadius: 1, backgroundColor: c.glassHighlight }}/>}
  </View>;
}

export function GlassSurface({ children, radius = 28, strong = false, style, ...props }: React.ComponentProps<typeof View> & { radius?: number; strong?: boolean }) {
  return <View {...props} style={[{ borderRadius: radius, overflow: 'hidden' }, style]}><GlassBackground radius={radius} strong={strong}/>{children}</View>;
}
