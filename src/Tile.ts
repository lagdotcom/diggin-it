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
  hpCost: number;
  indestructible: boolean;
  name: string;
  opaque: boolean;
  xrayOpaque: boolean;
  fallOntoDamage: number;
  walkOntoDamage: number;
  solid: boolean;
  lore: string;
}

export default class Tile {
  _type: "Tile";
  airCost: number;
  article: string;
  canClimb: boolean;
  canSwimIn: boolean;
  collapses: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  durability: number;
  glyph: string;
  hpCost: number;
  indestructible: boolean;
  name: string;
  namePlural: string;
  opaque: boolean;
  xrayOpaque: boolean;
  fallOntoDamage: number;
  walkOntoDamage: number;
  solid: boolean;
  lore: string;

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
    hpCost = 0,
    indestructible = false,
    name = glyph,
    opaque = solid,
    xrayOpaque = indestructible,
    fallOntoDamage = 0,
    walkOntoDamage = 0,
    lore = "",
  }: Partial<TileOptions> = {}) {
    this._type = "Tile";
    this.airCost = airCost;
    this.article = article;
    this.canClimb = canClimb;
    this.canSwimIn = canSwimIn;
    this.collapses = collapses;
    this.colour = colour;
    this.destroyIncomingPushes = destroyIncomingPushes;
    this.durability = durability;
    this.glyph = glyph;
    this.hpCost = hpCost;
    this.indestructible = indestructible;
    this.name = name;
    this.namePlural = name;
    this.opaque = opaque;
    this.xrayOpaque = xrayOpaque;
    this.fallOntoDamage = fallOntoDamage;
    this.walkOntoDamage = walkOntoDamage;
    this.solid = solid;
    this.lore = lore;
  }
}
