import Game from "../Game";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";

const lag = "Paul Davies";
const j = "Jacob J. Ritz";
const zan = "Zan-zan-zawa-veia";

const twitter = (name: string, tag: string) => `${name} (@${tag})`;

export default class CreditsScreen implements Context {
  x: number;
  y: number;

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
      case "N":
        return { type: "cancel" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.button === 2) {
      e.preventDefault();
      return { type: "cancel" };
    }
  }

  drawSection(header: string, ...credits: string[]) {
    this.y++;
    this.g.chars.drawText(this.x, this.y++, header);
    for (const credit of credits)
      this.g.chars.drawText(this.x + 1, this.y++, credit);
  }

  render(): void {
    const { chars, charsHeight, tiles } = this.g;
    tiles.clear();

    this.x = 1;
    this.y = 0;
    this.drawSection("CREDITS");
    this.drawSection("Written & Directed by:", twitter(j, "ultrajdude"));
    this.drawSection("Planning:", twitter(lag, "lagdotcom"), j);
    this.drawSection("Programming:", lag);
    this.drawSection("Art:", j);
    this.drawSection("Music:", twitter(zan, "zanzanzawa"));
    this.drawSection("Sound Effects:", j);
    this.drawSection("Room Design:", lag, j, zan);

    this.x = 20;
    this.y = 18;
    this.drawSection("Additional Testing:", "Nicholas Houser", "Cloud8745");
    this.drawSection("Trailer Assistance:", "Craig LeBarron");

    chars.drawText(23, charsHeight - 2, "[ESC] to go back");
  }
}
