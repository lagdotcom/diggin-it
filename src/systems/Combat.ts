import Actor from "../Actor";
import Game from "../Game";
import { theName } from "../text";

export default class Combat {
  constructor(public g: Game) {}

  attack(attacker: Actor, victim: Actor) {
    const damage = attacker.attack - victim.defense;
    const aname = theName(attacker);
    const vname = theName(victim);
    const s = aname === "you" ? "" : "s";

    if (damage < 1) {
      this.g.log.add(`${aname} hit${s} ${vname} but does no damage.`);
      return;
    }

    this.g.log.add(`${aname} hit${s} ${vname} for ${damage} damage.`);
    victim.hp -= damage;

    if (victim.hp < 1) {
      this.g.log.add(`${vname} dies!`);
      this.g.remove(victim);
    }
  }
}
