import Slot from "./interfaces/Slot";
import Stat from "./interfaces/Stat";
import Item from "./Item";

export type ActorAI = "wander" | "fly" | "ink";

interface PlayerData {
  stats: number;
}

export interface ActorOptions {
  ai?: ActorAI;
  aiData: Record<string, any>;
  alive: boolean;
  article: string;
  canClimb: boolean;
  colour: string;
  durability: number;
  equipment: Partial<Record<Slot, Item>>;
  glyph: string;
  heavy: boolean;
  inventory: Item[];
  inventorySize: number;
  lore: string;
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
  player: PlayerData;
}

export default class Actor {
  ai?: ActorAI;
  aiData: Record<string, any>;
  alive: boolean;
  article: string;
  canClimb: boolean;
  colour: string;
  durability: number;
  equipment: Partial<Record<Slot, Item>>;
  glyph: string;
  heavy: boolean;
  inkparts: Actor[];
  inventory: Item[];
  inventorySize: number;
  lore?: string;
  name: string;
  namep: string;
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
  player?: PlayerData;
  reeling: boolean;

  constructor(
    public x: number,
    public y: number,
    {
      ai = undefined,
      aiData = {},
      article = "a",
      canClimb = false,
      colour = "silver",
      durability = Infinity,
      equipment = {},
      glyph = "?",
      heavy = false,
      lore = undefined,
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
      player = undefined,
    }: Partial<ActorOptions> = {}
  ) {
    this.ai = ai;
    this.aiData = aiData;
    this.article = article;
    this.canClimb = canClimb;
    this.colour = colour;
    this.durability = durability;
    this.equipment = equipment;
    this.glyph = glyph;
    this.heavy = heavy;
    this.lore = lore;
    this.name = name;
    this.namep = name;
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
    this.player = player;
    this.reeling = false;
  }

  get(st: Stat) {
    const base = this[st];
    var mod = 0;
    Object.values(this.equipment).forEach((it) => {
      if (it.bonus[st]) mod += it.bonus[st];
    });

    return base + mod;
  }

  fullHeal() {
    this.hp = this.get("maxhp");
    this.ap = this.get("maxap"); // TODO: should heal ap?
    this.fp = this.get("maxfp"); // TODO: should heal fp?
    this.alive = true;
  }
}
