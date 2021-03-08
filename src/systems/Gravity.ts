import Actor from "../Actor";
import Game from "../Game";

export default class Gravity {
  constructor(public g: Game) {}

  run() {
    while (this.runOnce()) {}
  }

  runOnce(): boolean {
    const { actors, map } = this.g;
    var affected = 0;

    for (let y = map.height - 1; y >= 0; y--) {
      for (let x = 0; x < map.width; x++) {
        const victim = actors.get(x, y);
        if (!victim) continue;
        if (!victim.obeysGravity) continue;

        const current = this.g.map.get(x, y);
        if (current.canSwimIn) continue;

        const { actor, items, tile } = this.g.contents(x, y + 1);

        // TODO: can things sit on other things?
        if (actor) continue;
        if (tile.solid || (victim.canClimb && tile.canStandOn)) continue;

        // we got a match!
        if (this.fall(victim)) affected++;
      }
    }

    return affected > 0;
  }

  fall(thing: Actor): boolean {
    var { x, y } = thing;
    var contents = this.g.contents(x, y + 1);
    var distance = 0;

    while (y < this.g.map.height) {
      const { actor, items, tile } = contents;

      // hit something
      if (actor) break;

      // landed
      if (tile.solid || (thing.canClimb && tile.canStandOn)) break;

      y++;
      distance++;
      contents = this.g.contents(x, y + 1);

      if (tile.canSwimIn) break;
    }

    // ???
    if (distance === 0) return false;

    // TODO: damage, etc.

    this.g.move(thing, x, y);
    this.g.emit("fell", { thing, distance });
    this.g.emit("moved", { thing, mx: 0, my: distance });
    return true;
  }
}
