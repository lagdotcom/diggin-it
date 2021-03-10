import Cmd, {
  AttackCmd,
  ClimbCmd,
  DigCmd,
  DropCmd,
  MoveCmd,
  PushCmd,
  UseCmd,
} from "../Cmd";
import Inventory from "../commands/Inventory";
import Movement from "../commands/Movement";
import Pushing from "../commands/Pushing";
import UsableItems from "../commands/UsableItems";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Context from "../interfaces/Context";
import XY from "../interfaces/XY";
import AI from "../systems/AI";
import Combat from "../systems/Combat";
import Death from "../systems/Death";
import Gravity from "../systems/Gravity";
import SandCollapse from "../systems/SandCollapse";
import TreasureGrabbing from "../systems/TreasureGrabbing";
import Vision from "../systems/Vision";
import { name, theName } from "../text";
import { empty } from "../Tile";

export default class Dungeon implements Context {
  ai: AI;
  combat: Combat;
  death: Death;
  gravity: Gravity;
  hotspots: Hotspots;
  info: string;
  inventory: Inventory;
  mouse: XY;
  movement: Movement;
  pushing: Pushing;
  rerender: number;
  sand: SandCollapse;
  treasure: TreasureGrabbing;
  use: UsableItems;
  vision: Vision;

  constructor(public g: Game) {
    this.combat = new Combat(g);
    this.ai = new AI(g, this.combat);
    this.death = new Death(g);
    this.gravity = new Gravity(g);
    this.inventory = new Inventory(g);
    this.movement = new Movement(g);
    this.pushing = new Pushing(g);
    this.sand = new SandCollapse(g);
    this.treasure = new TreasureGrabbing(g);
    this.use = new UsableItems(g);
    this.vision = new Vision(g);

    const { width, height } = g.chars._options;
    this.info = "";
    this.hotspots = new Hotspots();
    this.hotspots.register("display", 0, 0, width - 12, height - 6);
    this.hotspots.register("inventory", 29, 13, 10, 8);
    this.mouse = [-1, -1];
  }

