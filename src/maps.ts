import Actor, { ActorOptions } from "./Actor";
import { boulder, crate, metal } from "./actors";
import Game from "./Game";
import Item, { ItemOptions } from "./Item";
import {
  airTank,
  artifact,
  coin,
  coinBag,
  diamond,
  goldBar,
  helmet,
  ladder,
  rations,
  rope,
  smallGem,
  specs,
  treasureBox,
} from "./items";
import { addTheInk } from "./prefabs";
import {
  getRandomArmour,
  getRandomBomb,
  getRandomEnemy,
  getRandomWeapon,
} from "./tables";
import Tile, { TileOptions } from "./Tile";
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
  inkDoor,
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

type Zoned<T> = (zone: number) => Partial<T>;

const dirtTiles = [dirtShallow, dirtMiddle, dirtDeep];
const sandTiles = [sandShallow, sandMiddle, sandDeep];
const tileTypes: Record<string, Partial<TileOptions> | Zoned<TileOptions>> = {
  "?": unset,
  " ": empty,
  "!": border,
  "<": entrance,
  ">": exit,
  "#": (zone) => dirtTiles[zone],
  ":": (zone) => sandTiles[zone],
  "^": ladderTile,
  "|": ropeTile,
  "]": brick,
  "*": inkDoor,
};

const fluidTypes: Record<string, Partial<TileOptions>> = {
  " ": empty,
  "%": gas,
  "~": water,
};

const actorTypes: Record<
  string,
  Partial<ActorOptions> | Zoned<ActorOptions>
> = {
  "1": (zone) => {
    const a = getRandomEnemy(zone);
    const b = getRandomEnemy(zone);
    return a.maxHp < b.maxHp ? a : b;
  },
  "2": getRandomEnemy,
  "3": (zone) => {
    const a = getRandomEnemy(zone);
    const b = getRandomEnemy(zone);
    return a.maxHp > b.maxHp ? a : b;
  },
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

  B: () => getRandomBomb(),
  L: ladder,
  R: rope,
  A: airTank,
  F: rations,
  X: specs,
  H: helmet,
  G: getRandomArmour, // TODO: gas mask

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

export function getZone(depth: number): 0 | 1 | 2 {
  if (depth < 4) return 0;
  if (depth < 7) return 1;
  return 2;
}

export function loadMap(g: Game, map: string[], fluid: string[]): void {
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
      const tile = tileTypes[glyph] || empty;

      // TODO: flyweight
      g.map.set(x, y, new Tile(typeof tile === "function" ? tile(zone) : tile));
      if (item) {
        g.addItem(
          new Item(x, y, typeof item === "function" ? item(zone) : item)
        );
      } else if (actor) {
        g.add(
          new Actor(x, y, typeof actor === "function" ? actor(zone) : actor)
        );
      }

      if (glyph === "4") {
        addTheInk(g, x, y);
      }

      if (glyph === "<") {
        px = x;
        py = y;
      }

      // TODO: flyweight
      const fglyph = fluid[y][x];
      g.mapFluid.set(x, y, new Tile(fluidTypes[fglyph]));
    }
  }

  g.player.x = px;
  g.player.y = py;
  g.add(g.player);
}
