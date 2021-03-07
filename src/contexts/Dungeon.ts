import DiscreteShadowcasting from 'rot-js/lib/fov/discrete-shadowcasting';

import Cmd from '../Cmd';
import Movement from '../commands/Movement';
import Game from '../Game';
import Context from '../interfaces/Context';

export default class Dungeon implements Context {
  movement: Movement;

  constructor(public g: Game) {
    this.movement = new Movement(g);
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "ArrowLeft":
        return { type: "move", x: -1, y: 0 };
      case "ArrowUp":
        return { type: "move", x: 0, y: -1 };
      case "ArrowRight":
        return { type: "move", x: 1, y: 0 };
      case "ArrowDown":
        return { type: "move", x: 0, y: 1 };
    }
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "move":
        const { x, y } = cmd;
        if (this.movement.possible(x, y)) {
          this.movement.apply(x, y);
          return this.render();
        }
        break;
    }
  }

  render(): void {
    const { map, player, tiles } = this.g;

    tiles.clear();

    const fov = new DiscreteShadowcasting((x, y) => !map.get(x, y).opaque);
    fov.compute(player.x, player.y, player.vision, (x, y, r) => {
      const { actor, items, tile } = this.g.contents(x, y);
      var glyph = tile.glyph;
      if (actor) glyph = actor.glyph;
      else if (items.length) glyph = items[0].glyph;

      tiles.draw(x, y, glyph, "white", "black");
    });
  }
}
