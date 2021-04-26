import Digging from "../commands/Digging";
import Movement from "../commands/Movement";
import PickingUp from "../commands/PickingUp";
import Pushing from "../commands/Pushing";
import UsableItems from "../commands/UsableItems";
import InfoPanel from "../display/InfoPanel";
import Inventory from "../display/Inventory";
import MainDisplay from "../display/MainDisplay";
import Stats from "../display/Stats";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Cmd, {
  AttackCmd,
  ClimbCmd,
  DigCmd,
  DropCmd,
  EquipCmd,
  MoveCmd,
  PushCmd,
  TargetCmd,
  UseCmd,
} from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Thing from "../interfaces/Thing";
import XY from "../interfaces/XY";
import Item from "../Item";
import { generateSideArea } from "../mapgen";
import { getZone, loadMap } from "../maps";
import Soon from "../Soon";
import AI from "../systems/AI";
import Air from "../systems/Air";
import Bombs from "../systems/Bombs";
import Combat from "../systems/Combat";
import Death from "../systems/Death";
import Effects from "../systems/Effects";
import Gravity from "../systems/Gravity";
import Memento from "../systems/Memento";
import Music from "../systems/Music";
import SandCollapse from "../systems/SandCollapse";
import TheInk from "../systems/TheInk";
import TreasureGrabbing from "../systems/TreasureGrabbing";
import Vision from "../systems/Vision";
import { ctheName, it } from "../text";
import ExamineScreen from "./ExamineScreen";
import ExpandedLog from "./ExpandedLog";
import HelpScreen from "./HelpScreen";
import ScenarioScreen from "./ScenarioScreen";
import ShopScreen from "./ShopScreen";
import Targeting from "./Targeting";

export default class Dungeon implements Context {
  ai: AI;
  air: Air;
  bombs: Bombs;
  combat: Combat;
  death: Death;
  digging: Digging;
  display: MainDisplay;
  effects: Effects;
  gravity: Gravity;
  hotspots: Hotspots;
  info: InfoPanel;
  ink: TheInk;
  inventory: Inventory;
  memento: Memento;
  mouse: XY;
  movement: Movement;
  music: Music;
  pickingup: PickingUp;
  pushing: Pushing;
  rerender: Soon;
  sand: SandCollapse;
  stats: Stats;
  treasure: TreasureGrabbing;
  use: UsableItems;
  vision: Vision;

  constructor(public g: Game) {
    this.combat = new Combat(g);
    this.vision = new Vision(g);
    this.ai = new AI(g, this.combat, this.vision);
    this.air = new Air(g);
    this.bombs = new Bombs(g);
    this.death = new Death(g);
    this.digging = new Digging(g);
    this.effects = new Effects(g);
    this.gravity = new Gravity(g);
    this.ink = new TheInk(g);
    this.memento = new Memento(g);
    this.movement = new Movement(g);
    this.music = new Music(g);
    this.pickingup = new PickingUp(g);
    this.pushing = new Pushing(g);
    this.sand = new SandCollapse(g);
    this.treasure = new TreasureGrabbing(g);
    this.use = new UsableItems(g);

    this.info = new InfoPanel(g);
    this.inventory = new Inventory(g);
    this.display = new MainDisplay(g, this.info, this.vision);
    this.stats = new Stats(g);

    const { width, height } = g.chars._options;
    this.hotspots = new Hotspots();
    this.hotspots.register("display", 0, 0, width - 12, height - 6);
    this.hotspots.register("inventory", 29, 13, 10, 8);
    this.hotspots.register("log", 0, height - 6, width, 6);
    this.mouse = [-1, -1];
    this.rerender = new Soon(() => this.render());
  }

  get canMove(): boolean {
    return this.g.spent === 0 && this.g.player.alive;
  }

