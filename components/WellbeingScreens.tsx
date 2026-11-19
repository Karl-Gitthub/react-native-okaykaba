import { AppIcon } from '@/components/AppIcon';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useWellbeing, localDate } from './WellbeingState';
import { Carousel, CarouselPressable, MoodFace, MoodGauge, Button, useReducedMotion } from './DesignSystem';
import { BackHeader, ChromeButton, Screen, ui } from './Screen';
import { GlassSurface } from './GlassSurface';
import { palette as c } from '@/lib/theme';
import { moodLabels } from '@/lib/calendar';
import { dailyReflections } from '@/lib/inspiration';

export function HomeScreen() {
  const router = useRouter(), reduced = useReducedMotion();
  const { fontScale } = useWindowDimensions();
  const { moods, saveMood, ready, notice, profile, status, preferences, updatePreferences } = useWellbeing();
  const [activity, setActivity] = useState(0);
  const [panel, setPanel] = useState<'mood' | 'notifications' | null>(null);
  const selected = moods.find(m => m.date === localDate());
  const thought = dailyReflections(preferences.bibleVerses)[0];
  const saved = preferences.savedReflections.includes(thought.id);
  const activities = [
    { title: 'Journal', subtitle: 'Write and reflect', icon: 'journal', route: '/(tabs)/insights' },
    { title: 'Self-care', subtitle: 'Take a moment', icon: 'selfCare', route: '/(tabs)/self-care' },
    { title: 'To-do', subtitle: 'Plan small steps', icon: 'tasks', route: '/(tabs)/tasks' },
    { title: 'Daily words', subtitle: 'Read a reflection', icon: 'dailyWords', route: '/(tabs)/inspiration' },
  ] as const;
  return <Screen contentStyle={s.homePage}>
    <View style={ui.header}>
      <Text style={s.wordmark}>OkayKaba</Text>
      <View style={s.headerActions}>
        <ChromeButton label="Open your account" onPress={() => router.push('/(tabs)/settings')}>
          <AppIcon name="account" size={22} color={c.action}/>
        </ChromeButton>
        <ChromeButton label="Notifications" onPress={() => setPanel('notifications')}>
          <AppIcon name="bell" size={23} color={c.ink}/>
        </ChromeButton>
      </View>
    </View>
    <Text accessibilityRole="header" style={ui.title}>Hi, {profile.name || 'friend'}</Text>
    <View style={s.checkIn}>
      <Text accessibilityRole="header" style={ui.section}>How are you feeling today?</Text>
      <Text style={ui.caption}>{selected ? 'Today’s check-in · ' + moodLabels[selected.value] : 'Choose a mood to check in.'}</Text>
      <View style={s.moods}>{moodLabels.map((label, i) => <Pressable key={label} accessibilityRole="button" accessibilityLabel={'Mood: ' + label} accessibilityHint={selected?.value === i ? 'Tap again to see your check-in and mood gauge.' : 'Save this mood for today.'} accessibilityState={{ selected: selected?.value === i }} disabled={!ready}
        onPress={() => selected?.value === i ? setPanel('mood') : saveMood(i)} style={({ pressed }) => [s.mood, { opacity: pressed ? .7 : 1 }]}>
        <View style={[s.faceOutline, selected?.value === i && s.selectedFace]}><MoodFace value={i} size={38}/></View>
        <Text style={[s.moodLabel, selected?.value === i && s.selectedMoodLabel]}>{label}</Text>
      </Pressable>)}</View>
    </View>
    <View style={{ gap: 10 }}>
      <Text accessibilityRole="header" style={ui.section}>Activities</Text>
      <Carousel cards indicators={false} label="Activities" index={activity} onIndex={setActivity} style={{ height: 128 + 62 * Math.max(0, fontScale - 1) }}>
        {activities.map(a => <CarouselPressable key={a.title} accessibilityRole="button" accessibilityLabel={'Open ' + a.title} onPress={() => router.push(a.route)} style={({ pressed }) => [s.activity, { opacity: pressed ? .86 : 1 }]}>
          <AppIcon name={a.icon} size={24} color={c.action}/>
          <View style={{ gap: 3 }}>
            <Text style={s.activityTitle}>{a.title}</Text>
            <Text style={s.activitySubtitle}>{a.subtitle}</Text>
          </View>
        </CarouselPressable>)}
      </Carousel>
    </View>
    <View style={s.thought}>
      <Text style={ui.eyebrow}>TODAY’S REFLECTION</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Read today's inspiration" onPress={() => router.push('/(tabs)/inspiration')} style={{ gap: 4 }}>
        <Text numberOfLines={3} style={{ fontFamily: 'sans-bold', color: c.ink, fontSize: 18, lineHeight: 24, letterSpacing: -.5 }}>{thought.text}</Text><Text style={[ui.caption, { fontSize: 11, lineHeight: 16 }]}>{thought.source}</Text>
      </Pressable>
      <View style={[ui.header, { minHeight: 36 }]}>
        <Pressable accessibilityRole="button" accessibilityLabel={saved ? 'Unsave reflection' : 'Save reflection'} accessibilityState={{ selected: saved }} disabled={!ready} onPress={() => updatePreferences({ savedReflections: saved ? preferences.savedReflections.filter(id => id !== thought.id) : [...preferences.savedReflections, thought.id] })} style={s.inlineAction}>
          <AppIcon name="bookmark" weight={saved ? 'fill' : 'regular'} size={19} color={c.ink}/><Text style={ui.link}>{saved ? 'Saved' : 'Save'}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.push('/(tabs)/inspiration')} style={s.inlineAction}><Text style={ui.link}>Read & reflect</Text><AppIcon name="arrowRight" size={17} color={c.action}/></Pressable>
      </View>
    </View>
    <Pressable accessibilityRole="button" onPress={() => router.push('/(tabs)/talk')} style={s.talk}>
      <AppIcon name="chat" size={23} color={c.ink}/><View style={{ flex: 1, gap: 2 }}><Text style={{ fontFamily: 'sans-bold', color: c.ink, fontSize: 14 }}>Talk it through</Text><Text style={[ui.caption, { fontSize: 11, lineHeight: 16 }]}>AI support · Not connected yet</Text></View><AppIcon name="caretRight" size={18} color={c.ink}/>
    </Pressable>
    {(!!notice || status === 'Saving…') && <Text accessibilityLiveRegion="polite" style={ui.caption}>{notice || status}</Text>}
    <Modal visible={panel !== null} transparent animationType={reduced ? 'none' : 'fade'} onRequestClose={() => setPanel(null)}>
      <View style={s.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel="Close details" onPress={() => setPanel(null)}/>
        <GlassSurface strong style={s.dialog} accessibilityViewIsModal>
          <Text style={ui.section}>{panel === 'mood' ? 'Today’s check-in' : 'Notifications'}</Text>
          {panel === 'mood' && selected ? <>
            <View style={{ alignItems: 'center', gap: 8 }}><MoodFace value={selected.value} size={70}/><Text style={ui.section}>{moodLabels[selected.value]}</Text></View>
            <MoodGauge value={selected.value}/><Text accessibilityLiveRegion="polite" style={ui.caption}>{notice || status}</Text>
          </> : <Text style={ui.body}>Reminders aren’t available in this build yet. No notifications are scheduled.</Text>}
          <Button title="Done" onPress={() => setPanel(null)}/>
        </GlassSurface>
      </View>
    </Modal>
  </Screen>;
}

