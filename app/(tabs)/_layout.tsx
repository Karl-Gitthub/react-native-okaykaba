import { Tabs, Redirect } from 'expo-router';
import { useAuthState } from '@/components/AuthState';
import { useWellbeing } from '@/components/WellbeingState';
import FloatingTabs from '@/components/FloatingTabs';
import { palette } from '@/lib/theme';

export default function Layout() {
  const { ready: authReady, demo, session, recovery } = useAuthState();
  const { ready, profile } = useWellbeing();
  if (!authReady || !ready) return null;
  if (recovery) return <Redirect href="/reset-password"/>;
  if (!demo && !session) return <Redirect href="/(auth)/sign-in"/>;
  if (!profile.onboarded) return <Redirect href="/onboarding"/>;
  if (!profile.setup) return <Redirect href="/account-setup"/>;
  return <Tabs tabBar={props => <FloatingTabs {...props}/>} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: palette.background } }}>
    <Tabs.Screen name="index" options={{ title: 'Home' }}/>
    <Tabs.Screen name="trends" options={{ title: 'Insights' }}/>
    <Tabs.Screen name="subscriptions" options={{ title: 'Calendar' }}/>
    <Tabs.Screen name="settings" options={{ title: 'Account' }}/>
    <Tabs.Screen name="tasks" options={{ href: null, title: 'Daily tasks' }}/>
    <Tabs.Screen name="insights" options={{ href: null, title: 'Journal' }}/>
    <Tabs.Screen name="inspiration" options={{ href: null, title: 'Daily Inspiration' }}/>
    <Tabs.Screen name="talk" options={{ href: null, title: 'Talk it through' }}/>
    <Tabs.Screen name="self-care" options={{ href: null, title: 'Self-care' }}/>
  </Tabs>;
}
