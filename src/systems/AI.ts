import Actor from "../Actor";
import Game from "../Game";
import XY from "../interfaces/XY";
import { pick } from "../random";
import { manhattan } from "../utils";
import Combat from "./Combat";

export default class AI {
  functions: Record<string, (actor: Actor) => void>;

  constructor(public g: Game, public combat: Combat) {
    this.functions = {
      wander: this.wanderAi.bind(this),
    };
  }

  run() {
    this.g.allActors.forEach((actor) => {
      if (!actor.ai) return;

      if (this.functions[actor.ai]) this.functions[actor.ai](actor);
      else throw Error("Invalid AI name: " + actor.ai);
    });
  }

  wanderAi(actor: Actor) {
    let { dir } = actor.aiData;
    if (!dir) dir = pick(-1, 1);

    const { player } = this.g;
    if (manhattan(player.x, player.y, actor.x, actor.y) < 2) {
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
    if (side.actor) return;

    if (side.tile.solid) {
      const thru = this.g.contents(actor.x, actor.y - 1);
      const above = this.g.contents(actor.x + mx, actor.y - 1);

      if (!thru.actor && !thru.tile.solid && !above.actor && !above.tile.solid)
        my--;
      else return;
    }

    return [mx, my];
  }

  isSafeMove(actor: Actor, mx: number, my: number) {
    const below = this.g.contents(actor.x + mx, actor.y + my + 1);
    if (below.tile.solid) return true;

    // falling one step is acceptable - can get back up
    const further = this.g.contents(actor.x + mx, actor.y + my + 2);
    if (further.tile.solid) return true;

    return false;
  }
}
