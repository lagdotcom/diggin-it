import Actor from "../Actor";
import Game from "../Game";
import { theName } from "../text";

export default class Combat {
  constructor(public g: Game) {}

  attack(attacker: Actor, victim: Actor) {
    const amount = Math.max(1, attacker.get("sp") - victim.get("dp"));
    const aname = theName(attacker);
    const vname = theName(victim);
    const s = aname === "you" ? "" : "s";

    this.g.emit("attacked", { attacker, victim });
    this.g.log.add(`${aname} hit${s} ${vname} for ${amount} damage.`);
    victim.hp -= amount;
    this.g.emit("damaged", { attacker, victim, amount, type: "combat" });
  }
}
