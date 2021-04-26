import XY from "./XY";

export default interface TileDisplay {
  clear(): void;
  draw(x: number, y: number, glyph: string, fg?: string, bg?: string): void;
  draw(
    x: number,
    y: number,
    glyph: string[],
    fg?: string[],
    bg?: string[]
  ): void;
  drawText(x: number, y: number, text: string, wrap?: number): void;
  eventToPosition(e: MouseEvent): XY;
  getOptions(): { width: number; height: number };
}
