import { RNG } from "rot-js";

import { EventMap } from "../Event";
import Game from "../Game";
import { cname } from "../text";
import Bombs from "./Bombs";

type DamagedData = EventMap["damaged"];

export default class Death {
  constructor(public g: Game, public bombs: Bombs) {
    g.on("damaged", this.damaged.bind(this));
  }

  damaged(data: DamagedData): void {
    const { attacker, victim } = data;

    if (victim.hp < 1) {
      victim.alive = false;

      const bomb = victim.finalBombChance;
      if (RNG.getPercentage() <= bomb) {
        data.type = "autoExplosion";

        this.bombs.runExplosion(
          victim.x,
          victim.y,
          -1,
          -1,
          3,
          3,
          30,
          !victim.inky
        );
      }

      this.g.log.add(this.getDeathString(data));
      this.g.remove(victim);
      this.g.emit("died", { attacker, victim });

      if (!victim.player) this.g.player.experience += victim.experience;
      else {
        this.g.music.play("consolation");
        this.g.sfx.play("dead");
      }
    }
  }

  getDeathString({ victim, type }: DamagedData): string {
    const vname = cname(victim, true);
    const s = victim.player ? "" : "s";
    const is = victim.player ? "are" : "is";

    switch (type) {
      case "crush":
        return `${vname} ${is} flattened like a pancake!`;

      case "suffocation":
        return `${vname} ran out of air.`;

      case "autoExplosion":
        return `${vname} violently explodes!`;

      default:
        return `${vname} die${s}!`;
    }
  }
}
