import Game from "../Game";

export default class Querying {
  constructor(public g: Game) {}

  apply(): void {
    const { log, player, vaults } = this.g;

    const spot = vaults.resolve(player.x, player.y);
    const location = spot
      ? `in ${spot[0]}`
      : "within the labyrinth of stone and dirt";

    log.add(`You are now ${location}.`);
  }
}
