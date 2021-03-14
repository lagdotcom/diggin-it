import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import ScenarioScreen from "./ScenarioScreen";

export default class TitleScreen implements Context {
  timeout: ReturnType<typeof setTimeout>;

  constructor(public g: Game) {
    this.timeout = setTimeout(() => this.exit(), 3000);
    this.render();
  }

  exit() {
    clearTimeout(this.timeout);
    this.g.contexts.pop();
    this.g.contexts.push(new ScenarioScreen(this.g));
  }

  handle(cmd: Cmd) {
    switch (cmd.type) {
      case "start":
        return this.exit();
    }
  }

  onKey(e: KeyboardEvent): Cmd {
    return { type: "start" };
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.type !== "mousemove") return { type: "start" };
  }

  render() {
    const { canvas, ctx, title } = this.g;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(title, 0, 0);
  }
}
