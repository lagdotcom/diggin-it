import { DisplayOptions } from "rot-js/lib/display/types";

import tilesUrl from "../res/16x16.png";
import tilesSheet from "../res/16x16.sheet.json";
import charsUrl from "../res/8x8.png";
import charsSheet from "../res/8x8.sheet.json";

type TileMap = DisplayOptions["tileMap"];

function fetchImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () => reject());
    img.src = url;
  });
}

type Sheet = {
  size: number;
  tiles: Record<string, { row: number; col: number; size?: number }>;
};
function parseSheet(sheet: Sheet): TileMap {
  const map: TileMap = {};

  const add = (row: number, col: number, ch: string) =>
    (map[ch] = [col * sheet.size, row * sheet.size]);

  for (var ch in sheet.tiles) {
    const { row, col, size } = sheet.tiles[ch];

    switch (size) {
      case 4:
        add(row, col, ch + "1");
        add(row, col + 1, ch + "2");
        add(row + 1, col, ch + "3");
        add(row + 1, col + 1, ch + "4");
        break;

      case 9:
        add(row, col, ch + "7");
        add(row, col + 1, ch + "8");
        add(row, col + 2, ch + "9");
        add(row + 1, col, ch + "4");
        add(row + 1, col + 1, ch + "5");
        add(row + 1, col + 2, ch + "6");
        add(row + 2, col, ch + "1");
        add(row + 2, col + 1, ch + "2");
        add(row + 2, col + 2, ch + "3");
        break;

      default:
        add(row, col, ch);
    }
  }

  return map;
}

export async function loadTiles(
  width: number,
  height: number
): Promise<Partial<DisplayOptions>> {
  const tileSet = await fetchImage(tilesUrl);
  const tileMap = parseSheet(tilesSheet);
  return {
    layout: "tile",
    width,
    height,
    tileWidth: 16,
    tileHeight: 16,
    tileSet,
    tileMap,
    tileColorize: true,
  };
}

export function loadTilesAscii(
  width: number,
  height: number,
  tileSize: number
): Partial<DisplayOptions> {
  return {
    layout: "rect",
    width,
    height,
    fontSize: tileSize,
    forceSquareRatio: true,
  };
}

export async function loadChars(
  width: number,
  height: number
): Promise<Partial<DisplayOptions>> {
  const tileSet = await fetchImage(charsUrl);
  const tileMap = parseSheet(charsSheet);

  return {
    layout: "tile",
    width: width * 2,
    height: height * 2,
    tileWidth: 8,
    tileHeight: 8,
    tileSet,
    tileMap,
  };
}

export function loadCharsAscii(
  width: number,
  height: number,
  tileSize: number
): Partial<DisplayOptions> {
  return {
    layout: "rect",
    width: width * 2,
    height: height * 2,
    fontSize: tileSize / 2,
    forceSquareRatio: true,
  };
}
