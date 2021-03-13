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

    var spent = false;
    for (var i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.canPickUp) continue;

      const slot = this.getFreeSlot(player, item);
      if (typeof slot === "undefined") return "You can't carry any more.";

      const [pos, mix] = slot;
      this.g.removeItem(item);
      if (mix) {
        player.inventory[pos].charges += item.charges;
      } else {
        player.inventory[pos] = item;
      }
      this.g.emit("got", { actor: player, item });
      this.g.log.add(`You get ${name(item)}.`);

      if (!spent) {
        spent = true;
        this.g.spent++;
      }
    }

    if (!spent) return "You can't pick up anything here.";
  }

  getFreeSlot(actor: Actor, item: Item): [pos: number, mix: boolean] {
    if (item.charges)
      for (var i = 0; i < actor.inventorySize; i++) {
        if (actor.inventory[i]?.name === item.name) return [i, true];
      }

    for (var i = 0; i < actor.inventorySize; i++) {
      if (!actor.inventory[i]) return [i, false];
    }
  }
}
