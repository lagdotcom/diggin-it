import Actor, { ActorOptions } from "./Actor";
import { boulder, crate, metal } from "./actors";
import Game from "./Game";
import Item, { ItemOptions } from "./Item";
import {
  airTank,
  arrow,
  artifact,
  coin,
  coinBag,
  diamond,
  goldBar,
  helmet,
  ladder,
  mask,
  medikit,
  rations,
  rock,
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
  vaultBrick,
  vaultExit,
  water,
} from "./tiles";
import { higherOfTwo, lowerOfTwo } from "./utils";

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
  "#": (zone) => dirtTiles[zone],
  ":": (zone) => sandTiles[zone],
  "]": brick,
  "*": vaultBrick,
  "^": ladderTile,
  "|": ropeTile,
  "<": entrance,
  ">": exit,
  v: vaultExit,
  f: inkDoor,
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
  "1": lowerOfTwo(getRandomEnemy, (e) => e.maxHp),
  "2": getRandomEnemy,
  "3": higherOfTwo(getRandomEnemy, (e) => e.maxHp),
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

  A: airTank,
  B: () => getRandomBomb(),
  F: rations,
  G: mask,
  H: helmet,
  K: medikit,
  L: ladder,
  N: arrow,
  // TODO P: () => getRandomPotion(),
  R: rope,
  S: rock,
  X: specs,

  "5": lowerOfTwo(getRandomWeapon, (i) => i.bonus.sp),
  "6": getRandomWeapon,
  "7": higherOfTwo(getRandomWeapon, (i) => i.bonus.sp),
  "8": lowerOfTwo(getRandomArmour, (i) => i.bonus.dp),
  "9": getRandomArmour,
  "0": higherOfTwo(getRandomArmour, (i) => i.bonus.dp),
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
