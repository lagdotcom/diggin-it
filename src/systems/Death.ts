import { RNG } from "rot-js";

import Actor from "../Actor";
import { gas } from "../entities/tiles";
import { EventMap } from "../Event";
import Game from "../Game";
import { getZone } from "../interfaces/Zone";
import { enemies, getRandomEnemy } from "../tables";
import { cname } from "../text";
import Tile from "../Tile";
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

      if (RNG.getPercentage() <= victim.finalBombChance) {
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

      if (RNG.getPercentage() <= victim.finalGasChance) {
        data.type = "gasExplosion";
        this.gasExplosion(victim.x, victim.y);
      }

      if (RNG.getPercentage() <= victim.finalScreamChance) {
        data.type = "finalScream";
        this.scream(victim);
      }

      this.g.log.add(this.getDeathString(data));
      this.g.remove(victim);
      this.g.emit("died", { attacker, victim });

      if (!victim.player) {
        this.g.player.experience += victim.experience;
        if (!victim.special) this.g.sfx.play("smallDead");
      } else {
        this.g.music.play("consolation");
        this.g.sfx.play("dead");
      }
    }
  }

  getDeathString({ victim, type }: DamagedData): string {
    const name = cname(victim, true);
    const s = victim.player ? "" : "s";
    const is = victim.player ? "are" : "is";

    switch (type) {
      case "crush":
        return `${name} ${is} flattened like a pancake!`;

      case "suffocation":
        return `${name} ran out of air.`;

      case "autoExplosion":
        return `${name} violently explodes!`;

      case "gasExplosion":
        return `${name} explodes into a cloud of gas!`;

      case "finalScream":
        return `${name} lets out a terrible scream as they collapse!`;

      default:
        return `${name} die${s}!`;
    }
  }

  gasExplosion(sx: number, sy: number): void {
    let success = false;

    for (let x = sx - 1; x <= sx + 1; x++) {
      for (let y = sy - 1; y <= sy + 1; y++) {
        const { fluid } = this.g.contents(x, y);

        if (fluid.glyph === " ") {
          this.g.mapFluid.set(x, y, new Tile(gas));
          success = true;
        }
      }
    }

    if (success) this.g.emit("mapChanged", {});
  }

  scream(victim: Actor): void {
    const {
      finalScreamTarget,
      finalScreamCount: [min, max],
    } = victim;

    const template =
      finalScreamTarget === "tier"
        ? getRandomEnemy({
            championChance: 0,
            zone: getZone(this.g.depth),
            fluid: " ",
          })
        : enemies[finalScreamTarget];

    const count = RNG.getUniformInt(min, max);
    let range = 2;
    let placed = 0;
    while (placed < count) {
      const positions = RNG.shuffle(
        this.g.map.diamond(victim.x, victim.y, range)
      );
      for (let i = 0; i < positions.length; i++) {
        const [x, y] = positions[i];
        const { actor, tile } = this.g.contents(x, y);
        if (actor) continue;
        if (tile.solid) continue;

        const spawn = new Actor(x, y, template);
        this.g.add(spawn);
        placed++;

        if (placed >= count) break;
      }

      range++;
    }
  }
}
