export default interface Stack<T> {
  size: number;
  top: T;

  clear(): void;
  push(item: T): number;
  pop(): T;
}
