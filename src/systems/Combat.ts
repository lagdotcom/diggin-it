import { RNG } from "rot-js";

import Actor from "../Actor";
import Game from "../Game";
import Item from "../Item";
import { ctheName } from "../text";

export default class Combat {
  constructor(public g: Game) {
    g.on("attacked", this.attackEffects.bind(this));
  }

  attack(attacker: Actor, victim: Actor, item?: Item): void {
    const amount = Math.max(1, attacker.get("sp") - victim.get("dp"));
    const aname = ctheName(attacker, true);
    const vname = ctheName(victim);
    const s = attacker.player ? "" : "s";

    this.g.log.add(`${aname} hit${s} ${vname} for ${amount} damage.`);
    victim.hp -= amount;
    this.g.emit("damaged", { attacker, victim, amount, type: "combat" });
    this.g.emit("attacked", { attacker, victim, item });
  }

  attackEffects({
    attacker,
    victim,
    item,
  }: {
    attacker: Actor;
    victim: Actor;
    item?: Item;
  }): void {
    // don't add insult to injury
    if (victim.hp <= 0) return;

    const stun = attacker.stunChance + item?.stunChance;
    const poison = attacker.poisonChance + item?.poisonChance;
    const bleed = attacker.bleedChance + item?.bleedChance;

    if (RNG.getPercentage() <= stun)
      this.g.emit("statusApplied", { attacker, victim, type: "stun" });

    if (RNG.getPercentage() <= bleed)
      this.g.emit("statusApplied", { attacker, victim, type: "bleed" });

    if (RNG.getPercentage() <= poison)
      this.g.emit("statusApplied", { attacker, victim, type: "poison" });

    // TODO: knockback
    // if (RNG.getPercentage() <= attacker.knockBackChance)
    //   this.g.emit("statusApplied", { attacker, victim, type: "knockback" });
  }
}
