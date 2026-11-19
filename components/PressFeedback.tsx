import React, { useRef, useState } from 'react';
import { Animated, Pressable } from 'react-native';
import { useReducedMotion } from './InteractionPreferences';
import { settleSpring } from '@/lib/motion';
import { palette as c } from '@/lib/theme';

// Normal onPress activation is preserved; cancellation resets the contact feedback.
export function PressFeedback({ children, style, onPressIn, onPressOut, onFocus, onBlur, ...props }: React.ComponentProps<typeof Pressable>) {
  const scale = useRef(new Animated.Value(1)).current, reduced = useReducedMotion();
  const [focused, setFocused] = useState(false);
  return <Animated.View style={{ transform: [{ scale }] }}><Pressable {...props}
    style={state => [typeof style === 'function' ? style(state) : style, focused && { outlineWidth: 2, outlineColor: c.focus, outlineStyle: 'solid', outlineOffset: 2 }]}
    onFocus={event => { setFocused(true); onFocus?.(event); }} onBlur={event => { setFocused(false); onBlur?.(event); }}
    onPressIn={event => { Animated.timing(scale, { toValue: reduced ? 1 : .97, duration: 70, useNativeDriver: true }).start(); onPressIn?.(event); }}
    onPressOut={event => { if (reduced) scale.setValue(1); else Animated.spring(scale, { toValue: 1, ...settleSpring, restDisplacementThreshold: .0001, restSpeedThreshold: .001, useNativeDriver: true }).start(); onPressOut?.(event); }}>{children}</Pressable></Animated.View>;
}
