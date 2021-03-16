import Actor from "../Actor";
import Game from "../Game";
import Item from "../Item";
import { name } from "../text";

export default class Inventory {
  constructor(public g: Game) {}

  getItems(): undefined | string {
    const { player } = this.g;

    const { items } = this.g.contents(player.x, player.y);
    if (!items.length) return "There's nothing here.";

    let spent = false;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.canPickUp) continue;

      const result = Inventory.addToInventory(this.g, player, item);
      if (!result) return "You can't carry any more.";

      if (!spent) {
        spent = true;
        this.g.spent++;
      }
    }

    if (!spent) return "You can't pick up anything here.";
  }

  static addToInventory(
    g: Game,
    actor: Actor,
    item: Item,
    quiet = false
  ): boolean {
    const slot = Inventory.getFreeSlot(actor, item);
    if (typeof slot === "undefined") return false;

    const [pos, mix] = slot;
    g.removeItem(item);
    if (mix) {
      actor.inventory[pos].charges += item.charges;
    } else {
      actor.inventory[pos] = item;
    }
    g.emit("got", { actor: actor, item });
    if (!quiet) g.log.add(`You get ${name(item)}.`);
    return true;
  }

  static getFreeSlot(actor: Actor, item: Item): [pos: number, mix: boolean] {
    if (item.charges)
      for (let i = 0; i < actor.inventorySize; i++) {
        if (actor.inventory[i]?.name === item.name) return [i, true];
      }

    for (let i = 0; i < actor.inventorySize; i++) {
      if (!actor.inventory[i]) return [i, false];
    }
  }
}
