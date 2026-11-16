import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
// Chunk native session tokens to stay below SecureStore's per-item limits.
const secureStorage = {
    async getItem(name: string) { const n = Number(await SecureStore.getItemAsync(name)); if (!n)
        return null; const parts = await Promise.all(Array.from({ length: n }, (_, i) => SecureStore.getItemAsync(`${name}.${i}`))); return parts.every(p => p !== null) ? parts.join('') : null; },
    async setItem(name: string, value: string) { const n = Math.ceil(value.length / 1500); for (let i = 0; i < n; i++)
        await SecureStore.setItemAsync(`${name}.${i}`, value.slice(i * 1500, (i + 1) * 1500)); await SecureStore.setItemAsync(name, String(n)); },
    async removeItem(name: string) { const n = Number(await SecureStore.getItemAsync(name)); await SecureStore.deleteItemAsync(name); for (let i = 0; i < n; i++)
        await SecureStore.deleteItemAsync(`${name}.${i}`); },
};
export const supabase = url && key ? createClient(url, key, { auth: { storage: Platform.OS === 'web' ? AsyncStorage : secureStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: Platform.OS === 'web' } }) : null;
