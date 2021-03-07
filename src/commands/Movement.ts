import Cmd from '../Cmd';
import Game from '../Game';

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

      // TODO: attack?
      return "It's occupied.";
    }

    // TODO: dig?
    if (tile.solid) {
      if (tile.digResistance <= player.digStrength)
        return { type: "dig", x, y };

      return "It's blocked.";
    }

    const current = this.g.contents(player.x, player.y);
    if (my === -1 && !current.tile.canClimb) return "Nothing to climb.";
    if (my === 1 && !tile.canClimb) return "Nothing to climb.";
  }

  apply(mx: number, my: number) {
    const { player } = this.g;
    const x = player.x + mx;
    const y = player.y + my;

    this.g.move(player, x, y);
    this.g.emit("moved", { thing: player, mx, my });
  }
}
