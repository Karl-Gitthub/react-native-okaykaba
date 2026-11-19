import { AppIcon } from '@/components/AppIcon';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChromeButton, ui } from '@/components/Screen';
import { GlassSurface } from '@/components/GlassSurface';
import { Button, useReducedMotion } from '@/components/DesignSystem';
import { palette as c } from '@/lib/theme';

const starters = [
  { label: 'Just listen', text: 'I mostly need someone to listen.' },
  { label: 'One small step', text: 'I want to find one small thing to focus on.' },
  { label: 'Help me reflect', text: 'I would like to reflect on how I am feeling.' },
];
export default function Talk() {
  const router = useRouter(), insets = useSafeAreaInsets(), reduced = useReducedMotion();
  const [draft, setDraft] = useState(''), [support, setSupport] = useState(false);
  return <SafeAreaView style={ui.screen} edges={['top', 'left', 'right']}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={insets.top}>
      <View style={s.header}>
        <ChromeButton label="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}><AppIcon name="arrowLeft" size={23} color={c.ink}/></ChromeButton>
        <View style={s.titleRow}><Text style={[ui.title, { flexShrink: 1, fontSize: 27 }]}>Talk it through</Text><Pressable accessibilityRole="button" onPress={() => setSupport(true)} style={{ minHeight: 44, justifyContent: 'center' }}><Text style={[ui.link, { fontSize: 11 }]}>Support resources</Text></Pressable></View>
        <Text style={ui.caption}>AI support · Not therapy</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.conversation}>
        <View style={[ui.panel, s.connection]}>
          <AppIcon name="chat" size={22} color={c.action}/>
          <Text style={ui.section}>AI isn’t connected yet</Text>
          <Text style={ui.body}>You can draft a thought here. Nothing is sent in this build.</Text>
        </View>
        <View style={s.starters}>{starters.map(starter => <Pressable key={starter.label} accessibilityRole="button" accessibilityLabel={'Add draft starter: ' + starter.label} onPress={() => setDraft(previous => (previous.trim() ? previous + '\n' : '') + starter.text)} style={s.chip}><Text style={{ fontFamily: 'sans-medium', color: c.ink, fontSize: 11 }}>{starter.label}</Text></Pressable>)}</View>
      </ScrollView>
      <View style={[s.footer, { paddingBottom: Math.max(12, insets.bottom) }]}>
        <GlassSurface radius={24} style={s.composer}><TextInput accessibilityLabel="Conversation draft · not sent" multiline maxLength={5000} value={draft} onChangeText={setDraft} placeholder="What’s on your mind?" placeholderTextColor={c.muted} style={s.input}/>
          <Pressable accessibilityRole="button" accessibilityLabel="Send unavailable · AI is not connected" disabled style={s.send}><AppIcon name="send" size={19} color={c.white}/></Pressable>
        </GlassSurface><Text style={[ui.caption, { paddingLeft: 12, fontSize: 11 }]}>Draft only · Stays on this screen · Nothing is sent.</Text>
      </View>
    </KeyboardAvoidingView>
    <Modal visible={support} transparent animationType={reduced ? 'none' : 'fade'} onRequestClose={() => setSupport(false)}>
      <View style={s.backdrop}><Pressable accessibilityRole="button" accessibilityLabel="Close support resources" style={StyleSheet.absoluteFill} onPress={() => setSupport(false)}/>
        <GlassSurface strong style={s.support} accessibilityViewIsModal><Text style={ui.section}>Support beyond the app</Text><Text style={ui.body}>You can reach out to someone you trust or a qualified professional. If you are in immediate danger, contact local emergency services.</Text><Button title="Done" onPress={() => setSupport(false)}/></GlassSurface>
      </View>
    </Modal>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingTop: 8, gap: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', columnGap: 10 },
  conversation: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 24, gap: 18 },
  connection: { backgroundColor: c.surface },
  starters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 40, borderWidth: 1, borderColor: c.line, borderRadius: 12, backgroundColor: c.paper, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingHorizontal: 20, paddingTop: 12, gap: 6 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 8, paddingLeft: 16 },
  input: { flex: 1, minHeight: 36, maxHeight: 120, paddingVertical: 8, fontFamily: 'sans-regular', fontSize: 14, color: c.ink, textAlignVertical: 'center' },
  send: { width: 36, height: 36, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: c.action, opacity: .4 },
  backdrop: { flex: 1, backgroundColor: 'rgba(23,20,30,0.24)', padding: 26, justifyContent: 'center' },
  support: { padding: 24, gap: 18 },
});
