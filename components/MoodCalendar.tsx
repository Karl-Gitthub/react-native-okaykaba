import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette as c } from '@/lib/theme';
import { dateKey, daysInMonth, monthDays, moodColors, moodLabels, moveMonth } from '@/lib/calendar';
import { MoodFace } from './DesignSystem';
import { localDate, useWellbeing } from './WellbeingState';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1).toLocaleDateString('en', { month: 'short' }));

export default function MoodCalendar() {
  const { moods, ready, notice, status } = useWellbeing();
  const router = useRouter();
  const [cursor, setCursor] = useState(() => new Date());
  const [mode, setMode] = useState<'month' | 'year'>('month');
  const [selected, setSelected] = useState(localDate);
  const records = useMemo(() => new Map(moods.map(m => [m.date, m])), [moods]);
  const year = cursor.getFullYear(), month = cursor.getMonth(), today = localDate();
  const current = records.get(selected);
  const selectedDate = new Date(`${selected}T12:00:00`);
  const count = moods.filter(m => mode === 'year' ? m.date.startsWith(`${year}-`) : m.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}-`)).length;

  function shift(direction: number) {
    setCursor(mode === 'month' ? moveMonth(cursor, direction) : new Date(year + direction, month, 1, 12));
  }
  function select(date: Date, revealMonth = false) {
    setSelected(dateKey(date));
    if (revealMonth) setCursor(new Date(date.getFullYear(), date.getMonth(), 1, 12));
  }
  const describe = (key: string) => `${key}: ${records.has(key) ? moodLabels[records.get(key)!.value] : 'No mood recorded'}`;

  return <SafeAreaView style={s.screen}>
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.heading}><Ionicons name="calendar-outline" size={25} color={c.action}/><Text style={s.title}>Calendar</Text><Pressable accessibilityRole="button" accessibilityLabel="Go to today" onPress={() => { setCursor(new Date()); setSelected(today); }} style={s.todayButton}><Text style={s.link}>Today</Text></Pressable></View>
      <View style={s.switcher} accessibilityRole="tablist">
        {(['month', 'year'] as const).map(value => <Pressable key={value} accessibilityRole="tab" aria-selected={mode === value} onPress={() => setMode(value)} style={[s.switch, mode === value && s.activeSwitch]}><Text style={[s.switchText, mode === value && { color: 'white' }]}>{value === 'month' ? 'Monthly' : 'Year in Pixels'}</Text></Pressable>)}
      </View>
      <View style={s.paper}>
        <View style={s.navigation}>
          <Pressable accessibilityRole="button" accessibilityLabel={mode === 'month' ? 'Previous month' : 'Previous year'} onPress={() => shift(-1)} style={s.arrow}><Ionicons name="chevron-back" size={20} color={c.muted}/></Pressable>
          <Text accessibilityRole="header" accessibilityLiveRegion="polite" style={s.month}>{mode === 'month' ? cursor.toLocaleDateString('en', { month: 'long', year: 'numeric' }) : year}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel={mode === 'month' ? 'Next month' : 'Next year'} onPress={() => shift(1)} style={s.arrow}><Ionicons name="chevron-forward" size={20} color={c.muted}/></Pressable>
        </View>
        {mode === 'month' ? <>
          <View style={s.weekdays}>{weekdays.map(day => <Text key={day} style={s.weekday}>{day}</Text>)}</View>
          <View style={s.grid}>{monthDays(year, month).map(date => {
            const key = dateKey(date), record = records.get(key), inMonth = date.getMonth() === month;
            return <Pressable key={key} accessibilityRole="button" accessibilityLabel={describe(key)} aria-pressed={key === selected} onPress={() => select(date, !inMonth)} style={[s.day, !inMonth && { opacity: .36 }, key === selected && s.selectedDay]}>
              {record ? <MoodFace value={record.value} size={31}/> : <View style={s.emptyFace}><Ionicons name="happy-outline" size={27} color={c.line}/></View>}
              <Text style={[s.dayNumber, key === today && s.todayNumber]}>{date.getDate()}</Text>
            </Pressable>;
          })}</View>
        </> : <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ minWidth: 292, flex: 1 }}>
            <View style={s.pixelRow}><Text style={s.pixelDayLabel}/>{monthNames.map(name => <Text key={name} style={s.pixelMonth}>{name}</Text>)}</View>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => <View key={day} style={s.pixelRow}><Text style={s.pixelDayLabel}>{day}</Text>{monthNames.map((name, m) => {
              if (day > daysInMonth(year, m)) return <View key={name} style={s.pixelSlot}/>;
              const date = new Date(year, m, day, 12), key = dateKey(date), record = records.get(key);
              return <Pressable key={name} accessibilityRole="button" accessibilityLabel={describe(key)} aria-pressed={key === selected} onPress={() => select(date)} style={s.pixelSlot}><View style={[s.pixel, { backgroundColor: record ? moodColors[record.value] : c.surface }, key === selected && { borderWidth: 2, borderColor: c.ink }]}/></Pressable>;
            })}</View>)}
          </View>
        </ScrollView>}
        <Text style={s.hint}>{ready ? `${count} check-in${count === 1 ? '' : 's'} this ${mode === 'month' ? 'month' : 'year'} · Tap a day for details` : 'Loading your check-ins…'}</Text>
      </View>
      <View style={s.details} accessibilityLiveRegion="polite">
        <Text style={s.detailDate}>{selectedDate.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        {current ? <View style={s.detailMood}><MoodFace value={current.value} size={44}/><View style={{ flex: 1 }}><Text style={s.detailLabel}>{moodLabels[current.value]}</Text><Text style={s.note}>{current.timezone || 'Recorded in an earlier preview'}</Text></View></View> : <Text style={s.note}>No mood recorded for this day.</Text>}
        {selected === today && <Pressable accessibilityRole="button" onPress={() => router.push('/(tabs)')} style={s.checkin}><Text style={s.link}>{current ? 'Update today’s check-in' : 'Check in for today'} →</Text></Pressable>}
      </View>
      <View style={s.legend}>{moodLabels.map((label, value) => <View key={label} style={s.legendItem}><MoodFace value={value} size={23}/><Text style={s.legendText}>{label}</Text></View>)}</View>
      <Text style={s.hint}>{notice || status}. Empty days stay empty—only your saved check-ins appear here.</Text>
    </ScrollView>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.background }, page: { padding: 20, gap: 20, paddingBottom: 110 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, title: { color: c.ink, fontSize: 22, fontFamily: 'sans-bold' }, todayButton: { paddingVertical: 12, paddingLeft: 10 }, link: { color: c.action, fontFamily: 'sans-semibold', fontSize: 13 },
  switcher: { flexDirection: 'row', padding: 4, borderRadius: 12, backgroundColor: c.surface }, switch: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 9 }, activeSwitch: { backgroundColor: c.action }, switchText: { fontFamily: 'sans-semibold', fontSize: 13, color: c.ink },
  paper: { borderRadius: 18, backgroundColor: c.white, padding: 10, borderWidth: 1, borderColor: c.line }, navigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: c.line, paddingBottom: 6 }, arrow: { padding: 12 }, month: { fontFamily: 'sans-bold', fontSize: 16, color: c.ink },
  weekdays: { flexDirection: 'row', paddingVertical: 14 }, weekday: { width: '14.285714%', textAlign: 'center', fontSize: 10, fontFamily: 'sans-medium', color: c.muted }, grid: { flexDirection: 'row', flexWrap: 'wrap' }, day: { width: '14.285714%', height: 57, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: 'transparent', gap: 2 }, selectedDay: { backgroundColor: c.surface, borderColor: c.accent }, emptyFace: { width: 31, height: 31, alignItems: 'center', justifyContent: 'center' }, dayNumber: { fontSize: 10, color: c.muted, fontFamily: 'sans-medium' }, todayNumber: { color: c.action, fontFamily: 'sans-bold', textDecorationLine: 'underline' },
  pixelRow: { flexDirection: 'row', alignItems: 'center', height: 22 }, pixelDayLabel: { width: 20, fontSize: 9, textAlign: 'center', color: c.muted }, pixelMonth: { flex: 1, fontSize: 8, textAlign: 'center', color: c.muted }, pixelSlot: { flex: 1, height: 22, alignItems: 'center', justifyContent: 'center' }, pixel: { width: 16, height: 16, borderRadius: 3 },
  hint: { color: c.muted, fontSize: 11, lineHeight: 18, textAlign: 'center', paddingTop: 12 }, details: { gap: 12, padding: 18, borderRadius: 16, backgroundColor: c.surface }, detailDate: { fontFamily: 'sans-semibold', color: c.ink, fontSize: 14 }, detailMood: { flexDirection: 'row', gap: 14, alignItems: 'center' }, detailLabel: { fontFamily: 'sans-bold', color: c.ink, fontSize: 20 }, note: { fontFamily: 'sans-regular', color: c.muted, fontSize: 12, lineHeight: 20 }, checkin: { paddingVertical: 10 }, legend: { flexDirection: 'row', justifyContent: 'space-between' }, legendItem: { gap: 5, alignItems: 'center' }, legendText: { color: c.muted, fontSize: 10 },
});
