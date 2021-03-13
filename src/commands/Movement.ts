import Game from "../Game";
import Cmd from "../interfaces/Cmd";

export default class Movement {
  constructor(public g: Game) {}

  possible(mx: number, my: number, shift = false): undefined | string | Cmd {
    const { player } = this.g;
    const x = player.x + mx;
    const y = player.y + my;

    const { actor, items, tile } = this.g.contents(x, y);

    if (actor) {
      if (actor.pushable && my === 0) return { type: "push", x, y, mx, my };

      if (actor.durability < Infinity) return { type: "dig", x, y };

      if (actor.alive) return { type: "attack", x, y };

      // TODO: attack?
      return "It's occupied.";
    }

    if (tile.solid) {
      const canClimb =
        my === 0 && Movement.canClimb(this.g, player.x, player.y, mx);
      const canDig = tile.durability < Infinity;

      if (shift) {
        if (canDig) return { type: "dig", x, y };
        if (canClimb) return { type: "climb", x, y: y - 1 };
      } else {
        if (canClimb) return { type: "climb", x, y: y - 1 };
        if (canDig) return { type: "dig", x, y };
      }

      return "It's too tough to dig.";
    }

    if (my === -1 && !tile.canClimb && !tile.canSwimIn)
      return "Nothing to climb.";
  }

  static canClimb(g: Game, sx: number, sy: number, mx: number) {
    const thru = g.contents(sx, sy - 1);
    const above = g.contents(sx + mx, sy - 1);

    return !thru.actor && !thru.tile.solid && !above.actor && !above.tile.solid;
  }

  apply(mx: number, my: number) {
    const { player } = this.g;
    const x = player.x + mx;
    const y = player.y + my;

    this.g.move(player, x, y);
    this.g.spent++;
  }
}
