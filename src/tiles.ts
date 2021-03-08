import { DisplayOptions } from "rot-js/lib/display/types";

import tilesUrl from "../res/16x16_sprites_sheet.png";
import charsUrl from "../res/8x8_sheet.png";

type TileMap = DisplayOptions["tileMap"];

function fetchImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () => reject());
    img.src = url;
  });
}

function makeTileMap(size: number, rows: (string | string[])[]): TileMap {
  const map: TileMap = {};

  rows.forEach((row, r) =>
    (typeof row === "string" ? row.split("") : row).forEach(
      (ch, c) => (map[ch] = [c * size, r * size])
    )
  );

  return map;
}

export async function loadTiles(
  width: number,
  height: number
): Promise<Partial<DisplayOptions>> {
  const tileSet = await fetchImage(tilesUrl);
  return {
    layout: "tile",
    width,
    height,
    tileWidth: 16,
    tileHeight: 16,
    tileSet,
    tileMap: makeTileMap(16, [
      "@ 1234567890",
      "<>", // TODO
      "A", // TODO
      "  BRLRCFT",
      "  $cbgG",
      "",
      "",
      "           s",
      "                 ~",
      "               O",
      "",
      "               M",
      "",
      "",
      "                 |   H",
      "           #",
      "",
      "           !",
    ]),
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
  return {
    layout: "tile",
    width: width * 2,
    height: height * 2,
    tileWidth: 8,
    tileHeight: 8,
    tileSet,
    tileMap: makeTileMap(8, [
      ' !"#$%&`()*+,-./'.split("").concat("b7", "b8", "b9"),
      "0123456789:;<=>?".split("").concat("b4", "b5", "b6"),
      "@ABCDEFGHIJKLMNO".split("").concat("b1", "b2", "b3"),
      "PQRSTUVWXYZ[\\]^_",
      "'abcdefghijklmno",
      "pqrstuvwxyz{|}~",
    ]),
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
