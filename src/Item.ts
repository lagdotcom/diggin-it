export interface ItemOptions {
  article: string;
  canClimb: boolean;
  colour: string;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  treasure: number;
}

export default class Item {
  type: "item";
  article: string;
  canClimb: boolean;
  colour: string;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  treasure: number;

  constructor(
    public x: number,
    public y: number,
    {
      article = "a",
      canClimb = false,
      colour = "silver",
      glyph = "?",
      name = glyph,
      obeysGravity = true,
      treasure = 0,
    }: Partial<ItemOptions> = {}
  ) {
    this.type = "item";
    this.article = article;
    this.canClimb = canClimb;
    this.colour = colour;
    this.glyph = glyph;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.treasure = treasure;
  }
}
