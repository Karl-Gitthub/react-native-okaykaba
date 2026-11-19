import { AppIcon } from '@/components/AppIcon';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Share, StyleSheet, Switch, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChromeButton, Screen, ui } from '@/components/Screen';
import { Button, Carousel, CarouselPressable } from '@/components/DesignSystem';
import { useWellbeing } from '@/components/WellbeingState';
import { allReflections, dailyReflections } from '@/lib/inspiration';
import { palette as c } from '@/lib/theme';

export default function Inspiration() {
  const router = useRouter(), insets = useSafeAreaInsets();
  const { height, fontScale } = useWindowDimensions();
  const { preferences, updatePreferences, ready, draft, setDraft, notice } = useWellbeing();
  const [mode, setMode] = useState<'quotes' | 'saved'>('quotes'), [index, setIndex] = useState(0), [message, setMessage] = useState('');
  const cards = mode === 'saved' ? allReflections.filter(item => preferences.savedReflections.includes(item.id) && (item.kind !== 'verse' || preferences.bibleVerses)) : dailyReflections(preferences.bibleVerses);
  const position = Math.min(index, Math.max(0, cards.length - 1)), current = cards[position];
  const cardHeight = Math.max(296, Math.min(350, height * .39)) * Math.max(1, fontScale);
  function toggle(id: string) {
    const saved = preferences.savedReflections.includes(id);
    updatePreferences({ savedReflections: saved ? preferences.savedReflections.filter(value => value !== id) : [...preferences.savedReflections, id] });
  }
  return <Screen contentStyle={[s.page, { paddingBottom: Math.max(18, insets.bottom + 8) }]}>
    <View style={ui.header}>
      <ChromeButton label="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}><AppIcon name="arrowLeft" size={23} color={c.ink}/></ChromeButton>
      <ChromeButton label="Open saved reflections" onPress={() => { setMode('saved'); setIndex(0); }}><AppIcon name="bookmark" weight={mode === 'saved' ? 'fill' : 'regular'} size={23} color={c.ink}/></ChromeButton>
    </View>
    <View style={{ gap: 5 }}><Text style={ui.title}>Daily Inspiration</Text><Text style={[ui.eyebrow, { color: c.muted }]}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</Text></View>
    <View style={s.segment} accessibilityRole="tablist">{(['quotes', 'saved'] as const).map(value => <Pressable key={value} accessibilityRole="tab" accessibilityState={{ selected: mode === value }} onPress={() => { setMode(value); setIndex(0); }} style={[s.segmentItem, mode === value && { backgroundColor: c.action }]}><Text style={[ui.link, { color: mode === value ? c.white : c.ink }]}>{value === 'quotes' ? 'Quotes' : 'Saved'}</Text></Pressable>)}</View>
    {cards.length ? <View style={s.deck}>
      <Carousel key={mode + preferences.bibleVerses} indicators={false} label="Inspiration cards" index={position} onIndex={setIndex} style={{ height: cardHeight }}>
        {cards.map(item => <View key={item.id} style={s.quote}>
          <Text style={ui.eyebrow}>{item.kind === 'verse' ? 'A MOMENT OF FAITH' : 'TODAY’S REFLECTION'}</Text>
          <Text selectable style={s.quoteText}>{item.text}</Text><Text style={[ui.caption, { textAlign: 'center' }]}>{item.source}</Text>
          <View style={s.tools}>
            <CarouselPressable accessibilityRole="button" accessibilityLabel={preferences.savedReflections.includes(item.id) ? 'Unsave reflection' : 'Save reflection'} accessibilityState={{ selected: preferences.savedReflections.includes(item.id) }} disabled={!ready} onPress={() => toggle(item.id)} style={ui.iconButton}><AppIcon name="bookmark" weight={preferences.savedReflections.includes(item.id) ? 'fill' : 'regular'} size={22} color={c.ink}/></CarouselPressable>
            <View style={{ width: 1, height: 24, backgroundColor: c.line }}/>
            <CarouselPressable accessibilityRole="button" accessibilityLabel="Share reflection" onPress={async () => {
              try { await Share.share({ message: item.text + '\n— ' + item.source }); }
              catch { setMessage('Could not open sharing. Try again, or select and copy the reflection text.'); }
            }} style={ui.iconButton}><AppIcon name="share" size={22} color={c.ink}/></CarouselPressable>
            {cards.length > 1 && <CarouselPressable accessibilityRole="button" accessibilityLabel={position === cards.length - 1 ? 'Back to first reflection' : 'Next reflection'} onPress={() => setIndex((position + 1) % cards.length)} style={{ minHeight: 44, minWidth: 44, justifyContent: 'center' }}><Text style={ui.link}>{position === cards.length - 1 ? 'First' : 'Next'}</Text></CarouselPressable>}
          </View>
        </View>)}
      </Carousel>
    </View> : <View style={[ui.panel, { backgroundColor: c.surface, minHeight: 240, justifyContent: 'center' }]}><Text style={ui.section}>Keep a thought for later.</Text><Text style={ui.body}>Save a reflection from Quotes and find it here. Saved Bible verses appear when that setting is on.</Text></View>}
    <View style={{ flexGrow: 1, minHeight: 8 }}/>
    {!!current && <View style={{ gap: 12 }}><Text style={ui.section}>{current.prompt}</Text><Button title="Write in journal" disabled={!ready} onPress={() => {
      setDraft((draft.trim() ? draft + '\n\n' : '') + current.prompt + '\n');
      router.push('/(tabs)/insights');
    }}/></View>}
    <View style={s.verses}>
      <View style={{ flex: 1 }}><Text style={[ui.section, { fontSize: 16 }]}>Bible verses</Text><Text style={ui.caption}>Optional · Off by default</Text></View>
      <Switch accessibilityLabel="Include Bible verses" disabled={!ready} value={preferences.bibleVerses} onValueChange={bibleVerses => { updatePreferences({ bibleVerses }); setIndex(0); }} trackColor={{ false: c.line, true: c.action }}/>
    </View>
    {(!!message || !!notice) && <Text accessibilityLiveRegion="polite" style={ui.caption}>{message || notice}</Text>}
  </Screen>;
}
const s = StyleSheet.create({
  page: { flexGrow: 1, paddingTop: 8, gap: 14 },
  segment: { flexDirection: 'row', gap: 5, backgroundColor: c.surface, borderRadius: 14, padding: 3 },
  segmentItem: { flex: 1, minHeight: 44, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  deck: { paddingTop: 12, marginTop: 4 },
  quote: { flex: 1, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, borderRadius: 16, marginHorizontal: 3, padding: 22, alignItems: 'center', justifyContent: 'center', gap: 14 },
  quoteText: { fontSize: 25, lineHeight: 33, letterSpacing: -.7, fontFamily: 'sans-bold', color: c.ink, textAlign: 'center' },
  tools: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 19, marginTop: 8 },
  verses: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: c.line, borderRadius: 14, backgroundColor: c.paper, paddingHorizontal: 15, paddingVertical: 11 },
});
