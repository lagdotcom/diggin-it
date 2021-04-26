import { RNG } from "rot-js";

import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import XY from "../interfaces/XY";
import Item, { ItemUse } from "../Item";
import { litBomb } from "../temps";
import Tile from "../Tile";
import {
  ladderTile,
  ladderTileBottom,
  ladderTileTop,
  ropeTile,
  ropeTileBottom,
  ropeTileTop,
  stapleTile,
} from "../tiles";

interface SimpleUseFn {
  type: "simple";
  use(item: Item): undefined | string | Cmd;
}
interface TargetedUseFn {
  type: "target";
  use(item: Item, x: number, y: number): undefined | string | Cmd;
  targets(): XY[];
}
type UseData = SimpleUseFn | TargetedUseFn;

const simple = (use: SimpleUseFn["use"]): SimpleUseFn => ({
  type: "simple",
  use,
});
const targeted = (
  use: TargetedUseFn["use"],
  targets: TargetedUseFn["targets"]
): TargetedUseFn => ({ type: "target", use, targets });

export default class UsableItems {
  mapping: Record<ItemUse, UseData>;

  constructor(public g: Game) {
    this.mapping = {
      air: simple(this.useAirTank.bind(this)),
      bomb: simple(this.useBomb.bind(this)),
      heal: simple(this.useHeal.bind(this)),
      ladder: simple(this.useLadder.bind(this)),
      memento: simple(this.useMemento.bind(this)),
      rope: targeted(this.useRope.bind(this), this.getRopeTargets.bind(this)),
      staple: targeted(
        this.useStaple.bind(this),
        this.getStapleTargets.bind(this)
      ),
    };
  }

  use(index: number, item: Item, at?: XY): undefined | string | Cmd {
    if (!item.use) return "You can't use that.";

    let result;
    const data = this.mapping[item.use];
    if (data.type === "target") {
      if (!at) {
        const targets = data.targets();
        if (targets.length === 0) return "No room.";
        if (targets.length > 1)
          return {
            type: "target",
            possibilities: targets,
            callback: (at: XY) => ({ type: "use", index, at }),
          };
        at = targets[0];
      }

      result = data.use(item, at[0], at[1]);
    } else {
      result = data.use(item);
    }

    if (item.charges < 1) {
      delete this.g.player.inventory[index];
      // TODO: message?
    }

    return result;
  }

  useLadder(item: Item): string | undefined {
    const { log, map, player } = this.g;
    let [size] = item.useArgs;

    const x = player.x;
    let y = player.y + 1;
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
    this.g.emit("used", { actor: player, item });
    this.g.emit("mapChanged", {});
    item.charges--;
    this.g.spent++;
  }

  getRopeTargets(): XY[] {
    const { map, player } = this.g;
    const possibilities: XY[] = [];

    const offsets = [-1, 1];
    for (let i = 0; i < offsets.length; i++) {
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

  useRope(item: Item, x: number, y: number): undefined {
    const { log, map } = this.g;
    let [size] = item.useArgs;

    let first = true;
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
    this.g.emit("used", { actor: this.g.player, item });
    this.g.emit("mapChanged", {});
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  getStapleTargets(): XY[] {
    const { map, player } = this.g;
    const possibilities: XY[] = [];
    const offsets: XY[] = [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    offsets.forEach(([ox, oy]) => {
      const x = player.x + ox,
        y = player.y + oy;
      const tile = map.get(x, y);
      if (tile.glyph === " ") possibilities.push([x, y]);
    });

    return possibilities;
  }

  useStaple(item: Item, x: number, y: number): undefined {
    const { log, map } = this.g;
    map.set(x, y, new Tile(stapleTile));

    log.add("You hammer in a staple.");
    this.g.emit("used", { actor: this.g.player, item });
    this.g.emit("mapChanged", {});
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  useAirTank(item: Item): string | undefined {
    const { log, player } = this.g;

    const maxAp = player.get("maxAp");
    if (player.ap >= maxAp) return "You have plenty of air.";
    const [min, max] = item.useArgs;
    const amount = Math.min(RNG.getUniformInt(min, max), maxAp - player.ap);

    player.ap += amount;
    log.add("You breathe deeply.");
    this.g.emit("used", { actor: player, item });
    item.charges--;
    this.g.spent++;
  }

  useHeal(item: Item): string | undefined {
    const { log, player } = this.g;

    const maxHp = player.get("maxHp");
    if (player.hp >= maxHp) return "You're feeling fine.";
    const [min, max] = item.useArgs;
    const amount = Math.min(RNG.getUniformInt(min, max), maxHp - player.hp);

    player.hp += amount;
    log.add(`You heal for ${amount}.`);
    this.g.emit("used", { actor: player, item });
    item.charges--;
    this.g.spent++;
  }

  useBomb(item: Item): undefined {
    const { log, player } = this.g;
    const { useArgs } = item;

    const lit = new Item(player.x, player.y, { ...litBomb, useArgs });
    this.g.addItem(lit);

    log.add(`You light the bomb.`);
    this.g.emit("used", { actor: player, item });
    this.g.emit("litBomb", { item: lit });
    this.g.emit("mapChanged", {});
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  useMemento(item: Item): string {
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
