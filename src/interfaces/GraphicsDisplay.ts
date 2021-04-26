export type GraphicsName = "title" | "badEnd" | "goodEnd";

export default interface GraphicsDisplay {
  clear(y?: number, height?: number): void;
  show(gfx: GraphicsName, x?: number, y?: number): void;
}
