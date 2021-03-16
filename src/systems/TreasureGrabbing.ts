import Game from "../Game";

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
        this.g.log.add(`You grab the ${i.name}.`);
        player.experience += i.treasure;

        if (i.glyph === "Fragment") {
          this.g.playMusic("shiny");
          let good = false;
          player.inventory.forEach((item) => {
            if (item?.use === "memento") good = true;
          });
          this.g.showEnding(good);
        }
      });
  }
}
