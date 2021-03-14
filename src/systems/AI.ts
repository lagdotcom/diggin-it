import AStar from "rot-js/lib/path/astar";

import Actor from "../Actor";
import Movement from "../commands/Movement";
import Game from "../Game";
import XY from "../interfaces/XY";
import { pick } from "../random";
import { manhattan } from "../utils";
import Combat from "./Combat";
import Vision from "./Vision";

export default class AI {
  functions: Record<string, (actor: Actor, data: any) => void>;

  constructor(public g: Game, public combat: Combat, public vision: Vision) {
    this.functions = {
      wander: this.wanderAi.bind(this),
      fly: this.flyingAi.bind(this),
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

  flyingAi(enemy: Actor, data: any) {
    var { active } = data;
    if (!active) {
      if (this.vision.visible(enemy.x, enemy.y)) active = true;
      else return;
    }

    const { player } = this.g;
    if (player.alive && manhattan(player.x, player.y, enemy.x, enemy.y) < 2) {
      return this.combat.attack(enemy, player);
    }

    const astar = new AStar(
      player.x,
      player.y,
      (x, y) => {
        const { actor, tile } = this.g.contents(x, y);
        if (actor === enemy) return true;
        if (actor || tile.solid) return false;
        return true;
      },
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
}
