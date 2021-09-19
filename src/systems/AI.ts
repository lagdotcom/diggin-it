import { RNG } from "rot-js";
import AStar from "rot-js/lib/path/astar";
import { PassableCallback } from "rot-js/lib/path/path";

import Actor, { ActorAI, AIData } from "../Actor";
import Movement from "../commands/Movement";
import { fire } from "../entities/temps";
import Game from "../Game";
import XY from "../interfaces/XY";
import Item from "../Item";
import { enemies } from "../tables";
import { cname } from "../text";
import { manhattan, traceline } from "../utils";
import Bombs from "./Bombs";
import Combat from "./Combat";
import Vision from "./Vision";

export default class AI {
  functions: Record<ActorAI, (actor: Actor, data: AIData) => void>;

  constructor(
    public g: Game,
    public bombs: Bombs,
    public combat: Combat,
    public vision: Vision
  ) {
    this.functions = {
      wander: this.wanderAi.bind(this),
      fly: this.flyingAi.bind(this),
      ink: this.inkAi.bind(this),
    };

    g.on("tick", () => this.run());
  }

  run(): void {
    this.g.allActors.forEach((actor) => {
      if (!actor.ai) return;

      if (this.functions[actor.ai])
        this.functions[actor.ai](actor, actor.aiData);
      else throw Error("Invalid AI name: " + actor.ai);
    });
  }

  canAttack(actor: Actor, victim: Actor): boolean {
    if (!victim.alive) return false;

    if (!actor.obeysTiles)
      return (
        manhattan(actor.x, actor.y, victim.x, victim.y) <= actor.attackRange
      );

    const reach = this.g.map.diamond(actor.x, actor.y, actor.attackRange);
    if (!reach.find(([x, y]) => x === victim.x && y === victim.y)) return false;

    return (
      traceline(this.g, actor.x, actor.y, victim.x, victim.y, actor) === victim
    );
  }

  doesExplode(actor: Actor): boolean {
    actor.explodeTimer--;
    if (actor.explodeTimer < 1) {
      const { x, y } = actor;
      this.g.log.add(`${cname(actor, true)} suddenly explodes!`);
      this.g.remove(actor);
      this.g.sfx.play("explode");

      const [xm, ym, w, h, dmg] = [-1, -1, 3, 3, 30];
      this.bombs.runExplosion(x, y, xm, ym, w, h, dmg, !actor.inky);

      return true;
    }
  }

  wanderAi(actor: Actor, data: AIData): void {
    if (actor.reeling) {
      actor.reeling = false;
      return;
    }

    if (actor.stunTimer > 0) return;
    if (this.doesExplode(actor)) return;

    let { dir } = data;
    if (!dir) dir = RNG.getItem([-1, 1]);

    const { player } = this.g;
    if (this.canAttack(actor, player)) return this.combat.attack(actor, player);

    let success = false;
    const move = this.canMoveDir(actor, dir);
    if (move) {
      const [mx, my] = move;
      if (this.isSafeMove(actor, mx, my)) {
        this.g.move(actor, actor.x + mx, actor.y + my, "walk");
        success = true;
      }
    }

    if (!success) {
      dir = -dir;

      const move2 = this.canMoveDir(actor, dir);
      if (move2) {
        const [mx, my] = move2;
        if (this.isSafeMove(actor, mx, my)) {
          this.g.move(actor, actor.x + mx, actor.y + my, "walk");
        }
      }
    }

    actor.aiData = { dir };
  }

