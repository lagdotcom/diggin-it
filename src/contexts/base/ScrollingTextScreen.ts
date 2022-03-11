import { drawPanel } from "../../drawing";
import Game from "../../Game";
import Cmd from "../../interfaces/Cmd";
import Context from "../../interfaces/Context";
import Soon from "../../Soon";

export default abstract class ScrollingTextScreen implements Context {
  offset: number;
  offsetMax: number;
  rerender: Soon;

  constructor(public g: Game, name: string, private lines: string[]) {
    this.offset = 0;
    this.offsetMax = lines.length - (g.charsHeight - 2);

    this.rerender = new Soon(name, () => this.render(), true);
  }

  onCancel() {
    this.g.emit("refreshed", {});
    this.g.tiles.clear();

    this.g.contexts.pop();
    this.g.contexts.top.render();
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "cancel") {
      this.onCancel();
    } else if (cmd.type === "move") {
      this.scroll(cmd.y);
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
        e.preventDefault();
        return { type: "cancel" };

      case "s":
      case "S":
      case "2":
      case "ArrowDown":
        e.preventDefault();
        return { type: "move", x: 0, y: 1 };

      case "w":
      case "W":
      case "8":
      case "ArrowUp":
        e.preventDefault();
        return { type: "move", x: 0, y: -1 };

      case "PageDown":
        e.preventDefault();
        return { type: "move", x: 0, y: 10 };

      case "PageUp":
        e.preventDefault();
        return { type: "move", x: 0, y: -10 };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.type === "contextmenu") {
      e.preventDefault();
      return { type: "cancel" };
    }
  }

  scroll(amount: number): void {
    const old = this.offset;
    this.offset = Math.max(0, Math.min(this.offset + amount, this.offsetMax));

    if (this.offset !== old) this.rerender.start();
  }

  render(): void {
    const { chars, tiles, charsWidth: w, charsHeight: h } = this.g;

    tiles.clear();
    drawPanel(chars, 0, 0, w, h);
    if (this.offset > 0) chars.draw(w - 1, 1, "ScrollUp");
    if (this.offset < this.offsetMax) chars.draw(w - 1, h - 2, "ScrollDown");

    for (let i = 0; i < h - 2; i++) {
      const line = this.lines[i + this.offset];
      const pad = line.length - line.trimStart().length;

      chars.drawText(pad + 1, i + 1, line);
    }
  }
}
