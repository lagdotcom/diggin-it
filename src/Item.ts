export interface ItemOptions {
  article: string;
  colour: string;
  glyph: string;
  name: string;
  treasure: number;
}

export default class Item {
  type: "item";
  article: string;
  colour: string;
  glyph: string;
  name: string;
  treasure: number;

  constructor(
    public x: number,
    public y: number,
    {
      article = "a",
      colour = "silver",
      glyph = "?",
      name = glyph,
      treasure = 0,
    }: Partial<ItemOptions> = {}
  ) {
    this.type = "item";
    this.article = article;
    this.colour = colour;
    this.glyph = glyph;
    this.name = name;
    this.treasure = treasure;
  }
}