  onKey(e: KeyboardEvent): Cmd {
    if (!this.g.player.alive) {
      switch (e.key) {
        case "Escape":
        case "Backspace":
        case "n":
          return { type: "title" };
      }

      return;
    }

    if (!this.canMove) return;

    const { x, y } = this.g.player;
    const shift = e.shiftKey;
    switch (e.key) {
      // debugging stuff
      // case "G":
      //   e.preventDefault();
      //   this.g.nextMap();
      //   return;

      case "ArrowLeft":
        e.preventDefault();
        if (shift) return { type: "dig", x: x - 1, y: y };
        return { type: "move", x: -1, y: 0 };
      case "ArrowUp":
        e.preventDefault();
        if (shift) return { type: "dig", x: x, y: y - 1 };
        return { type: "move", x: 0, y: -1 };
      case "ArrowRight":
        e.preventDefault();
        if (shift) return { type: "dig", x: x + 1, y: y };
        return { type: "move", x: 1, y: 0 };
      case "ArrowDown":
        e.preventDefault();
        if (shift) return { type: "dig", x: x, y: y + 1 };
        return { type: "move", x: 0, y: 1 };
      case "g":
      case ",":
        e.preventDefault();
        return { type: "get" };
      case ".":
      case "Clear":
        e.preventDefault();
        return { type: "wait" };

      case "x":
      case "X":
        e.preventDefault();
        return { type: "examine" };

      case "p":
      case "P":
        return { type: "expandlog" };

      case ">":
      case "Enter":
      case "Return":
        return { type: "exit" };

      case "?":
        return { type: "help" };
    }
  }

  onMouse(e: MouseEvent): Cmd {
    this.rerender.start();
    this.mouse = this.g.chars.eventToPosition(e);
    if (!this.g.player.alive) {
      if (e.button === 2) return { type: "title" };
      return;
    }

    if (!this.canMove) return;
    if (e.type === "mousemove") return;

    // TODO: other click events?
    const spot = this.getMouseSpot();
    if (spot) {
      if (spot[0] === "inventory") {
        const index = spot[1] + spot[2] * 5;
        const item = this.g.player.inventory[index];

        if (item) {
          e.preventDefault();
          if (e.button === 0) {
            if (item.slot) return { type: "equip", index };
            else return { type: "use", index };
          }
          if (e.button === 2) return { type: "drop", index };
        }
      }

      if (spot[0] === "log") return { type: "expandlog" };
    }
  }

