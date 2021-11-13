import { RNG } from "rot-js";

import Actor from "../Actor";
import { bg, darkRed } from "../colours";
import { StatusType } from "../Event";
import Game from "../Game";
import { theName } from "../text";

const warning = bg(darkRed);

type StatusFn = (victim: Actor) => void;

export default class StatusEffects {
  mapping: Record<StatusType, StatusFn>;

  constructor(public g: Game) {
    g.on("statusApplied", ({ victim, type }) => this.applyStatus(type, victim));
    g.on("tick", this.tick.bind(this));

    this.mapping = {
      poison: this.poisonApply.bind(this),
      stun: this.stunApply.bind(this),
      bleed: this.bleedApply.bind(this),
    };
  }

  applyStatus(status: StatusType, victim: Actor): void {
    const parent = victim.parent || victim;
    this.mapping[status](parent);
  }

  poisonApply(victim: Actor): void {
    if (!victim.poisoned) {
      victim.poisoned = true;
      this.g.log.add(
        victim.player
          ? warning + "You feel very ill."
          : `${theName(victim, true)} looks ill.`
      );
    }
  }

  stunApply(victim: Actor): void {
    const { log } = this.g;

    if (!victim.stunTimer)
      log.add(
        victim.player
          ? warning + "You're rooted in place."
          : `${theName(victim, true)} is rooted in place.`
      );
    else
      log.add(
        victim.player
          ? warning + "Your legs stiffen further."
          : `${theName(victim, true)} looks even stiffer.`
      );
    victim.stunTimer = Math.min(10, victim.stunTimer + RNG.getUniformInt(3, 6));
  }

  bleedApply(victim: Actor): void {
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
      // don't process statuses multiple times
      if (victim.parent) return;

      if (victim.alive && victim.poisoned) {
        const amount = 1;
        victim.hp -= amount;
        this.g.emit("damaged", { victim: victim, amount, type: "status" });
      }

      if (victim.alive && victim.stunTimer > 0) {
        victim.stunTimer--;
        if (!victim.stunTimer) {
          this.g.emit("statusRemoved", { actor: victim, type: "stun" });
          log.add(
            victim.player
              ? "You can move again."
              : `${theName(victim, true)} can move again.`
          );
        }
      }

      if (victim.alive && victim.bleedAmount) {
        victim.bleedTimer--;
        if (victim.bleedTimer < 0)
          this.g.emit("statusApplied", { victim: victim, type: "bleed" });

        const amount = victim.bleedAmount;
        victim.hp -= amount;
        this.g.emit("damaged", { victim: victim, amount, type: "status" });
      }
    });
  }
}
