import Actor from "../Actor";
import Game from "../Game";
import Item from "../Item";
import { brokenPocketwatch } from "../items";

export default class Memento {
  constructor(public g: Game) {
    g.on("damaged", ({ victim, type }) => {
      if (type !== "suffocation") this.findAndBreak(victim);
    });
    g.on("fell", ({ thing }) => {
      if (thing.glyph === "Pocketwatch") this.break(thing as Item);
    });
  }

  findAndBreak(victim: Actor): void {
    for (let i = 0; i < victim.inventory.length; i++) {
      const item = victim.inventory[i];

      if (item?.use === "memento" && !this.damage(item)) {
        victim.inventory[i] = new Item(0, 0, brokenPocketwatch);
        this.g.emit("used", { actor: victim, item });
        return;
      }
    }
  }

  damage(item: Item): boolean {
    let [health] = item.useArgs;
    health--;
    item.useArgs = [health];

    switch (health) {
      case 2:
        this.g.log.add("You hear a quiet tinkle.");
        return true;
      case 1:
        this.g.log.add("You hear tiny gears grind to a halt.");
        return true;
      default:
        this.g.log.add("You hear a quiet smashing sound.");
        return false;
    }
  }

  break(item: Item): void {
    if (!this.damage(item)) {
      this.g.removeItem(item);
      this.g.addItem(new Item(item.x, item.y, brokenPocketwatch));
    }
  }
}
