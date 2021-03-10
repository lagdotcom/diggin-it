import Actor from "../Actor";
import Game from "../Game";
import Thing from "../interfaces/Thing";
import XY from "../interfaces/XY";
import Item from "../Item";
import { name, theName } from "../text";
import Tile from "../Tile";

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

  check(thing: Thing) {
    if (!thing) return;
    if (!thing.obeysGravity) return;

    const current = this.g.map.get(thing.x, thing.y);
    if (current.canSwimIn) return;
    if (thing.canClimb && current.canClimb) return;

    const { actor, items, tile } = this.g.contents(thing.x, thing.y + 1);

    if (actor && thing.type === "actor") return;
    if (tile.solid) return;

    // we got a match!
    return thing.type === "actor" ? this.fall(thing) : this.itemFall(thing);
  }

  fall(thing: Actor): boolean {
    const { map } = this.g;
    var { x, y } = thing;
    var distance = 0;
    var victim: Actor | Tile = undefined;

    while (y < map.height) {
      const { actor, items, tile } = this.g.contents(x, y + 1);

      // hit something
      if (actor) {
        victim = actor;
        break;
      }

      // landed
      if (tile.solid) {
        victim = tile;
        break;
      }

      y++;
      distance++;

      if ((thing.canClimb && tile.canClimb) || tile.canSwimIn) {
        victim = tile;
        break;
      }
    }

    // ???
    if (distance === 0) return false;

    if (victim.type === "tile")
      return this.fallOntoTile(thing, victim, distance, x, y);
    else return this.fallOntoActor(thing, victim, distance);
  }

  itemFall(thing: Item): boolean {
    var { x, y } = thing;
    var contents = this.g.contents(x, y + 1);
    var distance = 0;

    while (y < this.g.map.height) {
      const { actor, items, tile } = this.g.contents(x, y + 1);

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
    return true;
  }

  findPushTile(actor: Actor): XY {
    const offsets = [-1, 1];
    for (var i = 0; i < offsets.length; i++) {
      const x = actor.x + offsets[i];
      const y = actor.y;

      const contents = this.g.contents(x, y);
      if (contents.actor) continue;
      if (contents.tile.solid) continue;
      return [x, y];
    }
  }

  fallOntoTile(
    victim: Actor,
    tile: Tile,
    distance: number,
    x: number,
    y: number
  ) {
    this.g.move(victim, x, y);
    this.g.emit("fell", { thing: victim, distance });

    if (victim.alive) {
      if (tile.canSwimIn) {
        if (victim.glyph === "@")
          this.g.log.add(`You fall into ${name(tile)}!`);
      } else if (tile.canClimb) {
        if (victim.glyph === "@")
          this.g.log.add(`You grab onto ${name(tile)}.`);
      } else if (distance > 2 && !tile.canSwimIn) {
        const amount = distance * 5;
        victim.hp -= amount;
        if (victim.glyph === "@") this.g.log.add("You fall and get hurt!");
        this.g.emit("damaged", {
          attacker: victim,
          victim,
          amount,
          type: "fall",
        });
      }
    }

    return true;
  }

  fallOntoActor(attacker: Actor, victim: Actor, distance: number) {
    var escape = undefined;
    var amount = 0;

    var x = victim.x,
      y = victim.y;
    if (!victim.alive)
      return this.fallOntoTile(
        attacker,
        this.g.map.get(x, y - 1),
        distance - 1,
        x,
        y - 1
      );

    if (attacker.heavy) {
      escape = this.findPushTile(victim);
      amount = escape ? distance * 5 : victim.hp;
    } else if (distance > 1) {
      amount = distance * 5;
    }

    if (amount) {
      victim.hp -= amount;
      if (attacker.glyph === "@")
        this.g.log.add(`You fall onto ${name(victim)}!`);
      else if (victim.glyph === "@")
        this.g.log.add(`${name(attacker)} falls onto you!`);
      else this.g.log.add(`${name(victim)} is crushed!`);

      this.g.emit("damaged", { attacker, victim, amount, type: "fall" });

      if (victim.alive) {
        y--;
        distance--;
        if (escape) this.g.move(victim, escape[0], escape[1], attacker);
      }
    }

    this.g.move(attacker, x, y);
    this.g.emit("fell", { thing: attacker, distance });
    return true;
  }
}
