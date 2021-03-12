import { RNG } from "rot-js";

import Actor, { ActorOptions } from "./Actor";
import {
  boulder,
  buster,
  canandra,
  crate,
  crim,
  flazza,
  glova,
  metal,
  muln,
  slobberfin,
  splinter,
  squimpy,
  telden,
  theInk,
} from "./actors";
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

const common = 10;
const uncommon = 5;
const rare = 2;
const ultrarare = 1;

const enemyTypes = {
  squimpy,
  buster,
  canandra,
  crim,
  flazza,
  glova,
  muln,
  slobberfin,
  splinter,
  telden,
};
type EnemyName = keyof typeof enemyTypes;
type EnemyDistribution = Partial<Record<EnemyName, number>>;

const enemiesByZone: EnemyDistribution[] = [
  {
    squimpy: uncommon,
    buster: common,
  },
  {
    squimpy: common,
    buster: common,
    canandra: rare,
    crim: rare,
    flazza: uncommon,
    glova: uncommon,
    muln: uncommon,
    slobberfin: ultrarare,
    splinter: uncommon,
    telden: uncommon,
  },
  {
    squimpy: uncommon,
    canandra: uncommon,
    crim: uncommon,
    flazza: uncommon,
    glova: common,
    muln: uncommon,
    slobberfin: rare,
    splinter: common,
    telden: uncommon,
  },
];

function getRandomEnemy(zone: number) {
  return enemyTypes[RNG.getWeightedValue(enemiesByZone[zone]) as EnemyName];
}

const actorTypes: Record<string, (zone: number) => Partial<ActorOptions>> = {
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
  "4": () => theInk,
  O: () => boulder,
  M: () => metal,
  W: () => crate,
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
        g.add(new Actor(x, y, actor(zone)));
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
