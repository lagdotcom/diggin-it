import DiscreteShadowcasting from 'rot-js/lib/fov/discrete-shadowcasting';

import Cmd from '../Cmd';
import Movement from '../commands/Movement';
import Game from '../Game';
import Context from '../interfaces/Context';
import MessageLog from '../MessageLog';

export default class Dungeon implements Context {
  log: MessageLog;
  movement: Movement;

  constructor(public g: Game) {
    this.log = new MessageLog();
    this.movement = new Movement(g);
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        return { type: "move", x: -1, y: 0 };
      case "ArrowUp":
        e.preventDefault();
        return { type: "move", x: 0, y: -1 };
      case "ArrowRight":
        e.preventDefault();
        return { type: "move", x: 1, y: 0 };
      case "ArrowDown":
        e.preventDefault();
        return { type: "move", x: 0, y: 1 };
    }
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "move":
        const { x, y } = cmd;
        const err = this.movement.possible(x, y);
        if (err) this.log.add(err);
        else this.movement.apply(x, y);
        return this.render();
    }
  }

  render(): void {
    const { chars, map, player, tiles } = this.g;

    tiles.clear();

    const xmod = tiles._options.width / 2 - player.x;
    const ymod = tiles._options.height / 2 - player.y;

    const fov = new DiscreteShadowcasting((x, y) => !map.get(x, y).opaque);
    fov.compute(player.x, player.y, player.vision, (x, y, r) => {
      const { actor, items, tile } = this.g.contents(x, y);
      var glyph = tile.glyph;
      if (actor) glyph = actor.glyph;
      else if (items.length) glyph = items[0].glyph;

      tiles.draw(xmod + x, ymod + y, glyph, "white", "black");
    });

    let y = chars._options.height - 1;
    this.log.messages.forEach((msg) => {
      chars.drawText(0, y, msg);
      y--;
    });
  }
}
