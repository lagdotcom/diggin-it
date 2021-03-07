export interface ItemOptions {
  glyph: string;
  name: string;
}

export default class Item {
  type: "item";
  glyph: string;
  name: string;

  constructor(
    public x: number,
    public y: number,
    { glyph = "?", name = glyph }: Partial<ItemOptions> = {}
  ) {
    this.type = "item";
    this.glyph = glyph;
    this.name = name;
  }
}
