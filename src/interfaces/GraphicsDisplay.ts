export type GraphicsName = "title" | "badEnd" | "goodEnd" | "truebadEnd" | "truegoodEnd";

export default interface GraphicsDisplay {
  clear(y?: number, height?: number): void;
  show(gfx: GraphicsName, x?: number, y?: number): void;
}
