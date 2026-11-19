const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

function load(filename, calendar) {
  const target = path.resolve(__dirname, '../lib/', filename);
  const compiled = ts.transpileModule(fs.readFileSync(target, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const loaded = new Module(target, module);
  loaded.require = id => id === './calendar' ? calendar : require(id);
  loaded._compile(compiled, target);
  return loaded.exports;
}
const calendar = load('calendar.ts');
const { dailyReflections, reflections, verses } = load('inspiration.ts', calendar);

test('verses are excluded unless explicitly enabled', () => {
  assert(dailyReflections(false).every(item => item.kind === 'quote'));
  assert.equal(dailyReflections(true).filter(item => item.kind === 'verse').length, verses.length);
});
test('daily order depends on local day, not time within that day', () => {
  const early = new Date(2026, 10, 17, 0, 1), late = new Date(2026, 10, 17, 23, 59);
  assert.deepEqual(dailyReflections(false, early), dailyReflections(false, late));
  assert.notEqual(dailyReflections(false, late)[0].id, dailyReflections(false, new Date(2026, 10, 18, 0, 1))[0].id);
});
test('rotating the catalogue keeps every eligible item exactly once', () => {
  const cards = dailyReflections(true, new Date(2026, 0, 1));
  const ids = cards.map(item => item.id);
  assert.equal(new Set(ids).size, reflections.length + verses.length);
  assert.deepEqual([...ids].sort(), [...reflections, ...verses].map(item => item.id).sort());
});
