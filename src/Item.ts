export interface ItemOptions {
  colour: string;
  glyph: string;
  name: string;
}

export default class Item {
  type: "item";
  colour: string;
  glyph: string;
  name: string;

  constructor(
    public x: number,
    public y: number,
    { colour = "silver", glyph = "?", name = glyph }: Partial<ItemOptions> = {}
  ) {
    this.type = "item";
    this.colour = colour;
    this.glyph = glyph;
    this.name = name;
  }
}
