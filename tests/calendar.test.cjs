const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../lib/calendar.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const loaded = new Module(filename, module); loaded._compile(compiled, filename);
const { dateKey, monthDays, daysInMonth, moveMonth } = loaded.exports;

test('December 2024 matches the reference Monday-first calendar', () => {
 const grid = monthDays(2024, 11);
 assert.equal(grid.length, 42);
 assert.equal(dateKey(grid[0]), '2024-11-25');
 assert.equal(dateKey(grid[6]), '2024-12-01');
 assert.equal(dateKey(grid[41]), '2025-01-05');
 assert.equal(grid.filter(d => d.getMonth() === 11).length, 31);
});
test('year view uses real leap-year lengths', () => {
 assert.equal(daysInMonth(2024, 1), 29);
 assert.equal(daysInMonth(2025, 1), 28);
 assert.equal(daysInMonth(2100, 1), 28);
});
test('navigation does not carry a late-month day into the following month', () => {
 assert.equal(dateKey(moveMonth(new Date(2024, 2, 31, 12), -1)), '2024-02-01');
 assert.equal(dateKey(moveMonth(new Date(2024, 11, 31, 12), 1)), '2025-01-01');
});
test('DST months retain 42 unique consecutive local dates', () => {
 for (const month of [2, 10]) {
  const grid = monthDays(2026, month);
  assert.equal(new Set(grid.map(dateKey)).size, 42);
  assert.equal(grid[0].getDay(), 1);
  for (let i = 1; i < grid.length; i++) {
   const expected = new Date(grid[i-1]); expected.setDate(expected.getDate()+1);
   assert.equal(dateKey(grid[i]), dateKey(expected));
  }
 }
});
