import { Display } from "rot-js";

import { KeyInputHandler, MouseInputHandler } from "@lagdotcom/simple-inputs";

import Actor from "./Actor";
import ArrayStack from "./ArrayStack";
import Dungeon from "./contexts/Dungeon";
import EventHandler from "./EventHandler";
import Context from "./interfaces/Context";
import Grid from "./interfaces/Grid";
import Stack from "./interfaces/Stack";
import Thing from "./interfaces/Thing";
import Item from "./Item";
import LinearGrid from "./LinearGrid";
import { loadMap, testMap } from "./maps";
import MessageLog from "./MessageLog";
import Tile, { unset } from "./Tile";
import { loadChars, loadCharsAscii, loadTiles, loadTilesAscii } from "./tiles";

export default class Game extends EventHandler {
  actors: Grid<Actor>;
  allActors: Actor[];
  canvas: HTMLCanvasElement;
  chars: Display;
  contexts: Stack<Context>;
  ctx: CanvasRenderingContext2D;
  displayHeight: number;
  displayWidth: number;
  items: Grid<Item[]>;
  log: MessageLog;
  map: Grid<Tile>;
  player: Actor;
  spent: number;
  tiles: Display;

  constructor(
    public container: HTMLElement = document.body,
    public width = 20,
    public height = 14,
    public tileSize = 16,
    public ascii = false
  ) {
    super();
    (window as any).g = this;
    this.contexts = new ArrayStack();
    this.log = new MessageLog(this);

    this.displayHeight = height - 3;
    this.displayWidth = width - 6;
  }

  resized(): void {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const uw = this.width * this.tileSize;
    const uh = this.height * this.tileSize;

    const zw = ww / uw;
    const zh = wh / uh;
    const zz = Math.max(1, Math.min(Math.floor(zw), Math.floor(zh)));

    this.container.style.width = `${uw * zz}px`;
    this.container.style.height = `${uh * zz}px`;
  }

  async init() {
    const [tilesConfig, charsConfig] = await this.getDisplayConfigs();

    this.tiles = new Display(tilesConfig);
    this.canvas = this.tiles.getContainer() as HTMLCanvasElement;
    this.canvas.className = "game";

    const context = this.canvas.getContext("2d");
    if (!context) throw Error("Could not get context");
    this.ctx = context;

    this.chars = new Display({ ...charsConfig, context });

    this.container.append(this.canvas);
    window.addEventListener("resize", this.resized.bind(this));
    this.resized();

    new KeyInputHandler(
      (e) => this.contexts.top.onKey(e),
      (cmd) => this.contexts.top.handle(cmd),
      { events: ["keydown"] }
    );

    new MouseInputHandler(
      (e) => this.contexts.top.onMouse(e),
      (cmd) => this.contexts.top.handle(cmd),
      { events: ["click", "mousemove"] }
    );
  }

  async getDisplayConfigs() {
    const { width, height, tileSize } = this;
    if (this.ascii) {
      return [
        loadTilesAscii(width, height, tileSize),
        loadCharsAscii(width, height, tileSize),
      ];
    }
    return await Promise.all([
      loadTiles(width, height),
      loadChars(width, height),
    ]);
  }

  start() {
    loadMap(this, testMap);
    this.contexts.clear();
    this.contexts.push(new Dungeon(this));
    this.spent = 0;

    this.contexts.top.render();
  }

  initMap(width: number, height: number) {
    this.map = new LinearGrid(width, height, () => unset);
    this.actors = new LinearGrid(width, height, () => undefined);
    this.allActors = [];
    this.items = new LinearGrid(width, height, () => []);
  }

  contents(x: number, y: number) {
    const actor = this.actors.get(x, y);
    const items = this.items.get(x, y);
    const tile = this.map.get(x, y);
    return { actor, items, tile };
  }

  add(thing: Thing) {
    switch (thing.type) {
      case "actor":
        this.allActors.push(thing);
        return this.actors.set(thing.x, thing.y, thing);

      case "item":
        return this.items.update(thing.x, thing.y, (items) =>
          items.concat(thing)
        );
    }
  }

  remove(thing: Thing) {
    switch (thing.type) {
      case "actor":
        this.allActors = this.allActors.filter((actor) => actor !== thing);
        return this.actors.set(thing.x, thing.y, undefined);

      case "item":
        return this.items.update(thing.x, thing.y, (items) =>
          items.filter((i) => i !== thing)
        );
    }
  }

  move(thing: Thing, x: number, y: number) {
    switch (thing.type) {
      case "actor":
        this.actors.set(thing.x, thing.y, undefined);
        thing.x = x;
        thing.y = y;
        return this.actors.set(x, y, thing);

      case "item":
        this.items.update(thing.x, thing.y, (items) =>
          items.filter((i) => i !== thing)
        );
        thing.x = x;
        thing.y = y;
        return this.items.update(x, y, (items) => items.concat(thing));
    }
  }
}
