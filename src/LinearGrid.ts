import Grid from "./interfaces/Grid";
import XY from "./interfaces/XY";

export default class LinearGrid<T> implements Grid<T> {
  items: T[];

  constructor(
    public width: number,
    public height: number,
    public uninitialised: () => T
  ) {
    this.items = [];
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) this.items.push(uninitialised());
  }

  contains(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  index(x: number, y: number): number {
    return y * this.width + x;
  }

  fill(value: T): void {
    for (let i = 0; i < this.width * this.height; i++) this.items[i] = value;
  }

  set(x: number, y: number, value: T): void {
    const i = this.index(x, y);
    this.items[i] = value;
  }

  get(x: number, y: number): T {
    if (!this.contains(x, y)) return this.uninitialised();

    const i = this.index(x, y);
    return this.items[i];
  }

  update(x: number, y: number, fn: (value: T) => T): void {
    this.set(x, y, fn(this.get(x, y)));
  }

  neighbours(sx: number, sy: number): XY[] {
    const offsets: XY[] = [
      [sx + 1, sy + 0],
      [sx + 0, sy + 1],
      [sx - 1, sy + 0],
      [sx + 0, sy - 1],
    ];
    return offsets.filter(([x, y]) => this.contains(x, y));
  }

  visualise(
    fn: (value: T) => string = (x) => x.toString(),
    space: string = ""
  ) {
    const { width, height } = this;
    const rows: string[] = [];
    var row: string[] = [];

    for (var i = 0; i < width * height; i++) {
      const tile = this.items[i];
      row.push(fn(tile));

      if (i % width === width - 1) {
        rows.push(row.join(space));
        row = [];
      }
    }

    return rows.join("\n");
  }

  toArray() {
    const { width, height } = this;
    const rows: T[][] = [];
    var row: T[] = [];

    for (var i = 0; i < width * height; i++) {
      const tile = this.items[i];
      row.push(tile);

      if (i % width === width - 1) {
        rows.push(row);
        row = [];
      }
    }

    return rows;
  }
}
