/* eslint-disable @typescript-eslint/no-empty-function */
import GraphicsDisplay from "../interfaces/GraphicsDisplay";
import MusicLibrary from "../interfaces/MusicLibrary";
import TileDisplay from "../interfaces/TileDisplay";

export const music: MusicLibrary = {
  play() {},
  stop() {},
  fadeOut: () => Promise.resolve(),
};

export const tiles: TileDisplay = {
  clear() {},
  draw() {},
  drawText() {},
  eventToPosition: () => [0, 0],
  getOptions: () => ({ width: 20, height: 14 }),
};

export const graphics: GraphicsDisplay = {
  clear() {},
  show() {},
};
/* eslint-enable @typescript-eslint/no-empty-function */
