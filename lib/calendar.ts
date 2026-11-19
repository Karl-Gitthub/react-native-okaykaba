export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// Local noon avoids DST transitions at midnight when navigating calendar days.
export function monthDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1, 12);
  const offset = (first.getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i, 12));
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0, 12).getDate();
}

export function moveMonth(date: Date, offset: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1, 12);
}

export const moodColors = ['#E1CBFA', '#E7D5FA', '#E4D8FC', '#CBB0F3', '#8A4FF2'];
export const moodLabels = ['Low', 'Meh', 'Okay', 'Good', 'Great'];
