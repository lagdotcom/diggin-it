import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";

export default class TitleScreen implements Context {
  constructor(public g: Game) {
    this.render();
  }

  handle(cmd: Cmd) {
    if (cmd.type === "start") {
      this.g.start();
    }
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "s":
      case "S":
      case "n":
      case "N":
      case "Enter":
      case "Return":
        return { type: "start" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    return undefined;
  }

  render() {
    this.g.tiles.clear();

    this.g.chars.drawText(1, 1, "Diggin' It");
    this.g.chars.drawText(1, 3, "Hit S to begin.");
  }
}
