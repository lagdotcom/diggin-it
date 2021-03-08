import DiscreteShadowcasting from "rot-js/lib/fov/discrete-shadowcasting";

import Cmd, { ClimbCmd, DigCmd, MoveCmd, PushCmd } from "../Cmd";
import Movement from "../commands/Movement";
import Pushing from "../commands/Pushing";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Context from "../interfaces/Context";
import Gravity from "../systems/Gravity";
import SandCollapse from "../systems/SandCollapse";
import { empty } from "../Tile";

export default class Dungeon implements Context {
  gravity: Gravity;
  movement: Movement;
  pushing: Pushing;
  sand: SandCollapse;

  constructor(public g: Game) {
    this.gravity = new Gravity(g);
    this.movement = new Movement(g);
    this.pushing = new Pushing(g);
    this.sand = new SandCollapse(g);
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
    }
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "climb":
        return this.handleClimb(cmd);
      case "dig":
        return this.handleDig(cmd);
      case "move":
        return this.handleMove(cmd);
      case "push":
        return this.handlePush(cmd);
    }
  }

  handleClimb({ x, y }: ClimbCmd): void {
    this.g.move(this.g.player, x, y);
    this.g.log.add("You climb up.");
    return this.render();
  }

  handleDig({ x, y }: DigCmd): void {
    const tile = this.g.map.get(x, y);
    this.g.map.set(x, y, empty);
    this.g.log.add(`You dig into the ${tile.name}.`);
    this.g.emit("digged", { tile, x, y });
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
    chars.drawText(31, 1, "HP:" + this.pad(0, 3));
    chars.drawText(31, 2, "FP:" + this.pad(0, 3));
    chars.drawText(31, 3, "AP:" + this.pad(0, 3));
    chars.drawText(31, 4, "SP:" + this.pad(0, 3));
    chars.drawText(31, 5, "DP:" + this.pad(0, 3));

    chars.drawText(29, 7, "Experience");
    chars.drawText(31, 8, this.pad(0, 6));
  }

  // TODO: inventory
  renderInventory() {
    const { chars, player } = this.g;

    drawPanel(chars, 28, 10, 12, 12);
  }

  pad(number: number, length: number) {
    var string = number.toString();
    while (string.length < length) string = "0" + string;
    return string;
  }
}
