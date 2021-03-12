import Game from "../Game";

export default class TreasureGrabbing {
  constructor(public g: Game) {
    g.on("moved", () => this.getTreasure());
  }

  getTreasure() {
    const { player } = this.g;

    this.g.items
      .get(player.x, player.y)
      .filter((i) => i.treasure)
      .forEach((i) => {
        this.g.removeItem(i);
        this.g.log.add(`You grab the ${i.name}.`);
        player.experience += i.treasure;
      });
  }
}
