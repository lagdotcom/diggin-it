import { Text } from "rot-js";

import { drawPanel } from "./drawing";
import Game from "./Game";

export default class MessageLog {
  messages: string[];

  constructor(
    public g: Game,
    public capacity: number = 26,
    public expanded = false
  ) {
    this.messages = [];
  }

  clear(): void {
    this.messages = [];
  }

  add(message: string): void {
    const length = this.messages.unshift(message);
    if (length > this.capacity) this.messages.pop();
  }

  draw(): void {
    const { chars } = this.g;
    const [x, minY, width, height] = this.bounds();
    const maxWidth = width - 2;

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
    const { width, height } = this.g.chars._options;
    return this.expanded ? [0, 0, width, height] : [0, height - 6, width, 6];
  }
}
