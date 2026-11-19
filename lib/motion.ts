export const clamp = (value: number, minimum: number, maximum: number) => Math.max(minimum, Math.min(maximum, value));

export type DragSample = { position: number; time: number };

// Positions are logical pixels; timestamps are milliseconds. Ignore velocity after a pause.
export function releaseVelocity(samples: DragSample[], now: number): number {
  const recent = samples.filter(sample => sample.time <= now && now - sample.time <= 100);
  if (recent.length < 2) return 0;
  const first = recent[0], last = recent[recent.length - 1], elapsed = last.time - first.time;
  if (elapsed <= 0 || now - last.time > 60) return 0;
  return clamp((last.position - first.position) / elapsed, -3, 3);
}

export function resistedOffset(value: number, maxOffset: number, dimension: number): number {
  const boundary = clamp(value, -maxOffset, 0), overshoot = value - boundary;
  if (!overshoot || dimension <= 0) return boundary;
  return boundary + (overshoot * dimension * .35) / (dimension + .35 * Math.abs(overshoot));
}

export function snapIndex(position: number, velocity: number, stride: number, maxOffset: number, count: number): number {
  if (stride <= 0 || count <= 1) return 0;
  // Short projection, then choose a real resting point. This is app tuning, not an Apple specification.
  const projected = clamp(-position - clamp(clamp(velocity, -3, 3) * 180, -stride, stride), 0, maxOffset);
  let best = 0, distance = Infinity;
  for (let index = 0; index < count; index++) {
    const candidate = Math.abs(Math.min(index * stride, maxOffset) - projected);
    if (candidate < distance) { best = index; distance = candidate; }
  }
  return best;
}

export const settleSpring = { stiffness: 280, damping: 34, mass: 1, overshootClamping: true };
