import Cmd, { AttackCmd, ClimbCmd, DigCmd, MoveCmd, PushCmd } from "../Cmd";
import Inventory from "../commands/Inventory";
import Movement from "../commands/Movement";
import Pushing from "../commands/Pushing";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Context from "../interfaces/Context";
import XY from "../interfaces/XY";
import AI from "../systems/AI";
import Combat from "../systems/Combat";
import Gravity from "../systems/Gravity";
import SandCollapse from "../systems/SandCollapse";
import TreasureGrabbing from "../systems/TreasureGrabbing";
import Vision from "../systems/Vision";
import { name, theName } from "../text";
import { empty } from "../Tile";

export default class Dungeon implements Context {
  ai: AI;
  combat: Combat;
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
  vision: Vision;

  constructor(public g: Game) {
    this.combat = new Combat(g);
    this.ai = new AI(g, this.combat);
    this.gravity = new Gravity(g);
    this.inventory = new Inventory(g);
    this.movement = new Movement(g);
    this.pushing = new Pushing(g);
    this.sand = new SandCollapse(g);
    this.treasure = new TreasureGrabbing(g);
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

    if (e.type !== "click") return undefined;

    // TODO
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "attack":
        return this.handleAttack(cmd);
      case "climb":
        return this.handleClimb(cmd);
      case "dig":
        return this.handleDig(cmd);
      case "get":
        return this.handleGet();
      case "move":
        return this.handleMove(cmd);
      case "push":
        return this.handlePush(cmd);
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
    const mx = x - player.x,
      my = y - player.y;

    this.g.log.add("You climb up.");
    this.g.move(player, x, y);
    this.g.emit("moved", { thing: player, mx, my });
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
    const poss = this.pushing.possible(actor, mx, my);
    if (typeof poss === "object") return this.handle(poss);

    if (poss) this.g.log.add(poss);
    else this.pushing.apply(actor, mx, my);
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

  updateInfo(): void {
    const [ex, ey] = this.mouse;
    // not even on the canvas
    if (ex === -1) {
      this.info = "";
      return;
    }

    const spot = this.hotspots.resolve(ex, ey);
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

    const [xmod, ymod] = this.getDisplayOffset();
    this.vision.get().forEach(([x, y]) => {
      const { actor, items, tile } = this.g.contents(x, y);

      const glyphs: string[] = [tile.glyph];
      glyphs.push(...items.map((i) => i.glyph));
      if (actor) glyphs.push(actor.glyph);

      tiles.draw(xmod + x, ymod + y, glyphs, "transparent", "black");
    });

    log.draw();
    this.renderStats();
    this.renderInventory();
    if (this.info) this.renderInfo();
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
        // TODO: show item (neither of these work because of drawing order)
        // tiles.draw(x / 2, y / 2, item.glyph, "transparent", "black");
        // const tile = tiles._options.tileMap[item.glyph];
        // if (tile)
        //   ctx.drawImage(
        //     tiles._options.tileSet,
        //     tile[0],
        //     tile[1],
        //     16,
        //     16,
        //     x * 8,
        //     y * 8,
        //     16,
        //     16
        //   );
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
