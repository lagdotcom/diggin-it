import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import CreditsScreen from "./CreditsScreen";

export default class TitleScreen implements Context {
  constructor(public g: Game) {
    this.render();
  }

  handle(cmd: Cmd) {
    switch (cmd.type) {
      case "start":
        return this.g.start();

      case "credits":
        return this.g.contexts.push(new CreditsScreen(this.g));
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

      case "c":
      case "C":
        return { type: "credits" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    return undefined;
  }

  render() {
    const { chars, height, width, tiles } = this.g;
    tiles.clear();

    chars.drawText(1, 1, "Diggin' It");
    chars.drawText(
      1,
      3,
      "Welcome to Diggin' It! In this game you'll assume the role of Jacques Splintertooth, an intrepid explorer on the hunt for a mysterious thing known only as the Wisher's Fragment for a mysterious wealthy benefactor. To achieve that goal, you'll spelunk deeper and deeper into a constantly shifting cavern system, battling creatures and the terrain alike. Use tools, find armors, and carefully keep an eye on your ever draining air as you help Jacques make his way to the Wisher's Fragment. Good luck!",
      (width - 1) * 2
    );

    chars.drawText(1, (height - 1) * 2 - 1, "[S]tart");
    chars.drawText(1, (height - 1) * 2, "[C]redits");
  }
}
