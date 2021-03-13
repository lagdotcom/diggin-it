export interface TileOptions {
  airCost: number;
  article: string;
  canClimb: boolean;
  canSwimIn: boolean;
  collapses: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  digResistance: number;
  indestructible: boolean;
  name: string;
  opaque: boolean;
  solid: boolean;
}

export default class Tile {
  airCost: number;
  article: string;
  canClimb: boolean;
  canSwimIn: boolean;
  collapses: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  digResistance: number;
  indestructible: boolean;
  name: string;
  namep: string;
  opaque: boolean;
  solid: boolean;

  constructor(
    public glyph: string,
    {
      airCost = 1,
      article = "",
      solid = false,
      canClimb = false,
      canSwimIn = false,
      collapses = false,
      colour = "white",
      destroyIncomingPushes = false,
      digResistance = Infinity,
      indestructible = false,
      name = glyph,
      opaque = solid,
    }: Partial<TileOptions> = {}
  ) {
    this.airCost = airCost;
    this.article = article;
    this.canClimb = canClimb;
    this.canSwimIn = canSwimIn;
    this.collapses = collapses;
    this.colour = colour;
    this.destroyIncomingPushes = destroyIncomingPushes;
    this.digResistance = digResistance;
    this.indestructible = indestructible;
    this.name = name;
    this.namep = name;
    this.opaque = opaque;
    this.solid = solid;
  }
}
