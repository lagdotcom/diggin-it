import { RNG } from "rot-js";

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

    if (RNG.getPercentage() <= attacker.stunChance)
      this.g.emit("statusApplied", { attacker, victim, type: "stun" });

    if (RNG.getPercentage() <= attacker.bleedChance)
      this.g.emit("statusApplied", { attacker, victim, type: "bleed" });

    if (RNG.getPercentage() <= attacker.poisonChance)
      this.g.emit("statusApplied", { attacker, victim, type: "poison" });

    // TODO: knockback
    // if (RNG.getPercentage() <= attacker.knockBackChance)
    //   this.g.emit("statusApplied", { attacker, victim, type: "knockback" });
  }
}
