import { RNG } from "rot-js";

import Actor from "../Actor";
import { bg, darkRed } from "../colours";
import { StatusType } from "../Event";
import Game from "../Game";
import { theName } from "../text";

const warning = bg(darkRed);

export default class StatusEffects {
  constructor(public g: Game) {
    g.on("statusApplied", ({ victim, type }) => this.applyStatus(type, victim));
    g.on("tick", this.tick.bind(this));
  }

  applyStatus(status: StatusType, victim: Actor): void {
    const { log } = this.g;

    switch (status) {
      case "poison":
        if (!victim.poisoned) {
          victim.poisoned = true;
          log.add(
            victim.player
              ? warning + "You feel very ill."
              : `${theName(victim)} looks ill.`
          );
        }
        return;

      case "stun":
        if (!victim.stunTimer)
          log.add(
            victim.player
              ? warning + "You're rooted in place."
              : `${theName(victim)} is rooted in place.`
          );
        else
          log.add(
            victim.player
              ? warning + "Your legs stiffen further."
              : `${theName(victim)} looks even stiffer.`
          );
        victim.stunTimer += RNG.getUniformInt(3, 6);
        return;

      case "bleed":
        this.worsenBleeding(victim);
        return;
    }
  }

  worsenBleeding(victim: Actor): void {
    const { log } = this.g;

    victim.bleedTimer = RNG.getUniformInt(20, 30);
    switch (victim.bleedAmount) {
      case 0:
        log.add(
          victim.player
            ? warning + "You start bleeding."
            : `${theName(victim)} starts bleeding.`
        );
        victim.bleedAmount = 1;
        return;

      case 1:
        log.add(
          victim.player
            ? warning + "Your cut is worse now."
            : `${theName(victim)} starts bleeding more.`
        );
        victim.bleedAmount = 3;
        return;

      case 3:
        log.add(
          victim.player
            ? warning + "You're losing a lot of blood."
            : `${theName(victim)} starts bleeding badly.`
        );
        victim.bleedAmount = 5;
        return;

      case 5:
        log.add(
          victim.player
            ? warning + "You're losing pints of blood!"
            : `${theName(victim)} starts bleeding fatally.`
        );
        victim.bleedAmount = 10;
    }
  }

  tick(): void {
    const { allActors, log } = this.g;

    allActors.forEach((victim) => {
      if (victim.alive && victim.poisoned) {
        const amount = 1;
        victim.hp -= amount;
        this.g.emit("damaged", { victim, amount, type: "status" });
      }

      if (victim.alive && victim.stunTimer > 0) {
        victim.stunTimer--;
        if (!victim.stunTimer) {
          this.g.emit("statusRemoved", { actor: victim, type: "stun" });
          log.add(
            victim.player
              ? "You can move again."
              : `${theName(victim)} can move again.`
          );
        }
      }

      if (victim.alive && victim.bleedAmount) {
        victim.bleedTimer--;
        if (victim.bleedTimer < 0)
          this.g.emit("statusApplied", { victim, type: "bleed" });

        const amount = victim.bleedAmount;
        victim.hp -= amount;
        this.g.emit("damaged", { victim, amount, type: "status" });
      }
    });
  }
}
