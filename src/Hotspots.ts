export interface Hotspot<T> {
  name: T;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function rect<T>(
  name: T,
  left: number,
  top: number,
  w: number,
  h: number
): Hotspot<T> {
  return {
    name,
    left,
    top,
    right: left + w - 1,
    bottom: top + h - 1,
  };
}

function contains(rect: Hotspot<unknown>, x: number, y: number): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function overlaps(a: Hotspot<unknown>, b: Hotspot<unknown>): boolean {
  if (a.left > b.right || b.left > a.right) return false;
  if (a.bottom < b.top || b.bottom < a.top) return false;
  return true;
}

export default class Hotspots<T = string> {
  spots: Hotspot<T>[];

  constructor() {
    this.spots = [];
  }

  register(name: T, x: number, y: number, w: number, h: number): Hotspot<T> {
    const spot = rect(name, x, y, w, h);
    this.spots.push(rect(name, x, y, w, h));
    return spot;
  }

  resolve(x: number, y: number): [name: T, ox: number, oy: number] | undefined {
    for (let i = 0; i < this.spots.length; i++) {
      const spot = this.spots[i];
      if (contains(spot, x, y))
        return [
          spot.name,
          Math.floor((x - spot.left) / 2),
          Math.floor((y - spot.top) / 2),
        ];
    }
  }

  overlap(x: number, y: number, w: number, h: number): boolean {
    const temp = rect("temp", x, y, w, h);

    for (let i = 0; i < this.spots.length; i++) {
      const spot = this.spots[i];
      if (overlaps(spot, temp)) return true;
    }

    return false;
  }
}
