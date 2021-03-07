export default class MessageLog {
  messages: string[];

  constructor(public capacity: number = 4) {
    this.messages = [];
  }

  add(message: string): void {
    const length = this.messages.unshift(message);
    if (length > this.capacity) this.messages.pop();
  }
}
