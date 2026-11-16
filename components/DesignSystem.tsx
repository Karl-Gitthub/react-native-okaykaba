import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, PanResponder, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { palette as c } from '@/lib/theme';
export function useReducedMotion() { const [reduced, set] = useState(false); useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(set); const s = AccessibilityInfo.addEventListener('reduceMotionChanged', set); return () => s.remove(); }, []); return reduced; }
const ACircle = Animated.createAnimatedComponent(Circle);
export function Ring({ value, size = 90 }: {
    value: number;
    size?: number;
}) { const progress = useRef(new Animated.Value(value)).current, reduced = useReducedMotion(); useEffect(() => { Animated.timing(progress, { toValue: value, duration: reduced ? 0 : 350, useNativeDriver: false }).start(); }, [value, reduced, progress]); const r = size / 2 - 7, length = 2 * Math.PI * r; return <View accessibilityLabel={`${Math.round(value * 100)} percent complete`} style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}><Svg width={size} height={size} style={StyleSheet.absoluteFill}><Circle cx={size / 2} cy={size / 2} r={r} stroke={c.line} strokeWidth={7} fill="none"/><ACircle cx={size / 2} cy={size / 2} r={r} stroke={c.accent} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={[length, length]} strokeDashoffset={progress.interpolate({ inputRange: [0, 1], outputRange: [length, 0] })} transform={`rotate(-90 ${size / 2} ${size / 2})`}/></Svg><Text style={{ fontFamily: 'sans-bold', fontSize: 20, color: c.ink }}>{Math.round(value * 100)}%</Text></View>; }
export function MoodFace({ value, size = 42 }: {
    value: number;
    size?: number;
}) { const color = ['#F08C81', '#EFB670', '#F1CB78', '#92B4D2', '#487BA8'][value]; return <Svg width={size} height={size} viewBox="0 0 48 48"><Circle cx="24" cy="24" r="22" fill={color}/><Circle cx="17" cy="20" r="2" fill={c.ink}/><Circle cx="31" cy="20" r="2" fill={c.ink}/><Path d={value < 2 ? 'M15 33 Q24 23 33 33' : value === 2 ? 'M16 30 H32' : 'M15 28 Q24 39 33 28'} stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" fill="none"/></Svg>; }
export function MoodGauge({ value }: {
    value: number;
}) { const rotation = useRef(new Animated.Value(value)).current, reduced = useReducedMotion(); useEffect(() => { Animated.timing(rotation, { toValue: value, duration: reduced ? 0 : 400, useNativeDriver: false }).start(); }, [value, reduced, rotation]); return <View style={{ height: 82, width: 160, alignSelf: 'center', overflow: 'hidden', margin: 12 }}><Svg width="160" height="160"><Path d="M15 80 A65 65 0 0 1 145 80" stroke={c.surface} strokeWidth="20" fill="none"/><Path d="M15 80 A65 65 0 0 1 145 80" stroke={c.accent} strokeOpacity=".4" strokeWidth="16" strokeDasharray="35 6" fill="none"/></Svg><Animated.View style={{ position: 'absolute', left: 77, bottom: -60, width: 6, height: 120, transform: [{ rotate: rotation.interpolate({ inputRange: [0, 4], outputRange: ['-80deg', '80deg'] }) }] }}><View style={{ height: 60, width: 6, borderRadius: 4, backgroundColor: c.ink }}/></Animated.View><View style={{ position: 'absolute', bottom: -7, width: 18, height: 18, borderRadius: 10, backgroundColor: c.ink }}/></View>; }
export function Button({ title, onPress, disabled = false }: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}) { return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => ({ backgroundColor: c.action, padding: 16, borderRadius: 28, alignItems: 'center', opacity: disabled ? .4 : pressed ? .8 : 1 })}><Text style={{ color: 'white', fontFamily: 'sans-semibold', fontSize: 15 }}>{title}</Text></Pressable>; }
export function Carousel({ children, onIndex, index = 0, style }: {
    children: React.ReactNode[];
    onIndex?: (n: number) => void;
    index?: number;
    style?: ViewStyle;
}) {
    const [width, setWidth] = useState(0);
    const x = useRef(new Animated.Value(0)).current, reduced = useReducedMotion(), active = useRef(index), dragStart = useRef(0);
    const count = children.length;
    const go = (n: number) => { active.current = Math.max(0, Math.min(count - 1, n)); onIndex?.(active.current); Animated.spring(x, { toValue: -active.current * width, useNativeDriver: false, bounciness: 0, speed: 18, ...(reduced ? { duration: 0 } : {}) }).start(); };
    useEffect(() => { active.current = index; Animated.timing(x, { toValue: -index * width, duration: reduced ? 0 : 250, useNativeDriver: false }).start(); }, [index, width, reduced, x]);
    const pan = PanResponder.create({ onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy), onPanResponderGrant: () => { x.stopAnimation(); dragStart.current = -active.current * width; }, onPanResponderMove: (_, g) => x.setValue(Math.max(-(count - 1) * width, Math.min(0, dragStart.current + g.dx))), onPanResponderRelease: (_, g) => go(active.current + (g.dx < -width * .18 || g.vx < -.5 ? 1 : g.dx > width * .18 || g.vx > .5 ? -1 : 0)), onPanResponderTerminate: () => go(active.current) });
    return <View style={style} onLayout={e => setWidth(e.nativeEvent.layout.width)}><View {...pan.panHandlers} style={{ overflow: 'hidden', flex: 1, minHeight: 160, ...({ touchAction: 'pan-y' } as object) }}><Animated.View style={{ width: width * count, flex: 1, flexDirection: 'row', transform: [{ translateX: x }] }}>{children.map((child, i) => <View key={i} style={{ width, flex: 1 }} accessibilityElementsHidden={i !== index} aria-hidden={i !== index}>{child}</View>)}</Animated.View></View><View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, padding: 16 }}>{children.map((_, i) => <Pressable key={i} accessibilityLabel={`Page ${i + 1} of ${count}`} accessibilityRole="button" onPress={() => go(i)} style={{ minWidth: 32, minHeight: 32, alignItems: 'center', justifyContent: 'center' }}><Animated.View style={{ height: 7, borderRadius: 5, backgroundColor: c.action, width: width ? x.interpolate({ inputRange: [-(i + 1) * width, -i * width, -(i - 1) * width].sort((a, b) => a - b), outputRange: [7, 26, 7], extrapolate: 'clamp' }) : 7, opacity: width ? x.interpolate({ inputRange: [-(i + 1) * width, -i * width, -(i - 1) * width].sort((a, b) => a - b), outputRange: [.3, 1, .3], extrapolate: 'clamp' }) : 1 }}/></Pressable>)}</View></View>;
}
