import { Display } from "rot-js";

type BorderTileset = [
  [tl: string, tm: string, tr: string],
  [ml: string, mm: string, mr: string],
  [bl: string, bm: string, br: string]
];

const panelTiles: BorderTileset = [
  ["bo1", "bo2", "bo3"],
  ["bo4", "bo5", "bo6"],
  ["bo7", "bo8", "bo9"],
];

export function drawPanel(
  chars: Display,
  sx: number,
  sy: number,
  width: number,
  height: number,
  fill = false,
  tiles = panelTiles
) {
  for (var y = 0; y < height; y++) {
    const row = y === 0 ? 0 : y === height - 1 ? 2 : 1;

    for (var x = 0; x < width; x++) {
      const col = x === 0 ? 0 : x === width - 1 ? 2 : 1;
      const tile = tiles[row][col];
      if (tile === "bo5" && !fill) continue;

      chars.draw(sx + x, sy + y, tile, "transparent", "transparent");
    }
  }
}
