import pkg from "../../package.json";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";

export default class ExamineScreen implements Context {
  constructor(public g: Game) {
    requestAnimationFrame(() => this.render());
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
      this.g.emit("refreshed", {});
      this.g.tiles.clear();

      this.g.contexts.pop();
      this.g.contexts.top.render();
    }
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "Escape":
      case "Backspace":
      case "n":
        return { type: "cancel" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.type === "contextmenu") {
      e.preventDefault();
      return { type: "cancel" };
    }
  }

  render(): void {
    const { chars, tiles, charsWidth, charsHeight } = this.g;

    tiles.clear();
    drawPanel(chars, 0, 0, charsWidth, charsHeight);
    chars.drawText(
      1,
      1,
      `Diggin' It (v${pkg.version})\n\n\nControls:\n- Left click: Interact with inventory item, use shop interface, check further action history\n\n- Right click: Drop inventory item\n\n- arrow keys: move\n\n- esc: Exit large screen menus, restart game on death\n\n- shift + arrow keys: hold to dig in any direction without moving\n\n- g: grab item\n\n- x: examine detailed item and enemy descriptions\n\n- . or 5: wait\n\n- enter or >: go through exits`,
      charsWidth - 2
    );
  }
}
