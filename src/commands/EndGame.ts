import Game from "../Game";

const hugeDoorTiles: Record<string, string> = {
  HugeDoor1: "HugeDoorOpen1",
  HugeDoor2: "HugeDoorOpen2",
  HugeDoor3: "HugeDoorOpen3",
  HugeDoor4: "HugeDoorOpen4",
};

export default class EndGame {
  constructor(public g: Game) {}

  tryOpen(): string | undefined {
    const { allActors, map, player } = this.g;
    if (allActors.find((a) => a.inkParts)) return "You're in too much danger!";

    const slabs = player.inventory.filter((i) => i?.sting === "slab");
    const count = slabs.length;
    if (!count) return "There are three indentations on the door.";
    if (count < 3)
      return `There are three indentations on the door, but you only have ${count} slab${
        count === 1 ? "" : "s"
      }.`;

    // remove slabs from inventory
    player.inventory.forEach((i, index) => {
      if (i?.sting === "slab") delete player.inventory[index];
    });

    // open the door
    for (let y = 0; y < map.height; y++)
      for (let x = 0; x < map.width; x++) {
        const tile = map.get(x, y);
        if (tile.exit === "slabs") {
          tile.glyph = hugeDoorTiles[tile.glyph];
          tile.exit = "normal";
        }
      }

    this.g.emit("refreshed", {});
    return "You insert the slabs and the great door swings open!";
  }
}
