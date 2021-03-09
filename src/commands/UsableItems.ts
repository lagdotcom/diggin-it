import Cmd from "../Cmd";
import Game from "../Game";
import XY from "../interfaces/XY";
import Item from "../Item";
import {
  ladderTile,
  ladderTileBottom,
  ladderTileTop,
  ropeTile,
  ropeTileBottom,
  ropeTileTop,
} from "../Tile";

export default class UsableItems {
  constructor(public g: Game) {}

  use(index: number, item: Item, at?: XY): undefined | string | Cmd {
    var result;

    switch (item.use) {
      case "ladder":
        result = this.useLadder(item);
        break;

      case "rope":
        if (!at) {
          const targets = this.getRopeTargets();
          if (targets.length === 0) return "No room.";
          if (targets.length > 1)
            return { type: "target", possibilities: targets };
          at = targets[0];
        }
        result = this.useRope(item, at);
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

    for (let ly = player.y; ly >= y; ly--) {
      map.set(
        x,
        ly,
        ly === player.y
          ? ladderTileBottom
          : ly === y
          ? ladderTileTop
          : ladderTile
      );
    }
    log.add("You set up a ladder.");
    item.charges--;
    this.g.spent++;
  }

  getRopeTargets() {
    const { map, player } = this.g;
    const possibilities: XY[] = [];

    const offsets = [-1, 1];
    for (var i = 0; i < offsets.length; i++) {
      const x = player.x + offsets[i];
      const y = player.y;

      const tile = map.get(x, y);
      if (tile.glyph !== " ") continue;

      const below = map.get(x, y + 1);
      if (below.glyph !== " ") continue;

      possibilities.push([x, y]);
    }

    return possibilities;
  }

  useRope(item: Item, at: XY): undefined {
    const { log, map } = this.g;
    var [size] = item.useArgs;

    var [x, y] = at;
    var first = true;
    while (size) {
      const tile = map.get(x, y);
      if (tile.glyph === " ") {
        map.set(x, y, first ? ropeTileTop : ropeTile);
        first = false;
        y++;
        size--;
      } else break;
    }

    y--;
    map.set(x, y, ropeTileBottom);

    log.add("You set up a rope.");
    item.charges--;
    this.g.spent++;
    return undefined;
  }
}
