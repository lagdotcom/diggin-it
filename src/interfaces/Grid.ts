import XY from "./XY";

export default interface Grid<T> {
  width: number;
  height: number;

  contains(x: number, y: number): boolean;
  index(x: number, y: number): number;
  fill(value: T): void;
  set(x: number, y: number, value: T): void;
  get(x: number, y: number): T;
  update(x: number, y: number, fn: (value: T) => T): void;
  neighbours(sx: number, sy: number): XY[];
}
