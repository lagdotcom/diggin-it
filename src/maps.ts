import Actor, { ActorOptions } from './Actor';
import Game from './Game';
import Item, { ItemOptions } from './Item';
import LinearGrid from './LinearGrid';
import Tile, { air, border, dirt, empty, entrance, exit, ladder, sand, unset, water } from './Tile';

export const testMap = [
  "!!!!!!!!!!!!!!!!",
  "!#             !",
  "!#<        O   !",
  "!###sssH####  $!",
  "! B   sH Mg#1 #!",
  "!###  sH#######!",
  "!###1 sH       !",
  "!######H1      !",
  "!########      !",
  "!A      ##   ss!",
  "!#~~~~~~##sssss!",
  "!#~###~~#      !",
  "!~~~~~~~#    > !",
  "!~~~~~~~#~~#~!#!",
  "!!!!!!!!!!!!!!!!",
];

const tileTypes: Partial<Record<string, Tile>> = {
  "?": unset,
  "!": border,
  "<": entrance,
  ">": exit,
  "#": dirt,
  s: sand,
  H: ladder,
  "~": water,
  A: air,
};

const actorTypes: Partial<Record<string, Partial<ActorOptions>>> = {
  "1": { glyph: "1", name: "enemy", colour: "red" },
  O: {
    glyph: "O",
    name: "boulder",
    colour: "grey",
    digResistance: 20,
    pushable: true,
  },
  M: { glyph: "M", name: "metal block", colour: "cyan", pushable: true },
};

const itemTypes: Partial<Record<string, Partial<ItemOptions>>> = {
  B: { glyph: "B", name: "bomb" },
  g: { glyph: "g", name: "gem", colour: "blue" },
  $: { glyph: "$", name: "cash", colour: "white" },
};

export function loadMap(g: Game, map: string[]): void {
  let px = 0,
    py = 0;

  const height = map.length;
  const width = map[0].length;
  g.initMap(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const glyph = map[y][x];
      const actor = actorTypes[glyph];
      const item = itemTypes[glyph];
      const tile = tileTypes[glyph];

      g.map.set(x, y, tile || empty);
      if (item) {
        g.add(new Item(x, y, item));
      } else if (actor) {
        g.add(new Actor(x, y, actor));
      }

      if (glyph === "<") {
        px = x;
        py = y;
      }
    }
  }

  g.player = new Actor(px, py, { glyph: "@", digStrength: 10 });
  g.add(g.player);
}
