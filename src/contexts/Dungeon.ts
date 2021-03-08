import DiscreteShadowcasting from "rot-js/lib/fov/discrete-shadowcasting";

import Cmd, { ClimbCmd, DigCmd, MoveCmd, PushCmd } from "../Cmd";
import Inventory from "../commands/Inventory";
import Movement from "../commands/Movement";
import Pushing from "../commands/Pushing";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Context from "../interfaces/Context";
import Gravity from "../systems/Gravity";
import SandCollapse from "../systems/SandCollapse";
import TreasureGrabbing from "../systems/TreasureGrabbing";
import { empty } from "../Tile";

export default class Dungeon implements Context {
  gravity: Gravity;
  inventory: Inventory;
  movement: Movement;
  pushing: Pushing;
  sand: SandCollapse;
  treasure: TreasureGrabbing;

  constructor(public g: Game) {
    this.gravity = new Gravity(g);
    this.inventory = new Inventory(g);
    this.movement = new Movement(g);
    this.pushing = new Pushing(g);
    this.sand = new SandCollapse(g);
    this.treasure = new TreasureGrabbing(g);
  }

  onKey(e: KeyboardEvent): Cmd {
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
    }
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
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
    }
  }

  handleClimb({ x, y }: ClimbCmd): void {
    const { player } = this.g;
    const mx = x - player.x,
      my = y - player.y;

    this.g.log.add("You climb up.");
    this.g.move(player, x, y);
    this.g.emit("moved", { thing: player, mx, my });
    return this.render();
  }

  handleDig({ x, y }: DigCmd): void {
    const tile = this.g.map.get(x, y);
    this.g.map.set(x, y, empty);
    this.g.log.add(`You dig into the ${tile.name}.`);
    this.g.emit("digged", { tile, x, y });
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

  systems(): void {
    this.gravity.run();
  }

  render(): void {
    const { displayHeight, displayWidth, log, map, player, tiles } = this.g;

    // TODO: this is dumb lol
    this.systems();
    tiles.clear();

    const xmod = Math.floor(displayWidth / 2 - player.x);
    const ymod = Math.floor(displayHeight / 2 - player.y);

    const fov = new DiscreteShadowcasting((x, y) => !map.get(x, y).opaque);
    fov.compute(player.x, player.y, player.vision, (x, y, r) => {
      const { actor, items, tile } = this.g.contents(x, y);

      const glyphs: string[] = [tile.glyph];
      glyphs.push(...items.map((i) => i.glyph));
      if (actor) glyphs.push(actor.glyph);

      tiles.draw(xmod + x, ymod + y, glyphs, "transparent", "black");
    });

    log.draw();
    this.renderStats();
    this.renderInventory();
  }

  // TODO: stats
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

  // TODO: inventory
  renderInventory() {
    const { chars, ctx, player, tiles } = this.g;

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

  pad(number: number, length: number, ch = " ") {
    var string = number.toString();
    while (string.length < length) string = ch + string;
    return string;
  }
}
