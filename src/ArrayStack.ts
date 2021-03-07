import Stack from "./interfaces/Stack";

export default class ArrayStack<T> implements Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  get top() {
    return this.items[this.items.length - 1];
  }

  clear() {
    this.items.splice(0, this.items.length);
  }

  push(item: T) {
    return this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }
}
