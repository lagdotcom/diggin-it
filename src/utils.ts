export function manhattan(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function pad(value: number, length: number, ch = " "): string {
  let string = value.toString();
  while (string.length < length) string = ch + string;
  return string;
}

export function log(...args: unknown[]): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).showlogs) console.log(...args);
}

export const higherOfTwo = <T>(
  gen: (zone: number) => T,
  metric: (thing: T) => number
) => (zone: number): T => {
  const a = gen(zone);
  const b = gen(zone);
  return metric(a) > metric(b) ? a : b;
};

export const lowerOfTwo = <T>(
  gen: (zone: number) => T,
  metric: (thing: T) => number
) => (zone: number): T => {
  const a = gen(zone);
  const b = gen(zone);
  return metric(a) > metric(b) ? b : a;
};
