import Cmd, { TargetCmd } from "../Cmd";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Context from "../interfaces/Context";
import XY from "../interfaces/XY";
import Soon from "../Soon";
import Dungeon from "./Dungeon";

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
    this.rerender.start();
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "Escape":
      case "Backspace":
      case "n":
        this.cancel();
        return;
    }
  }

  onMouse(e: MouseEvent): Cmd {
    this.mouse = this.g.tiles.eventToPosition(e);
    this.parent.mouse = this.g.chars.eventToPosition(e);

    if (e.type === "contextmenu") {
      e.preventDefault();
      this.cancel();
      return;
    }

    if (e.type === "click") {
      const [ex, ey] = this.mouse;
      const [xmod, ymod] = this.parent.getDisplayOffset();
      const x = ex - xmod,
        y = ey - ymod;
      const spot = this.hotspots.resolve(x, y);
      if (spot) {
        this.g.contexts.pop();
        this.parent.handle(this.cmd.callback([x, y]));
        return;
      }
    }

    this.rerender.start();
  }

  cancel() {
    this.g.contexts.pop();
    this.parent.rerender.start();
  }

  handle(cmd: Cmd): void {
    console.log(cmd);
  }

  render(): void {
    const { chars } = this.g;
    const [xmod, ymod] = this.parent.getDisplayOffset();

    this.parent.render();
    this.cmd.possibilities.forEach(([x, y]) => {
      const tx = x - xmod,
        ty = y + ymod;

      drawPanel(chars, tx * 2, ty * 2, 2, 2);
    });
  }
}
