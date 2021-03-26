import { lightRed } from "../colours";
import { drawPanel } from "../drawing";
import Game from "../Game";
import { pad } from "../utils";

export default class Stats {
  dirty: boolean;

  constructor(public g: Game) {
    this.dirty = true;

    const dirty = () => (this.dirty = true);
    g.on("equipped", dirty);
    g.on("refreshed", dirty);
    g.on("tick", dirty);
  }

  render(): void {
    if (!this.dirty) return;
    this.dirty = false;

    const { chars, depth, player } = this.g;

    let y = 0;
    drawPanel(chars, 28, y++, 12, 10);
    this.renderStatMax(y++, "HP:", player.hp, player.get("maxhp"), 20);
    this.renderStatMax(y++, "AP:", player.ap, player.get("maxap"), 20);
    this.renderStat(y++, "SP:", player.get("sp"));
    this.renderStat(y++, "DP:", player.get("dp"));

    this.renderStat(y + 1, "Floor", depth, 0, 30);
    chars.drawText(29, 7, "Experience");
    chars.drawText(31, 8, pad(player.experience, 6, "0"));
  }

  renderStat(y: number, name: string, value: number, warn = 0, x = 31): void {
    const col = value < warn ? `%b{${lightRed}}` : "";
    this.g.chars.drawText(x, y, `${col}${name}${pad(value, 3)}`);
  }

  renderStatMax(
    y: number,
    name: string,
    value: number,
    max: number,
    warn = 0
  ): void {
    const col = value < warn ? `%b{${lightRed}}` : "";
    this.g.chars.drawText(
      29,
      y,
      `${col}${name}${pad(value, 3)}/${pad(max, 3)}`
    );
  }
}
