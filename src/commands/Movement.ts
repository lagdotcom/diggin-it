import Cmd from "../Cmd";
import Game from "../Game";

export default class Movement {
  constructor(public g: Game) {}

  possible(mx: number, my: number): undefined | string | Cmd {
    const { player } = this.g;
    const x = player.x + mx;
    const y = player.y + my;

    const { actor, items, tile } = this.g.contents(x, y);

    if (actor) {
      if (actor.pushable) return { type: "push", x, y, mx, my };

      if (actor.digResistance <= player.digStrength)
        return { type: "dig", x, y };

      if (actor.alive) return { type: "attack", x, y };

      // TODO: attack?
      return "It's occupied.";
    }

    if (tile.solid) {
      if (my === 0 && this.canClimb(player.x, player.y, mx))
        return { type: "climb", x, y: y - 1 };

      if (tile.digResistance <= player.digStrength)
        return { type: "dig", x, y };

      return "It's blocked.";
    }

    const current = this.g.contents(player.x, player.y);
    if (my === -1 && !current.tile.canClimb && !tile.canSwimIn)
      return "Nothing to climb.";
    if (my === 1 && !tile.canClimb && !tile.canSwimIn)
      return "Nothing to climb.";
  }

  canClimb(sx: number, sy: number, mx: number) {
    const thru = this.g.contents(sx, sy - 1);
    const above = this.g.contents(sx + mx, sy - 1);

    return !thru.actor && !thru.tile.solid && !above.actor && !above.tile.solid;
  }

  apply(mx: number, my: number) {
    const { player } = this.g;
    const x = player.x + mx;
    const y = player.y + my;

    this.g.move(player, x, y);
    this.g.emit("moved", { thing: player, mx, my });
    this.g.spent++;
  }
}
