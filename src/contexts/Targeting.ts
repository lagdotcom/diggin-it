import { colourEq, colourEqSel, colourSel } from "../colours";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Cmd, { TargetCmd } from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import XY from "../interfaces/XY";
import Soon from "../Soon";
import Dungeon from "./Dungeon";

const targetTile = "Targeting";

export default class Targeting implements Context {
  hotspots: Hotspots<number>;
  mouse: XY;
  rerender: Soon;

  constructor(public g: Game, public parent: Dungeon, public cmd: TargetCmd) {
    this.hotspots = new Hotspots<number>();
    cmd.possibilities.forEach(([x, y], i) =>
      this.hotspots.register(i, x, y, 1, 1)
    );

    this.rerender = new Soon("Targeting", () => this.render());

    this.mouse = cmd.possibilities[0];
    g.log.add("Targeting... (ESC/r-click to cancel)");
    this.draw();
  }

  exit(): void {
    this.g.contexts.pop();
    this.parent.rerender.start();
  }

  draw(): void {
    this.g.emit("refreshed", {});
    this.parent.rerender.stop();
    this.rerender.start();
  }

  offset([x, y]: XY, mul = 1): XY {
    const [ox, oy] = this.parent.display.getOffset();
    return [x + ox * mul, y + oy * mul];
  }

  select(): void {
    const [x, y] = this.mouse;
    const spot = this.hotspots.resolve(x, y);
    if (spot) {
      this.exit();
      this.parent.handle(this.cmd.callback([x, y]));
    }
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "a":
      case "A":
      case "4":
      case "ArrowLeft":
        return { type: "move", x: -1, y: 0 };
      case "d":
      case "D":
      case "6":
      case "ArrowRight":
        return { type: "move", x: 1, y: 0 };
      case "w":
      case "W":
      case "8":
      case "ArrowUp":
        return { type: "move", x: 0, y: -1 };
      case "s":
      case "S":
      case "2":
      case "ArrowDown":
        return { type: "move", x: 0, y: 1 };

      case "Escape":
      case "Backspace":
      case "n":
      case "N":
      case "q":
      case "Q":
        return { type: "cancel" };

      case "Enter":
      case "Return":
        return { type: "use", index: NaN };
    }
  }

  onMouse(e: MouseEvent): Cmd {
    this.mouse = this.offset(this.g.tiles.eventToPosition(e), -1);
    this.parent.mouse = this.g.chars.eventToPosition(e);

    if (e.type === "contextmenu") {
      e.preventDefault();
      return { type: "cancel" };
    }

    if (e.type === "click") return { type: "use", index: NaN };

    this.draw();
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
      this.g.log.add("Cancelled.");

      // TODO: this isn't fully needed
      this.g.emit("refreshed", {});

      return this.exit();
    }

    if (cmd.type === "move") {
      const [mx, my] = this.mouse;
      const { x, y } = cmd;
      this.mouse = [mx + x, my + y];
      return this.draw();
    }

    if (cmd.type === "use") {
      return this.select();
    }
  }

  render(): void {
    const [mx, my] = this.mouse;

    this.parent.render((data) => {
      const { x, y } = data;
      const possible = this.hotspots.resolve(x, y);
      const highlight = mx === x && my === y;

      const colour = possible
        ? highlight
          ? colourEqSel
          : colourEq
        : highlight
        ? colourSel
        : "";
      if (colour) {
        data.glyphs.unshift(targetTile);
        data.fg = colour;
      }
      return data;
    });
  }
}
