import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import ScenarioScreen from "./ScenarioScreen";

export default class GoodEndingScreen implements Context {
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
          'As the monstrous beast oozes and drips into nothingness, the black tar surrounding Jacques vanishes, replaced with the feeling of a warm embrace./n/nWonderful memories of times past play over and over, a field spread out before him where his wife and child await with a delicious picnic spread on a breezy summer day.\n\nBehind the mysterious door was the greatest treasure of all, inner knowledge and a calm reminder of the simpler things in life. The woman and child call out for Jacques to come home.\n\n"I will. I\'ll be home this time. No promises of greater things, no more excuses. I\'ll make it right."',
          30
        );
        break;

      case 1:
        tiles.clear();
        chars.drawText(
          5,
          12,
          'Jacques, keeping to his word unloads all but the gear required to make the trek out. As he passes by the Wisher\'s Fragment on the return trip, he cannot help but notice how small and pointless it feels in comparison to the years of isolation away from family and friends.\n\nSunset greets Jacques, now bathed in gentle orange as a calm dusk begins to set in on an overlong journey. He reaches for the pocket watch and opens it.',
          30
        );
        break;

      case 2:
        graphics.show("goodEnd", 0, -8);
        break;

      case 3:
        graphics.clear(176, 48);
        chars.drawText(
          5,
          22,
          'A smile spreads as tears stream down his face. Home and family just around the bend, Jacques elects to tell Fabienne of his "failure" well after his journey home.',
          30
        );
        break;

      case 4:
        graphics.clear(176, 48);
        chars.drawText(
          1,
          5,
          "No longer would the promise of profit stand between Jacques and the most important things in his life.",
          38
        );
        break;

      case 5:
        tiles.clear();
        break;

      case 6:
        graphics.show("truegoodEnd", 0, -8);
        break;


    }
  }
}
