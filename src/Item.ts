import Slot from "./interfaces/Slot";
import Stat from "./interfaces/Stat";

export type ItemUse =
  | "air"
  | "bomb"
  | "cureBleed"
  | "curePoison"
  | "cureStun"
  | "gainDP"
  | "gainHP"
  | "gainSP"
  | "heal"
  | "ladder"
  | "launcher"
  | "memento"
  | "rope"
  | "staple"
  | "throw";

export interface ItemOptions {
  article: string;
  bonus: Partial<Record<Stat, number>>;
  canClimb: boolean;
  canPickUp: boolean;
  charges: number;
  colour: string;
  glyph: string;
  holdBonus: Partial<Record<Stat, number>>;
  lore: string;
  name: string;
  namePlural: string;
  obeysGravity: boolean;
  plural: boolean;
  slot: Slot;
  sting?: string;
  treasure: number;
  use: ItemUse;
  useAmmo?: string;
  useArgs: number[];
  poisonChance: number;
  bleedChance: number;
  stunChance: number;
  knockBackChance: number; // TODO knockBackChance
}

export default class Item {
  _type: "Item";
  article: string;
  bonus: Partial<Record<string, number>>;
  canClimb: boolean;
  canPickUp: boolean;
  charges: number;
  colour: string;
  glyph: string;
  holdBonus: Partial<Record<Stat, number>>;
  lore: string;
  name: string;
  namePlural: string;
  obeysGravity: boolean;
  plural: boolean;
  slot?: Slot;
  sting?: string;
  treasure: number;
  use?: ItemUse;
  useAmmo?: string;
  useArgs: number[];
  poisonChance: number;
  bleedChance: number;
  stunChance: number;
  knockBackChance: number;

  constructor(
    public x: number,
    public y: number,
    {
      article = "a",
      bonus = {},
      canClimb = false,
      charges = 0,
      colour = "silver",
      glyph = "?",
      holdBonus = {},
      lore = "",
      name = glyph,
      namePlural = name + "s",
      obeysGravity = true,
      plural = false,
      slot = undefined,
      treasure = 0,
      use = undefined,
      useAmmo = undefined,
      useArgs = [],
      canPickUp = treasure === 0,
      poisonChance = 0,
      bleedChance = 0,
      stunChance = 0,
      knockBackChance = 0,
      sting = undefined,
    }: Partial<ItemOptions> = {}
  ) {
    this._type = "Item";
    this.article = article;
    this.bonus = bonus;
    this.canClimb = canClimb;
    this.canPickUp = canPickUp;
    this.charges = charges;
    this.colour = colour;
    this.glyph = glyph;
    this.holdBonus = holdBonus;
    this.lore = lore;
    this.name = name;
    this.namePlural = namePlural;
    this.obeysGravity = obeysGravity;
    this.plural = plural;
    this.slot = slot;
    this.treasure = treasure;
    this.use = use;
    this.useAmmo = useAmmo;
    this.useArgs = useArgs;
    this.poisonChance = poisonChance;
    this.bleedChance = bleedChance;
    this.stunChance = stunChance;
    this.knockBackChance = knockBackChance;
    this.sting = sting;
  }
}
