import { RNG } from "rot-js";

export function pick<T>(...items: T[]) {
  return RNG.getItem(items);
}
