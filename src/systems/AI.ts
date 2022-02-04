import { RNG } from "rot-js";
import AStar from "rot-js/lib/path/astar";

import Actor, { ActorAI } from "../Actor";
import Movement from "../commands/Movement";
import { fire } from "../entities/temps";
import { MoveType } from "../Event";
import Game from "../Game";
import XY from "../interfaces/XY";
import Item from "../Item";
import { enemies } from "../tables";
import { cname } from "../text";
import { manhattan, traceline } from "../utils";
import Bombs from "./Bombs";
import Combat from "./Combat";
import Vision from "./Vision";

type AIStep =
  | "reeling"
  | "stunned"
  | "explodes"
  | "attack"
  | "wander"
  | "notice"
  | "approach"
  | "deactivate"
  | "spawn"
  | "teleport";
const aiSteps: Record<ActorAI, AIStep[]> = {
  wander: ["reeling", "stunned", "explodes", "attack", "wander"],
  fly: [
    "reeling",
    "stunned",
    "explodes",
    "notice",
    "attack",
    "approach",
    "deactivate",
  ],
  ink: [
    "reeling",
    "stunned",
    "notice",
    "spawn",
    "teleport",
    "attack",
    "approach",
  ],
};

export default class AI {
  constructor(
    public g: Game,
    public bombs: Bombs,
    public combat: Combat,
    public vision: Vision
  ) {
    g.on("tick", () => this.run());
  }

  run(): void {
    this.g.allActors.forEach((actor) => {
      if (!actor.ai) return;

      for (const step of aiSteps[actor.ai]) {
        const result = this[step](actor);
        if (result) return;
      }
    });
  }

  private reeling(actor: Actor) {
    if (actor.reeling) {
      actor.reeling = false;
      return true;
    }
  }

  private stunned(actor: Actor) {
    return actor.stunTimer > 0;
  }

  private spawn(actor: Actor) {
    const { log, map, player } = this.g;
    let spawn = actor.aiData.spawn || 0;

    spawn++;
    if (spawn >= actor.inkSpawnTimer) {
      const amount = RNG.getUniformInt(...actor.inkSpawnAmount);

      for (let i = 0; i < amount; i++) {
        const prefer =
          actor.inkSpawnLocation === "player"
            ? map.diamond(player.x, player.y, 4)
            : map.positions();

        const destinations = prefer.filter(([x, y]) => this.flyPassable(x, y));
        if (destinations.length) {
          actor.aiData.spawn = 0;
          const [x, y] = RNG.getItem(destinations);
          const babyType = RNG.getItem(actor.inkSpawn);
          const baby = new Actor(x, y, enemies[babyType]);
          this.g.add(baby);
          log.add(`${cname(baby, true)} splits from the ink!`);
          this.g.emit("mapChanged", {});
          return true;
        }
      }
    }

    actor.aiData.spawn = spawn;
  }

  private teleport(actor: Actor) {
    if (actor.teleportTracking > actor.teleportThreshold) {
      const passable = this.getPassableFunction(actor, this.g.player);
      const destinations = this.g.map
        .positions()
        .filter(([x, y]) => passable(x, y));
      if (destinations.length) {
        if (actor.inkTeleportType === "fire") {
          this.g.log.add(`The ink emits a wave of fire.`);
          const fire1 = new Item(actor.x, actor.y, fire);
          const fire2 = new Item(actor.x + 1, actor.y, fire);

          this.g.emit("effect", { effect: fire1, duration: 10 });
          this.g.addItem(fire1);
          this.g.emit("effect", { effect: fire2, duration: 10 });
          this.g.addItem(fire2);
        }

        actor.teleportTracking = 0;
        const [x, y] = RNG.getItem(destinations);
        this.doMove(actor, x, y, "teleport");
        this.g.log.add(`The ink suddenly vanishes!`);
        this.g.sfx.play("inkTeleport");
        return true;
      }
    }
  }

  private explodes(actor: Actor) {
    actor.explodeTimer--;
    if (actor.explodeTimer < 1) {
      const { x, y } = actor;
      this.g.log.add(`${cname(actor, true)} suddenly explodes!`);
      this.g.remove(actor);
      this.g.sfx.play("explode");

      const [xm, ym, w, h, dmg] = [
        -1,
        -1,
        actor.width + 2,
        actor.height + 2,
        30,
      ];
      this.bombs.runExplosion(x, y, xm, ym, w, h, dmg, !actor.inky);

      return true;
    }
  }

  private notice(actor: Actor): boolean {
    if (!actor.aiData.active) {
      if (this.vision.visible(actor.x, actor.y)) {
        actor.aiData.active = true;
        this.g.emit("noticed", { actor });
        return;
      }

      return true;
    }
  }

  private attack(actor: Actor) {
    const victim = this.g.player;
    if (!victim.alive) return;

    let inRange = false;
    const parts = [actor].concat(...(actor.parts || []));
    for (const part of parts) {
      if (
        !actor.obeysTiles &&
        manhattan(part.x, part.y, victim.x, victim.y) <= actor.attackRange
      ) {
        inRange = true;
        break;
      }

      const reach = this.g.map.diamond(part.x, part.y, actor.attackRange);
      if (
        reach.find(([x, y]) => x === victim.x && y === victim.y) &&
        traceline(this.g, part.x, part.y, victim.x, victim.y, ...parts) ===
          victim
      ) {
        inRange = true;
        break;
      }
    }

    if (inRange) {
      this.combat.attack(actor, victim);
      return true;
    }
  }

