import Actor from "./Actor";
import { player } from "./actors";
import Item from "./Item";
import { clothes, ladder, pocketknife, pocketwatch, rope } from "./items";

export function getNewPlayer() {
  const weapon = new Item(0, 0, pocketknife);
  const armour = new Item(0, 0, clothes);
  const trinket = new Item(0, 0, pocketwatch);
  const ropes = new Item(0, 0, { ...rope, charges: 3 });
  const ladders = new Item(0, 0, { ...ladder, charges: 2 });
  return new Actor(0, 0, {
    ...player,
    equipment: { weapon, armour },
    inventory: [weapon, armour, trinket, ropes, ladders],
  });
}
