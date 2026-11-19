import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';
import { useAuthState } from './AuthState';
import { useWellbeing } from './WellbeingState';
import { ui } from './Screen';
import { Button } from './DesignSystem';
import { palette as c } from '@/lib/theme';
export default function AuthScreen({ mode }: {
    mode: 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password';
}) { const router = useRouter(), { setDemo, finishRecovery } = useAuthState(), { profile } = useWellbeing(); const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [busy, setBusy] = useState(false), [message, setMessage] = useState(''); const submit = async () => { if (!supabase) {
    setMessage('Account services are not configured yet. You can use the demo below.');
    return;
} if (mode !== 'reset-password' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    setMessage('Enter a valid email address.');
    return;
} if (mode !== 'forgot-password' && password.length < 8) {
    setMessage('Use at least 8 characters for your password.');
    return;
} setBusy(true); setMessage(''); try {
    const redirect = Linking.createURL('reset-password');
    let result;
    if (mode === 'sign-up')
        result = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { preferred_name: profile.name }, emailRedirectTo: Linking.createURL('') } });
    else if (mode === 'sign-in')
        result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    else if (mode === 'forgot-password')
        result = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirect });
    else
        result = await supabase.auth.updateUser({ password });
    if (result.error)
        throw result.error;
    if (mode === 'forgot-password')
        setMessage('If an account exists, a reset email will arrive shortly.');
    else if (mode === 'sign-up' && !('data' in result && result.data && 'session' in result.data && result.data.session))
        setMessage('Check your email to verify your account, then sign in.');
    else {
        finishRecovery();
        router.replace('/');
    }
}
catch (e) {
    setMessage(e instanceof Error ? e.message : 'Unable to complete this request. Try again.');
}
finally {
    setBusy(false);
} }; return <KeyboardAvoidingView style={{ flex: 1, backgroundColor: c.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={{ padding: 30, gap: 22, paddingTop: 65 }} keyboardShouldPersistTaps="handled"><Text style={{ fontFamily: 'sans-bold', color: c.action, fontSize: 22 }}>OkayKaba</Text><Text accessibilityRole="header" style={ui.title}>{{ 'sign-in': 'Welcome back.', 'sign-up': 'A little space for you.', 'forgot-password': 'Forgot your password?', 'reset-password': 'Choose a new password.' }[mode]}</Text><Text style={ui.body}>Keep your daily check-ins, thoughts, and small steps together.</Text><View style={[ui.panel, { backgroundColor: c.surface }]}>{mode !== 'reset-password' && <TextInput accessibilityLabel="Email" autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor={c.muted} style={ui.input}/>}{mode !== 'forgot-password' && <TextInput accessibilityLabel="Password" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} secureTextEntry placeholder="Password · 8+ characters" value={password} onChangeText={setPassword} placeholderTextColor={c.muted} style={ui.input}/>}<Text accessibilityLiveRegion="polite" style={{ color: c.muted, lineHeight: 23 }}>{message || (!supabase ? 'Demo is available. Live authentication needs Supabase setup.' : '')}</Text><Button disabled={busy} title={busy ? 'Please wait…' : { 'sign-in': 'Sign in', 'sign-up': 'Create account', 'forgot-password': 'Send reset email', 'reset-password': 'Update password' }[mode]} onPress={submit}/></View>{mode === 'sign-in' && <Pressable onPress={() => router.push('/(auth)/forgot-password')}><Text style={ui.link}>Forgot password?</Text></Pressable>}<Pressable onPress={() => router.replace(mode === 'sign-in' ? '/(auth)/sign-up' : '/(auth)/sign-in')}><Text style={ui.link}>{mode === 'sign-in' ? 'New here? Create an account' : 'Already have an account? Sign in'}</Text></Pressable><Pressable onPress={() => { setDemo(true); router.replace('/'); }}><Text style={{ color: c.muted, textAlign: 'center', padding: 16 }}>Explore the demo without an account</Text></Pressable></ScrollView></KeyboardAvoidingView>; }
