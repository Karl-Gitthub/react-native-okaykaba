import { dateKey } from './calendar';

export const reflections = [
  { id: 'small-step', text: 'One small step is enough for today.', source: 'OkayKaba reflection', prompt: 'What would make today a little easier?', kind: 'quote' },
  { id: 'own-pace', text: 'You can move at your own pace and still move forward.', source: 'OkayKaba reflection', prompt: 'What does a comfortable pace look like today?', kind: 'quote' },
  { id: 'begin-again', text: 'There is room to begin again, right where you are.', source: 'OkayKaba reflection', prompt: 'What would you like to give another try?', kind: 'quote' },
  { id: 'rest', text: 'A moment of rest belongs in your day, too.', source: 'OkayKaba reflection', prompt: 'Where could you make a little room for rest?', kind: 'quote' },
  { id: 'enough', text: 'You do not have to finish everything to have done something worthwhile.', source: 'OkayKaba reflection', prompt: 'What small thing are you glad you did?', kind: 'quote' },
] as const;

export const verses = [
  { id: 'psalm-46-10', text: 'Be still, and know that I am God.', source: 'Psalm 46:10 · KJV (excerpt)', prompt: 'What would a quiet moment look like for you?', kind: 'verse' },
  { id: 'psalm-23-1', text: 'The LORD is my shepherd; I shall not want.', source: 'Psalm 23:1 · KJV', prompt: 'What helps you feel supported today?', kind: 'verse' },
] as const;

export function dailyReflections(includeVerses: boolean, date = new Date()) {
  const source = includeVerses ? [...reflections, ...verses] : [...reflections];
  // A local calendar day, rather than UTC or render time, determines the first card.
  const day = dateKey(date).split('-').join('');
  const start = Number(day) % source.length;
  return [...source.slice(start), ...source.slice(0, start)];
}

export const allReflections = [...reflections, ...verses];
