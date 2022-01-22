import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import { MusicName } from "../interfaces/MusicLibrary";
import ScenarioScreen from "./ScenarioScreen";

export default abstract class EndingScreen implements Context {
  stage: number;

  constructor(public g: Game, track: MusicName = "winner") {
    this.stage = 0;
    requestAnimationFrame(() => this.render());

    g.music.play(track);
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

      // ignore some boring keys
      case "Alt":
      case "AltGraph":
      case "ContextMenu":
      case "Control":
      case "Shift":
      case "Tab":
        return { type: "wait" };

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

  abstract render(): void;
}
