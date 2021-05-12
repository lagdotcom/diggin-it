import Actor from "../Actor";
import Game from "../Game";
import { theName } from "../text";

export default class Traps {
  constructor(public g: Game) {
    g.on("damaged", ({ victim, type }) => {
      if (type === "fall") this.fallOntoCheck(victim);
    });
  }

  fallOntoCheck(victim: Actor): void {
    const { log, map } = this.g;

    const tile = map.get(victim.x, victim.y + 1);
    const amount = tile.fallOntoDamage;
    if (amount) {
      if (victim.player) log.add(`${theName(tile, true)} cuts you apart!`);
      else log.add(`${theName(tile, true)} cuts ${theName(victim)} apart!`);

      victim.hp -= amount;
      this.g.emit("damaged", { victim, amount, type: "trap" });
    }
  }
}
