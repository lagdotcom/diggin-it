import DiscreteShadowcasting from 'rot-js/lib/fov/discrete-shadowcasting';

import Cmd, { DigCmd, MoveCmd, PushCmd } from '../Cmd';
import Movement from '../commands/Movement';
import Pushing from '../commands/Pushing';
import Game from '../Game';
import Context from '../interfaces/Context';
import { empty } from '../Tile';

export default class Dungeon implements Context {
  movement: Movement;
  pushing: Pushing;

  constructor(public g: Game) {
    this.movement = new Movement(g);
    this.pushing = new Pushing(g);
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
      case "dig":
        return this.handleDig(cmd);
      case "move":
        return this.handleMove(cmd);
      case "push":
        return this.handlePush(cmd);
    }
  }

  handleDig({ x, y }: DigCmd): void {
    this.g.map.set(x, y, empty);
    return this.render();
  }

  handleMove({ x, y }: MoveCmd): void {
    const poss = this.movement.possible(x, y);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    else this.movement.apply(x, y);
    return this.render();
  }

  handlePush({ x, y, mx, my }: PushCmd): void {
    const actor = this.g.actors.get(x, y);
    const poss = this.pushing.possible(actor, mx, my);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    else this.pushing.apply(actor, mx, my);
    return this.render();
  }

  render(): void {
    const { chars, log, map, player, tiles } = this.g;

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
    log.messages.forEach((msg) => {
      chars.drawText(0, y, msg);
      y--;
    });
  }
}
