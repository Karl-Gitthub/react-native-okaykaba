import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { Animated, PanResponder, Platform, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { palette as c } from '@/lib/theme';
import { moodColors } from '@/lib/calendar';

import { useReducedMotion } from './InteractionPreferences';
import { PressFeedback } from './PressFeedback';
import { clamp, DragSample, releaseVelocity, resistedOffset, settleSpring, snapIndex } from '@/lib/motion';
export { useReducedMotion } from './InteractionPreferences';

export function GradientFill({ shade = false, horizontal = false, width, height }: {
  shade?: boolean | number; horizontal?: boolean; width?: number; height?: number;
}) {
  const id = 'gradient' + useId().replace(/:/g, '');
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <Svg width={width ?? '100%'} height={height ?? '100%'} preserveAspectRatio="none">
      <Defs><LinearGradient id={id} x1="0" y1="0" x2={horizontal ? '1' : '0'} y2={horizontal ? '0' : '1'}>
        <Stop offset="0" stopColor={c.gradientStart}/><Stop offset="1" stopColor={c.gradientEnd}/>
      </LinearGradient></Defs><Rect width="100%" height="100%" fill={'url(#' + id + ')'}/>
      {!!shade && <Rect width="100%" height="100%" fill={c.ink} opacity={typeof shade === 'number' ? shade : .08}/>}
    </Svg>
  </View>;
}

const ACircle = Animated.createAnimatedComponent(Circle);
export function Ring({ value, size = 82 }: { value: number; size?: number }) {
  const bounded = Math.max(0, Math.min(1, value));
  const progress = useRef(new Animated.Value(bounded)).current, reduced = useReducedMotion();
  const id = 'ring' + useId().replace(/:/g, '');
  useEffect(() => { Animated.timing(progress, { toValue: bounded, duration: reduced ? 0 : 350, useNativeDriver: false }).start(); }, [bounded, reduced, progress]);
  const r = size / 2 - 6, length = 2 * Math.PI * r;
  return <View accessibilityRole="progressbar" accessibilityLabel="Completion progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(bounded * 100)} accessibilityValue={{ min: 0, max: 100, now: Math.round(bounded * 100) }} style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
      <Defs><LinearGradient id={id}><Stop offset="0" stopColor={c.gradientStart}/><Stop offset="1" stopColor={c.gradientEnd}/></LinearGradient></Defs>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.surface} strokeWidth={7} fill="none"/>
      <ACircle cx={size / 2} cy={size / 2} r={r} stroke={'url(#' + id + ')'} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={[length, length]} strokeDashoffset={progress.interpolate({ inputRange: [0, 1], outputRange: [length, 0] })} transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'}/>
    </Svg><Text style={{ fontFamily: 'sans-bold', fontSize: 20, color: c.ink }}>{Math.round(bounded * 100)}%</Text>
  </View>;
}

