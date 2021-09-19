import { fragment } from "../entities/items";
import Game from "../Game";
import Item from "../Item";

export default class TheInk {
  constructor(public g: Game) {
    g.on("damaged", ({ amount, victim }) => {
      victim.teleportTracking += amount;

      if (victim.parts)
        victim.parts.forEach((part) => {
          part.hp -= amount;
          part.teleportTracking += amount;
        });
    });

    g.on("died", ({ victim }) => {
      if (victim.special === "ink") {
        victim.parts.forEach((part) => g.remove(part));
        g.music.fadeOut();
        g.sfx.play("inkDead");

        for (let y = 0; y < g.map.height; y++)
          for (let x = 0; x < g.map.width; x++) {
            const tile = g.map.get(x, y);

            if (tile.glyph === "InkDoor") {
              tile.glyph = "InkDoorOpen";
              tile.exit = undefined;
              g.emit("mapChanged", {});

              g.log.add("You hear a door open.");
              g.addItem(new Item(x, y, fragment));
              return;
            }
          }
      }
    });
  }
}
