import Stack from "./interfaces/Stack";

export default class ArrayStack<T> implements Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  get size(): number {
    return this.items.length;
  }

  get top(): T {
    return this.items[this.items.length - 1];
  }

  clear(): void {
    this.items.splice(0, this.items.length);
  }

  push(item: T): number {
    return this.items.push(item);
  }

  pop(): T {
    return this.items.pop();
  }
}
