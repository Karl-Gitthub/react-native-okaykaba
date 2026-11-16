import { Tabs, Redirect } from 'expo-router';
import { useAuthState } from '@/components/AuthState';
import { useWellbeing } from '@/components/WellbeingState';
import FloatingTabs from '@/components/FloatingTabs';
export default function Layout() { const { ready: authReady, demo, session, recovery } = useAuthState(); const { ready, profile } = useWellbeing(); if (!authReady || !ready)
    return null; if (recovery)
    return <Redirect href="/reset-password"/>; if (!demo && !session)
    return <Redirect href="/(auth)/sign-in"/>; if (!profile.onboarded)
    return <Redirect href="/onboarding"/>; if (!profile.setup)
    return <Redirect href="/account-setup"/>; return <Tabs tabBar={props => <FloatingTabs {...props}/>} screenOptions={{ headerShown: false }}><Tabs.Screen name="index" options={{ title: 'Home' }}/><Tabs.Screen name="tasks" options={{ title: 'To-do' }}/><Tabs.Screen name="insights" options={{ title: 'Journal' }}/><Tabs.Screen name="subscriptions" options={{ title: 'Calendar' }}/><Tabs.Screen name="settings" options={{ title: 'Settings' }}/></Tabs>; }
