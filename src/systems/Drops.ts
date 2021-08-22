import { RNG } from "rot-js";

import Actor from "../Actor";
import Game from "../Game";
import Item from "../Item";
import { getZone } from "../maps";
import {
  getRandomArmour,
  getRandomUsable,
  getRandomWeapon,
  ItemName,
  items,
} from "../tables";
import { cname, ctheName } from "../text";

function getItem(depth: number, name: string) {
  if (items[name as ItemName]) return items[name as ItemName];

  const options = { zone: getZone(depth), fluid: "", championChance: 0 };
  if (name === "@") return getRandomUsable(options);
  if (name === "6") return getRandomArmour(options);
  if (name === "7") return getRandomWeapon(options);
}

export default class Drops {
  constructor(public g: Game) {
    g.on("destroyed", ({ victim }) => this.doDrops(victim));
    g.on("died", ({ victim }) => this.doDrops(victim));
  }

  doDrops(actor: Actor): void {
    if (RNG.getPercentage() > actor.dropChance) return;

    const name = RNG.getWeightedValue(actor.drops);
    const spec = getItem(this.g.depth, name);
    if (!spec) {
      console.warn("unknown item spawn:", name);
      return;
    }

    if (actor.dropQty[name])
      spec.charges = RNG.getUniformInt(...actor.dropQty[name]);
    const item = new Item(actor.x, actor.y, spec);

    this.g.addItem(item);
    this.g.emit("dropped", { actor, item });
    const s = item.charges > 1 || item.plural ? "" : "s";
    this.g.log.add(`${cname(item, true)} drop${s} from ${ctheName(actor)}.`);
  }
}