export function JournalScreen() {
  const { entries, saveEntry, ready, notice, draft: text, setDraft: setText, status } = useWellbeing();
  const [expanded, setExpanded] = useState<string | null>(null);
  return <Screen keyboard>
    <BackHeader title="Journal"/>
    <View style={s.intro}>
      <Text accessibilityRole="header" style={ui.title}>A space to write</Text>
      <Text style={ui.body}>Write down what you want to remember or work through.</Text>
    </View>
    <View style={s.checkIn}>
      <Text accessibilityRole="header" style={ui.section}>New entry</Text>
      <TextInput maxLength={100000} style={[ui.input, s.editor]} multiline textAlignVertical="top"
        placeholder="What’s on your mind?" placeholderTextColor={c.muted} accessibilityLabel="Journal entry"
        value={text} onChangeText={setText}/>
      <View style={s.editorFooter}>
        <Text accessibilityLiveRegion="polite" style={[ui.caption, { flexShrink: 1 }]}>{notice || (text ? 'Draft · ' + status : status)}</Text>
        <Button title="Save entry" disabled={!ready || !text.trim()} onPress={() => saveEntry(text)}/>
      </View>
    </View>
    <Text accessibilityRole="header" style={ui.section}>Previous entries</Text>
    {!entries.length && <Text style={ui.body}>Your saved entries will appear here.</Text>}
    {entries.map(e => <Pressable key={e.id} accessibilityRole="button" accessibilityLabel={'Read journal entry from ' + new Date(e.date).toLocaleDateString()} accessibilityState={{ expanded: expanded === e.id }} onPress={() => setExpanded(expanded === e.id ? null : e.id)} style={s.entry}>
      <View style={s.entryHeading}>
        <AppIcon name="journal" size={19} color={c.action}/>
        <Text style={[ui.link, { flex: 1, color: c.ink }]}>{new Date(e.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        <AppIcon name={expanded === e.id ? 'caretUp' : 'caretDown'} size={17} color={c.muted}/>
      </View>
      <Text numberOfLines={expanded === e.id ? undefined : 2} style={[ui.body, { color: c.ink }]}>{e.text}</Text>
    </Pressable>)}
  </Screen>;
}
export { default as MoodScreen } from './MoodCalendar';

const s = StyleSheet.create({
  homePage: { paddingTop: 12, gap: 20 },
  wordmark: { flexShrink: 1, fontFamily: 'sans-extrabold', fontSize: 22, color: c.action, letterSpacing: -.7 },
  headerActions: { flexDirection: 'row', gap: 6 },
  intro: { gap: 5 },
  checkIn: { borderRadius: 16, backgroundColor: c.surface, padding: 15, gap: 8 },
  moods: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', gap: 3, paddingTop: 7 },
  mood: { alignItems: 'center', gap: 3, paddingVertical: 3, minWidth: 44 },
  faceOutline: { width: 44, height: 44, borderWidth: 1.5, borderColor: 'transparent', borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  selectedFace: { borderColor: c.accent, backgroundColor: c.paper },
  selectedMoodLabel: { color: c.action, fontFamily: 'sans-bold' },
  moodLabel: { fontSize: 11, lineHeight: 16, fontFamily: 'sans-medium', color: c.ink },
  activity: { flex: 1, padding: 13, borderRadius: 15, justifyContent: 'space-between', backgroundColor: c.surface },
  activityTitle: { color: c.ink, fontSize: 15, fontFamily: 'sans-bold' },
  activitySubtitle: { color: c.muted, fontSize: 11, fontFamily: 'sans-regular' },
  thought: { padding: 14, borderRadius: 18, backgroundColor: c.surface, gap: 6 },
  inlineAction: { flexDirection: 'row', gap: 7, alignItems: 'center', minHeight: 36, paddingVertical: 4 },
  talk: { borderWidth: 1, borderColor: c.line, borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backdrop: { flex: 1, backgroundColor: 'rgba(23,20,30,0.24)', justifyContent: 'center', padding: 26 },
  dialog: { padding: 24, gap: 18 },
  editor: { minHeight: 160, fontSize: 16, lineHeight: 25, padding: 14 },
  editorFooter: { marginTop: 4, paddingTop: 10, borderTopWidth: 1, borderColor: c.line, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  entry: { borderRadius: 14, backgroundColor: c.surface, padding: 14, gap: 6 },
  entryHeading: { flexDirection: 'row', alignItems: 'center', gap: 9 },
});