  canMoveDir(actor: Actor, mx: number): XY {
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

  isSafeMove(actor: Actor, mx: number, my: number): boolean {
    const below = this.g.contents(actor.x + mx, actor.y + my + 1);
    if (below.tile.solid) return true;
    if (below.actor?.pushable) return true;

    // falling one step is acceptable - can get back up
    const further = this.g.contents(actor.x + mx, actor.y + my + 2);
    if (further.tile.solid) return true;
    if (further.actor?.pushable) return true;

    return false;
  }

  flyPassable(x: number, y: number, ignore: Actor[] = []): boolean {
    const { actor, tile } = this.g.contents(x, y);
    if (ignore.includes(actor)) return true;
    if (actor || tile.solid) return false;
    return true;
  }

  flyingAi(actor: Actor, data: AIData): void {
    if (actor.reeling) {
      actor.reeling = false;
      return;
    }

    if (actor.stunTimer > 0) return;
    if (this.doesExplode(actor)) return;

    let { active } = data;
    if (!active) {
      if (this.vision.visible(actor.x, actor.y)) {
        active = true;
        this.g.emit("noticed", { actor });
      } else return;
    }

    const { player } = this.g;
    if (this.canAttack(actor, player)) return this.combat.attack(actor, player);

    const passable: PassableCallback = actor.obeysTiles
      ? actor.needsWater
        ? (x, y) =>
            this.g.mapFluid.get(x, y).canSwimIn &&
            this.flyPassable(x, y, [player, actor])
        : (x, y) => this.flyPassable(x, y, [player, actor])
      : (x, y) => this.g.map.contains(x, y);

    const aStar = new AStar(player.x, player.y, passable, { topology: 4 });
    const path: XY[] = [];
    aStar.compute(actor.x, actor.y, (x, y) => path.push([x, y]));

    if (path.length) {
      const [x, y] = path[1];
      this.g.move(actor, x, y, "walk");
    } else active = false;

    actor.aiData = { active };
  }

  inkAi(a: Actor, data: AIData): void {
    let { active, spawn } = data;
    if (!active) {
      if (this.vision.visible(a.x, a.y)) {
        active = true;
        this.g.emit("noticed", { actor: a });
      } else return;
    }
    if (!spawn) spawn = 0;

    const [b, c, d] = a.parts;
    const allInk = [a, b, c, d];
    const { player } = this.g;

    if (a.reeling || b.reeling || c.reeling || d.reeling) {
      a.reeling = false;
      b.reeling = false;
      c.reeling = false;
      d.reeling = false;
      return;
    }

    if (
      a.stunTimer > 0 ||
      b.stunTimer > 0 ||
      c.stunTimer > 0 ||
      d.stunTimer > 0
    )
      return;

    spawn++;
    if (spawn >= a.inkSpawnTimer) {
      const amount = RNG.getUniformInt(...a.inkSpawnAmount);

      for (let i = 0; i < amount; i++) {
        const prefer =
          a.inkSpawnLocation === "player"
            ? this.g.map.diamond(player.x, player.y, 4)
            : this.g.map.positions();

        const destinations = prefer.filter(([x, y]) => this.flyPassable(x, y));
        if (destinations.length) {
          spawn = 0;
          const [x, y] = RNG.getItem(destinations);
          const babyType = RNG.getItem(a.inkSpawn);
          const baby = new Actor(x, y, enemies[babyType]);
          this.g.add(baby);
          this.g.log.add(`${cname(baby, true)} splits from the ink!`);
          this.g.emit("mapChanged", {});
        }
      }
    }

    a.aiData = { active, spawn };

    if (a.teleportTracking > a.teleportThreshold) {
      const destinations = this.g.map
        .positions()
        .filter(([x, y]) => this.inkCanMoveHere(x, y, allInk));
      if (destinations.length) {
        if (a.inkTeleportType === "fire") {
          this.g.log.add(`The ink emits a wave of fire.`);
          const fire1 = new Item(a.x, a.y, fire);
          const fire2 = new Item(a.x + 1, a.y, fire);

          this.g.emit("effect", { effect: fire1, duration: 10 });
          this.g.addItem(fire1);
          this.g.emit("effect", { effect: fire2, duration: 10 });
          this.g.addItem(fire2);
        }

        a.teleportTracking = 0;
        const [x, y] = RNG.getItem(destinations);
        this.moveInk(x, y, a, b, c, d);
        this.g.log.add(`The ink suddenly vanishes!`);
        this.g.sfx.play("inkTeleport");
        return;
      }
    }

    if (
      player.alive &&
      (this.canAttack(a, player) ||
        this.canAttack(b, player) ||
        this.canAttack(c, player) ||
        this.canAttack(d, player))
    ) {
      return this.combat.attack(a, player);
    }

    const moves = [
      this.getInkMove(player, a, 0, 0),
      this.getInkMove(player, b, 1, 0),
      this.getInkMove(player, c, 0, 1),
      this.getInkMove(player, d, 1, 1),
    ].filter((m) => m);
    if (moves.length) {
      const [x, y] = RNG.getItem(moves);
      this.moveInk(x, y, a, b, c, d);
    }
  }

  private getInkMove(player: Actor, part: Actor, ox: number, oy: number) {
    const ignore = [player, part, ...part.parts];

    const astar = new AStar(
      player.x,
      player.y,
      (x, y) => this.inkCanMoveHere(x - ox, y - oy, ignore),
      { topology: 4 }
    );

    const path: XY[] = [];
    astar.compute(part.x, part.y, (x, y) => path.push([x - ox, y - oy]));
    if (path.length) return path[1];
  }

  private moveInk(
    x: number,
    y: number,
    a: Actor,
    b: Actor,
    c: Actor,
    d: Actor
  ) {
    this.g.move(a, x, y, "walk");
    this.g.move(b, x + 1, y, "walk");
    this.g.move(c, x, y + 1, "walk");
    this.g.move(d, x + 1, y + 1, "walk");
  }

  private inkCanMoveHere(x: number, y: number, ignore: Actor[]) {
    return (
      this.flyPassable(x, y, ignore) &&
      this.flyPassable(x + 1, y, ignore) &&
      this.flyPassable(x, y + 1, ignore) &&
      this.flyPassable(x + 1, y + 1, ignore)
    );
  }
}
