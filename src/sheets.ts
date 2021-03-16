import { DisplayOptions } from "rot-js/lib/display/types";

import tilesUrl from "../res/16x16.png";
import tilesSheet from "../res/16x16.sheet.json";
import charsUrl from "../res/8x8.png";
import charsSheet from "../res/8x8.sheet.json";
import badEndUrl from "../res/ending1.png";
import goodEndUrl from "../res/ending2.png";
import titleUrl from "../res/title.png";

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
  tiles: Record<
    string,
    { row: number; col: number; width?: number; height?: number }
  >;
};
function parseSheet(sheet: Sheet): TileMap {
  const map: TileMap = {};

  const add = (row: number, col: number, ch: string) =>
    (map[ch] = [col * sheet.size, row * sheet.size]);

  for (const ch in sheet.tiles) {
    const { row, col, width, height } = sheet.tiles[ch];

    if (width || height) {
      let i = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          i++;
          add(row + y, col + x, ch + i.toString());
        }
      }
    } else add(row, col, ch);
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
    fg: "transparent",
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

export function loadTitleGraphics(): Promise<HTMLImageElement> {
  return fetchImage(titleUrl);
}

export function loadBadEndGraphics(): Promise<HTMLImageElement> {
  return fetchImage(badEndUrl);
}

export function loadGoodEndGraphics(): Promise<HTMLImageElement> {
  return fetchImage(goodEndUrl);
}
