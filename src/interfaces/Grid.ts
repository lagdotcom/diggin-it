import XY from "./XY";

export default interface Grid<T> {
  width: number;
  height: number;

  contains(x: number, y: number): boolean;
  fill(value: T): void;
  get(x: number, y: number): T;
  index(x: number, y: number): number;
  neighbours(sx: number, sy: number): XY[];
  paste(grid: Grid<T>, x: number, y: number): boolean;
  set(x: number, y: number, value: T): void;
  toArray(): T[][];
  update(x: number, y: number, fn: (value: T) => T): void;
  visualise(fn?: (value: T) => string, space?: string): string;
}
