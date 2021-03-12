import Slot from "./interfaces/Slot";
import Stat from "./interfaces/Stat";

type ItemUse = "air" | "heal" | "ladder" | "rope";

export interface ItemOptions {
  article: string;
  bonus: Partial<Record<Stat, number>>;
  canClimb: boolean;
  charges: number;
  colour: string;
  durability: number;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  plural: boolean;
  slot: Slot;
  treasure: number;
  use: ItemUse;
  useArgs: any[];
}

export default class Item {
  article: string;
  bonus: Partial<Record<string, number>>;
  canClimb: boolean;
  charges: number;
  colour: string;
  durability: number;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  plural: boolean;
  slot?: Slot;
  treasure: number;
  use?: ItemUse;
  useArgs: any[];

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
      name = glyph,
      obeysGravity = true,
      plural = false,
      slot = undefined,
      treasure = 0,
      use = undefined,
      useArgs = [],
    }: Partial<ItemOptions> = {}
  ) {
    this.article = article;
    this.bonus = bonus;
    this.canClimb = canClimb;
    this.charges = charges;
    this.colour = colour;
    this.durability = durability;
    this.glyph = glyph;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.plural = plural;
    this.slot = slot;
    this.treasure = treasure;
    this.use = use;
    this.useArgs = useArgs;
  }
}
