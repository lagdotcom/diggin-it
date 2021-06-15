import Actor from "./Actor";
import { theInk } from "./entities/enemies";
import {
  airTank,
  ladder,
  pocketwatch,
  pointedStick,
  rags,
  rations,
  rope,
} from "./entities/items";
import { player } from "./entities/player";
import Game from "./Game";
import Item from "./Item";

export function getNewPlayer(): Actor {
  const weapon = new Item(0, 0, pointedStick);
  const armour = new Item(0, 0, rags);
  const trinket = new Item(0, 0, pocketwatch);
  const ropes = new Item(0, 0, { ...rope, charges: 3 });
  const ladders = new Item(0, 0, { ...ladder, charges: 2 });
  const ration = new Item(0, 0, rations);
  const canisters = new Item(0, 0, airTank);
  return new Actor(0, 0, {
    ...player,
    player: { stats: 0 },
    equipment: { weapon, armour },
    inventory: [weapon, armour, trinket, ropes, ladders, ration, canisters],
  });
}

export function addTheInk(g: Game, x: number, y: number): void {
  const tl = new Actor(x, y, { ...theInk, ai: "ink" });
  const tr = new Actor(x + 1, y, { ...theInk, glyph: "Ink2" });
  const bl = new Actor(x, y + 1, { ...theInk, glyph: "Ink3" });
  const br = new Actor(x + 1, y + 1, { ...theInk, glyph: "Ink4" });

  tl.inkParts = [tr, bl, br];
  tr.inkParts = [tl, bl, br];
  bl.inkParts = [tl, tr, br];
  br.inkParts = [tl, tr, bl];

  g.add(tl);
  g.add(tr);
  g.add(bl);
  g.add(br);
}
