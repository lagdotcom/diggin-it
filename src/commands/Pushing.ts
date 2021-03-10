import Cmd from "../Cmd";
import Game from "../Game";
import Thing from "../interfaces/Thing";
import { theName } from "../text";

export default class Pushing {
  constructor(public g: Game) {}

  possible(thing: Thing, mx: number, my: number): undefined | string | Cmd {
    const x = thing.x + mx;
    const y = thing.y + my;

    const { actor, items, tile } = this.g.contents(x, y);

    // TODO: squashing?
    if (actor) return "There's something in the way.";

    if (tile.solid) return "There's something in the way.";

    // TODO: breaking items?
  }

  apply(thing: Thing, mx: number, my: number) {
    const x = thing.x + mx;
    const y = thing.y + my;

    this.g.move(thing, x, y, this.g.player);
    this.g.log.add(`You push ${theName(thing)}.`);
    this.g.spent++;
  }
}
