import { AppIcon } from '@/components/AppIcon';
import React, { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthState } from '@/components/AuthState';
import { useWellbeing } from '@/components/WellbeingState';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/DesignSystem';
import { Screen, ui } from '@/components/Screen';
import { palette as c } from '@/lib/theme';

export default function Settings() {
  const { demo, setDemo, session } = useAuthState();
  const { profile, preferences, updatePreferences, ready, status, notice, importDemo, retry } = useWellbeing(), router = useRouter();
  const [confirm, setConfirm] = useState(false), [message, setMessage] = useState(''), [section, setSection] = useState('');
  const rows = [
    { title: 'Edit profile', icon: 'account', action: () => router.push('/account-setup') },
    { title: 'Appearance', icon: 'appearance', action: () => setSection(section === 'appearance' ? '' : 'appearance') },
    { title: 'Privacy & data', icon: 'privacy', action: () => setSection(section === 'privacy' ? '' : 'privacy') },
    { title: 'Help', icon: 'help', action: () => setSection(section === 'help' ? '' : 'help') },
  ] as const;
  return <Screen><Text style={ui.title}>Account</Text>
    <View style={[ui.panel, { flexDirection: 'row', gap: 15, alignItems: 'center', backgroundColor: c.surface }]}><View style={{ width: 58, height: 58, borderRadius: 18, backgroundColor: c.paper, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: c.action, fontFamily: 'sans-bold', fontSize: 25 }}>{(profile.name || 'Y').slice(0, 1).toUpperCase()}</Text></View><View style={{ flex: 1 }}><Text style={ui.section}>{profile.name || 'Your space'}</Text><Text style={ui.caption}>{demo ? 'Demo · Saved on this device' : session?.user.email}</Text></View></View>
    <View style={{ borderWidth: 1, borderColor: c.line, borderRadius: 16, backgroundColor: c.paper, overflow: 'hidden' }}>{rows.map((row, i) => <Pressable key={row.title} accessibilityRole="button" onPress={row.action} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, minHeight: 54, borderTopWidth: i ? 1 : 0, borderColor: c.line }}><AppIcon name={row.icon} size={22} color={c.ink}/><Text style={[ui.body, { flex: 1, color: c.ink }]}>{row.title}</Text><AppIcon name="caretRight" size={17} color={c.muted}/></Pressable>)}</View>
    {section === 'appearance' && <View style={ui.panel}><Text style={ui.section}>Appearance</Text><Text style={ui.body}>Off-white, pale lavender, and violet accents. Animations follow your device’s reduced-motion setting.</Text><Text style={ui.caption}>More appearance choices aren’t available yet.</Text></View>}
    {section === 'privacy' && <View style={ui.panel}><Text style={ui.section}>Your writing stays yours.</Text><Text style={ui.body}>Demo records stay in this browser or device. Account records use a separate cache. Demo entries are only imported when you explicitly choose to import them.</Text><Text style={ui.body}>Local application storage is not encrypted. AI chat is not connected and no entries are sent to an AI service.</Text></View>}
    {section === 'help' && <View style={ui.panel}><Text style={ui.section}>Find your way around</Text><Text style={ui.body}>Swipe or drag the activity cards on Home. Journal and daily tasks open from Activities. Calendar shows your saved moods; Insights looks back on your week.</Text><Button title="Replay introduction" onPress={() => router.push('/onboarding')}/><Text style={ui.caption}>Notifications and AI conversations are not available in this build.</Text></View>}
    <View style={[ui.panel, { backgroundColor: c.surface }]}><Text style={[ui.section, { color: c.action }]}>Daily Inspiration</Text>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><AppIcon name="journal" size={23} color={c.ink}/><View style={{ flex: 1 }}><Text style={[ui.body, { color: c.ink }]}>Bible verses</Text><Text style={ui.caption}>Optional · Off by default</Text></View><Switch accessibilityLabel="Include Bible verses" disabled={!ready} value={preferences.bibleVerses} onValueChange={bibleVerses => updatePreferences({ bibleVerses })} trackColor={{ false: c.line, true: c.action }}/></View>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', paddingTop: 10 }}><AppIcon name="privacy" size={23} color={c.ink}/><View style={{ flex: 1 }}><Text style={[ui.body, { fontFamily: 'sans-semibold', color: c.ink }]}>Journal entries stay private.</Text><Text style={ui.caption}>No automatic sharing with AI.</Text></View></View>
    </View>
    <Text accessibilityLiveRegion="polite" style={ui.caption}>{notice || status}</Text>
    {!!notice && <Button title="Retry saving" onPress={retry}/>}
    {demo ? <Button title="Sign in or create account" onPress={() => { setDemo(false); router.push('/(auth)/sign-in'); }}/> : <>
      <Button title="Import demo records…" onPress={() => setConfirm(true)}/>
      {confirm && <View style={ui.panel}><Text style={ui.body}>Upload this device’s demo journal entries, moods, and tasks into this signed-in account? Existing records with the same ID are kept. The demo copy is preserved.</Text><Button title="Import into my account" onPress={async () => { await importDemo(); setConfirm(false); setMessage('Import queued. Check save status above.'); }}/><Pressable accessibilityRole="button" onPress={() => setConfirm(false)} style={{ padding: 12 }}><Text style={ui.link}>Cancel</Text></Pressable></View>}
      <Button title="Sign out" onPress={async () => { const result = await supabase?.auth.signOut(); if (result?.error) { setMessage(result.error.message); return; } router.replace('/(auth)/sign-in'); }}/>
    </>}
    {!!message && <Text accessibilityLiveRegion="polite" style={ui.caption}>{message}</Text>}
  </Screen>;
}
