import { useRouter } from 'expo-router';
import { AppIcon } from '@/components/AppIcon';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen, ui } from '@/components/Screen';
import { MoodFace } from '@/components/DesignSystem';
import { useWellbeing, localDate } from '@/components/WellbeingState';
import { dateKey, moodLabels } from '@/lib/calendar';
import { palette as c } from '@/lib/theme';

export default function Insights() {
  const { moods, entries, tasks } = useWellbeing(), router = useRouter();
  const today = new Date(), lastWeek = Array.from({ length: 7 }, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6 + i, 12));
  const week = lastWeek.map(day => ({ day, record: moods.find(m => m.date === dateKey(day)) }));
  const count = week.filter(item => item.record).length;
  const visibleTasks = tasks.filter(t => !t.deleted && t.date === localDate());
  const activity = [
    { label: 'Journal entries', detail: entries.length + ' saved', icon: 'journal', route: '/(tabs)/insights' },
    { label: 'Daily tasks', detail: visibleTasks.filter(task => task.completedAt).length + ' of ' + visibleTasks.length + ' complete today', icon: 'tasks', route: '/(tabs)/tasks' },
  ] as const;
  return <Screen>
    <View style={s.intro}>
      <Text accessibilityRole="header" style={ui.title}>Insights</Text>
      <Text style={ui.body}>Look back at your check-ins and daily activity.</Text>
    </View>
    <View style={[ui.panel, s.weekPanel]}>
      <Text accessibilityRole="header" style={ui.section}>Your mood · Last 7 days</Text>
      <Text style={ui.caption}>{count} of 7 days with a check-in</Text>
      <View style={s.week}>
        {week.map(({ day, record }) => <View key={dateKey(day)} accessible
          accessibilityLabel={day.toLocaleDateString() + ': ' + (record ? moodLabels[record.value] : 'No check-in')}
          style={s.day}>
          {record ? <MoodFace value={record.value} size={26}/> : <View style={s.emptyMood}/>}
          <Text style={s.weekday}>{day.toLocaleDateString(undefined, { weekday: 'short' })}</Text>
          <Text style={s.weekday}>{day.getDate()}</Text>
        </View>)}
      </View>
      {!count && <Text style={ui.body}>Your first check-in will appear here.</Text>}
      <Pressable accessibilityRole="button" style={s.calendarLink} onPress={() => router.push('/(tabs)/subscriptions')}>
        <Text style={[ui.link, { flexShrink: 1 }]}>Open mood calendar</Text>
        <AppIcon name="arrowRight" size={17} color={c.action}/>
      </Pressable>
    </View>
    <Text accessibilityRole="header" style={ui.section}>Your activity</Text>
    <View style={s.activityList}>
      {activity.map(item => <Pressable key={item.label} accessibilityRole="button"
        style={s.activity} onPress={() => router.push(item.route)}>
        <AppIcon name={item.icon} size={23} color={c.action}/>
        <View style={{ flex: 1 }}>
          <Text style={ui.section}>{item.label}</Text>
          <Text style={ui.caption}>{item.detail}</Text>
        </View>
        <AppIcon name="caretRight" size={17} color={c.action}/>
      </Pressable>)}
    </View>
  </Screen>;
}

const s = StyleSheet.create({
  intro: { gap: 5 },
  weekPanel: { backgroundColor: c.surface },
  week: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', gap: 3, paddingVertical: 7 },
  day: { alignItems: 'center', minWidth: 32, gap: 3 },
  emptyMood: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: c.muted, opacity: .45 },
  weekday: { fontFamily: 'sans-medium', fontSize: 10, color: c.muted },
  calendarLink: { flexDirection: 'row', alignItems: 'center', gap: 7, minHeight: 44 },
  activityList: { gap: 9 },
  activity: { backgroundColor: c.surface, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
});
