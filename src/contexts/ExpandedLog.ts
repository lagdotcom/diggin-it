import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Soon from "../Soon";

export default class ExpandedLog implements Context {
  rerender: Soon;

  constructor(public g: Game) {
    g.log.expand(true);
    this.rerender = new Soon("ExpandedLog", () => this.render());
    this.rerender.start();
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
      this.g.log.expand(false);
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
      case "N":
      case "q":
      case "Q":
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
    this.g.log.render();
  }
}
