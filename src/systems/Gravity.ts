import Actor from "../Actor";
import Game from "../Game";
import Thing from "../interfaces/Thing";
import Item from "../Item";

export default class Gravity {
  constructor(public g: Game) {}

  run() {
    while (this.runOnce()) {}
  }

  runOnce(): boolean {
    const { actors, items, map } = this.g;
    var affected = 0;

    for (let y = map.height - 1; y >= 0; y--) {
      for (let x = 0; x < map.width; x++) {
        const victim = actors.get(x, y);
        if (this.check(victim)) affected++;

        const present = items.get(x, y);
        present.forEach((item) => {
          if (this.check(item)) affected++;
        });
      }
    }

    return affected > 0;
  }

  check(victim: Thing) {
    if (!victim) return;
    if (!victim.obeysGravity) return;

    const current = this.g.map.get(victim.x, victim.y);
    if (current.canSwimIn) return;

    const { actor, items, tile } = this.g.contents(victim.x, victim.y + 1);

    // TODO: can things sit on other things?
    if (actor && victim.type === "actor") return;
    if (tile.solid || (victim.canClimb && tile.canStandOn)) return;

    // we got a match!
    return victim.type === "actor" ? this.fall(victim) : this.itemFall(victim);
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

  itemFall(thing: Item): boolean {
    var { x, y } = thing;
    var contents = this.g.contents(x, y + 1);
    var distance = 0;

    while (y < this.g.map.height) {
      const { actor, items, tile } = contents;

      // landed
      if (tile.solid) break;

      y++;
      distance++;
      contents = this.g.contents(x, y + 1);

      // TODO: float? sink?
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
