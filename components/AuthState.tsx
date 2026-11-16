import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import * as Linking from 'expo-linking';
import { isBrowserPreview } from '@/constants/preview';
import { supabase } from '@/lib/supabase';
const Context = createContext({ session: null as Session | null, ready: false, demo: isBrowserPreview, setDemo: (_v: boolean) => { }, recovery: false, finishRecovery: () => { } });
export function AuthProvider({ children }: React.PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [ready, setReady] = useState(false);
    const [demo, setDemo] = useState(isBrowserPreview);
    const [recovery, setRecovery] = useState(false);
    useEffect(() => {
        if (!supabase) {
            setReady(true);
            return;
        }
        let live = true;
        supabase.auth.getSession().then(({ data }) => { if (live) {
            setSession(data.session);
            if (data.session)
                setDemo(false);
            setReady(true);
        } });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, next) => { setSession(next); if (next)
            setDemo(false); if (event === 'PASSWORD_RECOVERY')
            setRecovery(true); setReady(true); });
        const state = AppState.addEventListener('change', value => { if (value === 'active')
            supabase?.auth.startAutoRefresh();
        else
            supabase?.auth.stopAutoRefresh(); });
        const callback = async (url: string | null) => {
            if (!url)
                return;
            const params = new URLSearchParams(url.split(/[?#]/).slice(1).join('&'));
            if (params.get('type') === 'recovery')
                setRecovery(true);
            const code = params.get('code');
            if (code)
                await supabase?.auth.exchangeCodeForSession(code);
            const access_token = params.get('access_token'), refresh_token = params.get('refresh_token');
            if (access_token && refresh_token)
                await supabase?.auth.setSession({ access_token, refresh_token });
        };
        Linking.getInitialURL().then(callback);
        const links = Linking.addEventListener('url', ({ url }) => { void callback(url); });
        return () => { live = false; subscription.unsubscribe(); state.remove(); links.remove(); };
    }, []);
    return <Context.Provider value={{ session, ready, demo, setDemo, recovery, finishRecovery: () => setRecovery(false) }}>{children}</Context.Provider>;
}
export const useAuthState = () => useContext(Context);
