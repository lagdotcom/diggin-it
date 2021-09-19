import { RNG } from "rot-js";
import Simplex from "rot-js/lib/noise/simplex";

import Hotspots from "./Hotspots";
import Grid from "./interfaces/Grid";
import { getZone } from "./interfaces/Zone";
import LinearGrid from "./LinearGrid";
import { log } from "./utils";
import basics from "./vaults/basics";
import bossRooms from "./vaults/boss";
import eggRooms from "./vaults/egg";
import { artery } from "./vaults/end";
import allExits from "./vaults/exits";
import fragments from "./vaults/fragments";
import jRooms from "./vaults/j";
import lagRooms from "./vaults/lag";
import moreRooms from "./vaults/more";
import { areas, entrances } from "./vaults/sideAreas";

const vaults = [
  ...basics,
  ...lagRooms,
  ...fragments,
  ...jRooms,
  ...moreRooms,
  ...eggRooms,
];

function solidity(n: number) {
  if (n < 40) return " ";
  if (n < 50) return ":";
  return "#";
}

function randomCols(end: number, start = 0) {
  const cols = [];
  for (let x = start; x < end; x++) cols.push(x);
  return RNG.shuffle(cols);
}

function isSolid(ch: string) {
  return "#:[!".includes(ch);
}

function findStart(map: Grid<string>, taken: Hotspots<unknown>) {
  for (let y = 1; y < map.height - 1; y++) {
    const cols = randomCols(map.width - 1, 1);

    for (let i = 0; i < cols.length; i++) {
      const x = cols[i];
      if (taken.resolve(x, y)) continue;

      const here = map.get(x, y);
      const under = map.get(x, y + 1);

      if (here === " " && isSolid(under)) return [x, y];
    }
  }

  throw new Error("no valid entrance");
}

function findExit(map: Grid<string>, taken: Hotspots<unknown>) {
  for (let y = map.height - 1; y > 0; y--) {
    const cols = randomCols(map.width - 1, 1);

    for (let i = 0; i < cols.length; i++) {
      const x = cols[i];
      if (taken.resolve(x, y)) continue;

      const here = map.get(x, y);
      const under = map.get(x, y + 1);

      if (here === " " && isSolid(under)) {
        map.set(x, y + 1, "!");
        return [x, y];
      }
    }
  }

  throw new Error("no valid exit");
}

function getMapParameters(depth: number) {
  const width = 12 + depth * 3;
  const height = 15 + depth * 5;
  const maxVaults = Math.floor((width * height) / 80);
  const vaultAttempts = maxVaults * 10;
  const zone = getZone(depth) + 1;
  const hasSideArea = depth % 3 === 0;

  return { width, height, maxVaults, vaultAttempts, zone, hasSideArea };
}

function toMapString(grid: Grid<string>) {
  return grid.toArray().map((row) => row.join(""));
}

type MapgenResult = [
  tiles: string[],
  fluids: string[],
  side: string,
  vaults: Hotspots
];

function generateBossMap(seed?: number): MapgenResult {
  if (typeof seed === "number") RNG.setSeed(seed);
  else seed = RNG.getSeed();
  log("map seed:", seed);

  const vault = RNG.getItem(bossRooms);
  const [map, fluid] = vault.resolve();

  const taken = new Hotspots();
  taken.register(vault.name, 0, 0, vault.width, vault.height);
  return [toMapString(map), toMapString(fluid), "", taken];
}

export function generateMap(
  depth: number,
  doNotUse: string[] = [],
  seed?: number
): MapgenResult {
  if (depth === 10) return generateBossMap(seed);

  const { width, height, maxVaults, vaultAttempts, zone, hasSideArea } =
    getMapParameters(depth);

  if (typeof seed === "number") RNG.setSeed(seed);
  else seed = RNG.getSeed();
  log("map seed:", seed);

  const exits = depth > 10 ? [artery] : allExits;
  const noise = new Simplex();
  const taken = new Hotspots<string>();
  const map = new LinearGrid(width, height, () => "!");
  const fluid = new LinearGrid(width, height, () => " ");
  let side = "";

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const n = (noise.get(x, y) + 1) * 50;
      map.set(x, y, solidity(n));
    }
  }

  while (!taken.spots.length) {
    const exit = RNG.getItem(exits);
    if (exit.width > width - 2) continue;

    const x = RNG.getUniformInt(1, width - exit.width - 1);
    const y = height - exit.height - 1;
    log(`placing ${exit.name} at ${x},${y}`);
    taken.register(exit.name, x, y, exit.width, exit.height);

    const [exitMap, exitFluid] = exit.resolve();
    map.paste(exitMap, x, y);
    fluid.paste(exitFluid, x, y);
  }

  if (hasSideArea) {
    for (let i = 0; i < vaultAttempts; i++) {
      const vault = RNG.getItem(entrances);
      if (vault.difficulty !== zone) continue;
      if (doNotUse.includes(vault.name)) continue;

      const x = RNG.getUniformInt(1, width - vault.width - 1);
      const y = RNG.getUniformInt(1, height - vault.height - 1);
      if (x < 1 || y < 1) continue;

      const spot = taken.overlap(x, y, vault.width, vault.height);
      if (!spot) {
        log(`placing ${vault.name} at ${x},${y}`);
        taken.register(vault.name, x, y, vault.width, vault.height);

        const [vaultMap, vaultFluid] = vault.resolve();
        map.paste(vaultMap, x, y);
        fluid.paste(vaultFluid, x, y);

        side = vault.name;
        break;
      }
    }

    if (!side) log("could not place side area");
  }

  let placed = 0;
  for (let i = 0; i < vaultAttempts; i++) {
    const vault = RNG.getItem(vaults);
    if (vault.difficulty > zone) continue;

    const x = RNG.getUniformInt(1, width - vault.width - 1);
    const y = RNG.getUniformInt(1, height - vault.height - 1);
    if (x < 1 || y < 1) continue;

    const spot = taken.overlap(x, y, vault.width, vault.height);
    if (!spot) {
      log(`placing ${vault.name} at ${x},${y}`);
      taken.register(vault.name, x, y, vault.width, vault.height);

      const [vaultMap, vaultFluid] = vault.resolve();
      map.paste(vaultMap, x, y);
      fluid.paste(vaultFluid, x, y);

      placed++;
      if (placed >= maxVaults) break;
    }
  }

  if (!map.includes("<")) {
    const [px, py] = findStart(map, taken);
    map.set(px, py, "<");
  }

  if (!map.includes(">")) {
    const [ex, ey] = findExit(map, taken);
    map.set(ex, ey, ">");
  }

  return [toMapString(map), toMapString(fluid), side, taken];
}

export function generateSideArea(
  name: string
): [tiles: string[], fluids: string[]] {
  const vault = areas[name];
  const [tiles, fluids] = vault.resolve();
  return [toMapString(tiles), toMapString(fluids)];
}
