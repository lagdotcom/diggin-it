import Actor, { ActorOptions } from "./Actor";
import { boulder, metal, player, squimpy } from "./actors";
import Game from "./Game";
import Item, { ItemOptions } from "./Item";
import {
  bomb,
  clothes,
  coinBag,
  ladder,
  pocketknife,
  pocketwatch,
  rope,
  smallGem,
} from "./items";
import Tile from "./Tile";
import {
  air,
  border,
  dirtDeep,
  dirtMiddle,
  dirtShallow,
  empty,
  entrance,
  exit,
  ladderTile,
  ropeTile,
  sandDeep,
  sandMiddle,
  sandShallow,
  unset,
  water,
} from "./tiles";

export const testMap = [
  "!!!!!!!!!!!!!!!!",
  "!#             !",
  "!#< RL     O   !",
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

const tileTypes: Record<string, Tile | Tile[]> = {
  "?": unset,
  "!": border,
  "<": entrance,
  ">": exit,
  "#": [dirtShallow, dirtMiddle, dirtDeep],
  s: [sandShallow, sandMiddle, sandDeep],
  H: ladderTile,
  "|": ropeTile,
  "~": water,
  A: air,
};

const actorTypes: Record<string, Partial<ActorOptions>> = {
  "1": squimpy,
  O: boulder,
  M: metal,
};

const itemTypes: Record<string, Partial<ItemOptions>> = {
  B: bomb,
  g: smallGem,
  $: coinBag,
  L: ladder,
  R: rope,
};

function getZone(depth: number) {
  if (depth < 4) return 0;
  if (depth < 7) return 1;
  return 2;
}

export function loadMap(g: Game, map: string[]): void {
  let px = 0,
    py = 0;

  const height = map.length;
  const width = map[0].length;
  const zone = getZone(g.depth);
  g.initMap(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const glyph = map[y][x];
      const actor = actorTypes[glyph];
      const item = itemTypes[glyph];
      const tiles = tileTypes[glyph];
      const tile = Array.isArray(tiles) ? tiles[zone] : tiles;

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

  const weapon = new Item(0, 0, pocketknife);
  const armour = new Item(0, 0, clothes);
  const trinket = new Item(0, 0, pocketwatch);
  g.player = new Actor(px, py, {
    ...player,
    equipment: { weapon, armour },
    inventory: [weapon, armour, trinket],
  });
  g.add(g.player);
}
