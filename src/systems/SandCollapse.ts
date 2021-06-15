import { empty } from "../entities/tiles";
import Game from "../Game";
import LinearGrid from "../LinearGrid";
import Tile from "../Tile";

export default class SandCollapse {
  constructor(public g: Game) {
    g.on("digged", ({ tile, x, y }) => {
      if (tile.collapses) this.collapse(x, y);
    });
  }

  collapse(sx: number, sy: number): void {
    const { map } = this.g;
    const checks = new LinearGrid(map.width, map.height, () => false);
    const queue = map.neighbours(sx, sy);

    while (queue.length) {
      const [x, y] = queue.pop();
      const tile = map.get(x, y);

      if (tile.collapses) {
        this.g.emit("collapsed", { x, y });
        map.set(x, y, new Tile(empty));
        map.neighbours(x, y).forEach(([nx, ny]) => {
          if (!checks.get(nx, ny)) {
            checks.set(nx, ny, true);
            queue.push([nx, ny]);
          }
        });
      }
    }
  }
}
