import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Pressable, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from './DesignSystem';
import { palette as c } from '@/lib/theme';
const icons: Record<string, React.ComponentProps<typeof Ionicons>['name']> = { index: 'home-outline', insights: 'book-outline', tasks: 'checkbox-outline', subscriptions: 'calendar-outline', settings: 'settings-outline' };
function Item({ active, label, icon, onPress }: {
    active: boolean;
    label: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
    onPress: () => void;
}) { const progress = useRef(new Animated.Value(active ? 1 : 0)).current, reduced = useReducedMotion(); useEffect(() => { Animated.timing(progress, { toValue: active ? 1 : 0, duration: reduced ? 0 : 240, useNativeDriver: false }).start(); }, [active, reduced, progress]); return <Pressable accessibilityRole="tab" aria-selected={active} accessibilityState={{ selected: active }} accessibilityLabel={label} onPress={onPress}><Animated.View style={{ width: progress.interpolate({ inputRange: [0, 1], outputRange: [44, 105] }), height: 48, borderRadius: 28, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, backgroundColor: active ? c.surface : 'transparent', overflow: 'hidden' }}><Ionicons name={icon} size={22} color={active ? c.action : c.muted}/>{active && <Animated.Text numberOfLines={1} style={{ fontSize: 12, fontFamily: 'sans-semibold', color: c.action, opacity: progress }}>{label}</Animated.Text>}</Animated.View></Pressable>; }
export default function FloatingTabs({ state, descriptors, navigation }: BottomTabBarProps) { const insets = useSafeAreaInsets(), [hidden, setHidden] = useState(false); useEffect(() => { const a = Keyboard.addListener('keyboardDidShow', () => setHidden(true)), b = Keyboard.addListener('keyboardDidHide', () => setHidden(false)); return () => { a.remove(); b.remove(); }; }, []); if (hidden)
    return null; return <View style={{ position: 'absolute', bottom: Math.max(14, insets.bottom), left: 12, right: 12, borderRadius: 34, backgroundColor: 'white', borderWidth: 1, borderColor: c.line, padding: 6, flexDirection: 'row', justifyContent: 'space-around' }}>{state.routes.map((route, i) => <Item key={route.key} active={i === state.index} label={descriptors[route.key].options.title || route.name} icon={icons[route.name] || 'ellipse-outline'} onPress={() => { const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true }); if (!e.defaultPrevented)
    navigation.navigate(route.name); }}/>)}</View>; }
