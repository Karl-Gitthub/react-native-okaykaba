import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useWellbeing } from '@/components/WellbeingState';
import { useAuthState } from '@/components/AuthState';
import { Button, Ring } from '@/components/DesignSystem';
import { ui } from '@/components/Screen';
import { AppIcon } from '@/components/AppIcon';
import { palette as c } from '@/lib/theme';
export default function Setup() { const { profile, updateProfile, ready } = useWellbeing(), { demo, session } = useAuthState(), router = useRouter(); const [step, setStep] = useState(0), [name, setName] = useState(profile.name), [age, setAge] = useState(profile.age?.toString() || ''), [gender, setGender] = useState(profile.gender || ''), [error, setError] = useState(''); const next = () => { if (step === 0 && !name.trim()) {
    setError('What would you like us to call you?');
    return;
} if (step === 2 && age && (!/^\d+$/.test(age) || Number(age) < 1 || Number(age) > 120)) {
    setError('Enter an age from 1 to 120, or leave it blank.');
    return;
} updateProfile(step === 0 ? { name: name.trim() } : step === 1 ? { gender: gender || null } : { age: age ? Number(age) : null, setup: true, onboarded: true }); setError(''); if (step < 2)
    setStep(step + 1);
else
    router.replace(demo || session ? '/(tabs)' : '/(auth)/sign-up'); }; return <SafeAreaView style={{ flex: 1, backgroundColor: c.background, padding: 28, gap: 22 }}><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => step ? setStep(step - 1) : router.replace('/onboarding')} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44 }}><AppIcon name="arrowLeft" size={20} color={c.action}/><Text style={ui.link}>Back</Text></Pressable><View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><Text style={{ fontFamily: 'sans-semibold', color: c.muted }}>YOUR SPACE · {step + 1} / 3</Text><Ring value={step / 3} size={65}/></View><Text style={ui.title}>{['What should we call you?', 'How do you describe yourself?', 'How old are you?'][step]}</Text><Text style={ui.body}>{step === 0 ? 'A first name or nickname is enough.' : 'Optional. You can skip this or change it later.'}</Text>{step === 0 ? <TextInput maxLength={100} accessibilityLabel="Preferred name" value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={c.muted} style={ui.input}/> : step === 1 ? <View style={{ gap: 12 }}>{['Woman', 'Man', 'Non-binary', 'Prefer not to say'].map(v => <Pressable key={v} onPress={() => setGender(v)} accessibilityRole="radio" accessibilityState={{ checked: gender === v }} style={{ padding: 16, borderRadius: 13, backgroundColor: gender === v ? c.accent : c.surface }}><Text style={[ui.link, { color: gender === v ? c.white : c.ink }]}>{v}</Text></Pressable>)}</View> : <TextInput maxLength={3} accessibilityLabel="Age optional" value={age} onChangeText={setAge} placeholder="Prefer not to say" keyboardType="number-pad" placeholderTextColor={c.muted} style={ui.input}/>}<Text accessibilityLiveRegion="polite" style={{ color: c.error }}>{error}</Text><View style={{ flex: 1 }}/><Button title={step === 2 ? 'Finish setup' : 'Continue'} disabled={!ready} onPress={next}/></SafeAreaView>; }
