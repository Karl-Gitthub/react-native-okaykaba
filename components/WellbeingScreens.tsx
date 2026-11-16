import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWellbeing, localDate } from './WellbeingState';
import { Carousel, MoodFace, MoodGauge } from './DesignSystem';
const accent = '#3D6C95';
const actionFill: ViewStyle = { backgroundColor: accent };
const faces = ['😡', '🙁', '😐', '🙂', '😄'];
const labels = ['Angry', 'Low', 'Okay', 'Good', 'Great'];
function Page({ children }: React.PropsWithChildren) {
    const opacity = useRef(new Animated.Value(1)).current;
    useFocusEffect(useCallback(() => {
        let live = true;
        AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
            if (live && !reduced) {
                opacity.setValue(0);
                Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
            }
        });
        return () => { live = false; opacity.stopAnimation(); opacity.setValue(1); };
    }, [opacity]));
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBF7' }}><Animated.View style={{ flex: 1, opacity }}><ScrollView contentContainerStyle={s.page}>{children}</ScrollView></Animated.View></SafeAreaView>;
}
function Heading({ title, back = false }: {
    title: string;
    back?: boolean;
}) {
    const router = useRouter();
    return <View style={s.header}>{back ? <Pressable accessibilityLabel="Back to home" onPress={() => router.replace('/(tabs)')}><Ionicons name="arrow-back" size={25}/></Pressable> : <View style={s.avatar}><Ionicons name="person-outline" size={28} color={accent}/></View>}<Text style={s.headerTitle}>{title}</Text><View style={{ width: 44 }}/></View>;
}
export function HomeScreen() {
    const router = useRouter();
    const { moods, saveMood, ready, notice, entries, profile, status } = useWellbeing();
    const [query, setQuery] = useState('');
    const [tip, setTip] = useState(false);
    const selected = moods.find(m => m.date === localDate());
    const activities = [{ title: 'JOURNAL', icon: 'book-outline', action: () => router.push('/(tabs)/insights') }, { title: 'SELF CARE TIPS', icon: 'heart-outline', action: () => setTip(!tip) }, { title: 'DAILY TO-DO', icon: 'checkbox-outline', action: () => router.push('/(tabs)/tasks') }] as const;
    return <Page><Heading title="Home"/><Text style={s.greeting}>Hi, <Text style={{ color: accent }}>{profile.name || "friend"}</Text></Text><Text style={s.subtitle}>How are you feeling today?</Text>
    <View style={s.card}><Text style={s.section}>Daily Mood</Text><View style={s.moods}>{faces.map((face, i) => <Pressable key={face} accessibilityRole="button" accessibilityLabel={`Mood: ${labels[i]}`} accessibilityState={{ selected: selected?.value === i }} disabled={!ready} onPress={() => saveMood(i)} style={({ pressed }) => [s.mood, selected?.value === i && { backgroundColor: '#EAF1F8', borderColor: accent }, { transform: [{ scale: pressed ? .88 : 1 }] }]}><MoodFace value={i} size={42}/></Pressable>)}</View>{selected && <Text accessibilityLiveRegion="polite" style={s.small}>Today: {labels[selected.value]} · {status}</Text>}{selected && <MoodGauge value={selected.value}/>}</View>
    <View style={s.search}><Ionicons name="search-outline" size={26}/><TextInput style={s.searchInput} placeholder="Search" value={query} onChangeText={setQuery} accessibilityLabel="Search activities"/></View>
    <Text style={s.section}>Activities</Text><ActivityCarousel activities={activities.filter(a => a.title.toLowerCase().includes(query.toLowerCase()))}/>{!!query && !activities.some(a => a.title.toLowerCase().includes(query.toLowerCase())) && <Text style={s.small}>No matching activities.</Text>}
    {tip && <View style={s.card}><Text style={s.section}>A moment for yourself</Text><Text style={s.body}>Pause, take a comfortable breath, and notice something around you. Choose one small thing you would enjoy doing today.</Text><Text style={s.small}>Preview content · detailed self-care screens are not linked in the reference.</Text></View>}
    <Text style={s.section}>Recent Activities</Text>{entries.length ? entries.slice(0, 3).map(e => <Pressable key={e.id} onPress={() => router.push('/(tabs)/insights')} style={s.card}><Text style={s.body} numberOfLines={2}>{e.text}</Text><Text style={s.small}>{new Date(e.date).toLocaleDateString()}</Text></Pressable>) : <Text style={s.small}>Your saved journal entries will appear here.</Text>}
    <Text style={s.privacy}>{notice || status}</Text>
  </Page>;
}
export function JournalScreen() {
    const { entries, saveEntry, ready, notice, draft: text, setDraft: setText, status } = useWellbeing();
    const [message, setMessage] = useState('');
    return <Page><Heading title="Journal" back/><Text style={[s.greeting, { color: accent }]}>Mind Dump!</Text><Text style={s.body}>Express your feelings and journal your thoughts.</Text>
    <TextInput maxLength={100000} style={s.editor} multiline textAlignVertical="top" placeholder="What’s on your mind?" accessibilityLabel="Journal entry" value={text} onChangeText={value => { setText(value); setMessage(''); }}/>
    <Pressable accessibilityRole="button" disabled={!ready} onPress={() => { if (saveEntry(text)) {
        setText('');
        setMessage('Entry added. Saving…');
    }
    else
        setMessage('Write something before saving.'); }} style={[s.save, actionFill]}><Text style={s.saveText}>Save now</Text></Pressable>
    <Text accessibilityLiveRegion="polite" style={s.small}>{notice || (message === "Entry added. Saving…" ? status : message)}</Text><Text style={s.section}>Your entries</Text>{entries.length === 0 && <Text style={s.small}>No entries yet. Your writing stays in your current demo or account.</Text>}{entries.map(e => <View key={e.id} style={s.card}><Text style={s.small}>{new Date(e.date).toLocaleString()}</Text><Text style={s.body}>{e.text}</Text></View>)}
  </Page>;
}
export { default as MoodScreen } from './MoodCalendar';
function ActivityCarousel({ activities }: {
    activities: readonly {
        title: string;
        icon: React.ComponentProps<typeof Ionicons>['name'];
        action: () => void;
    }[];
}) { const [index, setIndex] = useState(0); return <Carousel key={activities.map(a => a.title).join()} index={Math.min(index, Math.max(0, activities.length - 1))} onIndex={setIndex} style={{ height: 205 }}>{activities.map(a => <Pressable key={a.title} accessibilityRole="button" accessibilityLabel={a.title} onPress={a.action} style={{ marginTop: 12, padding: 22, backgroundColor: '#EAF1F8', borderRadius: 22, flex: 1, justifyContent: 'space-between' }}><Ionicons name={a.icon} size={30} color={accent}/><Text style={{ fontFamily: 'sans-semibold', fontSize: 18, color: '#202833' }}>{a.title} →</Text></Pressable>)}</Carousel>; }
const s = StyleSheet.create({
    page: { padding: 28, paddingBottom: 110, gap: 12 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }, headerTitle: { fontSize: 22, fontFamily: 'sans-regular' }, avatar: { width: 54, height: 54, borderRadius: 30, backgroundColor: '#EAF1F8', alignItems: 'center', justifyContent: 'center' }, greeting: { fontSize: 29, fontFamily: 'sans-semibold', color: '#090b0b' }, subtitle: { fontSize: 22, fontFamily: 'sans-semibold', marginBottom: 8 }, section: { fontSize: 24, fontFamily: 'sans-semibold', color: '#090b0b' }, card: { backgroundColor: '#fff', borderRadius: 15, padding: 18, gap: 12, borderWidth: 1, borderColor: '#E1E8ED' }, moods: { flexDirection: 'row', justifyContent: 'space-between', gap: 2 }, mood: { padding: 2, borderRadius: 30, borderWidth: 2, borderColor: 'transparent' }, search: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 40, padding: 16, backgroundColor: '#fff', marginVertical: 10, borderWidth: 1, borderColor: '#E1E8ED' }, searchInput: { flex: 1, fontSize: 16, fontFamily: 'sans-regular', minWidth: 0 }, activity: { width: 150, height: 175, borderRadius: 28, padding: 16, justifyContent: 'space-between', backgroundColor: accent }, activityIcon: { width: 46, height: 46, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }, activityTitle: { color: '#fff', fontSize: 15, fontFamily: 'sans-semibold' }, body: { color: '#747974', fontSize: 17, lineHeight: 27, fontFamily: 'sans-regular' }, small: { color: '#777', fontSize: 13, lineHeight: 21, fontFamily: 'sans-regular' }, privacy: { fontSize: 11, color: '#888', lineHeight: 18, marginTop: 20 }, editor: { minHeight: 330, borderWidth: 1, borderColor: accent, borderRadius: 24, padding: 24, fontSize: 19, lineHeight: 30, fontFamily: 'sans-regular', backgroundColor: 'white', marginVertical: 8 }, save: { borderRadius: 32, padding: 16, alignItems: 'center', backgroundColor: accent }, saveText: { color: 'white', fontFamily: 'sans-semibold', fontSize: 17 },
});
