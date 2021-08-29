import { targetColour } from "../colours";
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

    this.rerender = new Soon(() => this.render());

    this.mouse = [-1, -1];
    parent.rerender.stop();
    g.log.add("Targeting... (ESC/r-click to cancel)");
    g.emit("refreshed", {});
    this.rerender.start();
  }

  onKey(e: KeyboardEvent): Cmd {
    // TODO: keyboard selection

    switch (e.key) {
      case "Escape":
      case "Backspace":
      case "n":
      case "N":
        return { type: "cancel" };
    }
  }

  onMouse(e: MouseEvent): Cmd {
    this.mouse = this.g.tiles.eventToPosition(e);
    this.parent.mouse = this.g.chars.eventToPosition(e);

    if (e.type === "contextmenu") {
      e.preventDefault();
      return { type: "cancel" };
    }

    if (e.type === "click") {
      const [ex, ey] = this.mouse;
      const [xmod, ymod] = this.parent.display.getOffset();
      const x = ex - xmod,
        y = ey - ymod;
      const spot = this.hotspots.resolve(x, y);
      if (spot) {
        this.g.contexts.pop();
        this.parent.rerender.start();
        this.parent.handle(this.cmd.callback([x, y]));
        return;
      }
    }

    this.rerender.start();
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
      this.g.log.add("Cancelled.");

      // TODO: this isn't fully needed
      this.g.emit("refreshed", {});

      this.g.contexts.pop();
      this.parent.rerender.start();
    }
  }

  render(): void {
    this.parent.render((data) => {
      if (this.hotspots.resolve(data.x, data.y)) {
        data.glyphs.unshift(targetTile);
        data.fg = targetColour;
      }
      return data;
    });
  }
}
