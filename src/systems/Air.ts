import { bg, lightRed } from "../colours";
import Game from "../Game";

const warning = bg(lightRed);

export default class Air {
  constructor(public g: Game) {
    g.on("tick", () => this.run());
  }

  run(): void {
    const { log, player } = this.g;
    const { items, fluid } = this.g.contents(player.x, player.y);

    player.ap -= fluid.airCost;

    if (player.ap < 1) {
      player.ap = 0;
      player.hp -= 5;
      if (player.hp > 0) log.add(`${warning}You're suffocating!`);
      this.g.emit("damaged", {
        victim: player,
        amount: 5,
        type: "suffocation",
      });
    }

    let burnDamage = 0;

    if (fluid.hpCost && player.hp > 0) burnDamage += fluid.hpCost;
    // TODO a bit fragile
    if (items.find((i) => i.glyph === "Fire")) burnDamage += 3;

    if (burnDamage > 0) {
      player.hp -= burnDamage;
      if (player.hp > 0) log.add(`${warning}You're burning!`);
      this.g.emit("damaged", {
        victim: player,
        amount: burnDamage,
        type: "burning",
      });
    }
  }
}
