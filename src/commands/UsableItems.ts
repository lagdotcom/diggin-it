import { RNG } from "rot-js";

import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import XY from "../interfaces/XY";
import Item from "../Item";
import { litBomb } from "../temps";
import Tile from "../Tile";
import {
  ladderTile,
  ladderTileBottom,
  ladderTileTop,
  ropeTile,
  ropeTileBottom,
  ropeTileTop,
} from "../tiles";

export default class UsableItems {
  constructor(public g: Game) {}

  use(index: number, item: Item, at?: XY): undefined | string | Cmd {
    var result;

    switch (item.use) {
      case "ladder":
        result = this.useLadder(item);
        break;

      case "air":
        result = this.useAirTank(item);
        break;

      case "rope":
        if (!at) {
          const targets = this.getRopeTargets();
          if (targets.length === 0) return "No room.";
          if (targets.length > 1)
            return {
              type: "target",
              possibilities: targets,
              callback: (at: XY) => ({ type: "use", index, at }),
            };
          at = targets[0];
        }
        result = this.useRope(item, at);
        break;

      case "heal":
        result = this.useHeal(item);
        break;

      case "bomb":
        result = this.useBomb(item);
        break;

      case "memento":
        return this.useMemento(item);

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
      y = player.y + 1;
    while (size) {
      y--;

      const tile = map.get(x, y);
      if (tile.glyph !== " ") {
        y++;
        break;
      }

      size--;
    }

    const length = player.y - y;
    if (length < 1) return "There's no room.";

    for (let ly = player.y; ly >= y; ly--) {
      map.set(
        x,
        ly,
        ly === player.y
          ? new Tile(ladderTileBottom)
          : ly === y
          ? new Tile(ladderTileTop)
          : new Tile(ladderTile)
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
        map.set(x, y, first ? new Tile(ropeTileTop) : new Tile(ropeTile));
        first = false;
        y++;
        size--;
      } else break;
    }

    y--;
    map.set(x, y, new Tile(ropeTileBottom));

    log.add("You set up a rope.");
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  useAirTank(item: Item) {
    const { log, player } = this.g;

    const maxap = player.get("maxap");
    if (player.ap >= maxap) return "You have plenty of air.";
    const [min, max] = item.useArgs;
    const amount = Math.min(RNG.getUniformInt(min, max), maxap - player.ap);

    player.ap += amount;
    log.add("You breathe deeply.");
    item.charges--;
    this.g.spent++;
  }

  useHeal(item: Item) {
    const { log, player } = this.g;

    const maxhp = player.get("maxhp");
    if (player.hp >= maxhp) return "You're feeling fine.";
    const [min, max] = item.useArgs;
    const amount = Math.min(RNG.getUniformInt(min, max), maxhp - player.hp);

    player.hp += amount;
    log.add(`You heal for ${amount}.`);
    item.charges--;
    this.g.spent++;
  }

  useBomb(item: Item): undefined {
    const { log, player } = this.g;
    const { useArgs } = item;

    const lit = new Item(player.x, player.y, { ...litBomb, useArgs });
    this.g.addItem(lit);

    log.add(`You light the bomb.`);
    this.g.emit("litBomb", { item: lit });
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  useMemento(item: Item) {
    const [health] = item.useArgs;

    switch (health) {
      case 3:
        return "It looks brand new.";
      case 2:
        return "It rattles a little.";
      default:
        return "It's barely holding together.";
    }
  }
}
