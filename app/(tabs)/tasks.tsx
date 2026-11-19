import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View, Keyboard } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '@/components/AppIcon';
import { useWellbeing, localDate, newId, Task } from '@/components/WellbeingState';
import { Ring, useReducedMotion } from '@/components/DesignSystem';
import { palette as c } from '@/lib/theme';
import { BackHeader, ui } from '@/components/Screen';
export default function Tasks() {
    const { tasks, updateTask, ready, status, notice } = useWellbeing(), reduced = useReducedMotion();
    const [title, setTitle] = useState(''), [editing, setEditing] = useState<string | null>(null), [editText, setEditText] = useState(''), [undo, setUndo] = useState<Task | null>(null), [keyboard, setKeyboard] = useState(false);
    React.useEffect(() => { const a = Keyboard.addListener('keyboardDidShow', () => setKeyboard(true)), b = Keyboard.addListener('keyboardDidHide', () => setKeyboard(false)); return () => { a.remove(); b.remove(); }; }, []);
    const today = tasks.filter(t => !t.deleted && t.date === localDate()).sort((a, b) => a.order - b.order), done = today.filter(t => t.completedAt), pending = today.filter(t => !t.completedAt);
    const change = (t: Task, p: Partial<Task>) => updateTask({ ...t, ...p, updatedAt: new Date().toISOString() });
    const row = (t: Task) => <Animated.View key={t.id} layout={reduced ? undefined : LinearTransition.duration(320)} style={{ paddingVertical: 8, paddingHorizontal: 4, marginTop: 8, borderRadius: 14, backgroundColor: t.completedAt ? c.surface : c.paper, borderWidth: 1, borderColor: c.line, flexDirection: 'row', alignItems: 'center', gap: 12 }}><Pressable accessibilityRole="checkbox" aria-checked={!!t.completedAt} accessibilityState={{ checked: !!t.completedAt }} accessibilityLabel={`${t.completedAt ? 'Reopen' : 'Complete'} ${t.title}`} onPress={() => change(t, { completedAt: t.completedAt ? null : new Date().toISOString() })} style={{ padding: 8 }}><AppIcon name={t.completedAt ? 'tasks' : 'square'} weight={t.completedAt ? 'fill' : 'regular'} size={25} color={c.action}/></Pressable>{editing === t.id ? <TextInput maxLength={500} autoFocus accessibilityLabel="Edit task" value={editText} onChangeText={setEditText} onSubmitEditing={() => { if (editText.trim()) {
        change(t, { title: editText.trim() });
        setEditing(null);
    } }} style={{ flex: 1, color: c.ink, fontSize: 16 }}/> : <Text style={{ flex: 1, color: c.ink, fontFamily: 'sans-medium', fontSize: 14, textDecorationLine: t.completedAt ? 'line-through' : 'none' }}>{t.title}</Text>}<Pressable accessibilityRole="button" accessibilityLabel={editing === t.id ? 'Save task edit' : `Edit ${t.title}`} onPress={() => { if (editing === t.id) {
        if (editText.trim()) {
            change(t, { title: editText.trim() });
            setEditing(null);
        }
    }
    else {
        setEditing(t.id);
        setEditText(t.title);
    } }} style={{ padding: 8 }}><AppIcon name={editing === t.id ? 'check' : 'edit'} size={18} color={c.muted}/></Pressable><Pressable accessibilityRole="button" accessibilityLabel={`Delete ${t.title}`} onPress={() => { setUndo(t); change(t, { deleted: true }); }} style={{ padding: 8 }}><AppIcon name="delete" size={18} color={c.muted}/></Pressable></Animated.View>;
    return <SafeAreaView style={{ flex: 1, backgroundColor: c.background }}><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'web' ? undefined : 'height'} keyboardVerticalOffset={30}><View style={{ paddingHorizontal: 22, paddingTop: 8 }}><BackHeader title="Daily tasks"/></View><View style={{ padding: 16, marginHorizontal: 20, marginTop: 12, gap: 12, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.surface }}><View style={{ flex: 1 }}><Text style={ui.section}>Today’s to-do</Text><Text style={ui.caption}>{done.length} of {today.length} complete</Text></View><Ring value={today.length ? done.length / today.length : 0}/></View><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 22, paddingBottom: 20 }}><View>{[<Text key="pending" style={{ fontFamily: 'sans-bold', fontSize: 20, color: c.ink }}>To do · {pending.length}</Text>, ...(!pending.length ? [<Text key="empty" style={{ padding: 20, color: c.muted }}>{today.length ? 'All done. Take a moment to enjoy that.' : 'Add one small thing to start your day.'}</Text>] : pending.map(row)), <Animated.Text key="done" layout={reduced ? undefined : LinearTransition.duration(320)} style={{ fontFamily: 'sans-bold', fontSize: 20, color: c.ink, marginTop: 28 }}>Done · {done.length}</Animated.Text>, ...done.map(row)]}</View></ScrollView><View style={{ padding: 16, paddingBottom: keyboard ? 16 : 94, backgroundColor: c.background, borderTopWidth: 1, borderColor: c.line }}>{undo && <Pressable accessibilityRole="button" onPress={() => { change(undo, { deleted: false }); setUndo(null); }}><Text style={{ color: c.action, padding: 10 }}>Task removed · Undo</Text></Pressable>}<View style={{ flexDirection: 'row', gap: 10, backgroundColor: c.paper, borderWidth: 1, borderColor: c.line, borderRadius: 22, padding: 8, alignItems: 'center' }}><TextInput maxLength={500} accessibilityLabel="New task" placeholder="Add a small step…" value={title} onChangeText={setTitle} style={{ flex: 1, fontSize: 16, padding: 8, color: c.ink, fontFamily: 'sans-regular' }} onSubmitEditing={() => { if (title.trim() && ready) {
        updateTask({ id: newId(), title: title.trim(), date: localDate(), completedAt: null, deleted: false, order: Date.now(), updatedAt: new Date().toISOString() });
        setTitle('');
    } }}/><Pressable accessibilityRole="button" accessibilityLabel="Add task" disabled={!ready || !title.trim()} onPress={() => { updateTask({ id: newId(), title: title.trim(), date: localDate(), completedAt: null, deleted: false, order: Date.now(), updatedAt: new Date().toISOString() }); setTitle(''); }} style={{ padding: 10, backgroundColor: c.action, borderRadius: 12, opacity: title.trim() ? 1 : .4 }}><AppIcon name="add" color="white" size={23}/></Pressable></View><Text accessibilityLiveRegion="polite" style={{ fontSize: 11, color: c.muted, paddingTop: 6 }}>{notice || status}</Text></View></KeyboardAvoidingView></SafeAreaView>;
}
