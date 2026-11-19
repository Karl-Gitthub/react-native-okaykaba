const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../lib/motion.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const loaded = new Module(filename, module); loaded._compile(compiled, filename);
const { releaseVelocity, resistedOffset, snapIndex } = loaded.exports;

test('a slow drag settles to the nearest real page', () => {
  assert.equal(snapIndex(-90, 0, 300, 600, 3), 0);
  assert.equal(snapIndex(-170, 0, 300, 600, 3), 1);
});
test('a quick flick projects forward and reversal selects from the visible position', () => {
  assert.equal(snapIndex(-40, -1.1, 300, 600, 3), 1);
  assert.equal(snapIndex(-270, 1.2, 300, 600, 3), 0);
  assert.equal(snapIndex(-340, -1.1, 300, 600, 3), 2);
});
test('a short fast flick does not skip two onboarding pages', () => {
  assert.equal(snapIndex(-45, -3, 300, 600, 3), 1);
});
test('resting points remain inside bounds for overscroll, a partial last card, and empty data', () => {
  assert.equal(snapIndex(100, 3, 300, 600, 3), 0);
  assert.equal(snapIndex(-900, -3, 300, 600, 3), 2);
  const index = snapIndex(-230, -.7, 150, 238, 4);
  assert.equal(Math.min(index * 150, 238), 238);
  assert.equal(snapIndex(-50, -2, 300, 0, 0), 0);
  assert.equal(snapIndex(-50, -2, 300, 0, 1), 0);
});
test('a pause before release discards stale velocity and same-time samples are safe', () => {
  const samples = [{ position: 0, time: 100 }, { position: -40, time: 140 }, { position: -80, time: 180 }];
  assert.equal(releaseVelocity(samples, 185), -1);
  assert.equal(releaseVelocity(samples, 280), 0);
  assert.equal(releaseVelocity([{ position: 0, time: 100 }, { position: -20, time: 100 }], 100), 0);
});
test('recent motion dominates velocity after changing direction', () => {
  const samples = [{ position: -50, time: 0 }, { position: -250, time: 140 }, { position: -190, time: 180 }, { position: -160, time: 200 }];
  assert.equal(releaseVelocity(samples, 205), 1.5);
});
test('overscroll is resisted without changing normal tracking', () => {
  assert.equal(resistedOffset(-100, 600, 300), -100);
  const left = resistedOffset(120, 600, 300), right = resistedOffset(-720, 600, 300);
  assert(left > 0 && left < 120);
  assert(right < -600 && right > -720);
  assert.equal(resistedOffset(0, 0, 0), 0);
});
test('cancellation uses the current visible position without adding momentum', () => {
  assert.equal(snapIndex(-420, 0, 300, 600, 3), 1);
  assert.equal(snapIndex(-490, 0, 300, 600, 3), 2);
});
