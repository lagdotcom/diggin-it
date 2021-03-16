import DiscreteShadowcasting from "rot-js/lib/fov/discrete-shadowcasting";

import Game from "../Game";
import Grid from "../interfaces/Grid";
import LinearGrid from "../LinearGrid";

export default class Vision {
  dirty: boolean;
  vision: Grid<boolean>;

  constructor(public g: Game) {
    this.remake();

    const dirty = () => (this.dirty = true);
    g.on("digged", dirty);
    g.on("moved", dirty);
  }

  remake(): void {
    const { map } = this.g;
    this.dirty = true;
    this.vision = new LinearGrid(map.width, map.height, () => false);
  }

  get(): Grid<boolean> {
    if (this.dirty) {
      this.dirty = false;
      const { map, player } = this.g;

      const fov = new DiscreteShadowcasting((x, y) => !map.get(x, y).opaque);
      this.vision.fill(false);
      fov.compute(player.x, player.y, player.vision, (x, y) => {
        this.vision.set(x, y, true);
        this.g.memory.set(x, y, true);
      });
    }

    return this.vision;
  }

  visible(x: number, y: number): boolean {
    if (this.dirty) this.get();
    return this.vision.get(x, y);
  }
}
