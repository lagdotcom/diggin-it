import Item from "./Item";
import Slot from "./Slot";
import Stat from "./Stat";

export interface ActorOptions {
  ai: string;
  aiData: Record<string, any>;
  alive: boolean;
  article: string;
  canClimb: boolean;
  colour: string;
  digResistance: number;
  digStrength: number;
  equipment: Partial<Record<Slot, Item>>;
  glyph: string;
  heavy: boolean;
  inventory: Item[];
  inventorySize: number;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  maxhp: number;
  hp: number;
  maxfp: number;
  fp: number;
  maxap: number;
  ap: number;
  sp: number;
  dp: number;
  experience: number;
}

export default class Actor {
  type: "actor";
  ai: string;
  aiData: Record<string, any>;
  alive: boolean;
  article: string;
  canClimb: boolean;
  colour: string;
  digResistance: number;
  digStrength: number;
  equipment: Partial<Record<Slot, Item>>;
  glyph: string;
  heavy: boolean;
  inventory: Item[];
  inventorySize: number;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  maxhp: number;
  hp: number;
  maxfp: number;
  fp: number;
  maxap: number;
  ap: number;
  sp: number;
  dp: number;
  experience: number;

  constructor(
    public x: number,
    public y: number,
    {
      ai = "",
      aiData = {},
      article = "a",
      canClimb = false,
      colour = "silver",
      digResistance = Infinity,
      digStrength = 0,
      equipment = {},
      glyph = "?",
      heavy = false,
      name = glyph,
      obeysGravity = true,
      pushable = false,
      vision = 5,
      maxhp = 0,
      hp = maxhp,
      maxfp = 0,
      fp = maxfp,
      maxap = 0,
      ap = maxap,
      sp = 0,
      dp = 0,
      alive = hp > 0,
      experience = 0,
      inventorySize = 0,
      inventory = new Array(inventorySize),
    }: Partial<ActorOptions> = {}
  ) {
    this.type = "actor";
    this.ai = ai;
    this.aiData = aiData;
    this.article = article;
    this.canClimb = canClimb;
    this.colour = colour;
    this.digResistance = digResistance;
    this.digStrength = digStrength;
    this.equipment = equipment;
    this.glyph = glyph;
    this.heavy = heavy;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.pushable = pushable;
    this.vision = vision;
    this.alive = alive;
    this.maxhp = maxhp;
    this.hp = hp;
    this.maxfp = maxfp;
    this.fp = fp;
    this.maxap = maxap;
    this.ap = ap;
    this.sp = sp;
    this.dp = dp;
    this.experience = experience;
    this.inventory = inventory;
    this.inventorySize = inventorySize;
  }

  get(st: Stat) {
    const base = this[st];
    var mod = 0;
    Object.values(this.equipment).forEach((it) => {
      if (it.bonus[st]) mod += it.bonus[st];
    });

    return base + mod;
  }
}
