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
    g.on("equipped", dirty); // might change vision/xray value
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

      const passCallback: (x: number, y: number) => boolean = player.get(
        "xrayVision"
      )
        ? (x, y) => !map.get(x, y).xrayOpaque
        : (x, y) => !map.get(x, y).opaque;
      const fov = new DiscreteShadowcasting(passCallback);
      this.vision.fill(false);
      fov.compute(player.x, player.y, player.get("vision"), (x, y) => {
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
