export interface TileOptions {
  article: string;
  canClimb: boolean;
  canSwimIn: boolean;
  collapses: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  digResistance: number;
  name: string;
  opaque: boolean;
  solid: boolean;
}

export default class Tile {
  type: "tile";
  article: string;
  canClimb: boolean;
  canSwimIn: boolean;
  collapses: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  digResistance: number;
  name: string;
  opaque: boolean;
  solid: boolean;

  constructor(
    public glyph: string,
    {
      article = "",
      solid = false,
      canClimb = false,
      canSwimIn = false,
      collapses = false,
      colour = "white",
      destroyIncomingPushes = false,
      digResistance = Infinity,
      name = glyph,
      opaque = solid,
    }: Partial<TileOptions> = {}
  ) {
    this.type = "tile";
    this.article = article;
    this.canClimb = canClimb;
    this.canSwimIn = canSwimIn;
    this.collapses = collapses;
    this.colour = colour;
    this.destroyIncomingPushes = destroyIncomingPushes;
    this.digResistance = digResistance;
    this.name = name;
    this.opaque = opaque;
    this.solid = solid;
  }
}
