import bresenham from "bresenham";
import { RNG } from "rot-js";
import { tokenize } from "rot-js/lib/text";

import Actor from "./Actor";
import Game from "./Game";
import { Picker, PickerOptions } from "./tables";
import Tile from "./Tile";

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

export function fetchAudio(url: string, loop = false) {
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    const aud = document.createElement("audio");
    aud.loop = loop;
    aud.preload = "auto";

    const src = document.createElement("source");
    src.src = url;
    aud.append(src);

    log("started fetching:", url);
    aud.load();

    aud.addEventListener("canplay", () => {
      log("partially loaded:", url);
      resolve(aud);
    });
    aud.addEventListener("canplaythrough", () => {
      log("fully loaded:", url);
    });
    aud.addEventListener("error", () => {
      log("couldn't load:", url, aud.error);
      reject(aud);
    });
  });
}

export function traceline(
  g: Game,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  ...ignore: Actor[]
): Actor | Tile | undefined {
  const path = bresenham(x0, y0, x1, y1);
  for (let i = 0; i < path.length; i++) {
    const pos = path[i];
    const { actor, tile } = g.contents(pos.x, pos.y);

    if (tile.solid) return tile;
    if (actor && actor.alive && !ignore.includes(actor)) return actor;
  }
}

export function stillHasMemento(a: Actor): boolean {
  for (const item of a.inventory) {
    if (item?.use === "memento") return true;
  }

  return false;
}

export function wrap(value: number, count: number): number {
  while (value < 0) value += count;
  while (value >= count) value -= count;
  return value;
}

export function wordWrap(text: string, length: number): string[] {
  return tokenize(text, length)
    .reduce((total, item) => {
      if (item.type === 0) return total + item.value;
      else if (item.type === 1) return total + "\n";
      return total;
    }, "")
    .trim()
    .split("\n");
}
