import { RNG } from "rot-js";

import Actor, { ActorOptions } from "./Actor";
import { boulder, crate, metal } from "./entities/movables";
import {
  border,
  borderFinal,
  brick,
  coral,
  darkWater,
  dirtDeep,
  dirtFinal,
  dirtMiddle,
  dirtShallow,
  empty,
  entrance,
  exit,
  finalDoor,
  gas,
  inkDoor,
  ladderTile,
  magma,
  pike,
  ropeTile,
  sandDeep,
  sandFinal,
  sandMiddle,
  sandShallow,
  unset,
  vaultBrick,
  vaultExit,
  water,
} from "./entities/tiles";
import Game from "./Game";
import XY from "./interfaces/XY";
import { getZone, Zoned } from "./interfaces/Zone";
import Item, { ItemOptions } from "./Item";
import {
  addFakeHeart,
  addHugeDoor,
  addTheGreenInk,
  addTheInk,
  addTheRedInk,
} from "./prefabs";
import {
  getBigTreasure,
  getMediumTreasure,
  getRandomAirItem,
  getRandomArmour,
  getRandomBomb,
  getRandomChampion,
  getRandomClimbingTool,
  getRandomCure,
  getRandomEnemy,
  getRandomFood,
  getRandomPotion,
  getRandomProjectile,
  getRandomTreasure,
  getRandomUsable,
  getRandomWeapon,
  getSlab,
  getSmallTreasure,
  getSupremeItem,
  Picker,
} from "./tables";
import Tile, { TileOptions } from "./Tile";
import { higherOfTwo, log, lowerOfTwo } from "./utils";

const borderTiles: Zoned<Partial<TileOptions>> = [
  border,
  border,
  border,
  borderFinal,
];
const dirtTiles: Zoned<Partial<TileOptions>> = [
  dirtShallow,
  dirtMiddle,
  dirtDeep,
  dirtFinal,
];
const sandTiles: Zoned<Partial<TileOptions>> = [
  sandShallow,
  sandMiddle,
  sandDeep,
  sandFinal,
];
const tileTypes: Record<string, Partial<TileOptions> | Picker<TileOptions>> = {
  "?": unset,
  " ": empty,
  "!": ({ zone }) => borderTiles[zone],
  "#": ({ zone }) => dirtTiles[zone],
  ":": ({ zone }) => sandTiles[zone],
  "[": brick, // lol
  "]": brick,
  "*": vaultBrick,
  "^": ladderTile,
  "|": ropeTile,
  "+": pike,
  "<": entrance,
  ">": exit,
  v: vaultExit,
  f: inkDoor,
  g: finalDoor,
  C: coral,
};

const fluidTypes: Record<string, Partial<TileOptions>> = {
  " ": empty,
  "%": gas,
  "~": water,
  I: darkWater,
  "&": magma,
};

const actorTypes: Record<string, Partial<ActorOptions> | Picker<ActorOptions>> =
  {
    "1": lowerOfTwo(getRandomEnemy, (e) => e.maxHp),
    "2": getRandomEnemy,
    "3": higherOfTwo(getRandomEnemy, (e) => e.maxHp),
    // "4": theInk,
    // "5": theBlot,
    "8": getRandomChampion,

    O: boulder,
    M: metal,
    W: crate,
  };

const itemTypes: Record<string, Partial<ItemOptions> | Picker<ItemOptions>> = {
  c: getSmallTreasure,
  x: getMediumTreasure,
  d: getBigTreasure,
  $: getRandomTreasure,

  "@": getRandomUsable,
  A: getRandomAirItem,
  B: getRandomBomb,
  F: getRandomFood,
  P: getRandomPotion,
  R: getRandomClimbingTool,
  S: getRandomCure,
  T: getRandomProjectile,
  Z: getSupremeItem,

  "6": getRandomArmour,
  "7": getRandomWeapon,
  "9": getSlab,
};

const validGlyph = new Set([
  "4", // the ink
  "H", // slab door
  "D", // fake blot heart
  ...Object.keys(tileTypes),
  ...Object.keys(fluidTypes),
  ...Object.keys(fluidTypes),
  ...Object.keys(actorTypes),
  ...Object.keys(itemTypes),
]);

export function loadMap(g: Game, map: string[], fluid: string[]): void {
  let px = 0,
    py = 0;
  let hugeDoorLocation: XY = undefined;
  let fakeHeartLocation: XY = undefined;

  const championChance = g.player.get("championChance");
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
      const fluidGlyph = fluid[y][x];
      const config = { championChance, zone, fluid: fluidGlyph };

      if (!validGlyph.has(glyph)) log("invalid map glyph:", glyph);

      // TODO: flyweight
      g.map.set(
        x,
        y,
        new Tile(typeof tile === "function" ? tile(config) : tile)
      );
      if (item) {
        const e = typeof item === "function" ? item(config) : item;
        g.addItem(new Item(x, y, e));
      } else if (actor) {
        const e = typeof actor === "function" ? actor(config) : actor;
        g.add(new Actor(x, y, e));
      }

      if (glyph === "4") {
        const spawnInk = RNG.getItem([addTheInk, addTheGreenInk, addTheRedInk]);
        spawnInk(g, x, y);
      } else if (glyph === "D") {
        if (!fakeHeartLocation) fakeHeartLocation = [x, y];
      } else if (glyph === "<") {
        px = x;
        py = y;
      } else if (glyph === "H") {
        if (!hugeDoorLocation) hugeDoorLocation = [x, y];
      }

      // TODO: flyweight
      g.mapFluid.set(x, y, new Tile(fluidTypes[fluidGlyph]));
    }
  }

  if (fakeHeartLocation) addFakeHeart(g, ...fakeHeartLocation);
  if (hugeDoorLocation) addHugeDoor(g, ...hugeDoorLocation);

  g.player.x = px;
  g.player.y = py;
  g.add(g.player);
}