  private approach(actor: Actor) {
    const victim = this.g.player;
    if (!victim.alive) return;

    const aStar = new AStar(
      victim.x,
      victim.y,
      this.getPassableFunction(actor, victim),
      { topology: 4 }
    );
    const path: XY[] = [];
    aStar.compute(actor.x, actor.y, (x, y) => path.push([x, y]));

    if (path.length) {
      const [x, y] = path[1];
      this.doMove(actor, x, y, "walk");
      return true;
    }
  }

  private deactivate(actor: Actor) {
    actor.aiData.active = false;
    return true;
  }

  private wander(actor: Actor) {
    let dir = actor.aiData.dir || RNG.getItem([-1, 1]);

    let success = false;
    const move = this.canMoveDir(actor, dir);
    if (move) {
      const [mx, my] = move;
      if (this.isSafeMove(actor, mx, my)) {
        this.doMove(actor, actor.x + mx, actor.y + my, "walk");
        success = true;
      }
    }

    if (!success) {
      dir = -dir;

      const move2 = this.canMoveDir(actor, dir);
      if (move2) {
        const [mx, my] = move2;
        if (this.isSafeMove(actor, mx, my)) {
          this.doMove(actor, actor.x + mx, actor.y + my, "walk");
          success = true;
        }
      }
    }

    actor.aiData.dir = dir;
    return success;
  }

  canMoveDir(actor: Actor, mx: number): XY {
    if (actor.parts) {
      // not a mistake
      const passable = this.getPassableFunction(actor, actor);
      if (passable(actor.x + mx, actor.y)) return [mx, 0];
      return;
    }

    const my = 0;
    const side = this.g.contents(actor.x + mx, actor.y);

    // swimming? just do it
    if (actor.needsWater && side.fluid.canSwimIn) return [mx, my];

    if (side.actor) {
      if (
        side.actor.pushable &&
        Movement.canClimb(this.g, actor.x, actor.y, mx)
      )
        return [mx, my - 1];

      return;
    }

    if (side.tile.solid) {
      if (Movement.canClimb(this.g, actor.x, actor.y, mx)) return [mx, my - 1];
      else return;
    }

    return [mx, my];
  }

  private isSafeMove(actor: Actor, mx: number, my: number) {
    if (!actor.obeysGravity) return true;

    const below = this.g.contents(actor.x + mx, actor.y + my + 1);
    if (below.tile.solid) return true;
    if (below.actor?.pushable) return true;
    if (below.tile.walkOntoDamage) return false;

    // falling one step is acceptable - can get back up
    const further = this.g.contents(actor.x + mx, actor.y + my + 2);
    if (further.tile.solid) return true;
    if (further.actor?.pushable) return true;

    return false;
  }

  private getPassableFunction(actor: Actor, victim: Actor) {
    if (!actor.parts)
      return this.getSinglePassableFunction(actor, [actor, victim]);

    const [parts, offsets] = this.getPartsAndOffsets(actor);
    const passable = this.getSinglePassableFunction(
      actor,
      parts.concat(victim)
    );

    return (x: number, y: number) => {
      for (let i = 0; i < parts.length; i++) {
        const [ox, oy] = offsets[i];
        if (!passable(x + ox, y + oy)) return false;
      }

      return true;
    };
  }

  private getSinglePassableFunction(actor: Actor, parts: Actor[]) {
    return actor.obeysTiles
      ? actor.needsWater
        ? (x: number, y: number) =>
            this.g.mapFluid.get(x, y).canSwimIn && this.flyPassable(x, y, parts)
        : (x: number, y: number) => this.flyPassable(x, y, parts)
      : (x: number, y: number) => this.ghostPassable(x, y, parts);
  }

  private flyPassable(x: number, y: number, ignore: Actor[] = []) {
    const { actor, tile } = this.g.contents(x, y);
    if (tile.solid) return false;
    if (actor && !ignore.includes(actor)) return false;
    return this.g.map.contains(x, y);
  }

  private ghostPassable(x: number, y: number, ignore: Actor[] = []) {
    const { actor } = this.g.contents(x, y);
    if (actor && !ignore.includes(actor)) return false;
    return this.g.map.contains(x, y);
  }

  private doMove(actor: Actor, x: number, y: number, type: MoveType) {
    const [parts, offsets] = this.getPartsAndOffsets(actor);
    for (let i = 0; i < parts.length; i++) {
      const [ox, oy] = offsets[i];
      this.g.move(parts[i], x + ox, y + oy, type);
    }
  }

  private getPartsAndOffsets(actor: Actor): [parts: Actor[], offsets: XY[]] {
    const parts = [actor];
    const offsets: XY[] = [[0, 0]];
    if (actor.parts && actor.partOffsets) {
      parts.push(...actor.parts);
      offsets.push(...actor.partOffsets);
    }

    return [parts, offsets];
  }
}
