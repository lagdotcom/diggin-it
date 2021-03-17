import Actor from "../Actor";
import Game from "../Game";
import { ctheName } from "../text";

export default class Combat {
  constructor(public g: Game) {}

  attack(attacker: Actor, victim: Actor): void {
    const amount = Math.max(1, attacker.get("sp") - victim.get("dp"));
    const aname = ctheName(attacker, true);
    const vname = ctheName(victim);
    const s = attacker.player ? "" : "s";

    this.g.emit("attacked", { attacker, victim });
    this.g.log.add(`${aname} hit${s} ${vname} for ${amount} damage.`);
    victim.hp -= amount;
    this.g.emit("damaged", { attacker, victim, amount, type: "combat" });
  }
}
