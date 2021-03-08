export interface ItemOptions {
  colour: string;
  glyph: string;
  name: string;
  treasure: number;
}

export default class Item {
  type: "item";
  colour: string;
  glyph: string;
  name: string;
  treasure: number;

  constructor(
    public x: number,
    public y: number,
    {
      colour = "silver",
      glyph = "?",
      name = glyph,
      treasure = 0,
    }: Partial<ItemOptions> = {}
  ) {
    this.type = "item";
    this.colour = colour;
    this.glyph = glyph;
    this.name = name;
    this.treasure = treasure;
  }
}
