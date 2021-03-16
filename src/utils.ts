export function manhattan(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function pad(value: number, length: number, ch = " "): string {
  let string = value.toString();
  while (string.length < length) string = ch + string;
  return string;
}
