import { Display } from "rot-js";

type BorderTileset = [
  [tl: string, tm: string, tr: string],
  [ml: string, mm: string, mr: string],
  [bl: string, bm: string, br: string]
];

const panelTiles: BorderTileset = [
  ["b7", "b8", "b9"],
  ["b4", "b5", "b6"],
  ["b1", "b2", "b3"],
];

export function drawPanel(
  chars: Display,
  sx: number,
  sy: number,
  width: number,
  height: number,
  tiles = panelTiles
) {
  for (var y = 0; y < height; y++) {
    const row = y === 0 ? 0 : y === height - 1 ? 2 : 1;

    for (var x = 0; x < width; x++) {
      const col = x === 0 ? 0 : x === width - 1 ? 2 : 1;
      const tile = tiles[row][col];
      chars.draw(sx + x, sy + y, tile, "transparent", "black");
    }
  }
}
