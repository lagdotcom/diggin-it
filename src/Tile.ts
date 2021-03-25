export interface TileOptions {
  airCost: number;
  article: string;
  canClimb: boolean;
  canSwimIn: boolean;
  collapses: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  durability: number;
  glyph: string;
  indestructible: boolean;
  name: string;
  opaque: boolean;
  xrayOpaque: boolean;
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
  durability: number;
  glyph: string;
  indestructible: boolean;
  name: string;
  namep: string;
  opaque: boolean;
  xrayOpaque: boolean;
  solid: boolean;

  constructor({
    glyph = "?",
    airCost = 1,
    article = "a",
    solid = false,
    canClimb = false,
    canSwimIn = false,
    collapses = false,
    colour = "white",
    destroyIncomingPushes = false,
    durability = Infinity,
    indestructible = false,
    name = glyph,
    opaque = solid,
    xrayOpaque = indestructible,
  }: Partial<TileOptions> = {}) {
    this.airCost = airCost;
    this.article = article;
    this.canClimb = canClimb;
    this.canSwimIn = canSwimIn;
    this.collapses = collapses;
    this.colour = colour;
    this.destroyIncomingPushes = destroyIncomingPushes;
    this.durability = durability;
    this.glyph = glyph;
    this.indestructible = indestructible;
    this.name = name;
    this.namep = name;
    this.opaque = opaque;
    this.xrayOpaque = xrayOpaque;
    this.solid = solid;
  }
}
