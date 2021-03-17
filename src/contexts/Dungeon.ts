import { lightRed } from "../colours";
import Digging from "../commands/Digging";
import Inventory from "../commands/Inventory";
import Movement from "../commands/Movement";
import Pushing from "../commands/Pushing";
import UsableItems from "../commands/UsableItems";
import { drawPanel } from "../drawing";
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
import { getZone } from "../maps";
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
import { ctheName, it, name } from "../text";
import { pad } from "../utils";
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
  effects: Effects;
  gravity: Gravity;
  hotspots: Hotspots;
  info: string;
  infoMore?: Thing;
  ink: TheInk;
  inventory: Inventory;
  memento: Memento;
  mouse: XY;
  movement: Movement;
  music: Music;
  pushing: Pushing;
  rerender: Soon;
  sand: SandCollapse;
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
    this.inventory = new Inventory(g);
    this.memento = new Memento(g);
    this.movement = new Movement(g);
    this.music = new Music(g);
    this.pushing = new Pushing(g);
    this.sand = new SandCollapse(g);
    this.treasure = new TreasureGrabbing(g);
    this.use = new UsableItems(g);

    const { width, height } = g.chars._options;
    this.info = "";
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

    item.x = player.x;
    item.y = player.y;
    this.g.addItem(item);
    this.g.spent++;
    return this.render();
  }

  handleEquip({ index }: EquipCmd): void {
    const { log, player } = this.g;

    const item = player.inventory[index];
    if (!item.slot) log.add("You can't equip that.");
    else {
      const current = player.equipment[item.slot];
      if (current === item) {
        delete player.equipment[item.slot];
        log.add(`You remove ${ctheName(item)}.`);
      } else if (current) {
        player.equipment[item.slot] = item;
        log.add(`You replace ${ctheName(current)} with ${ctheName(item)}.`);
        this.g.spent++;
      } else {
        player.equipment[item.slot] = item;
        log.add(`You equip ${ctheName(item)}.`);
        this.g.spent++;
      }
    }

    return this.render();
  }

  handleExamine(): void {
    if (this.infoMore) {
      this.g.contexts.push(new ExamineScreen(this.g, this.infoMore));
      this.rerender.stop();
    }
  }

  handleExit(): void {
    const { map, player } = this.g;
    const tile = map.get(player.x, player.y);

    if (tile.glyph === "Exit") this.leaveArea();
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
    const poss = this.inventory.getItems();
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

  getDisplayOffset(): XY {
    const { displayHeight, displayWidth, player } = this.g;

    const xmod = Math.floor(displayWidth / 2 - player.x);
    const ymod = Math.floor(displayHeight / 2 - player.y);
    return [xmod, ymod];
  }

  getMouseSpot(): ReturnType<Hotspots["resolve"]> {
    const [ex, ey] = this.mouse;
    return this.hotspots.resolve(ex, ey);
  }

  updateInfo(): void {
    const [ex] = this.mouse;
    // not even on the canvas
    if (ex === -1) {
      this.info = "";
      this.infoMore = undefined;
      return;
    }

    const { player } = this.g;
    const spot = this.getMouseSpot();
    if (spot) {
      const [area, ox, oy] = spot;
      switch (area) {
        case "display":
          const [xmod, ymod] = this.getDisplayOffset();
          const x = ox - xmod,
            y = oy - ymod;
          if (!this.vision.visible(x, y)) {
            this.info = "";
            this.infoMore = undefined;
            return;
          }

          const { actor, items, tile } = this.g.contents(x, y);
          if (actor) {
            this.info = name(actor);
            if (actor.lore) this.infoMore = actor;
          } else if (items.length) {
            const item = items[0];
            this.info = name(item);
            if (item.lore) this.infoMore = item;
          } else {
            this.info = name(tile);
            this.infoMore = undefined;
          }
          break;

        case "inventory":
          const index = oy * 5 + ox;
          const item = player.inventory[index];
          if (item) {
            const equipped =
              item.slot && player.equipment[item.slot] === item ? " (eq)" : "";
            this.info = name(item) + equipped;
            if (item.lore) this.infoMore = item;
          } else {
            this.info = "";
            this.infoMore = undefined;
          }

          break;
      }
    } else {
      this.info = "";
      this.infoMore = undefined;
    }
  }

  render(): void {
    const { log, tiles } = this.g;

    this.updateInfo();

    // TODO: this is dumb lol
    this.systems();
    tiles.clear();

    this.renderDisplay();
    this.renderStats();
    this.renderInventory();
    if (this.info) this.renderInfo();
    log.draw();
  }

  renderDisplay(): void {
    const { displayHeight, displayWidth, memory, tiles } = this.g;
    const vision = this.vision.get();
    const [xmod, ymod] = this.getDisplayOffset();

    for (let y = 0; y < displayHeight; y++) {
      for (let x = 0; x < displayWidth; x++) {
        const tx = x - xmod,
          ty = y - ymod;

        const inFov = vision.get(tx, ty);
        const inMemory = memory.get(tx, ty);
        if (!inFov && !inMemory) continue;

        const colour = inFov ? "transparent" : "rgba(0,0,0,0.5)";
        const { actor, items, tile } = this.g.contents(tx, ty);

        const glyphs: string[] = [tile.glyph];
        glyphs.push(...items.map((i) => i.glyph));
        if (actor && inFov) glyphs.push(actor.glyph);

        const fgs = new Array<string>(glyphs.length).fill(colour);
        const bgs = new Array<string>(glyphs.length).fill("transparent");
        tiles.draw(x, y, glyphs, fgs, bgs);
      }
    }
  }

  renderStats(): void {
    const { chars, player } = this.g;

    let y = 0;
    drawPanel(chars, 28, y++, 12, 10);
    this.renderStat(y++, "HP", player.hp, 20);
    this.renderStat(y++, "AP", player.ap, 20);
    this.renderStat(y++, "SP", player.get("sp"));
    this.renderStat(y++, "DP", player.get("dp"));

    chars.drawText(29, 7, "Experience");
    chars.drawText(31, 8, pad(player.experience, 6, "0"));
  }

  private renderStat(y: number, name: string, value: number, warn = 0) {
    const col = value < warn ? `%b{${lightRed}}` : "";
    this.g.chars.drawText(31, y, `${col}${name}:${pad(value, 3)}`);
  }

  renderInventory(): void {
    const { chars, player } = this.g;

    drawPanel(chars, 28, 10, 12, 12);

    let x = 29,
      y = 13;
    for (let i = 0; i < player.inventorySize; i++) {
      const item = player.inventory[i];

      if (!item) {
        // TODO: this sucks
        drawPanel(chars, x, y, 2, 2);
      } else {
        chars.draw(x, y, item.glyph + "1");
        chars.draw(x + 1, y, item.glyph + "2");
        const bl = [item.glyph + "3"];
        const br = [item.glyph + "4"];
        const fg = ["transparent", "transparent"];
        const bg = ["black", "transparent"];

        if (item.charges > 1) {
          const amount = Math.min(99, item.charges);
          const tens = Math.floor(amount / 10).toString();
          const digits = (amount % 10).toString();

          br.push("qty" + digits);
          if (amount > 9) bl.push("qty" + tens);
        }

        chars.draw(x, y + 1, bl, fg, bg);
        chars.draw(x + 1, y + 1, br, fg, bg);
      }

      x += 2;
      if (i % 5 === 4) {
        y += 2;
        x = 29;
      }
    }
  }

  renderInfo(): void {
    const { chars } = this.g;

    drawPanel(chars, 0, 0, 28, 5, true);
    chars.drawText(1, 1, this.info, 26);

    if (this.infoMore) chars.drawText(1, 3, "e[X]amine for more.");
  }
}
