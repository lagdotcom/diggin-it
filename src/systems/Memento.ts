import Actor from "../Actor";
import Game from "../Game";
import Item from "../Item";
import { brokenPocketwatch } from "../items";

export default class Memento {
  constructor(public g: Game) {
    g.on("damaged", ({ victim }) => this.findAndBreak(victim));
    g.on("fell", ({ thing }) => {
      if (thing.glyph === "Pocketwatch") this.break(thing as Item);
    });
  }

  findAndBreak(victim: Actor) {
    for (var i = 0; i < victim.inventory.length; i++) {
      const item = victim.inventory[i];

      if (item?.glyph === "Pocketwatch") {
        victim.inventory[i] = new Item(0, 0, brokenPocketwatch);
        return this.g.log.add("You hear a quiet smashing sound.");
      }
    }
  }

  break(item: Item) {
    this.g.removeItem(item);
    this.g.addItem(new Item(item.x, item.y, brokenPocketwatch));
    return this.g.log.add("You hear a quiet smashing sound.");
  }
}