export function MoodFace({ value, size = 42 }: { value: number; size?: number }) {
  const mood = Math.max(0, Math.min(4, value));
  const mouths = ['M15 34 Q24 22 33 34', 'M17 32 Q24 27 31 32', 'M17 30 H31', 'M16 28 Q24 36 32 28', 'M15 28 Q24 41 33 28'];
  return <Svg width={size} height={size} viewBox="0 0 48 48">
    <Circle cx="24" cy="24" r="22" fill={moodColors[mood]}/>
    {mood === 4 ? <Path d="M13 20 Q17 14 21 20 M27 20 Q31 14 35 20" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" fill="none"/> : <><Circle cx="17" cy="20" r="2" fill={c.ink}/><Circle cx="31" cy="20" r="2" fill={c.ink}/></>}
    {mood === 0 && <Path d="M13 12 L20 15 M28 15 L35 12" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round"/>}
    <Path d={mouths[mood]} stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </Svg>;
}

export function MoodGauge({ value }: { value: number }) {
  const rotation = useRef(new Animated.Value(value)).current, reduced = useReducedMotion();
  useEffect(() => { Animated.timing(rotation, { toValue: value, duration: reduced ? 0 : 400, useNativeDriver: false }).start(); }, [value, reduced, rotation]);
  return <View style={{ height: 82, width: 160, alignSelf: 'center', overflow: 'hidden', margin: 12 }}>
    <Svg width="160" height="160"><Path d="M15 80 A65 65 0 0 1 145 80" stroke={c.surface} strokeWidth="20" fill="none"/><Path d="M15 80 A65 65 0 0 1 145 80" stroke={c.accent} strokeOpacity=".5" strokeWidth="16" strokeDasharray="35 6" fill="none"/></Svg>
    <Animated.View style={{ position: 'absolute', left: 77, bottom: -60, width: 6, height: 120, transform: [{ rotate: rotation.interpolate({ inputRange: [0, 4], outputRange: ['-80deg', '80deg'] }) }] }}><View style={{ height: 60, width: 6, borderRadius: 4, backgroundColor: c.ink }}/></Animated.View>
    <View style={{ position: 'absolute', bottom: -7, width: 18, height: 18, borderRadius: 10, backgroundColor: c.ink }}/>
  </View>;
}

export function Button({ title, onPress, disabled = false }: {
  title: string; onPress: () => void; disabled?: boolean;
}) {
  return <PressFeedback accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => ({ backgroundColor: c.action, minHeight: 48, paddingVertical: 12, paddingHorizontal: 17, borderRadius: 13, justifyContent: 'center', alignItems: 'center', opacity: disabled ? .4 : pressed ? .8 : 1 })}>
    <Text style={{ color: c.white, fontFamily: 'sans-semibold', fontSize: 15, flexShrink: 1 }}>{title}</Text>
  </PressFeedback>;
}

const DragContext = createContext({ cancelPress: (): boolean => false, beginPress: () => {} });
export function CarouselPressable({ onPress, onPressIn, ...props }: React.ComponentProps<typeof Pressable>) {
  const drag = useContext(DragContext);
  return <Pressable {...props} onPressIn={event => { drag.beginPress(); onPressIn?.(event); }} onPress={event => { if (!drag.cancelPress()) onPress?.(event); }}/>;
}

// One interrupted spring can be grabbed at its actual visible position, never at an old target.
export function Carousel({ children, onIndex, index = 0, style, indicators = true, cards = false, label = 'Pages' }: {
  children: React.ReactNode[]; onIndex?: (n: number) => void; index?: number;
  style?: ViewStyle; indicators?: boolean; cards?: boolean; label?: string;
}) {
  const [width, setWidth] = useState(0), [focused, setFocused] = useState(false);
  const x = useRef(new Animated.Value(0)).current, reduced = useReducedMotion();
  const active = useRef(index), dragStart = useRef(0), position = useRef(0), dragging = useRef(false);
  const samples = useRef<DragSample[]>([]), suppressPressUntil = useRef(0);
  const input = useRef<'pointer' | 'keyboard'>('pointer');
  const previous = useRef({ width: -1, count: 0, reduced });
  const count = children.length, gap = cards ? 12 : 0;
  const itemWidth = cards ? Math.max(125, width * .4) : width;
  const stride = itemWidth + gap, maxOffset = Math.max(0, stride * count - gap - width);

  const go = useCallback((next: number, velocity = 0) => {
    dragging.current = false;
    const bounded = clamp(next, 0, Math.max(0, count - 1));
    active.current = bounded;
    onIndex?.(bounded);
    const target = -Math.min(bounded * stride, maxOffset);
    if (reduced) { x.stopAnimation(); x.setValue(target); }
    else Animated.spring(x, { toValue: target, ...settleSpring, velocity: velocity * 1000, restDisplacementThreshold: .3, restSpeedThreshold: 2, useNativeDriver: false }).start();
  }, [count, maxOffset, onIndex, reduced, stride, x]);

  useEffect(() => {
    const subscription = x.addListener(({ value }) => { position.current = value; });
    return () => { x.removeListener(subscription); x.stopAnimation(); };
  }, [x]);
  useEffect(() => {
    const geometryChanged = previous.current.width !== width || previous.current.count !== count;
    const motionChanged = previous.current.reduced !== reduced;
    previous.current = { width, count, reduced };
    if (geometryChanged) {
      dragging.current = false; suppressPressUntil.current = 0; x.stopAnimation(); go(index);
    } else if (!dragging.current && (motionChanged || index !== active.current)) {
      go(index);
    }
    // A controlled index echo must not restart the spring or interrupt a new drag.
  }, [index, width, count, reduced, go, x]);

  const gesture = useRef({ maxOffset, stride, width, count, go });
  gesture.current = { maxOffset, stride, width, count, go };
  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponderCapture: () => { input.current = 'pointer'; return false; },
    onMoveShouldSetPanResponderCapture: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2,
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2,
    onPanResponderGrant: () => {
      dragging.current = true; suppressPressUntil.current = Infinity;
      dragStart.current = position.current;
      x.stopAnimation(value => { dragStart.current = value; position.current = value; });
      samples.current = [{ position: position.current, time: Date.now() }];
    },
    onPanResponderMove: (_, g) => {
      if (!dragging.current) return;
      const value = resistedOffset(dragStart.current + g.dx, gesture.current.maxOffset, gesture.current.width);
      const now = Date.now();
      samples.current = [...samples.current.filter(sample => now - sample.time <= 140), { position: value, time: now }];
      x.setValue(value);
    },
    onPanResponderRelease: () => {
      if (!dragging.current) return;
      dragging.current = false; suppressPressUntil.current = Date.now() + 250;
      const velocity = releaseVelocity(samples.current, Date.now()), config = gesture.current;
      config.go(snapIndex(position.current, velocity, config.stride, config.maxOffset, config.count), velocity);
    },
    onPanResponderTerminate: () => {
      dragging.current = false; suppressPressUntil.current = Date.now() + 250;
      const config = gesture.current;
      config.go(snapIndex(position.current, 0, config.stride, config.maxOffset, config.count));
    },
  })).current;
  const keyboardProps = Platform.OS === 'web' ? {
    tabIndex: 0 as const,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onKeyDown: (event: { key: string; preventDefault: () => void }) => {
      input.current = 'keyboard';
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); go(active.current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    },
  } : {};
  return <View style={style} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
    <View {...pan.panHandlers} {...keyboardProps} accessibilityLabel={label} accessibilityHint="Swipe left or right. On a keyboard, use the arrow keys."
      accessibilityActions={[{ name: 'increment', label: 'Next card' }, { name: 'decrement', label: 'Previous card' }]}
      onAccessibilityAction={event => go(active.current + (event.nativeEvent.actionName === 'increment' ? 1 : -1))}
      style={{ overflow: 'hidden', flex: 1, minHeight: cards ? 120 : 160, borderRadius: cards ? 20 : 0, ...(focused ? { outlineWidth: 2, outlineColor: c.focus, outlineStyle: 'solid', outlineOffset: 2 } : {}), ...({ touchAction: 'pan-y' } as object) }}>
      <DragContext.Provider value={{ cancelPress: () => Date.now() < suppressPressUntil.current, beginPress: () => { if (!dragging.current) suppressPressUntil.current = 0; } }}>
        <Animated.View style={{ width: Math.max(width, stride * count - gap), flex: 1, flexDirection: 'row', gap, transform: [{ translateX: x }] }}>
          {children.map((child, i) => <View key={i} style={{ width: itemWidth }} accessibilityElementsHidden={!cards && i !== index} aria-hidden={!cards && i !== index}
            onFocus={cards ? () => { if (input.current === 'keyboard') go(i); } : undefined}>{child}</View>)}
        </Animated.View>
      </DragContext.Provider>
    </View>
    {indicators && <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, padding: 12 }}>
      {children.map((_, i) => <Pressable key={i} accessibilityLabel={'Page ' + (i + 1) + ' of ' + count} accessibilityRole="button" accessibilityState={{ selected: i === index }} onPress={() => go(i)} style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ height: 7, borderRadius: 5, backgroundColor: c.action, width: width ? x.interpolate({ inputRange: [-(i + 1) * width, -i * width, -(i - 1) * width], outputRange: [7, 26, 7], extrapolate: 'clamp' }) : 7, opacity: width ? x.interpolate({ inputRange: [-(i + 1) * width, -i * width, -(i - 1) * width], outputRange: [.3, 1, .3], extrapolate: 'clamp' }) : 1 }}/>
      </Pressable>)}
    </View>}
  </View>;
}
