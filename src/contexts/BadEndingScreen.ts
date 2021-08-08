import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import ScenarioScreen from "./ScenarioScreen";

export default class BadEndingScreen implements Context {
  stage: number;

  constructor(public g: Game) {
    this.stage = 0;
    requestAnimationFrame(() => this.render());
  }

  next(): void {
    this.stage++;
    this.render();
  }

  exit(): void {
    this.g.contexts.clear();
    this.g.contexts.push(new ScenarioScreen(this.g));
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "start":
        return this.next();

      case "cancel":
        return this.exit();
    }
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "Escape":
      case "Backspace":
      case "n":
      case "N":
        return { type: "cancel" };

      default:
        return { type: "start" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.button === 2) {
      e.preventDefault();
      return { type: "cancel" };
    }
    if (e.type !== "mousemove") return { type: "start" };
  }

  render(): void {
    const { chars, graphics, tiles } = this.g;

    switch (this.stage) {
      case 0:
        tiles.clear();
        chars.drawText(
          5,
          12,
          "Jacques approaches the altar, raising the Wisher's Fragment high above him in jubilant victory.",
          30
        );
        break;

      case 1:
        graphics.show("badEnd", 0, -8);
        break;

      case 2:
        graphics.clear(176, 48);
        chars.drawText(
          5,
          24,
          '"Is this truly the Fragment? It glows with such opulence!"',
          30
        );
        break;

      case 3:
        graphics.clear(176, 48);
        chars.drawText(
          1,
          22,
          "His vision clouds into a haze as he is blinded by the radiance of the object. A small tug at the back of his mind cries out, as if he has forgotten something very dear and important to him.",
          38
        );
        break;

      case 4:
        graphics.clear(176, 48);
        chars.drawText(
          5,
          23,
          '"I understand now, this is the wish I\'ve worked so hard for, not a soul could take that from me."',
          30
        );
        break;

      default:
        graphics.clear();
        chars.drawText(
          1,
          1,
          "And so Jacques made his wish, the world swirling around him as a new reality shifted to form. Jacques stood alone in darkest black, as if swallowed by a blotted void. The only thing staring back at him, a twisted and malice-filled visage not unlike his own.\n\nHe only wished for a simple quiet away from it all, where he and he alone could rest at last.\n\nJacques never returned, nor did anyone ever find him again.\n\n\nThe End?",
          38
        );
        break;
    }
  }
}
