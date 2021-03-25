import Game from "../Game";

export default class Air {
  constructor(public g: Game) {
    g.on("tick", () => this.run());
  }

  run(): void {
    const { log, mapFluid, player } = this.g;
    const tile = mapFluid.get(player.x, player.y);
    player.ap -= tile.airCost;

    if (player.ap < 1) {
      player.ap = 0;
      player.hp -= 5;
      if (player.hp > 0) log.add("You're suffocating!");
      this.g.emit("damaged", {
        victim: player,
        amount: 5,
        type: "suffocation",
      });
    }
  }
}
