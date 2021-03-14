import Slot from "./interfaces/Slot";
import Stat from "./interfaces/Stat";
import Item from "./Item";

type ActorAI = "wander" | "fly";

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
  player: boolean;
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
  inventory: Item[];
  inventorySize: number;
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
  player: boolean;

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
      player = false,
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
  }
}
