import Actor from "./Actor";
import { blotEye, blotHead, fakeHeart } from "./entities/endGame";
import { theGreenInk, theInk, theRedInk } from "./entities/enemies";
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
import { hugeDoor } from "./entities/tiles";
import Game from "./Game";
import XY from "./interfaces/XY";
import Item from "./Item";
import Tile from "./Tile";

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
    championChance: 5,
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

  tl.parts = [tr, bl, br];
  tr.parts = [tl, bl, br];
  bl.parts = [tl, tr, br];
  br.parts = [tl, tr, bl];

  g.add(tl);
  g.add(tr);
  g.add(bl);
  g.add(br);
}

export function addTheGreenInk(g: Game, x: number, y: number): void {
  const tl = new Actor(x, y, { ...theGreenInk, ai: "ink" });
  const tr = new Actor(x + 1, y, { ...theGreenInk, glyph: "GreenInk2" });
  const bl = new Actor(x, y + 1, { ...theGreenInk, glyph: "GreenInk3" });
  const br = new Actor(x + 1, y + 1, { ...theGreenInk, glyph: "GreenInk4" });

  tl.parts = [tr, bl, br];
  tr.parts = [tl, bl, br];
  bl.parts = [tl, tr, br];
  br.parts = [tl, tr, bl];

  g.add(tl);
  g.add(tr);
  g.add(bl);
  g.add(br);
}

export function addTheRedInk(g: Game, x: number, y: number): void {
  const tl = new Actor(x, y, { ...theRedInk, ai: "ink" });
  const tr = new Actor(x + 1, y, { ...theRedInk, glyph: "RedInk2" });
  const bl = new Actor(x, y + 1, { ...theRedInk, glyph: "RedInk3" });
  const br = new Actor(x + 1, y + 1, { ...theRedInk, glyph: "RedInk4" });

  tl.parts = [tr, bl, br];
  tr.parts = [tl, bl, br];
  bl.parts = [tl, tr, br];
  br.parts = [tl, tr, bl];

  g.add(tl);
  g.add(tr);
  g.add(bl);
  g.add(br);
}

// x/y selects bottom left
export function addHugeDoor(g: Game, x: number, y: number): void {
  const tl = new Tile({ ...hugeDoor, glyph: "HugeDoor1" });
  const tr = new Tile({ ...hugeDoor, glyph: "HugeDoor2" });
  const bl = new Tile({ ...hugeDoor, glyph: "HugeDoor3" });
  const br = new Tile({ ...hugeDoor, glyph: "HugeDoor4" });

  g.map.set(x, y - 1, tl);
  g.map.set(x + 1, y - 1, tr);
  g.map.set(x, y, bl);
  g.map.set(x + 1, y, br);
}

export function addFakeHeart(g: Game, x: number, y: number): void {
  const tl = new Actor(x, y, { ...fakeHeart, glyph: "BlotHeart1" });
  const tr = new Actor(x + 1, y, { ...fakeHeart, glyph: "BlotHeart2" });
  const ml = new Actor(x, y + 1, { ...fakeHeart, glyph: "BlotHeart3" });
  const mr = new Actor(x + 1, y + 1, { ...fakeHeart, glyph: "BlotHeart4" });
  const bl = new Actor(x, y + 2, { ...fakeHeart, glyph: "BlotHeart5" });
  const br = new Actor(x + 1, y + 2, { ...fakeHeart, glyph: "BlotHeart6" });

  g.add(tl);
  g.add(tr);
  g.add(ml);
  g.add(mr);
  g.add(bl);
  g.add(br);
}

export function addBlotHead(g: Game, sx: number, sy: number): XY[] {
  const positions: XY[] = [];
  let i = 0;

  for (let oy = 0; oy < 11; oy++) {
    const y = sy + oy;
    for (let ox = 0; ox < 4; ox++) {
      const x = sx + ox;
      i++;

      if (i === 23) g.add(new Actor(x, y, blotEye));
      else {
        const glyph = `BlotHead${i}`;
        const solid = ![1, 2, 3, 4, 7, 8, 11, 12, 16, 20, 24].includes(i);
        const tile = new Tile({ ...blotHead, glyph, solid });
        g.map.set(x, y, tile);
        positions.push([x, y]);
      }
    }
  }

  return positions;
}
