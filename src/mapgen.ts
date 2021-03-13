import { RNG } from "rot-js";
import Simplex from "rot-js/lib/noise/simplex";

import Game from "./Game";
import Hotspots from "./Hotspots";
import Grid from "./interfaces/Grid";
import LinearGrid from "./LinearGrid";
import basics from "./vaults/basics";
import bossrooms from "./vaults/boss";
import fragments from "./vaults/fragments";
import jrooms from "./vaults/j";
import lagrooms from "./vaults/lag";

const vaults = [...basics, ...lagrooms, ...fragments, ...jrooms];

function solidity(n: number) {
  if (n < 40) return " ";
  if (n < 50) return ":";
  return "#";
}

function rando(end: number, start: number = 0) {
  const cols = [];
  for (var x = start; x < end; x++) cols.push(x);
  return RNG.shuffle(cols);
}

function isSolid(ch: string) {
  return "#:[!".includes(ch);
}

function findStart(map: Grid<string>, taken: Hotspots<any>) {
  for (var y = 1; y < map.height - 1; y++) {
    const cols = rando(map.width - 1, 1);

    for (var i = 0; i < cols.length; i++) {
      const x = cols[i];
      if (taken.resolve(x, y)) continue;

      const here = map.get(x, y);
      const under = map.get(x, y + 1);

      if (here === " " && isSolid(under)) return [x, y];
    }
  }

  throw new Error("no valid entrance");
}

function findExit(map: Grid<string>, taken: Hotspots<any>) {
  for (var y = map.height - 1; y > 0; y--) {
    const cols = rando(map.width - 1, 1);

    for (var i = 0; i < cols.length; i++) {
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
  const vaultattempts = maxvaults * 5;

  return { width, height, maxvaults, vaultattempts };
}

function toMapString(grid: Grid<string>) {
  return grid.toArray().map((row) => row.join(""));
}

function generateBossMap(g: Game, seed?: number) {
  if (typeof seed === "number") RNG.setSeed(seed);
  else seed = RNG.getSeed();
  console.log("map seed:", seed);

  const vault = RNG.getItem(bossrooms);
  return toMapString(vault.resolve());
}

export function generateMap(g: Game, seed?: number) {
  if (g.depth >= 10) return generateBossMap(g, seed);

  const { width, height, maxvaults, vaultattempts } = getMapParameters(g.depth);

  if (typeof seed === "number") RNG.setSeed(seed);
  else seed = RNG.getSeed();
  console.log("map seed:", seed);

  const noise = new Simplex();
  const taken = new Hotspots<number>();
  const map = new LinearGrid(width, height, () => "!");

  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      const n = (noise.get(x, y) + 1) * 50;
      map.set(x, y, solidity(n));
    }
  }

  for (var i = 0; i < vaultattempts; i++) {
    const vault = RNG.getItem(vaults);
    const x = RNG.getUniformInt(1, width - vault.width - 1);
    const y = RNG.getUniformInt(1, height - vault.height - 1);
    if (x < 1 || y < 1) continue;

    const spot = taken.overlap(x, y, vault.width, vault.height);
    if (!spot) {
      console.log(`placing ${vault.name} at ${x},${y}`);
      taken.register(i, x, y, vault.width, vault.height);
      map.paste(vault.resolve(), x, y);

      if (taken.spots.length >= maxvaults) break;
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

  return toMapString(map);
}
