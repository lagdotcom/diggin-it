import Actor from "../Actor";
import Game from "../Game";
import Thing from "../interfaces/Thing";
import XY from "../interfaces/XY";
import Item from "../Item";
import { cname, name } from "../text";
import Tile from "../Tile";

export default class Gravity {
  silent: boolean;

  constructor(public g: Game) {
    g.on("tick", () => this.run());
    g.on("entered", () => {
      this.silent = true;
      this.run();
      this.silent = false;
    });
  }

  run(): void {
    while (this.runOnce());
  }

  runOnce(): boolean {
    const { actors, items, map } = this.g;
    let affected = 0;

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

  check(thing: Thing): boolean {
    if (!thing) return;
    if (!thing.obeysGravity) return;

    const fluid = this.g.mapFluid.get(thing.x, thing.y);
    if (fluid.canSwimIn) return;

    const current = this.g.map.get(thing.x, thing.y);
    if (thing.canClimb && current.canClimb) return;

    const { actor, tile } = this.g.contents(thing.x, thing.y + 1);

    if (actor && thing instanceof Actor) return;
    if (tile.solid) return;

    // we got a match!
    return thing instanceof Actor ? this.fall(thing) : this.itemFall(thing);
  }

  fall(thing: Actor): boolean {
    const { map } = this.g;
    const x = thing.x;
    let y = thing.y;
    let distance = 0;
    let victim: Actor | Tile = undefined;

    while (y < map.height) {
      const { actor, tile, fluid } = this.g.contents(x, y + 1);

      // landed
      if (tile.solid) {
        victim = tile;
        break;
      }

      // hit something
      if (actor) {
        victim = actor;
        break;
      }

      y++;
      distance++;

      if (fluid.canSwimIn) {
        victim = fluid;
        break;
      }

      if (thing.canClimb && tile.canClimb) {
        victim = tile;
        break;
      }
    }

    // ???
    if (distance === 0) return false;

    if (victim instanceof Tile)
      return this.fallOntoTile(thing, victim, distance, x, y);
    else return this.fallOntoActor(thing, victim, distance);
  }

  itemFall(thing: Item): boolean {
    const x = thing.x;
    let y = thing.y;
    let distance = 0;

    while (y < this.g.map.height) {
      const { actor, tile, fluid } = this.g.contents(x, y + 1);

      // landed
      if (tile.solid) break;
      if (actor?.pushable) break;

      y++;
      distance++;

      // TODO: float? sink?
      if (fluid.canSwimIn) break;
    }

    // ???
    if (distance === 0) return false;

    // TODO: damage, etc.

    this.g.moveItem(thing, x, y, "fall");
    this.g.emit("fell", { thing, distance });
    return true;
  }

  findPushTile(actor: Actor): XY {
    const offsets = [-1, 1];
    for (let i = 0; i < offsets.length; i++) {
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
  ): boolean {
    // NOTE doesn't check for victim.parent
    this.g.move(victim, x, y, "fall");
    this.g.emit("fell", { thing: victim, distance });
    if (!victim.alive || victim.inky || this.silent) return true;

    if (tile.canSwimIn) {
      if (victim.player) this.g.log.add(`You fall into ${name(tile)}!`);
    } else if (tile.canClimb) {
      if (victim.player) this.g.log.add(`You grab onto ${name(tile)}.`);
    } else if (distance > 3) {
      const amount = distance * 5;
      victim.hp -= amount;

      if (victim.player)
        this.g.log.add(`You fall and get hurt! (fell ${distance} tiles)`);
      this.g.emit("damaged", {
        attacker: victim,
        victim,
        amount,
        type: "fall",
      });
    }

    return true;
  }

  fallOntoActor(attacker: Actor, victim: Actor, distance: number): boolean {
    let escape = undefined;

    const parent = victim.parent || victim;
    const x = parent.x;
    let y = parent.y;
    if (!parent.alive || (parent.inky && attacker.inky) || this.silent)
      return this.fallOntoTile(
        attacker,
        this.g.map.get(x, y - 1),
        distance - 1,
        x,
        y - 1
      );

    const multiplier = 1 - parent.get("crushResistance");
    let amount = Math.round(multiplier * distance * 5);
    if (attacker.heavy) {
      escape = this.findPushTile(parent);
      if (!escape) amount = parent.hp;
    }

    if (amount > 0) {
      parent.hp -= amount;
      if (attacker.player) this.g.log.add(`You fall onto ${cname(parent)}!`);
      else if (parent.player)
        this.g.log.add(`${cname(attacker, true)} falls onto you!`);
      else this.g.log.add(`${cname(parent, true)} is crushed!`);

      this.g.emit("damaged", {
        attacker,
        victim: parent,
        amount,
        type: "crush",
      });
    }
    if (parent.alive) {
      y--;
      distance--;
      if (escape) this.g.move(parent, escape[0], escape[1], "crush", attacker);
      parent.reeling = true;
    }

    this.g.move(attacker, x, y, "fall");
    this.g.emit("fell", { thing: attacker, distance });
    return true;
  }
}
