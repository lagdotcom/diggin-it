import pkg from "../../package.json";
import { colourEq, fg, lightRed } from "../colours";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Soon from "../Soon";
import CreditsScreen from "./CreditsScreen";
import HelpScreen from "./HelpScreen";
import StoryScreen from "./StoryScreen";

type MenuItem = "start" | "help" | "story" | "credits";

export default class ScenarioScreen implements Context {
  hotspots: Hotspots<MenuItem>;
  hover?: string;
  rerender: Soon;

  constructor(public g: Game) {
    const { charsHeight } = g;
    this.hotspots = new Hotspots();
    this.hotspots.register("start", 1, charsHeight - 5, 7, 1);
    this.hotspots.register("help", 1, charsHeight - 4, 6, 1);
    this.hotspots.register("story", 1, charsHeight - 3, 12, 1);
    this.hotspots.register("credits", 1, charsHeight - 2, 9, 1);

    g.log.clear();
    this.rerender = new Soon("ScenarioScreen", () => this.render());
    this.render();
  }

  handle(cmd: Cmd): void {
    this.rerender.stop();

    switch (cmd.type) {
      case "start":
        return this.g.start();

      case "help":
        this.g.contexts.push(new HelpScreen(this.g));
        break;

      case "story":
        this.g.contexts.push(new StoryScreen(this.g));
        break;

      case "credits":
        this.g.contexts.push(new CreditsScreen(this.g));
        break;
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

      case "?":
      case "h":
      case "H":
        return { type: "help" };

      case "r":
      case "R":
        return { type: "story" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    const [mx, my] = this.g.chars.eventToPosition(e);
    const spot = this.hotspots.resolve(mx, my);

    if (spot) {
      const [type] = spot;
      if (e.type === "click") return { type };

      if (this.hover !== type) {
        this.hover = type;
        this.rerender.start();
      }
    } else if (this.hover) {
      this.hover = undefined;
      this.rerender.start();
    }
  }

  renderMenu(): void {
    const { chars, charsHeight } = this.g;

    const sel = (item: MenuItem, label: string) =>
      this.hover === item ? fg(colourEq) + label : label;

    chars.drawText(1, charsHeight - 5, sel("start", "[S]tart"));
    chars.drawText(1, charsHeight - 4, sel("help", "[H]elp"));
    chars.drawText(1, charsHeight - 3, sel("story", "[R]ead Story"));
    chars.drawText(1, charsHeight - 2, sel("credits", "[C]redits"));
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

    this.renderMenu();

    const version = pkg.version;
    chars.drawText(
      charsWidth - version.length - 2,
      charsHeight - 2,
      fg(lightRed) + "v" + version
    );
  }
}
