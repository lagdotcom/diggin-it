import Actor from "./Actor";
import { player, theInk } from "./actors";
import Game from "./Game";
import Item from "./Item";
import {
  airTank,
  clothes,
  ladder,
  pocketknife,
  pocketwatch,
  rations,
  rope,
} from "./items";

export function getNewPlayer() {
  const weapon = new Item(0, 0, pocketknife);
  const armour = new Item(0, 0, clothes);
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

export function addTheInk(g: Game, x: number, y: number) {
  const tl = new Actor(x, y, { ...theInk, ai: "ink" });
  const tr = new Actor(x + 1, y, { ...theInk, glyph: "Ink2" });
  const bl = new Actor(x, y + 1, { ...theInk, glyph: "Ink3" });
  const br = new Actor(x + 1, y + 1, { ...theInk, glyph: "Ink4" });

  tl.inkparts = [tr, bl, br];
  tr.inkparts = [tl, bl, br];
  bl.inkparts = [tl, tr, br];
  br.inkparts = [tl, tr, bl];

  g.add(tl);
  g.add(tr);
  g.add(bl);
  g.add(br);
}
