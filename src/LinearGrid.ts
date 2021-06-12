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
    this.fromIndex = this.fromIndex.bind(this);
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) this.items.push(uninitialised(x, y));
  }

  static from<T>(data: T[][]): Grid<T> {
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

  fromIndex(index: number): XY {
    const y = Math.floor(index / this.width);
    const x = index % this.width;
    return [x, y];
  }

  fill(value: T): this {
    for (let i = 0; i < this.width * this.height; i++) this.items[i] = value;
    return this;
  }

  set(x: number, y: number, value: T): this {
    const i = this.index(x, y);
    this.items[i] = value;
    return this;
  }

  get(x: number, y: number): T {
    if (!this.contains(x, y)) return this.uninitialised(x, y);

    const i = this.index(x, y);
    return this.items[i];
  }

  update(x: number, y: number, fn: (value: T) => T): this {
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
    space = ""
  ): string {
    const { width, height } = this;
    const rows: string[] = [];
    let row: string[] = [];

    for (let i = 0; i < width * height; i++) {
      const tile = this.items[i];
      row.push(fn(tile));

      if (i % width === width - 1) {
        rows.push(row.join(space));
        row = [];
      }
    }

    return rows.join("\n");
  }

  toArray(): T[][] {
    const { width, height } = this;
    const rows: T[][] = [];
    let row: T[] = [];

    for (let i = 0; i < width * height; i++) {
      const tile = this.items[i];
      row.push(tile);

      if (i % width === width - 1) {
        rows.push(row);
        row = [];
      }
    }

    return rows;
  }

  paste(grid: Grid<T>, sx: number, sy: number): boolean {
    if (sx + grid.width >= this.width) return false;
    if (sy + grid.height >= this.height) return false;

    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        this.set(sx + x, sy + y, grid.get(x, y));
      }
    }
    return true;
  }

  positions(): XY[] {
    const list: XY[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        list.push([x, y]);
      }
    }

    return list;
  }

  transform<U>(fn: (value: T, x: number, y: number) => U): Grid<U> {
    return new LinearGrid(this.width, this.height, (x, y) =>
      fn(this.get(x, y), x, y)
    );
  }

  mirror(): Grid<T> {
    return new LinearGrid(this.width, this.height, (x, y) =>
      this.get(this.width - x - 1, y)
    );
  }

  includes(value: T): boolean {
    return this.items.includes(value);
  }

  diamond(x: number, y: number, size: number): XY[] {
    const queue: XY[] = [[x, y]];
    const pending: XY[] = [];
    const locations = new Set<number>();
    let distance = 0;

    while (distance < size) {
      queue.forEach(([x, y]) => {
        locations.add(this.index(x, y));
        pending.push(...this.neighbours(x, y));
      });

      distance++;
      queue.splice(0, queue.length, ...pending.splice(0, pending.length));
    }

    return Array.from(locations, this.fromIndex);
  }
}
