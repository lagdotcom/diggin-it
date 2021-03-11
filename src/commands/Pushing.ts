import Actor from "../Actor";
import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import { theName } from "../text";
import Movement from "./Movement";

export default class Pushing {
  constructor(public g: Game) {}

  possible(
    pusher: Actor,
    thing: Actor,
    mx: number,
    my: number
  ): undefined | string | Cmd {
    const x = thing.x + mx;
    const y = thing.y + my;

    const { actor, items, tile } = this.g.contents(x, y);

    // TODO: squashing?
    if (actor || tile.solid) {
      if (my == 0 && Movement.canClimb(this.g, pusher.x, pusher.y, mx))
        return { type: "climb", x: thing.x, y: thing.y - 1 };

      return "There's something in the way.";
    }

    // TODO: breaking items?
  }

  apply(actor: Actor, mx: number, my: number) {
    const x = actor.x + mx;
    const y = actor.y + my;

    this.g.move(actor, x, y, this.g.player);
    this.g.log.add(`You push ${theName(actor)}.`);
    this.g.spent++;
  }
}
