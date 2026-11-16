import { Redirect } from 'expo-router';
import { useAuthState } from '@/components/AuthState';
import { useWellbeing } from '@/components/WellbeingState';
export default function Index() { const { ready: authReady, demo, session, recovery } = useAuthState(); const { ready, profile } = useWellbeing(); if (!authReady || !ready)
    return null; if (recovery)
    return <Redirect href="/reset-password"/>; if (!profile.onboarded)
    return <Redirect href="/onboarding"/>; if (!demo && !session)
    return <Redirect href="/(auth)/sign-in"/>; if (!profile.setup)
    return <Redirect href="/account-setup"/>; return <Redirect href="/(tabs)"/>; }
