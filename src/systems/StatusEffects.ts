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
    const parent = victim.parent || victim;

    switch (status) {
      case "poison":
        if (!parent.poisoned) {
          parent.poisoned = true;
          log.add(
            parent.player
              ? warning + "You feel very ill."
              : `${theName(parent, true)} looks ill.`
          );
        }
        return;

      case "stun":
        if (!parent.stunTimer)
          log.add(
            parent.player
              ? warning + "You're rooted in place."
              : `${theName(parent, true)} is rooted in place.`
          );
        else
          log.add(
            parent.player
              ? warning + "Your legs stiffen further."
              : `${theName(parent, true)} looks even stiffer.`
          );
        parent.stunTimer += RNG.getUniformInt(3, 6);
        return;

      case "bleed":
        this.worsenBleeding(parent);
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
            : `${theName(victim, true)} starts bleeding.`
        );
        victim.bleedAmount = 1;
        return;

      case 1:
        log.add(
          victim.player
            ? warning + "Your cut is worse now."
            : `${theName(victim, true)} starts bleeding more.`
        );
        victim.bleedAmount = 3;
        return;

      case 3:
        log.add(
          victim.player
            ? warning + "You're losing a lot of blood."
            : `${theName(victim, true)} starts bleeding badly.`
        );
        victim.bleedAmount = 5;
        return;

      case 5:
        log.add(
          victim.player
            ? warning + "You're losing pints of blood!"
            : `${theName(victim, true)} starts bleeding fatally.`
        );
        victim.bleedAmount = 10;
    }
  }

  tick(): void {
    const { allActors, log } = this.g;

    allActors.forEach((victim) => {
      const parent = victim.parent || victim;

      if (parent.alive && parent.poisoned) {
        const amount = 1;
        parent.hp -= amount;
        this.g.emit("damaged", { victim: parent, amount, type: "status" });
      }

      if (parent.alive && parent.stunTimer > 0) {
        parent.stunTimer--;
        if (!parent.stunTimer) {
          this.g.emit("statusRemoved", { actor: parent, type: "stun" });
          log.add(
            parent.player
              ? "You can move again."
              : `${theName(parent, true)} can move again.`
          );
        }
      }

      if (parent.alive && parent.bleedAmount) {
        parent.bleedTimer--;
        if (parent.bleedTimer < 0)
          this.g.emit("statusApplied", { victim: parent, type: "bleed" });

        const amount = parent.bleedAmount;
        parent.hp -= amount;
        this.g.emit("damaged", { victim: parent, amount, type: "status" });
      }
    });
  }
}
