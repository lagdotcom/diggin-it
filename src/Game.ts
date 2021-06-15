import { KeyInputHandler, MouseInputHandler } from "@lagdotcom/simple-inputs";

import Actor from "./Actor";
import ArrayStack from "./ArrayStack";
import AuthorScreen from "./contexts/AuthorScreen";
import BadEndingScreen from "./contexts/BadEndingScreen";
import Dungeon from "./contexts/Dungeon";
import GoodEndingScreen from "./contexts/GoodEndingScreen";
import MessageLog from "./display/MessageLog";
import { unset } from "./entities/tiles";
import { EventMap, MoveType } from "./Event";
import EventHandler from "./EventHandler";
import Context from "./interfaces/Context";
import GraphicsDisplay from "./interfaces/GraphicsDisplay";
import Grid from "./interfaces/Grid";
import MusicLibrary from "./interfaces/MusicLibrary";
import Stack from "./interfaces/Stack";
import Thing from "./interfaces/Thing";
import TileDisplay from "./interfaces/TileDisplay";
import Item from "./Item";
import LinearGrid from "./LinearGrid";
import { generateMap } from "./mapgen";
import { getZone, loadMap } from "./maps";
import { getNewPlayer } from "./prefabs";
import Tile from "./Tile";
import { log } from "./utils";

export default class Game extends EventHandler {
  static INSTANCE: Game;
  actors: Grid<Actor>;
  allActors: Actor[];
  charsHeight: number;
  charsWidth: number;
  contexts: Stack<Context>;
  ctx: CanvasRenderingContext2D;
  depth: number;
  displayHeight: number;
  displayWidth: number;
  items: Grid<Item[]>;
  log: MessageLog;
  map: Grid<Tile>;
  mapFluid: Grid<Tile>;
  memory: Grid<boolean>;
  player: Actor;
  sideArea: string;
  visitedAreas: string[];
  spent: number;
  title: HTMLImageElement;
  badEnd: HTMLImageElement;
  goodEnd: HTMLImageElement;

  constructor(
    public music: MusicLibrary,
    public tiles: TileDisplay,
    public chars: TileDisplay,
    public graphics: GraphicsDisplay
  ) {
    super();

    Game.INSTANCE = this;
    // (window as any).g = this;
    this.contexts = new ArrayStack();
    this.log = new MessageLog(this);

    const tilesConfig = this.tiles.getOptions();
    this.displayWidth = tilesConfig.width - 6;
    this.displayHeight = tilesConfig.height - 3;

    const charsConfig = this.chars.getOptions();
    this.charsWidth = charsConfig.width;
    this.charsHeight = charsConfig.height;

    new KeyInputHandler(
      (e) => this.contexts.top.onKey(e),
      (cmd) => this.contexts.top.handle(cmd),
      { events: ["keydown"] }
    );

    new MouseInputHandler(
      (e) => this.contexts.top.onMouse(e),
      (cmd) => this.contexts.top.handle(cmd),
      { events: ["click", "contextmenu", "mousemove"] }
    );

    this.contexts.push(new AuthorScreen(this));
  }

  showEnding(good: boolean): void {
    this.contexts.clear();
    this.contexts.push(
      good ? new GoodEndingScreen(this) : new BadEndingScreen(this)
    );
  }

  start(): void {
    this.depth = 1;
    this.visitedAreas = [];
    this.player = getNewPlayer();
    this.player.fullHeal();
    this.nextMap();
  }

  nextMap(seed?: number): void {
    const [map, fluid, side] = generateMap(this.depth, this.visitedAreas, seed);
    log(map.join("\n"));
    this.useMap(map, fluid, false);
    this.sideArea = side;
  }

  useMap(map: string[], fluid: string[], isSideArea: boolean): void {
    this.removeAllListeners();
    this.log.attach();
    // this.player.fullHeal();

    loadMap(this, map, fluid);
    this.contexts.clear();
    this.contexts.push(new Dungeon(this));
    this.spent = 0;

    const depth = this.depth;
    this.emit("entered", { depth, zone: getZone(depth), isSideArea });
    this.emit("refreshed", {});
    this.tiles.clear();
    this.chars.clear();
    this.contexts.top.render();
  }

  initMap(width: number, height: number): void {
    this.map = new LinearGrid(width, height, () => new Tile(unset));
    this.mapFluid = new LinearGrid(width, height, () => new Tile(unset));
    this.memory = new LinearGrid(width, height, () => false);
    this.actors = new LinearGrid(width, height, () => undefined);
    this.allActors = [];
    this.items = new LinearGrid(width, height, () => []);
  }

  contents(
    x: number,
    y: number
  ): { actor?: Actor; items: Item[]; tile: Tile; fluid: Tile } {
    const actor = this.actors.get(x, y);
    const items = this.items.get(x, y);
    const tile = this.map.get(x, y);
    const fluid = this.mapFluid.get(x, y);
    return { actor, items, tile, fluid };
  }

  add(actor: Actor): Grid<Actor> {
    this.allActors.push(actor);
    return this.actors.set(actor.x, actor.y, actor);
  }

  addItem(item: Item): Grid<Item[]> {
    return this.items.update(item.x, item.y, (items) => items.concat(item));
  }

  remove(victim: Actor): Grid<Actor> {
    this.allActors = this.allActors.filter((actor) => actor !== victim);
    return this.actors.set(victim.x, victim.y, undefined);
  }

  removeItem(item: Item): Grid<Item[]> {
    return this.items.update(item.x, item.y, (items) =>
      items.filter((i) => i !== item)
    );
  }

  move(
    thing: Actor,
    x: number,
    y: number,
    type: MoveType,
    forced?: Thing
  ): EventMap["moved"] {
    const mx = x - thing.x,
      my = y - thing.y;

    if (this.actors.get(thing.x, thing.y) === thing)
      this.actors.set(thing.x, thing.y, undefined);
    thing.x = x;
    thing.y = y;
    this.actors.set(x, y, thing);

    return this.emit("moved", { thing, mx, my, type, forced });
  }

  moveItem(
    thing: Item,
    x: number,
    y: number,
    type: MoveType,
    forced?: Thing
  ): EventMap["moved"] {
    const mx = x - thing.x,
      my = y - thing.y;

    this.items.update(thing.x, thing.y, (items) =>
      items.filter((i) => i !== thing)
    );
    thing.x = x;
    thing.y = y;
    this.items.update(x, y, (items) => items.concat(thing));

    return this.emit("moved", { thing, mx, my, type, forced });
  }
}
