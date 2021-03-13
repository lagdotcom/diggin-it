import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import { theName } from "../text";
import Tile from "../Tile";
import { empty } from "../tiles";

export default class Digging {
  constructor(public g: Game) {}

  possible(x: number, y: number): undefined | string | Cmd {
    const { actor, items, tile } = this.g.contents(x, y);

    if (actor) {
      if (actor.durability < Infinity) return undefined;

      return "It's too tough to dig.";
    }

    if (tile.solid) {
      if (tile.durability < Infinity) return undefined;

      return "It's too tough to dig.";
    }

    return "Nothing to dig.";
  }

  apply(x: number, y: number) {
    const { player, log, map } = this.g;
    const { actor, items, tile } = this.g.contents(x, y);

    if (actor) {
      actor.durability--;
      if (actor.durability < 1) {
        this.g.remove(actor);
        log.add(`${theName(actor)} falls apart.`);
        this.g.emit("destroyed", { attacker: player, victim: actor });
        return;
      }

      log.add(`You chip at ${theName(actor)}.`);
      return;
    }

    tile.durability--;
    if (tile.durability < 1) {
      log.add(`You dig through ${theName(tile)}.`);
      map.set(x, y, new Tile(empty));
      this.g.emit("digged", { tile, x, y });
      return;
    }

    log.add(`You chip at ${theName(tile)}.`);
  }
}
