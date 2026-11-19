import { AppIcon } from '@/components/AppIcon';
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette as c } from '@/lib/theme';
import { GlassBackground } from './GlassSurface';
import { PressFeedback } from './PressFeedback';

export function Screen({ children, keyboard = false, contentStyle }: React.PropsWithChildren<{ keyboard?: boolean; contentStyle?: StyleProp<ViewStyle> }>) {
  const insets = useSafeAreaInsets(), { fontScale } = useWindowDimensions();
  const bottomClearance = Math.max(120, insets.bottom + Math.min(68, 48 + Math.max(0, fontScale - 1) * 20) + 38);
  return <SafeAreaView style={ui.screen} edges={['top', 'left', 'right']}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboard && Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[ui.page, { paddingBottom: bottomClearance }, contentStyle]}>{children}</ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

export function ChromeButton({ children, label, onPress }: React.PropsWithChildren<{ label: string; onPress: () => void }>) {
  return <PressFeedback accessibilityRole="button" accessibilityLabel={label} style={ui.iconButton} onPress={onPress}>
    <GlassBackground radius={22}/>{children}
  </PressFeedback>;
}

export function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  return <View style={ui.header}>
    <ChromeButton label="Go back"
      onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}>
      <AppIcon name="arrowLeft" size={23} color={c.ink}/>
    </ChromeButton>
    <Text accessibilityRole="header" style={ui.headerLabel}>{title}</Text><View style={{ width: 44 }}/>
  </View>;
}

export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.background },
  page: { padding: 20, paddingBottom: 120, gap: 22 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 },
  headerLabel: { fontFamily: 'sans-semibold', color: c.ink, fontSize: 16 },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 24 },
  title: { fontFamily: 'sans-bold', fontSize: 32, lineHeight: 41, color: c.ink, letterSpacing: -.6 },
  section: { fontFamily: 'sans-bold', fontSize: 18, lineHeight: 26, color: c.ink },
  body: { fontFamily: 'sans-regular', fontSize: 14, lineHeight: 23, color: c.muted },
  caption: { fontFamily: 'sans-regular', fontSize: 13, lineHeight: 20, color: c.muted },
  eyebrow: { fontFamily: 'sans-semibold', fontSize: 11, lineHeight: 16, letterSpacing: .9, color: c.action },
  panel: { backgroundColor: c.paper, borderWidth: 1, borderColor: c.line, borderRadius: 16, padding: 16, gap: 12 },
  link: { fontFamily: 'sans-semibold', fontSize: 13, color: c.action },
  input: { borderWidth: 1, borderColor: c.line, borderRadius: 12, backgroundColor: c.paper, padding: 15, color: c.ink, fontFamily: 'sans-regular', fontSize: 15 },
});
