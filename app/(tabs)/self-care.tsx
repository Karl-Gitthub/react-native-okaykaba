import { AppIcon } from '@/components/AppIcon';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BackHeader, Screen, ui } from '@/components/Screen';
import { useWellbeing } from '@/components/WellbeingState';
import { palette as c } from '@/lib/theme';

const ideas = [
  { title: 'Notice your surroundings', body: 'Take a moment to look around. Find a color, a texture, and a sound you notice.', icon: 'leaf' },
  { title: 'Make space for a pause', body: 'If it feels comfortable, rest your hands, relax your shoulders, and take a breath at your own pace.', icon: 'pause' },
  { title: 'A small thing you need', body: 'Ask yourself: what is one small thing that would make this moment easier?', icon: 'selfCare' },
] as const;
export default function SelfCare() {
  const { draft, setDraft, ready } = useWellbeing(), router = useRouter();
  return <Screen><BackHeader title="Self-care"/><Text accessibilityRole="header" style={ui.title}>A moment for you</Text><Text style={ui.body}>Simple invitations. Choose what feels comfortable and leave the rest.</Text>
    {ideas.map(idea => <View key={idea.title} style={[ui.panel, { backgroundColor: c.surface }]}><AppIcon name={idea.icon} size={25} color={c.action}/><Text style={ui.section}>{idea.title}</Text><Text style={ui.body}>{idea.body}</Text>
      <Pressable accessibilityRole="button" disabled={!ready} style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 7 }} onPress={() => { setDraft((draft.trim() ? draft + '\n\n' : '') + idea.title + '\n'); router.push('/(tabs)/insights'); }}><Text style={[ui.link, { flexShrink: 1 }]}>Reflect in my journal</Text><AppIcon name="arrowRight" size={17} color={c.action}/></Pressable>
    </View>)}
  </Screen>;
}
