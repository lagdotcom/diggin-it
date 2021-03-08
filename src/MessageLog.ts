import { drawPanel } from "./drawing";
import Game from "./Game";

export default class MessageLog {
  messages: string[];

  constructor(public g: Game, public capacity: number = 4) {
    this.messages = [];
  }

  add(message: string): void {
    const msg = message[0].toUpperCase() + message.slice(1);

    const length = this.messages.unshift(msg);
    if (length > this.capacity) this.messages.pop();
  }

  draw(): void {
    const { chars } = this.g;
    const { width, height } = chars._options;

    drawPanel(chars, 0, height - 6, width, 6);

    let y = height - 2;
    this.messages.forEach((msg) => {
      chars.drawText(1, y, msg, width - 2);
      y--;
    });
  }
}
