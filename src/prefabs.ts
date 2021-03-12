import Actor from "./Actor";
import { player } from "./actors";
import Item from "./Item";
import { clothes, pocketknife, pocketwatch } from "./items";

export function getNewPlayer() {
  const weapon = new Item(0, 0, pocketknife);
  const armour = new Item(0, 0, clothes);
  const trinket = new Item(0, 0, pocketwatch);
  return new Actor(0, 0, {
    ...player,
    equipment: { weapon, armour },
    inventory: [weapon, armour, trinket],
  });
}
