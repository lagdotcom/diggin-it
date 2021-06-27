import {
  bg,
  darkGold,
  darkGreen,
  darkRed,
  fg,
  lightGold,
  lightRed,
} from "../colours";
import { drawPanel } from "../drawing";
import Game from "../Game";
import { pad } from "../utils";

const warning = bg(lightRed);

const bleedingColours: Record<number, string> = {
  1: fg(darkRed),
  2: fg(lightRed),
  3: bg(darkRed) + fg(lightRed),
  5: bg(lightRed) + fg(darkGold),
  10: bg(lightRed) + fg(lightGold),
};

export default class Stats {
  dirty: boolean;

  constructor(
    public g: Game,
    public x = 28,
    public y = 0,
    public width = 12,
    public height = 12
  ) {
    this.dirty = true;

    const dirty = () => (this.dirty = true);
    g.on("equipped", dirty);
    g.on("refreshed", dirty);
    g.on("statusApplied", dirty);
    g.on("statusRemoved", dirty);
    g.on("tick", dirty);
  }

  render(): void {
    if (!this.dirty) return;
    this.dirty = false;

    const { chars, depth, player } = this.g;

    let y = this.y;
    drawPanel(chars, this.x, y++, this.width, this.height, true);
    this.renderStatMax(y++, "HP:", player.hp, player.get("maxHp"), 20);
    this.renderStatMax(y++, "AP:", player.ap, player.get("maxAp"), 20);
    this.renderStat(y++, "SP:", player.get("sp"));
    this.renderStat(y++, "DP:", player.get("dp"));

    y++;
    this.renderStat(y++, "Floor", depth, 0, 30);
    chars.drawText(29, y++, "Experience");
    chars.drawText(31, y++, pad(player.experience, 6, "0"));

    if (player.stunTimer > 0) chars.drawText(29, y, bg(darkGold) + "Stun");
    if (player.bleedAmount > 0)
      chars.drawText(34, y, bleedingColours[player.bleedAmount] + "Bleed");
    if (player.poisoned) chars.drawText(30, y + 1, bg(darkGreen) + "Poisoned");
  }

  renderStat(y: number, name: string, value: number, warn = 0, x = 31): void {
    const col = value < warn ? warning : "";
    this.g.chars.drawText(x, y, `${col}${name}${pad(value, 3)}`);
  }

  renderStatMax(
    y: number,
    name: string,
    value: number,
    max: number,
    warn = 0
  ): void {
    const col = value < warn ? warning : "";
    this.g.chars.drawText(
      29,
      y,
      `${col}${name}${pad(value, 3)}/${pad(max, 3)}`
    );
  }
}