  onKey(e: KeyboardEvent): Cmd {
    if (this.g.spent > 0) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        return { type: "move", x: -1, y: 0 };
      case "ArrowUp":
        e.preventDefault();
        return { type: "move", x: 0, y: -1 };
      case "ArrowRight":
        e.preventDefault();
        return { type: "move", x: 1, y: 0 };
      case "ArrowDown":
        e.preventDefault();
        return { type: "move", x: 0, y: 1 };
      case "g":
      case ",":
        e.preventDefault();
        return { type: "get" };
      case ".":
      case "Clear":
        e.preventDefault();
        return { type: "wait" };
    }
  }

  scheduleRender() {
    if (!this.rerender)
      this.rerender = requestAnimationFrame(() => this.render());
  }

  onMouse(e: MouseEvent): Cmd {
    this.scheduleRender();
    this.mouse = this.g.chars.eventToPosition(e);
    if (this.g.spent > 0) return;
    if (e.type === "mousemove") return;

    // TODO
    const spot = this.getMouseSpot();
    if (spot) {
      if (spot[0] === "inventory") {
        const index = spot[1] + spot[2] * 5;
        const item = this.g.player.inventory[index];

        if (item) {
          e.preventDefault();
          if (e.button === 0) return { type: "use", index };
          if (e.button === 2) return { type: "drop", index };
        }
      }
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
      case "get":
        return this.handleGet();
      case "move":
        return this.handleMove(cmd);
      case "push":
        return this.handlePush(cmd);
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
    const tile = this.g.map.get(x, y);
    this.g.map.set(x, y, empty);
    this.g.log.add(`You dig through ${theName(tile)}.`);
    this.g.emit("digged", { tile, x, y });
    this.g.spent++;
    return this.render();
  }

  handleDrop({ index }: DropCmd): void {
    const { log, player } = this.g;

    const item = player.inventory[index];
    delete player.inventory[index];
    log.add(`You drop ${theName(item)}.`);

    item.x = player.x;
    item.y = player.y;
    this.g.add(item);
    this.g.spent++;
    return this.render();
  }

  handleGet(): void {
    const poss = this.inventory.getItems();
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    return this.render();
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

  handleUse({ index, at }: UseCmd) {
    const item = this.g.player.inventory[index];
    const poss = this.use.use(index, item, at);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    return this.render();
  }

  handleWait() {
    this.g.spent++;
    this.scheduleRender();
  }

  systems(): void {
    this.gravity.run();

    while (this.g.spent > 0) {
      this.ai.run();
      this.gravity.run();
      this.g.spent--;
    }
  }

  getDisplayOffset(): XY {
    const { displayHeight, displayWidth, player } = this.g;

    const xmod = Math.floor(displayWidth / 2 - player.x);
    const ymod = Math.floor(displayHeight / 2 - player.y);
    return [xmod, ymod];
  }

  getMouseSpot() {
    const [ex, ey] = this.mouse;
    return this.hotspots.resolve(ex, ey);
  }

  updateInfo(): void {
    const [ex, ey] = this.mouse;
    // not even on the canvas
    if (ex === -1) {
      this.info = "";
      return;
    }

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
            return;
          }

          const { actor, items, tile } = this.g.contents(x, y);
          if (actor) {
            this.info = name(actor);
          } else if (items.length) {
            this.info = name(items[0]);
          } else {
            this.info = name(tile);
          }
          break;

        case "inventory":
          const index = oy * 5 + ox;
          const item = this.g.player.inventory[index];
          if (item) {
            this.info = name(item);
          } else {
            this.info = "";
          }

          break;
      }
    } else this.info = "";
  }

  render(): void {
    const { log, tiles } = this.g;

    this.rerender = 0;
    this.updateInfo();

    // TODO: this is dumb lol
    this.systems();
    tiles.clear();

    this.renderDisplay();
    log.draw();
    this.renderStats();
    this.renderInventory();
    if (this.info) this.renderInfo();
  }

  renderDisplay() {
    const { memory, tiles } = this.g;
    const vision = this.vision.get();
    const [xmod, ymod] = this.getDisplayOffset();
    const width = 15,
      height = 11;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
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

  renderStats() {
    const { chars, player } = this.g;

    drawPanel(chars, 28, 0, 12, 10);
    chars.drawText(31, 1, "HP:" + this.pad(player.hp, 3));
    chars.drawText(31, 2, "FP:" + this.pad(player.fp, 3));
    chars.drawText(31, 3, "AP:" + this.pad(player.ap, 3));
    chars.drawText(31, 4, "SP:" + this.pad(player.sp, 3));
    chars.drawText(31, 5, "DP:" + this.pad(player.dp, 3));

    chars.drawText(29, 7, "Experience");
    chars.drawText(31, 8, this.pad(player.experience, 6, "0"));
  }

  renderInventory() {
    const { chars, player } = this.g;

    drawPanel(chars, 28, 10, 12, 12);

    var x = 29,
      y = 13;
    for (var i = 0; i < player.inventorySize; i++) {
      const item = player.inventory[i];

      if (!item) {
        // TODO: this sucks
        drawPanel(chars, x, y, 2, 2);
      } else {
        chars.draw(x, y, item.glyph + "1", "transparent", "black");
        chars.draw(x + 1, y, item.glyph + "2", "transparent", "black");
        chars.draw(x, y + 1, item.glyph + "3", "transparent", "black");
        chars.draw(x + 1, y + 1, item.glyph + "4", "transparent", "black");
      }

      x += 2;
      if (i % 5 === 4) {
        y += 2;
        x = 29;
      }
    }
  }

  renderInfo() {
    const { chars } = this.g;

    drawPanel(chars, 0, 0, 28, 10);
    chars.drawText(1, 1, this.info, chars._options.width - 2);
  }

  pad(number: number, length: number, ch = " ") {
    var string = number.toString();
    while (string.length < length) string = ch + string;
    return string;
  }
}
