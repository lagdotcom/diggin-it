import XY from "./XY";

export default interface Grid<T> {
  width: number;
  height: number;

  contains(x: number, y: number): boolean;
  diamond(x: number, y: number, size: number): XY[];
  fill(value: T): Grid<T>;
  fromIndex(index: number): XY;
  get(x: number, y: number): T;
  includes(value: T): boolean;
  index(x: number, y: number): number;
  mirror(): Grid<T>;
  neighbours(sx: number, sy: number): XY[];
  paste(grid: Grid<T>, x: number, y: number): boolean;
  positions(): XY[];
  set(x: number, y: number, value: T): Grid<T>;
  toArray(): T[][];
  transform<U>(fn: (value: T, x: number, y: number) => U): Grid<U>;
  update(x: number, y: number, fn: (value: T) => T): Grid<T>;
  visualise(fn?: (value: T) => string, space?: string): string;
}
