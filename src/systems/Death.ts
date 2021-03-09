import { EventMap } from "../Event";
import Game from "../Game";
import { theName } from "../text";

export default class Death {
  constructor(public g: Game) {
    g.on("damaged", this.damaged.bind(this));
  }

  damaged({ attacker, victim }: EventMap["attacked"]) {
    const vname = theName(victim);

    if (victim.hp < 1) {
      victim.alive = false;
      this.g.log.add(`${vname} dies!`);
      this.g.remove(victim);
      this.g.emit("died", { attacker, victim });
    }
  }
}
