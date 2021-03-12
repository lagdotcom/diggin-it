import Actor, { ActorOptions } from "./Actor";
import { boulder, crate, metal, theInk } from "./actors";
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
import { getRandomArmour, getRandomEnemy, getRandomWeapon } from "./tables";
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

type Zoned<T> = (zone: number) => Partial<T>;

const actorTypes: Record<
  string,
  Partial<ActorOptions> | Zoned<ActorOptions>
> = {
  "1": (zone) => {
    const a = getRandomEnemy(zone);
    const b = getRandomEnemy(zone);
    return a.maxhp < b.maxhp ? a : b;
  },
  "2": getRandomEnemy,
  "3": (zone) => {
    const a = getRandomEnemy(zone);
    const b = getRandomEnemy(zone);
    return a.maxhp > b.maxhp ? a : b;
  },
  "4": theInk,
  O: boulder,
  M: metal,
  W: crate,
};

const itemTypes: Record<string, Partial<ItemOptions> | Zoned<ItemOptions>> = {
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

  "5": (zone) => {
    const a = getRandomWeapon(zone);
    const b = getRandomWeapon(zone);
    return a.bonus.sp < b.bonus.sp ? a : b;
  },
  "6": getRandomWeapon,
  "7": (zone) => {
    const a = getRandomWeapon(zone);
    const b = getRandomWeapon(zone);
    return a.bonus.sp > b.bonus.sp ? a : b;
  },
  "8": (zone) => {
    const a = getRandomArmour(zone);
    const b = getRandomArmour(zone);
    return a.bonus.dp < b.bonus.dp ? a : b;
  },
  "9": getRandomArmour,
  "0": (zone) => {
    const a = getRandomArmour(zone);
    const b = getRandomArmour(zone);
    return a.bonus.dp > b.bonus.dp ? a : b;
  },
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
        g.addItem(
          new Item(x, y, typeof item === "function" ? item(zone) : item)
        );
      } else if (actor) {
        g.add(
          new Actor(x, y, typeof actor === "function" ? actor(zone) : actor)
        );
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
