import Grid from "./interfaces/Grid";
import XY from "./interfaces/XY";

export default class LinearGrid<T> implements Grid<T> {
  items: T[];

  constructor(
    public width: number,
    public height: number,
    public uninitialised: (x: number, y: number) => T
  ) {
    this.items = [];
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) this.items.push(uninitialised(x, y));
  }

  static from<T>(data: T[][]) {
    const height = data.length;
    const width = data[0].length;
    return new LinearGrid(width, height, (x, y) => data[y][x]);
  }

  contains(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  index(x: number, y: number): number {
    return y * this.width + x;
  }

  fill(value: T) {
    for (let i = 0; i < this.width * this.height; i++) this.items[i] = value;
    return this;
  }

  set(x: number, y: number, value: T) {
    const i = this.index(x, y);
    this.items[i] = value;
    return this;
  }

  get(x: number, y: number): T {
    if (!this.contains(x, y)) return this.uninitialised(x, y);

    const i = this.index(x, y);
    return this.items[i];
  }

  update(x: number, y: number, fn: (value: T) => T) {
    return this.set(x, y, fn(this.get(x, y)));
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

  paste(grid: Grid<T>, sx: number, sy: number) {
    if (sx + grid.width >= this.width) return false;
    if (sy + grid.height >= this.height) return false;

    for (var y = 0; y < grid.height; y++) {
      for (var x = 0; x < grid.width; x++) {
        this.set(sx + x, sy + y, grid.get(x, y));
      }
    }
    return true;
  }

  transform(fn: (value: T, x: number, y: number) => T) {
    return new LinearGrid(this.width, this.height, (x, y) =>
      fn(this.get(x, y), x, y)
    );
  }

  flipH() {
    return new LinearGrid(this.width, this.height, (x, y) =>
      this.get(this.width - x - 1, y)
    );
  }
}
