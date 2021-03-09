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

  check(victim: Thing) {
    if (!victim) return;
    if (!victim.obeysGravity) return;

    const current = this.g.map.get(victim.x, victim.y);
    if (current.canSwimIn) return;

    const { actor, items, tile } = this.g.contents(victim.x, victim.y + 1);

    if (tile.solid || (victim.canClimb && tile.canStandOn)) return;

    // we got a match!
    return victim.type === "actor" ? this.fall(victim) : this.itemFall(victim);
  }

  fall(thing: Actor): boolean {
    const { log, map } = this.g;
    var { x, y } = thing;
    var contents = this.g.contents(x, y + 1);
    var distance = 0;
    var victim: Actor | Tile = undefined;
    var hitFluid = false;

    while (y < map.height) {
      const { actor, items, tile } = contents;

      // hit something
      if (actor) {
        victim = actor;
        y++;
        distance++;
        break;
      }

      // landed
      if (tile.solid || (thing.canClimb && tile.canStandOn)) {
        victim = tile;
        break;
      }

      y++;
      distance++;
      contents = this.g.contents(x, y + 1);

      if (tile.canSwimIn) {
        hitFluid = true;
        victim = tile;
        break;
      }
    }

    // ???
    if (distance === 0) return false;

    var push: false | undefined | XY = false;
    if (victim?.type === "actor" && victim.alive)
      push = this.findPushTile(victim);

    // TODO: damage, etc.
    if (distance > 1 && !hitFluid) {
      const amount = (distance - 1) * distance;
      if (victim?.type === "actor" && victim.alive) {
        // TODO: super mean damage share? :D
        const share = 0; //thing.alive ? Math.floor(amount / 2) : 0;
        if (share > 0) {
          thing.hp -= share;
          if (thing.glyph === "@") log.add("You fall and get hurt!");

          this.g.emit("damaged", {
            attacker: thing,
            victim: thing,
            amount: share,
          });
        }

        // squish if nowhere to go!
        const rest = typeof push === "undefined" ? victim.hp : amount - share;
        if (rest > 0) {
          if (thing.glyph === "@") log.add(`You land on ${theName(victim)}!`);
          else if (victim.glyph === "@")
            log.add(`${name(thing)} lands on you!`);

          victim.hp -= rest;
          this.g.emit("damaged", { attacker: thing, victim, amount: rest });
        }
      } else if (thing.alive) {
        thing.hp -= amount;
        if (thing.glyph === "@") log.add("You fall and get hurt!");
        this.g.emit("damaged", { attacker: thing, victim: thing, amount });
      }
    }

    if (victim.type === "actor" && victim.alive && typeof push === "object") {
      const mx = push[0] - victim.x,
        my = push[1] - victim.y;
      this.g.move(victim, push[0], push[1]);
      this.g.emit("moved", { thing: victim, mx, my, forced: thing });

      if (thing.glyph === "@") log.add(`You push ${theName(victim)} aside!`);
    }

    if (hitFluid && thing.glyph === "@")
      log.add(`You fall into ${name(victim)}!`);

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
}