  // TODO: targeting
  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "attack":
        return this.handleAttack(cmd);
      case "climb":
        return this.handleClimb(cmd);
      case "dig":
        return this.handleDig(cmd);
      case "drop":
        return this.handleDrop(cmd);
      case "equip":
        return this.handleEquip(cmd);
      case "examine":
        return this.handleExamine();
      case "exit":
        return this.handleExit();
      case "expandlog":
        return this.handleExpandLog();
      case "get":
        return this.handleGet();
      case "help":
        return this.handleHelp();
      case "move":
        return this.handleMove(cmd);
      case "push":
        return this.handlePush(cmd);
      case "target":
        return this.handleTarget(cmd);
      case "title":
        return this.handleTitle();
      case "use":
        return this.handleUse(cmd);
      case "wait":
        return this.handleWait();
    }
  }

  handleAttack({ x, y }: AttackCmd): void {
    const { actors, player } = this.g;
    const actor = actors.get(x, y);
    this.combat.attack(player, actor);
    this.g.spent++;
    return this.render();
  }

  handleClimb({ x, y }: ClimbCmd): void {
    const { player } = this.g;

    this.g.log.add("You climb up.");
    this.g.move(player, x, y);
    this.g.spent++;
    return this.render();
  }

  handleDig({ x, y }: DigCmd): void {
    const poss = this.digging.possible(x, y);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    else {
      this.digging.apply(x, y);
      this.g.spent++;
    }
    return this.render();
  }

  handleDrop({ index }: DropCmd): void {
    const { log, player } = this.g;

    const item = player.inventory[index];
    delete player.inventory[index];

    if (item.slot && player.equipment[item.slot] === item) {
      delete player.equipment[item.slot];
      log.add(`You remove ${ctheName(item)} and drop ${it(item)}.`);
    } else log.add(`You drop ${ctheName(item)}.`);
    this.g.emit("dropped", { actor: player, item });

    item.x = player.x;
    item.y = player.y;
    this.g.addItem(item);
    this.g.spent++;
    return this.render();
  }

  handleEquip({ index }: EquipCmd): void {
    const { log, player } = this.g;

    let equipped: Item = undefined;

    const item = player.inventory[index];
    if (!item.slot) log.add("You can't equip that.");
    else {
      const removed = player.equipment[item.slot];
      if (removed === item) {
        delete player.equipment[item.slot];
        log.add(`You remove ${ctheName(item)}.`);
      } else if (removed) {
        equipped = item;
        player.equipment[item.slot] = item;
        log.add(`You replace ${ctheName(removed)} with ${ctheName(item)}.`);
        this.g.spent++;
      } else {
        equipped = item;
        player.equipment[item.slot] = item;
        log.add(`You equip ${ctheName(item)}.`);
        this.g.spent++;
      }

      this.g.emit("equipped", { actor: player, equipped, removed });
    }

    return this.render();
  }

  handleExamine(): void {
    if (this.info.lore) {
      this.g.contexts.push(
        new ExamineScreen(this.g, this.info.target as Thing)
      );
      this.rerender.stop();
    }
  }

  handleExit(): void {
    const { log, map, player, sideArea } = this.g;
    const tile = map.get(player.x, player.y);

    if (tile.glyph === "Exit") this.leaveArea();

    if (tile.glyph === "SideExit" && sideArea) {
      log.add(`You enter the strange doorway...`);

      const [map, fluid] = generateSideArea(sideArea);
      this.g.visitedAreas.push(sideArea);
      this.g.useMap(map, fluid, true);
    }
  }

  leaveArea(): void {
    const { depth } = this.g;
    this.g.emit("left", { depth, zone: getZone(depth) });
    this.g.contexts.push(new ShopScreen(this.g));
  }

  handleExpandLog(): void {
    this.g.contexts.push(new ExpandedLog(this.g));
    this.rerender.stop();
  }

  handleGet(): void {
    const poss = this.pickingup.getItems();
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    return this.render();
  }

  handleHelp(): void {
    this.g.contexts.push(new HelpScreen(this.g));
    this.rerender.stop();
  }

  handleMove({ x, y }: MoveCmd): void {
    const poss = this.movement.possible(x, y);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    else this.movement.apply(x, y);
    return this.render();
  }

  handlePush({ x, y, mx, my }: PushCmd): void {
    const actor = this.g.actors.get(x, y);
    const poss = this.pushing.possible(this.g.player, actor, mx, my);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    else this.pushing.apply(actor, mx, my);
    return this.render();
  }

  handleTarget(cmd: TargetCmd): void {
    this.g.contexts.push(new Targeting(this.g, this, cmd));
  }

  handleTitle(): void {
    this.g.contexts.clear();
    this.g.contexts.push(new ScenarioScreen(this.g));
  }

  handleUse({ index, at }: UseCmd): void {
    const item = this.g.player.inventory[index];
    const poss = this.use.use(index, item, at);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    return this.render();
  }

  handleWait(): void {
    this.g.spent++;
    this.rerender.start();
  }

  systems(): void {
    this.gravity.run();

    while (this.g.spent > 0) {
      this.g.emit("tick", {});
      this.g.spent--;
    }
  }

  getMouseSpot(): ReturnType<Hotspots["resolve"]> {
    const [ex, ey] = this.mouse;
    return this.hotspots.resolve(ex, ey);
  }

  updateInfo(): void {
    const [ex] = this.mouse;
    // not even on the canvas
    if (ex === -1) return this.info.clear();

    const { player } = this.g;
    const spot = this.getMouseSpot();
    if (spot) {
      const [area, ox, oy] = spot;
      switch (area) {
        case "display":
          const [xmod, ymod] = this.display.getOffset();
          const x = ox - xmod,
            y = oy - ymod;
          if (!this.vision.visible(x, y)) return this.info.clear();

          const { actor, items, tile, fluid } = this.g.contents(x, y);
          if (actor) {
            this.info.useActor(actor);
          } else if (items.length) {
            this.info.useItem(items[0]);
          } else if (fluid.glyph && fluid.glyph !== " ") {
            this.info.useTile(fluid);
          } else {
            this.info.useTile(tile);
          }
          break;

        case "inventory":
          const index = oy * 5 + ox;
          const item = player.inventory[index];
          if (item) {
            this.info.useItem(item);
          } else {
            this.info.clear();
          }

          break;
      }
    } else this.info.clear();
  }

  render(): void {
    this.updateInfo();

    // TODO: this is dumb lol
    this.systems();

    this.display.render();
    this.stats.render();
    this.inventory.render();
    this.info.render();
    this.g.log.render();
  }
}
