import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AppIcon } from '@/components/AppIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientFill, useReducedMotion } from './DesignSystem';
import { GlassBackground } from './GlassSurface';
import { PressFeedback } from './PressFeedback';
import { settleSpring } from '@/lib/motion';
import { palette as c } from '@/lib/theme';

const items = [
  { route: 'index', label: 'Home', icon: 'home' },
  { route: 'trends', label: 'Insights', icon: 'insights' },
  { route: 'subscriptions', label: 'Calendar', icon: 'calendar' },
  { route: 'settings', label: 'Account', icon: 'account' },
] as const;

function Item({ active, label, icon, activeWidth, height, onPress, onLongPress }: {
  active: boolean; label: string; activeWidth: number; height: number;
  icon: React.ComponentProps<typeof AppIcon>['name']; onPress: () => void; onLongPress: () => void;
}) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current, reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { progress.stopAnimation(); progress.setValue(active ? 1 : 0); }
    else Animated.spring(progress, { toValue: active ? 1 : 0, ...settleSpring, restDisplacementThreshold: .001, restSpeedThreshold: .001, useNativeDriver: false }).start();
  }, [active, reduced, progress]);
  const labelWidth = Math.max(0, activeWidth - 48);
  return <PressFeedback accessibilityRole="tab" aria-selected={active} accessibilityState={{ selected: active }} accessibilityLabel={label}
    onPress={onPress} onLongPress={onLongPress} style={{ borderRadius: 16 }}>
    <Animated.View style={{ width: progress.interpolate({ inputRange: [0, 1], outputRange: [44, activeWidth] }), height, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <Animated.View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, width: activeWidth, height, opacity: progress }}>
        <GradientFill horizontal shade={.08} width={activeWidth} height={height}/>
        <View style={[StyleSheet.absoluteFill, { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.36)' }]}/>
      </Animated.View>
      <View style={{ width: 22, height: 22 }}>
        <Animated.View style={{ position: 'absolute', opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}><AppIcon name={icon} color={c.ink}/></Animated.View>
        <Animated.View style={{ position: 'absolute', opacity: progress }}><AppIcon name={icon} color={c.white}/></Animated.View>
      </View>
      <Animated.View style={{ width: progress.interpolate({ inputRange: [0, 1], outputRange: [0, labelWidth] }), opacity: progress, overflow: 'hidden' }}>
        <Text numberOfLines={2} maxFontSizeMultiplier={2} style={{ paddingLeft: 6, fontSize: 12, fontFamily: 'sans-semibold', color: c.white }}>{label}</Text>
      </Animated.View>
    </Animated.View>
  </PressFeedback>;
}

export default function FloatingTabs({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets(), { width, fontScale } = useWindowDimensions();
  const [hidden, setHidden] = useState(false), [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const a = Keyboard.addListener('keyboardDidShow', () => setHidden(true)), b = Keyboard.addListener('keyboardDidHide', () => setHidden(false));
    return () => { a.remove(); b.remove(); };
  }, []);
  const current = state.routes[state.index]?.name;
  if (hidden || current === 'inspiration' || current === 'talk') return null;
  const active = items.some(item => item.route === current) ? current : 'index';
  const available = (barWidth || Math.min(width, 430) - 24) - 16;
  const pillMaximum = Math.max(88, available - 44 * 3);
  const height = Math.min(68, 48 + Math.max(0, fontScale - 1) * 20);
  return <View onLayout={event => setBarWidth(event.nativeEvent.layout.width)} style={[s.shell, { bottom: Math.max(12, insets.bottom) }]}>
    <GlassBackground radius={24}/>
    <View accessibilityRole="tablist" style={s.row}>
      {items.map(item => {
        const route = state.routes.find(route => route.name === item.route);
        const activeWidth = Math.min(pillMaximum, Math.max(105, 48 + item.label.length * 7 * Math.min(fontScale, 2)));
        return <Item key={item.route} active={active === item.route} label={item.label} icon={item.icon} activeWidth={activeWidth} height={height}
          onPress={() => {
            if (!route) return;
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!event.defaultPrevented) navigation.navigate(route.name);
          }}
          onLongPress={() => { if (route) navigation.emit({ type: 'tabLongPress', target: route.key }); }}/>;
      })}
    </View>
  </View>;
}
const s = StyleSheet.create({
  shell: { position: 'absolute', left: 12, right: 12, borderRadius: 24, shadowColor: '#39235C', shadowOffset: { width: 0, height: 5 }, shadowOpacity: .07, shadowRadius: 16, elevation: 3 },
  row: { padding: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
});
