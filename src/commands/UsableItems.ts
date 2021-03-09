import Cmd from "../Cmd";
import Game from "../Game";
import Item from "../Item";
import { ladderTile } from "../Tile";

export default class UsableItems {
  constructor(public g: Game) {}

  use(index: number, item: Item): undefined | string | Cmd {
    var result;

    switch (item.use) {
      case "ladder":
        result = this.useLadder(item);
        break;

      default:
        return "You can't use that.";
    }

    if (item.charges < 1) {
      delete this.g.player.inventory[index];
      // TODO: message?
    }

    return result;
  }

  useLadder(item: Item) {
    const { log, map, player } = this.g;
    var [size] = item.useArgs;

    var x = player.x,
      y = player.y;
    while (size) {
      const tile = map.get(x, y);
      if (tile.glyph !== " ") {
        y++;
        break;
      }

      size--;
      y--;
    }

    const length = player.y - y;
    if (length < 1) return "There's no room.";

    for (let ly = player.y; ly >= y; ly--) map.set(x, ly, ladderTile);
    log.add("You set up a ladder.");
    item.charges--;
    this.g.spent++;
  }
}
