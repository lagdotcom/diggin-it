import Game from "../Game";
import Item from "../Item";
import { fragment } from "../items";
import Tile from "../Tile";
import { empty } from "../tiles";

export default class TheInk {
  constructor(public g: Game) {
    g.on("damaged", ({ amount, victim }) => {
      if (victim.inkparts)
        victim.inkparts.forEach((part) => (part.hp -= amount));
    });

    g.on("died", ({ victim }) => {
      if (victim.inkparts) {
        victim.inkparts.forEach((part) => g.remove(part));

        for (let y = 0; y < g.map.height; y++)
          for (let x = 0; x < g.map.width; x++) {
            if (g.map.get(x, y).glyph === "InkDoor") {
              g.fadeOutMusic();
              g.map.set(x, y, new Tile(empty));
              g.log.add("You hear a door open.");
              g.addItem(new Item(x, y, fragment));
              return;
            }
          }
      }
    });
  }
}
