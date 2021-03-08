export interface Hotspot {
  name: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export default class Hotspots {
  spots: Hotspot[];

  constructor() {
    this.spots = [];
  }

  register(name: string, x: number, y: number, w: number, h: number) {
    const spot: Hotspot = {
      name,
      left: x,
      top: y,
      right: x + w - 1,
      bottom: y + h - 1,
    };
    this.spots.push(spot);

    return spot;
  }

  resolve(x: number, y: number): [name: string, ox: number, oy: number] {
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
