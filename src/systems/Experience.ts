import Game from "../Game";
import { ctheName } from "../text";
import { stillHasMemento } from "../utils";

export default class Experience {
  constructor(public g: Game) {
    g.on("left", ({ depth }) => this.getBonusXP(depth));
    g.on("moved", () => this.getTreasure());
  }

  getBonusXP(depth: number): void {
    const { player } = this.g;

    let bonus = 500;
    if (depth % 3 === 0) bonus += 1000;

    player.experience += bonus;
  }

  getTreasure(): void {
    const { player } = this.g;
    let found = false;

    this.g.items
      .get(player.x, player.y)
      .filter((i) => i.treasure)
      .forEach((i) => {
        this.g.removeItem(i);
        this.g.log.add(`You grab ${ctheName(i)}.`);
        player.experience += i.treasure;

        if (i.glyph === "Fragment") {
          this.g.music.play("shiny");
          this.g.showEnding(stillHasMemento(player));
        } else found = true;
      });

    if (found) this.g.sfx.play("money");
  }
}
