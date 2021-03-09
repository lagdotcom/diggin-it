type ItemUse = "" | "ladder" | "rope";

export interface ItemOptions {
  article: string;
  canClimb: boolean;
  charges: number;
  colour: string;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  treasure: number;
  use: ItemUse;
  useArgs: any[];
}

export default class Item {
  type: "item";
  article: string;
  canClimb: boolean;
  charges: number;
  colour: string;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  treasure: number;
  use: ItemUse;
  useArgs: any[];

  constructor(
    public x: number,
    public y: number,
    {
      article = "a",
      canClimb = false,
      charges = 0,
      colour = "silver",
      glyph = "?",
      name = glyph,
      obeysGravity = true,
      treasure = 0,
      use = "",
      useArgs = [],
    }: Partial<ItemOptions> = {}
  ) {
    this.type = "item";
    this.article = article;
    this.canClimb = canClimb;
    this.charges = charges;
    this.colour = colour;
    this.glyph = glyph;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.treasure = treasure;
    this.use = use;
    this.useArgs = useArgs;
  }
}
