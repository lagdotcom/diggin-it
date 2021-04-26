import Game from "../Game";
import { ctheName } from "../text";

export default class TreasureGrabbing {
  constructor(public g: Game) {
    g.on("moved", () => this.getTreasure());
  }

  getTreasure(): void {
    const { player } = this.g;

    this.g.items
      .get(player.x, player.y)
      .filter((i) => i.treasure)
      .forEach((i) => {
        this.g.removeItem(i);
        this.g.log.add(`You grab ${ctheName(i)}.`);
        player.experience += i.treasure;

        if (i.glyph === "Fragment") {
          this.g.music.play("shiny");
          let good = false;
          player.inventory.forEach((item) => {
            if (item?.use === "memento") good = true;
          });
          this.g.showEnding(good);
        }
      });
  }
}
