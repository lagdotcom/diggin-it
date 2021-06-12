import Slot from "./interfaces/Slot";
import Stat from "./interfaces/Stat";

export type ItemUse =
  | "air"
  | "bomb"
  | "heal"
  | "ladder"
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
  durability: number;
  glyph: string;
  holdBonus: Partial<Record<Stat, number>>;
  lore: string;
  name: string;
  namePlural: string;
  obeysGravity: boolean;
  plural: boolean;
  slot: Slot;
  treasure: number;
  use: ItemUse;
  useArgs: number[];
  useFail: string;
}

export default class Item {
  _type: "Item";
  article: string;
  bonus: Partial<Record<string, number>>;
  canClimb: boolean;
  canPickUp: boolean;
  charges: number;
  colour: string;
  durability: number;
  glyph: string;
  holdBonus: Partial<Record<Stat, number>>;
  lore: string;
  name: string;
  namePlural: string;
  obeysGravity: boolean;
  plural: boolean;
  slot?: Slot;
  treasure: number;
  use?: ItemUse;
  useArgs: number[];
  useFail?: string;

  constructor(
    public x: number,
    public y: number,
    {
      article = "a",
      bonus = {},
      canClimb = false,
      charges = 0,
      colour = "silver",
      durability = 0,
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
      useArgs = [],
      useFail = undefined,
      canPickUp = treasure === 0,
    }: Partial<ItemOptions> = {}
  ) {
    this._type = "Item";
    this.article = article;
    this.bonus = bonus;
    this.canClimb = canClimb;
    this.canPickUp = canPickUp;
    this.charges = charges;
    this.colour = colour;
    this.durability = durability;
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
    this.useArgs = useArgs;
    this.useFail = useFail;
  }
}
