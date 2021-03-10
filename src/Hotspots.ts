export interface Hotspot<T> {
  name: T;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export default class Hotspots<T = string> {
  spots: Hotspot<T>[];

  constructor() {
    this.spots = [];
  }

  register(name: T, x: number, y: number, w: number, h: number) {
    const spot: Hotspot<T> = {
      name,
      left: x,
      top: y,
      right: x + w - 1,
      bottom: y + h - 1,
    };
    this.spots.push(spot);

    return spot;
  }

  resolve(x: number, y: number): [name: T, ox: number, oy: number] {
    for (var i = 0; i < this.spots.length; i++) {
      const spot = this.spots[i];
      if (
        x >= spot.left &&
        x <= spot.right &&
        y >= spot.top &&
        y <= spot.bottom
      )
        return [
          spot.name,
          Math.floor((x - spot.left) / 2),
          Math.floor((y - spot.top) / 2),
        ];
    }
  }
}
