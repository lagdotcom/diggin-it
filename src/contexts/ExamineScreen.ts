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

  getInfo(): string {
    return name(this.thing) + "\n\n" + this.thing.lore;
  }

  render(): void {
    const { chars, tiles, charsWidth, charsHeight } = this.g;

    tiles.clear();
    drawPanel(chars, 0, 0, charsWidth, charsHeight);
    chars.drawText(1, 1, this.getInfo(), charsWidth - 2);

    chars.drawText(1, charsHeight - 2, "[ESC] to go back");
  }
}
