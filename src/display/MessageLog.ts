import { Text } from "rot-js";

import { clearArea, drawPanel } from "../drawing";
import Game from "../Game";

export default class MessageLog {
  dirty: boolean;
  messages: string[];

  constructor(
    public g: Game,
    public capacity: number = 26,
    private expanded = false
  ) {
    this.messages = [];
    this.dirty = true;
    this.attach();
  }

  attach(): void {
    this.g.on("refreshed", () => (this.dirty = true));
  }

  expand(expanded: boolean): void {
    if (this.expanded !== expanded) {
      this.expanded = expanded;
      this.dirty = true;

      this.g.emit("refreshed", {});
    }
  }

  clear(): void {
    this.messages = [];
    this.dirty = true;
  }

  add(message: string): void {
    const length = this.messages.unshift(message);
    if (length > this.capacity) this.messages.pop();
    this.dirty = true;
  }

  render(): void {
    if (!this.dirty) return;
    this.dirty = false;

    const { chars } = this.g;
    const [x, minY, width, height] = this.bounds();
    const maxWidth = width - 2;

    clearArea(chars, x, minY, width, height);
    let y = minY + height - 1;
    for (let i = 0; i < this.messages.length && y > minY + 1; i++) {
      const msg = this.messages[i];
      const size = Text.measure(msg, maxWidth);
      y -= size.height;
      chars.drawText(1, y, msg, maxWidth);
    }
    drawPanel(chars, x, minY, width, height);
  }

  bounds(): [x: number, y: number, w: number, h: number] {
    const { width, height } = this.g.chars.getOptions();
    return this.expanded ? [0, 0, width, height] : [0, height - 6, width, 6];
  }
}
