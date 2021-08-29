import { fragment } from "../entities/items";
import { empty } from "../entities/tiles";
import Game from "../Game";
import Item from "../Item";
import Tile from "../Tile";

export default class TheInk {
  constructor(public g: Game) {
    g.on("damaged", ({ amount, victim }) => {
      victim.teleportTracking += amount;

      if (victim.inkParts)
        victim.inkParts.forEach((part) => {
          part.hp -= amount;
          part.teleportTracking += amount;
        });
    });

    g.on("died", ({ victim }) => {
      if (victim.inkParts) {
        victim.inkParts.forEach((part) => g.remove(part));
        g.music.fadeOut();
        g.sfx.play("inkDead");

        for (let y = 0; y < g.map.height; y++)
          for (let x = 0; x < g.map.width; x++) {
            if (g.map.get(x, y).glyph === "InkDoor") {
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
