import { RNG } from "rot-js";

import { explosion, litBomb } from "../entities/temps";
import {
  ladderTile,
  ladderTileBottom,
  ladderTileTop,
  ropeTile,
  ropeTileBottom,
  ropeTileTop,
  stapleTile,
} from "../entities/tiles";
import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import XY from "../interfaces/XY";
import Item, { ItemUse } from "../Item";
import { cname, ctheName } from "../text";
import Tile from "../Tile";
import { traceline } from "../utils";

interface SimpleUseFn {
  type: "simple";
  use(item: Item): undefined | string | Cmd;
}
interface TargetedUseFn {
  type: "target";
  use(item: Item, x: number, y: number): undefined | string | Cmd;
  targets(item: Item): XY[] | string;
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

const getPotionAmount = (min: number, max: number) =>
  (RNG.getPercentage() > 40 ? 1 : -1) * RNG.getUniformInt(min, max);

export default class UsableItems {
  mapping: Record<ItemUse, UseData>;

  constructor(public g: Game) {
    this.mapping = {
      air: simple(this.useAirTank.bind(this)),
      bomb: simple(this.useBomb.bind(this)),
      cureBleed: simple(this.cureBleed.bind(this)),
      curePoison: simple(this.curePoison.bind(this)),
      cureStun: simple(this.cureStun.bind(this)),
      gainDP: simple(this.useGainDP.bind(this)),
      gainHP: simple(this.useGainHP.bind(this)),
      gainSP: simple(this.useGainSP.bind(this)),
      heal: simple(this.useHeal.bind(this)),
      ladder: simple(this.useLadder.bind(this)),
      launcher: targeted(
        this.useLauncher.bind(this),
        this.getLauncherTargets.bind(this)
      ),
      memento: simple(this.useMemento.bind(this)),
      rope: targeted(this.useRope.bind(this), this.getRopeTargets.bind(this)),
      staple: targeted(
        this.useStaple.bind(this),
        this.getStapleTargets.bind(this)
      ),
      throw: targeted(
        this.useThrow.bind(this),
        this.getThrowTargets.bind(this)
      ),
    };
  }

