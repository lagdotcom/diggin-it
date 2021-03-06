import TileDisplay from "./interfaces/TileDisplay";

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

export function clearArea(
  display: TileDisplay,
  sx: number,
  sy: number,
  width: number,
  height: number
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      display.draw(sx + x, sy + y, " ");
    }
  }
}

export function drawPanel(
  chars: TileDisplay,
  sx: number,
  sy: number,
  width: number,
  height: number,
  fill = false,
  fg = "transparent",
  bg = "transparent",
  tiles = panelTiles
): void {
  for (let y = 0; y < height; y++) {
    const row = y === 0 ? 0 : y === height - 1 ? 2 : 1;

    for (let x = 0; x < width; x++) {
      const col = x === 0 ? 0 : x === width - 1 ? 2 : 1;
      const tile = tiles[row][col];
      if (tile === "bo5" && !fill) continue;

      chars.draw(sx + x, sy + y, tile, fg, bg);
    }
  }
}

export function drawMulti(
  display: TileDisplay,
  sx: number,
  sy: number,
  width: number,
  height: number,
  glyph: string,
  fg?: string,
  bg?: string
): void {
  let i = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      i++;
      display.draw(sx + x, sy + y, glyph + i.toString(), fg, bg);
    }
  }
}
