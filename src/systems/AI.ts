import AStar from "rot-js/lib/path/astar";

import Actor, { ActorAI } from "../Actor";
import Movement from "../commands/Movement";
import Game from "../Game";
import XY from "../interfaces/XY";
import { pick } from "../random";
import { manhattan } from "../utils";
import Combat from "./Combat";
import Vision from "./Vision";

export default class AI {
  functions: Record<ActorAI, (actor: Actor, data: any) => void>;

  constructor(public g: Game, public combat: Combat, public vision: Vision) {
    this.functions = {
      wander: this.wanderAi.bind(this),
      fly: this.flyingAi.bind(this),
      ink: this.inkAi.bind(this),
    };

    g.on("tick", () => this.run());
  }

  run() {
    this.g.allActors.forEach((actor) => {
      if (!actor.ai) return;

      if (this.functions[actor.ai])
        this.functions[actor.ai](actor, actor.aiData);
      else throw Error("Invalid AI name: " + actor.ai);
    });
  }

  wanderAi(actor: Actor, data: any) {
    let { dir } = data;
    if (!dir) dir = pick(-1, 1);

    const { player } = this.g;
    if (player.alive && manhattan(player.x, player.y, actor.x, actor.y) < 2) {
      return this.combat.attack(actor, player);
    }

    var success = false;
    const move = this.canMoveDir(actor, dir);
    if (move) {
      const [mx, my] = move;
      if (this.isSafeMove(actor, mx, my)) {
        this.g.move(actor, actor.x + mx, actor.y + my);
        success = true;
      }
    }

    if (!success) {
      dir = -dir;

      const move2 = this.canMoveDir(actor, dir);
      if (move2) {
        const [mx, my] = move2;
        if (this.isSafeMove(actor, mx, my)) {
          this.g.move(actor, actor.x + mx, actor.y + my);
        }
      }
    }

    actor.aiData = { dir };
  }

  canMoveDir(actor: Actor, mx: number): XY {
    var my = 0;

    const side = this.g.contents(actor.x + mx, actor.y);
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

  isSafeMove(actor: Actor, mx: number, my: number) {
    const below = this.g.contents(actor.x + mx, actor.y + my + 1);
    if (below.tile.solid) return true;
    if (below.actor?.pushable) return true;

    // falling one step is acceptable - can get back up
    const further = this.g.contents(actor.x + mx, actor.y + my + 2);
    if (further.tile.solid) return true;
    if (further.actor?.pushable) return true;

    return false;
  }

  flyPassable(x: number, y: number, ignore: Actor[] = []) {
    const { actor, tile } = this.g.contents(x, y);
    if (ignore.includes(actor)) return true;
    if (actor || tile.solid) return false;
    return true;
  }

  flyingAi(enemy: Actor, data: any) {
    var { active } = data;
    if (!active) {
      if (this.vision.visible(enemy.x, enemy.y)) {
        active = true;
        this.g.emit("noticed", { actor: enemy });
      } else return;
    }

    const { player } = this.g;
    if (player.alive && manhattan(player.x, player.y, enemy.x, enemy.y) < 2) {
      return this.combat.attack(enemy, player);
    }

    const astar = new AStar(
      player.x,
      player.y,
      (x, y) => this.flyPassable(x, y, [player, enemy]),
      { topology: 4 }
    );

    const path: XY[] = [];
    astar.compute(enemy.x, enemy.y, (x, y) => path.push([x, y]));

    if (path.length) {
      const [x, y] = path[1];
      this.g.move(enemy, x, y);
    } else active = false;

    enemy.aiData = { active };
  }

  inkAi(a: Actor, data: any) {
    var { active } = data;
    if (!active) {
      if (this.vision.visible(a.x, a.y)) {
        active = true;
        this.g.emit("noticed", { actor: a });
      } else return;
    }

    const { inkparts } = a;
    const [b, c, d] = inkparts;

    const { player } = this.g;
    if (
      player.alive &&
      (manhattan(player.x, player.y, a.x, a.y) < 2 ||
        manhattan(player.x, player.y, b.x, b.y) < 2 ||
        manhattan(player.x, player.y, c.x, c.y) < 2 ||
        manhattan(player.x, player.y, d.x, d.y) < 2)
    ) {
      return this.combat.attack(a, player);
    }

    const astar = new AStar(
      player.x,
      player.y,
      (x, y) =>
        this.flyPassable(x, y, [player, a, b, c, d]) &&
        this.flyPassable(x + 1, y, [player, a, b, c, d]) &&
        this.flyPassable(x, y + 1, [player, a, b, c, d]) &&
        this.flyPassable(x + 1, y + 1, [player, a, b, c, d]),
      { topology: 4 }
    );

    const path: XY[] = [];
    astar.compute(a.x, a.y, (x, y) => path.push([x, y]));

    if (path.length) {
      const [x, y] = path[1];
      this.g.move(a, x, y);
      this.g.move(b, x + 1, y);
      this.g.move(c, x, y + 1);
      this.g.move(d, x + 1, y + 1);
    } else active = false;

    a.aiData = { active };
  }
}
