import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from './AuthState';
import { supabase } from '@/lib/supabase';
export type Task = {
    id: string;
    title: string;
    date: string;
    completedAt: string | null;
    deleted: boolean;
    order: number;
    updatedAt: string;
};
type Entry = {
    id: string;
    date: string;
    text: string;
};
type Mood = {
    date: string;
    value: number;
    timezone: string;
};
type Profile = {
    name: string;
    age: number | null;
    gender: string | null;
    onboarded: boolean;
    setup: boolean;
};
type Data = {
    entries: Entry[];
    moods: Mood[];
    tasks: Task[];
    draft: string;
    profile: Profile;
    preferences: { bibleVerses: boolean; savedReflections: string[] };
};
const empty: Data = { entries: [], moods: [], tasks: [], draft: '', profile: { name: '', age: null, gender: null, onboarded: false, setup: false }, preferences: { bibleVerses: false, savedReflections: [] } };
export const localDate = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
export const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
const Context = createContext({ ...empty, ready: false, notice: '', status: '', saveEntry: (_text: string): boolean => false, saveMood: (_value: number) => { }, setDraft: (_text: string) => { }, updateProfile: (_p: Partial<Profile>) => { }, updateTask: (_t: Task) => { }, updatePreferences: (_p: Partial<Data['preferences']>) => { }, importDemo: async () => { }, retry: () => { } });
const demoKey = 'okaykaba.wellbeing.preview.v1';
function normalize(raw: Partial<Data>): Data { return { ...empty, ...raw, entries: Array.isArray(raw.entries) ? raw.entries.filter(e => e && typeof e.text === 'string' && typeof e.id === 'string') : [], moods: Array.isArray(raw.moods) ? raw.moods.filter(m => m && m.value >= 0 && m.value <= 4) : [], tasks: Array.isArray(raw.tasks) ? raw.tasks : [], profile: { ...empty.profile, ...raw.profile }, preferences: { bibleVerses: raw.preferences?.bibleVerses === true, savedReflections: Array.isArray(raw.preferences?.savedReflections) ? raw.preferences.savedReflections.filter(id => typeof id === 'string') : [] } }; }
export function WellbeingProvider({ children }: React.PropsWithChildren) {
    const { session, demo, ready: authReady } = useAuthState();
    const user = !demo ? session?.user.id : undefined;
    const key = user ? `okaykaba.account.${user}` : demoKey;
    const [data, setData] = useState(empty), [ready, setReady] = useState(false), [notice, setNotice] = useState(''), [status, setStatus] = useState('');
    const current = useRef(data), generation = useRef(0), queue = useRef(Promise.resolve());
    async function upload(next: Data, owner: string) {
        if (!supabase)
            return;
        const rows = [
            supabase.from('profiles').upsert({ user_id: owner, preferred_name: next.profile.name, age: next.profile.age, gender: next.profile.gender, onboarding_completed: next.profile.onboarded, setup_completed: next.profile.setup }),
            supabase.from('preferences').upsert({ user_id: owner, journal_draft: next.draft, reduced_motion: 'system', bible_verses: next.preferences.bibleVerses, saved_reflections: next.preferences.savedReflections }),
            ...(next.entries.length ? [supabase.from('journal_entries').upsert(next.entries.map(e => ({ user_id: owner, id: e.id, body: e.text, created_at: e.date })), { onConflict: 'user_id,id' })] : []),
            ...(next.moods.length ? [supabase.from('mood_checkins').upsert(next.moods.map(m => ({ user_id: owner, local_date: m.date, mood: m.value, timezone: m.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone })), { onConflict: 'user_id,local_date' })] : []),
            ...(next.tasks.length ? [supabase.from('tasks').upsert(next.tasks.map(t => ({ user_id: owner, id: t.id, title: t.title, local_date: t.date, completed_at: t.completedAt, deleted: t.deleted, position: t.order, updated_at: t.updatedAt })), { onConflict: 'user_id,id' })] : []),
        ];
        const results = await Promise.all(rows);
        const failure = results.find(r => r.error);
        if (failure?.error)
            throw failure.error;
    }
    useEffect(() => {
        if (!authReady)
            return;
        const gen = ++generation.current;
        setReady(false);
        setNotice('');
        (async () => {
            let next = empty;
            let hasLocalPreferences = false;
            try {
                const raw = await AsyncStorage.getItem(key);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    hasLocalPreferences = !!parsed.preferences;
                    next = normalize(parsed);
                }
            }
            catch {
                setNotice('Local storage could not be read.');
            }
            if (user && supabase) {
                try {
                    const results = await Promise.all(['profiles', 'preferences', 'journal_entries', 'mood_checkins', 'tasks'].map(table => supabase!.from(table).select('*').eq('user_id', user)));
                    if (results.some(r => r.error))
                        throw new Error('Cloud data could not be loaded. Your local copy is available.');
                    const [p, pref, entries, moods, tasks] = results.map(r => r.data || []);
                    if (!hasLocalPreferences && pref[0]) next = { ...next, preferences: { bibleVerses: pref[0].bible_verses === true, savedReflections: Array.isArray(pref[0].saved_reflections) ? pref[0].saved_reflections : [] } };
                    const merge = <T,>(remote: T[], local: T[], id: (v: T) => string) => [...new Map([...remote, ...local].map(v => [id(v), v])).values()];
                    next = { ...next, profile: next.profile.setup ? next.profile : p[0] ? { name: p[0].preferred_name, age: p[0].age, gender: p[0].gender, onboarded: p[0].onboarding_completed, setup: p[0].setup_completed } : next.profile, draft: next.draft || pref[0]?.journal_draft || '', entries: merge(entries.map(e => ({ id: e.id, text: e.body, date: e.created_at })), next.entries, e => e.id), moods: merge(moods.map(m => ({ date: m.local_date, value: m.mood, timezone: m.timezone })), next.moods, m => m.date), tasks: merge(tasks.map(t => ({ id: t.id, title: t.title, date: t.local_date, completedAt: t.completed_at, deleted: t.deleted, order: t.position, updatedAt: t.updated_at })), next.tasks, t => t.id) };
                }
                catch (e) {
                    if (gen === generation.current)
                        setNotice(e instanceof Error ? e.message : 'Cloud loading failed.');
                }
            }
            if (gen === generation.current) {
                current.current = next;
                setData(next);
                setStatus(user ? 'Account data loaded' : 'Saved on this device');
                setReady(true);
            }
        })();
    }, [authReady, key, user]);
    function commit(next: Data) {
        if (!ready)
            return;
        current.current = next;
        setData(next);
        setStatus('Saving…');
        const gen = generation.current;
        queue.current = queue.current.catch(() => { }).then(async () => {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(next));
                if (user)
                    await upload(next, user);
                if (gen === generation.current) {
                    setStatus(user ? 'Synced to account' : 'Saved on this device');
                    setNotice('');
                }
            }
            catch {
                if (gen === generation.current) {
                    setStatus('Save needs attention');
                    setNotice('Could not finish saving. Your changes remain in this session. Retry from Settings.');
                }
            }
        });
    }
    function saveEntry(text: string) { if (!text.trim() || !ready)
        return false; commit({ ...current.current, entries: [{ id: newId(), date: new Date().toISOString(), text: text.trim() }, ...current.current.entries], draft: '' }); return true; }
    function saveMood(value: number) { if (value < 0 || value > 4)
        return; commit({ ...current.current, moods: [{ date: localDate(), value, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }, ...current.current.moods.filter(m => m.date !== localDate())] }); }
    async function importDemo() { if (!user)
        return; try {
        const raw = await AsyncStorage.getItem(demoKey);
        if (!raw)
            return;
        const old = normalize(JSON.parse(raw));
        const next = current.current;
        commit({ ...next, entries: [...next.entries, ...old.entries.filter(e => !next.entries.some(v => v.id === e.id))], moods: [...next.moods, ...old.moods.filter(m => !next.moods.some(v => v.date === m.date))], tasks: [...next.tasks, ...old.tasks.filter(t => !next.tasks.some(v => v.id === t.id))] });
    }
    catch {
        setNotice('Demo data could not be imported.');
    } }
    return <Context.Provider value={{ ...data, ready, notice, status, saveEntry, saveMood, setDraft: text => commit({ ...current.current, draft: text }), updateProfile: p => commit({ ...current.current, profile: { ...current.current.profile, ...p } }), updateTask: t => commit({ ...current.current, tasks: [...current.current.tasks.filter(v => v.id !== t.id), t] }), updatePreferences: p => commit({ ...current.current, preferences: { ...current.current.preferences, ...p } }), importDemo, retry: () => commit(current.current) }}>{children}</Context.Provider>;
}
export const useWellbeing = () => useContext(Context);
