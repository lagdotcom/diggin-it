import { RNG } from "rot-js";

import { Picker, PickerOptions } from "./tables";

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

export const higherOfTwo =
  <T>(gen: Picker<T>, metric: (thing: Partial<T>) => number) =>
  (options: PickerOptions): Partial<T> => {
    const a = gen(options);
    const b = gen(options);
    return metric(a) > metric(b) ? a : b;
  };

export const lowerOfTwo =
  <T>(gen: Picker<T>, metric: (thing: Partial<T>) => number) =>
  (options: PickerOptions): Partial<T> => {
    const a = gen(options);
    const b = gen(options);
    return metric(a) > metric(b) ? b : a;
  };

export type Distribution<T extends string> = Partial<Record<T, number>>;

export const pickByWeight = <T extends string>(weights: Distribution<T>): T =>
  RNG.getWeightedValue(weights) as T;
