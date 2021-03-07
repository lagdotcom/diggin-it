import { Display } from 'rot-js';

import { KeyInputHandler } from '@lagdotcom/simple-inputs';

import Actor from './Actor';
import ArrayStack from './ArrayStack';
import Cmd from './Cmd';
import Dungeon from './contexts/Dungeon';
import Context from './interfaces/Context';
import Grid from './interfaces/Grid';
import Stack from './interfaces/Stack';
import Item from './Item';
import LinearGrid from './LinearGrid';
import { loadMap, testMap } from './maps';
import Tile, { unset } from './Tile';

export default class Game {
  actors: Grid<Actor>;
  chars: Display;
  contexts: Stack<Context>;
  items: Grid<Item[]>;
  map: Grid<Tile>;
  player: Actor;
  tiles: Display;

  constructor() {
    (window as any).g = this;

    this.tiles = new Display({
      layout: "rect",
      width: 20,
      height: 14,
      fontSize: 16,
      forceSquareRatio: true,
    });
    const canvas = this.tiles.getContainer() as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) throw Error("Could not get context");

    this.chars = new Display({
      layout: "rect",
      width: 40,
      height: 28,
      fontSize: 8,
      forceSquareRatio: true,
      context,
    });

    document.body.append(canvas);
    this.contexts = new ArrayStack();

    new KeyInputHandler(
      (e) => this.contexts.top.onKey(e),
      (cmd) => this.contexts.top.handle(cmd),
      { events: ["keydown"] }
    );
  }

  async init() {}

  start() {
    loadMap(this, testMap);
    this.contexts.clear();
    this.contexts.push(new Dungeon(this));

    this.contexts.top.render();
  }

  initMap(width: number, height: number) {
    this.map = new LinearGrid(width, height, () => unset);
    this.actors = new LinearGrid(width, height, () => undefined);
    this.items = new LinearGrid(width, height, () => []);
  }

  contents(x: number, y: number) {
    const actor = this.actors.get(x, y);
    const items = this.items.get(x, y);
    const tile = this.map.get(x, y);
    return { actor, items, tile };
  }

  add(thing: Actor | Item) {
    switch (thing.type) {
      case "actor":
        return this.actors.set(thing.x, thing.y, thing);

      case "item":
        return this.items.update(thing.x, thing.y, (items) =>
          items.concat(thing)
        );
    }
  }

  move(thing: Actor | Item, x: number, y: number) {
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
