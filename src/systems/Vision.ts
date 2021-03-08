import DiscreteShadowcasting from "rot-js/lib/fov/discrete-shadowcasting";

import Game from "../Game";
import XY from "../interfaces/XY";

export default class Vision {
  dirty: boolean;
  vision: XY[];

  constructor(public g: Game) {
    this.dirty = true;
    this.vision = [];
    g.on("moved", () => (this.dirty = true));
  }

  get(): XY[] {
    if (this.dirty) {
      this.dirty = false;
      const { map, player } = this.g;

      const fov = new DiscreteShadowcasting((x, y) => !map.get(x, y).opaque);
      this.vision = [];
      fov.compute(player.x, player.y, player.vision, (x, y) =>
        this.vision.push([x, y])
      );
    }

    return this.vision;
  }

  visible(x: number, y: number) {
    for (var i = 0; i < this.vision.length; i++)
      if (this.vision[i][0] === x && this.vision[i][1] === y) return true;
  }
}
