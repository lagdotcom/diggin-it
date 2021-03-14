import { drawPanel } from "../drawing";
import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Thing from "../interfaces/Thing";
import { name } from "../text";

export default class ExamineScreen implements Context {
  constructor(public g: Game, public thing: Thing) {
    requestAnimationFrame(() => this.render());
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
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

  getInfo() {
    return name(this.thing) + "\n\n" + this.thing.lore;
  }

  render(): void {
    const { chars, tiles, width, height } = this.g;

    const w = width * 2,
      h = height * 2;

    tiles.clear();
    drawPanel(chars, 0, 0, w, h);
    chars.drawText(1, 1, this.getInfo(), w - 2);

    chars.drawText(1, h - 2, "[ESC] to go back");
  }
}
