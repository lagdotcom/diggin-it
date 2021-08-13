import { Display } from "rot-js";

import { initCheats } from "./cheats";
import Game from "./Game";
import getMusicLibrary from "./music";
import getSoundBank from "./sfx";
import getGraphicsDisplay, { loadChars, loadTiles } from "./sheets";

async function getCanvas(
  root: HTMLElement,
  width = 20,
  height = 14,
  tileSize = 16
) {
  const tilesConfig = await loadTiles(width, height);
  const charsConfig = await loadChars(width, height);

  const tiles = new Display(tilesConfig);
  const canvas = tiles.getContainer() as HTMLCanvasElement;
  canvas.className = "game";

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const chars = new Display({ ...charsConfig, context });
  root.append(canvas);

  const resized = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const uw = width * tileSize;
    const uh = height * tileSize;

    const zw = ww / uw;
    const zh = wh / uh;
    const zz = Math.max(1, Math.min(Math.floor(zw), Math.floor(zh)));

    root.style.width = `${uw * zz}px`;
    root.style.height = `${uh * zz}px`;
  };
  window.addEventListener("resize", resized);
  resized();

  const graphics = await getGraphicsDisplay(context);

  return { tiles, chars, graphics };
}

window.addEventListener("load", async () => {
  const root = document.getElementById("root");
  const music = await getMusicLibrary();
  const sfx = await getSoundBank();
  const { tiles, chars, graphics } = await getCanvas(root);

  new Game(music, sfx, tiles, chars, graphics);
  initCheats();
});
