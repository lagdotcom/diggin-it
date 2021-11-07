import Actor from "../Actor";
import Game from "../Game";
import { theName } from "../text";

export default class Traps {
  constructor(public g: Game) {
    g.on("fell", ({ thing }) => {
      if (thing._type === "Actor" && thing.obeysGravity && thing.alive)
        this.fallOntoCheck(thing);
    });

    g.on("moved", ({ thing, type }) => {
      if (
        thing._type === "Actor" &&
        thing.obeysGravity &&
        thing.alive &&
        ["walk", "push", "crush", "climb"].includes(type)
      )
        this.walkOntoCheck(thing);
    });
  }

  fallOntoCheck(victim: Actor): void {
    const { log, map } = this.g;

    const tile = map.get(victim.x, victim.y + 1);
    const amount = tile.fallOntoDamage;
    if (amount) {
      const parent = victim.parent || victim;

      if (parent.player) log.add(`${theName(tile, true)} cuts you apart!`);
      else log.add(`${theName(tile, true)} cuts ${theName(parent)} apart!`);

      parent.hp -= amount;
      this.g.emit("damaged", { victim: parent, amount, type: "trap" });
    }
  }

  walkOntoCheck(victim: Actor): void {
    const { log, map } = this.g;

    const current = map.get(victim.x, victim.y);
    if (current.canClimb && victim.canClimb) return;

    const tile = map.get(victim.x, victim.y + 1);
    const amount = tile.walkOntoDamage;
    if (amount) {
      const parent = victim.parent || victim;

      if (parent.player) log.add(`${theName(tile, true)} cuts your feet!`);
      else log.add(`${theName(tile, true)} cuts ${theName(parent)}!`);

      parent.hp -= amount;
      this.g.emit("damaged", { victim: parent, amount, type: "trap" });
    }
  }
}
