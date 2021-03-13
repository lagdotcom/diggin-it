import Actor from "../Actor";
import Game from "../Game";
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

      const slot = this.getFreeSlot(player);
      if (typeof slot === "undefined") return "You can't carry any more.";

      this.g.removeItem(item);
      player.inventory[slot] = item;
      this.g.emit("got", { actor: player, item });
      this.g.log.add(`You get ${name(item)}.`);

      if (!spent) {
        spent = true;
        this.g.spent++;
      }
    }

    if (!spent) return "You can't pick up anything here.";
  }

  getFreeSlot(actor: Actor) {
    for (var i = 0; i < actor.inventorySize; i++) {
      if (!actor.inventory[i]) return i;
    }
  }
}
