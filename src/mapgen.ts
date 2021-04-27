import { RNG } from "rot-js";
import Simplex from "rot-js/lib/noise/simplex";

import Game from "./Game";
import Hotspots from "./Hotspots";
import Grid from "./interfaces/Grid";
import LinearGrid from "./LinearGrid";
import { getZone } from "./maps";
import { log } from "./utils";
import basics from "./vaults/basics";
import bossrooms from "./vaults/boss";
import eggrooms from "./vaults/egg";
import exits from "./vaults/exits";
import fragments from "./vaults/fragments";
import jrooms from "./vaults/j";
import lagrooms from "./vaults/lag";
import morerooms from "./vaults/more";
import { areas, entrances } from "./vaults/sideAreas";

const vaults = [
  ...basics,
  ...lagrooms,
  ...fragments,
  ...jrooms,
  ...morerooms,
  ...eggrooms,
];

function solidity(n: number) {
  if (n < 40) return " ";
  if (n < 50) return ":";
  return "#";
}

function rando(end: number, start = 0) {
  const cols = [];
  for (let x = start; x < end; x++) cols.push(x);
  return RNG.shuffle(cols);
}

function isSolid(ch: string) {
  return "#:[!".includes(ch);
}

function findStart(map: Grid<string>, taken: Hotspots<unknown>) {
  for (let y = 1; y < map.height - 1; y++) {
    const cols = rando(map.width - 1, 1);

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
    const cols = rando(map.width - 1, 1);

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
  const maxvaults = Math.floor((width * height) / 80);
  const vaultattempts = maxvaults * 10;
  const zone = getZone(depth) + 1;
  const hasSideArea = depth % 3 === 0;

  return { width, height, maxvaults, vaultattempts, zone, hasSideArea };
}

function toMapString(grid: Grid<string>) {
  return grid.toArray().map((row) => row.join(""));
}

function generateBossMap(
  seed?: number
): [tiles: string[], fluids: string[], side: string] {
  if (typeof seed === "number") RNG.setSeed(seed);
  else seed = RNG.getSeed();
  log("map seed:", seed);

  const vault = RNG.getItem(bossrooms);
  const [map, fluid] = vault.resolve();
  return [toMapString(map), toMapString(fluid), ""];
}

export function generateMap(
  depth: number,
  doNotUse: string[] = [],
  seed?: number
): [tiles: string[], fluids: string[], side: string] {
  if (depth >= 10) return generateBossMap(seed);

  const {
    width,
    height,
    maxvaults,
    vaultattempts,
    zone,
    hasSideArea,
  } = getMapParameters(depth);

  if (typeof seed === "number") RNG.setSeed(seed);
  else seed = RNG.getSeed();
  log("map seed:", seed);

  const noise = new Simplex();
  const taken = new Hotspots<number>();
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
    taken.register(-1, x, y, exit.width, exit.height);

    const [xmap, xfluid] = exit.resolve();
    map.paste(xmap, x, y);
    fluid.paste(xfluid, x, y);
  }

  if (hasSideArea) {
    for (let i = 0; i < vaultattempts; i++) {
      const vault = RNG.getItem(entrances);
      if (vault.difficulty > zone) continue;
      if (doNotUse.includes(vault.name)) continue;

      const x = RNG.getUniformInt(1, width - vault.width - 1);
      const y = RNG.getUniformInt(1, height - vault.height - 1);
      if (x < 1 || y < 1) continue;

      const spot = taken.overlap(x, y, vault.width, vault.height);
      if (!spot) {
        log(`placing ${vault.name} at ${x},${y}`);
        taken.register(i, x, y, vault.width, vault.height);

        const [vmap, vfluid] = vault.resolve();
        map.paste(vmap, x, y);
        fluid.paste(vfluid, x, y);

        side = vault.name;
        break;
      }
    }

    if (!side) log("could not place side area");
  }

  let placed = 0;
  for (let i = 0; i < vaultattempts; i++) {
    const vault = RNG.getItem(vaults);
    if (vault.difficulty > zone) continue;

    const x = RNG.getUniformInt(1, width - vault.width - 1);
    const y = RNG.getUniformInt(1, height - vault.height - 1);
    if (x < 1 || y < 1) continue;

    const spot = taken.overlap(x, y, vault.width, vault.height);
    if (!spot) {
      log(`placing ${vault.name} at ${x},${y}`);
      taken.register(i, x, y, vault.width, vault.height);

      const [vmap, vfluid] = vault.resolve();
      map.paste(vmap, x, y);
      fluid.paste(vfluid, x, y);

      placed++;
      if (placed >= maxvaults) break;
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

  return [toMapString(map), toMapString(fluid), side];
}

export function generateSideArea(
  name: string
): [tiles: string[], fluids: string[]] {
  const vault = areas[name];
  const [tiles, fluids] = vault.resolve();
  return [toMapString(tiles), toMapString(fluids)];
}
