type Zone = 0 | 1 | 2 | 3;
export type Zoned<T> = [shallow: T, medium: T, deep: T, final: T];

export default Zone;

export function getZone(depth: number): Zone {
  if (depth < 4) return 0;
  if (depth < 7) return 1;
  if (depth <= 10) return 2;
  return 3;
}
