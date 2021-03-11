import Cmd from "../Cmd";
import Game from "../Game";
import Context from "../interfaces/Context";
import Soon from "../Soon";

export default class ExpandedLog implements Context {
  rerender: Soon;

  constructor(public g: Game) {
    g.log.expanded = true;
    this.rerender = new Soon(() => this.render());
    this.rerender.start();
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
      this.g.log.expanded = false;
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
    this.g.tiles.clear();
    this.g.log.draw();
  }
}
