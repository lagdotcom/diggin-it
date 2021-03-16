import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";

export default class CreditsScreen implements Context {
  constructor(public g: Game) {
    this.render();
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
    if (e.button === 2) return { type: "cancel" };
  }

  render(): void {
    const { chars, height, tiles } = this.g;
    tiles.clear();

    let y = 1;
    chars.drawText(1, y++, "CREDITS");

    y++;
    chars.drawText(1, y++, "Planning:");
    chars.drawText(2, y++, "Paul Davies (@lagdotcom)");
    chars.drawText(2, y++, "Jacob J. Ritz (@UltraJDude)");

    y++;
    chars.drawText(1, y++, "Art:");
    chars.drawText(2, y++, "Jacob J. Ritz");

    y++;
    chars.drawText(1, y++, "Music:");
    chars.drawText(2, y++, "Zan-zan-zawa-veia (@zanzanzawa)");

    y++;
    chars.drawText(1, y++, "Room Design:");
    chars.drawText(2, y++, "Paul Davies");
    chars.drawText(2, y++, "Jacob J. Ritz");
    chars.drawText(2, y++, "Zan-zan-zawa-veia");

    chars.drawText(1, (height - 1) * 2, "[ESC] to go back");
  }
}
