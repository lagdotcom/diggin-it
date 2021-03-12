import { RNG } from "rot-js";
import Simplex from "rot-js/lib/noise/simplex";

import Grid from "./interfaces/Grid";
import LinearGrid from "./LinearGrid";

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

function findStart(map: Grid<string>) {
  for (var y = 1; y < map.height - 1; y++) {
    const cols = rando(map.width - 1, 1);

    for (var i = 0; i < cols.length; i++) {
      const x = cols[i];
      const here = map.get(x, y);
      const under = map.get(x, y + 1);

      if (here === " " && (under === "#" || under === ":")) return [x, y];
    }
  }
}

function findExit(map: Grid<string>) {
  for (var y = map.height - 1; y > 0; y--) {
    const cols = rando(map.width - 1, 1);

    for (var i = 0; i < cols.length; i++) {
      const x = cols[i];
      const here = map.get(x, y);
      const under = map.get(x, y + 1);

      if (here === " " && (under === "#" || under === ":" || under === "!")) {
        map.set(x, y + 1, "!");
        return [x, y];
      }
    }
  }
}

export function generateMap(width: number, height: number) {
  const noise = new Simplex();

  const map = new LinearGrid(width, height, () => "!");

  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      const n = (noise.get(x, y) + 1) * 50;
      map.set(x, y, solidity(n));
    }
  }

  const [px, py] = findStart(map);
  map.set(px, py, "<");

  const [ex, ey] = findExit(map);
  map.set(ex, ey, ">");

  return map.toArray().map((row) => row.join(""));
}
