import { drawMulti } from "../drawing";
import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import TitleScreen from "./TitleScreen";

export default class AuthorScreen implements Context {
  timeout: ReturnType<typeof setTimeout>;

  constructor(public g: Game) {
    this.timeout = setTimeout(() => this.exit(), 3000);
    this.render();
  }

  exit(): void {
    clearTimeout(this.timeout);
    this.g.contexts.pop();
    this.g.contexts.push(new TitleScreen(this.g));
  }

  handle(cmd: Cmd): void {
    if (cmd.type === "start") return this.exit();
  }

  onKey(): Cmd {
    return { type: "start" };
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.type !== "mousemove") return { type: "start" };
  }

  render(): void {
    const { tiles } = this.g;
    tiles.clear();
    drawMulti(tiles, 5, 5, 10, 3, "SadFolksLogo");
  }
}
