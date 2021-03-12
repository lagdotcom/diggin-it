import Actor, { ActorOptions } from "./Actor";
import { boulder, crate, metal, squimpy } from "./actors";
import Game from "./Game";
import Item, { ItemOptions } from "./Item";
import {
  airTank,
  artifact,
  bomb,
  coin,
  coinBag,
  diamond,
  fragment,
  goldBar,
  helmet,
  ladder,
  rations,
  rope,
  smallGem,
  specs,
  treasureBox,
} from "./items";
import Tile from "./Tile";
import {
  border,
  brick,
  dirtDeep,
  dirtMiddle,
  dirtShallow,
  empty,
  entrance,
  exit,
  gas,
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
  "!###:::^####  $!",
  "! B   :^ Mg#1 #!",
  "!###  :^#######!",
  "!###1 :^       !",
  "!######^1      !",
  "!########      !",
  "!A      ##   ::!",
  "!#~~~~~~##:::::!",
  "!#~###~~#      !",
  "!~~~~~~~#    > !",
  "!~~~~~~~#~~#~!#!",
  "!!!!!!!!!!!!!!!!",
];

const tileTypes: Record<string, Tile | Tile[]> = {
  "?": unset,
  " ": empty,
  "%": gas,
  "!": border,
  "<": entrance,
  ">": exit,
  "#": [dirtShallow, dirtMiddle, dirtDeep],
  ":": [sandShallow, sandMiddle, sandDeep],
  "^": ladderTile,
  "|": ropeTile,
  "~": water,
  "]": brick,
};

const actorTypes: Record<string, Partial<ActorOptions>> = {
  "1": squimpy, // TODO: simple foe
  "2": squimpy, // TODO: normal foe
  "3": squimpy, // TODO: fearsome foe
  "4": squimpy, // TODO: the ink!
  O: boulder,
  M: metal,
  W: crate,
};

const itemTypes: Record<string, Partial<ItemOptions>> = {
  c: coin,
  b: goldBar,
  g: smallGem,
  $: coinBag,
  a: artifact,
  x: treasureBox,
  d: diamond,
  f: fragment,

  B: bomb,
  L: ladder,
  R: rope,
  A: airTank,
  F: rations,
  X: specs,
  H: helmet,
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
        g.addItem(new Item(x, y, item));
      } else if (actor) {
        g.add(new Actor(x, y, actor));
      }

      if (glyph === "<") {
        px = x;
        py = y;
      }
    }
  }

  g.player.x = px;
  g.player.y = py;
  g.add(g.player);
}
