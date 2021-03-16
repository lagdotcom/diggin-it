import { EventMap } from "../Event";
import Game from "../Game";
import { name } from "../text";

type DamagedData = EventMap["damaged"];

export default class Death {
  constructor(public g: Game) {
    g.on("damaged", this.damaged.bind(this));
  }

  damaged(data: DamagedData): void {
    const { attacker, victim } = data;

    if (victim.hp < 1) {
      victim.alive = false;
      this.g.log.add(this.getDeathString(data));
      this.g.remove(victim);
      this.g.emit("died", { attacker, victim });

      if (!victim.player) this.g.player.experience += victim.experience;
      else this.g.playMusic("consolation");
    }
  }

  getDeathString({ victim, type }: DamagedData): string {
    const vname = name(victim);
    const s = victim.player ? "" : "s";
    const is = victim.player ? "are" : "is";

    switch (type) {
      case "crush":
        return `${vname} ${is} flattened like a pancake!`;

      case "suffocation":
        return `${vname} ran out of air.`;

      default:
        return `${vname} die${s}!`;
    }
  }
}
