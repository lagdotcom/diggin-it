import pkg from "../../package.json";
import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import CreditsScreen from "./CreditsScreen";

export default class ScenarioScreen implements Context {
  constructor(public g: Game) {
    g.log.clear();
    this.render();
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "start":
        return this.g.start();

      case "credits":
        this.g.contexts.push(new CreditsScreen(this.g));
        return;
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
  onMouse(): Cmd {
    return undefined;
  }

  render(): void {
    const { chars, charsHeight, charsWidth, tiles } = this.g;
    tiles.clear();

    chars.drawText(
      1,
      1,
      "Welcome to Diggin' It! In this game you'll assume the role of Jacques Splintertooth, an intrepid explorer on the hunt for a mysterious thing known only as the Wisher's Fragment for a mysterious wealthy benefactor. To achieve that goal, you'll spelunk deeper and deeper into a constantly shifting cavern system, battling creatures and the terrain alike. Use tools, find armour, and carefully keep an eye on your ever draining air as you help Jacques make his way to the Wisher's Fragment. Good luck!",
      charsWidth - 2
    );

    chars.drawText(1, charsHeight - 3, "[S]tart");
    chars.drawText(1, charsHeight - 2, "[C]redits");

    const version = pkg.version;
    chars.drawText(
      charsWidth - version.length - 2,
      charsHeight - 2,
      "v" + version
    );
  }
}