  use(index: number, item: Item, at?: XY): undefined | string | Cmd {
    if (!item.use) return "You can't use that.";

    let result;
    const data = this.mapping[item.use];
    if (data.type === "target") {
      if (!at) {
        const targets = data.targets(item);
        if (typeof targets === "string") return targets;
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
    if (length < 1) return "No room.";

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

  getRopeTargets(): XY[] | string {
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

    return possibilities.length ? possibilities : "No room.";
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

    const lit = new Item(player.x, player.y, {
      ...litBomb,
      useArgs,
      glyph: item.glyph,
    });
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

  getThrowTargets(item: Item): XY[] | string {
    const { actors, player } = this.g;
    const [distance] = item.useArgs;

    const possibilities = actors
      .diamond(player.x, player.y, distance)
      .filter((target) => {
        const victim = actors.get(target[0], target[1]);
        if (!victim || !victim.alive || victim.player) return false;
        return (
          traceline(
            this.g,
            player.x,
            player.y,
            target[0],
            target[1],
            player
          ) === victim
        );
      });

    return possibilities.length ? possibilities : "Nothing to aim at.";
  }

  useThrow(item: Item, x: number, y: number): undefined {
    const [, damage] = item.useArgs;
    const { actors, player: attacker } = this.g;

    const victim = actors.get(x, y);
    const amount = Math.floor(
      attacker.get("sp") / 2 + Math.max(1, damage - victim.get("dp"))
    );
    const iname = cname(item, false, true);
    const vname = ctheName(victim);

    this.g.log.add(`You throw ${iname} at ${vname} for ${amount} damage.`);
    victim.hp -= amount;
    this.g.emit("damaged", { attacker, victim, amount, type: "combat" });
    this.g.emit("attacked", { attacker, victim, item });

    this.g.emit("used", { actor: attacker, item });
    item.charges--;
    this.g.spent++;

    // TODO lol
    if (item.glyph === "CherryBomb") {
      const effect = new Item(x, y, explosion);
      this.g.addItem(effect);
      this.g.emit("effect", { effect, duration: 2 });
    }

    return undefined;
  }

  useGainDP(item: Item): undefined {
    const { player: actor } = this.g;
    const [min, max] = item.useArgs;
    const amount = getPotionAmount(min, max);

    this.g.player.dp += amount;
    this.g.log.add(`You feel ${amount < 0 ? "frailer" : "sturdier"}.`);

    this.g.emit("used", { actor, item });
    this.g.sfx.play("gulp");
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  useGainHP(item: Item): undefined {
    const { player: actor } = this.g;
    const [min, max] = item.useArgs;
    const amount = getPotionAmount(min, max);

    this.g.player.maxHp += amount;
    this.g.player.hp += amount;
    this.g.log.add(`You feel ${amount < 0 ? "sicker" : "healthier"}.`);

    this.g.emit("used", { actor, item });
    this.g.sfx.play("gulp");
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  useGainSP(item: Item): undefined {
    const { player: actor } = this.g;
    const [min, max] = item.useArgs;
    const amount = getPotionAmount(min, max);

    this.g.player.sp += amount;
    this.g.log.add(`You feel ${amount < 0 ? "weaker" : "stronger"}.`);

    this.g.emit("used", { actor, item });
    this.g.sfx.play("gulp");
    item.charges--;
    this.g.spent++;
    return undefined;
  }

  cureBleed(item: Item): string | undefined {
    const { player: actor } = this.g;

    if (!actor.bleedAmount) return "You're not bleeding.";

    actor.bleedAmount = 0;
    actor.bleedTimer = 0;
    this.g.log.add("You're no longer bleeding.");
    this.g.emit("used", { actor, item });
    this.g.emit("statusRemoved", { actor, type: "bleed" });
    item.charges--;
    this.g.spent++;
  }

  curePoison(item: Item): string | undefined {
    const { player: actor } = this.g;

    if (!actor.poisoned) return "You're not poisoned.";

    actor.poisoned = false;
    this.g.log.add("You're no longer poisoned.");
    this.g.emit("used", { actor, item });
    this.g.emit("statusRemoved", { actor, type: "poison" });
    item.charges--;
    this.g.spent++;
  }

  cureStun(item: Item): string | undefined {
    const { player: actor } = this.g;

    if (!actor.stunTimer) return "You're not stunned.";

    actor.stunTimer = 0;
    this.g.log.add("You're no longer stunned.");
    this.g.emit("used", { actor, item });
    this.g.emit("statusRemoved", { actor, type: "stun" });
    item.charges--;
    this.g.spent++;
  }

  useLauncher(item: Item, x: number, y: number): string {
    const [, damage] = item.useArgs;
    const { actors, player: attacker } = this.g;
    const ammo = attacker.inventory.find((i) => i?.glyph === item.useAmmo);

    const victim = actors.get(x, y);
    const amount = Math.floor(
      attacker.get("sp") / 2 + Math.max(1, damage - victim.get("dp"))
    );
    const iname = cname(ammo, false, true);
    const vname = ctheName(victim);

    this.g.log.add(`You fire ${iname} at ${vname} for ${amount} damage.`);
    victim.hp -= amount;
    this.g.emit("damaged", { attacker, victim, amount, type: "combat" });
    this.g.emit("attacked", { attacker, victim, item }); // TODO ammo properties?

    this.g.emit("used", { actor: attacker, item });
    ammo.charges--;
    if (ammo.charges < 1) {
      const index = attacker.inventory.indexOf(ammo);
      delete attacker.inventory[index];
    }

    this.g.spent++;
    return undefined;
  }

  getLauncherTargets(item: Item): XY[] | string {
    const equipped = this.g.player.equipment[item.slot];
    if (equipped !== item) return "Equip it first.";

    const ammo = this.g.player.inventory.find((i) => i?.glyph === item.useAmmo);
    if (!ammo || ammo.charges < 1) return "No ammo.";

    return this.getThrowTargets(item);
  }
}
