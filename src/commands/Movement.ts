import Game from '../Game';

export default class Movement {
  constructor(public g: Game) {}

  possible(mx: number, my: number) {
    const { player } = this.g;
    const dx = player.x + mx;
    const dy = player.y + my;

    const { actor, items, tile } = this.g.contents(dx, dy);

    // TODO: attack?
    if (actor) return "It's occupied.";

    // TODO: dig?
    if (tile.solid) return "It's blocked.";

    const current = this.g.contents(player.x, player.y);
    if (my === -1 && !current.tile.canClimb) return "Nothing to climb.";
    if (my === 1 && !tile.canClimb) return "Nothing to climb.";
  }

  apply(mx: number, my: number) {
    const { player } = this.g;
    const dx = player.x + mx;
    const dy = player.y + my;

    this.g.move(player, dx, dy);
    this.g.emit("moved", { thing: player, mx, my });
  }
}
