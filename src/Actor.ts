import Slot from "./interfaces/Slot";
import Stat from "./interfaces/Stat";
import Item from "./Item";

export type ActorAI = "wander" | "fly" | "ink";
export type AIData = { active?: boolean; dir?: number; spawn?: number };
export type PlayerData = { stats: number };

export interface ActorOptions {
  ai: ActorAI;
  aiData: AIData;
  alive: boolean;
  article: string;
  canClimb: boolean;
  colour: string;
  durability: number;
  equipment: Partial<Record<Slot, Item>>;
  glyph: string;
  heavy: boolean;
  inky: boolean;
  inventory: Item[];
  inventorySize: number;
  lore: string;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  maxHp: number;
  hp: number;
  maxFp: number;
  fp: number;
  maxAp: number;
  ap: number;
  sp: number;
  dp: number;
  experience: number;
  player: PlayerData;
  crushResistance: number;
  xrayVision: number;
  teleportThreshold: number;
}

export default class Actor {
  ai?: ActorAI;
  aiData: AIData;
  alive: boolean;
  article: string;
  canClimb: boolean;
  colour: string;
  durability: number;
  equipment: Partial<Record<Slot, Item>>;
  glyph: string;
  heavy: boolean;
  inky: boolean;
  inkParts: Actor[];
  inventory: Item[];
  inventorySize: number;
  lore?: string;
  name: string;
  namePlural: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  maxHp: number;
  hp: number;
  maxFp: number;
  fp: number;
  maxAp: number;
  ap: number;
  sp: number;
  dp: number;
  experience: number;
  player?: PlayerData;
  crushResistance: number;
  xrayVision: number;
  reeling: boolean;
  teleportThreshold?: number;
  teleportTracking: number;

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
      inky = false,
      lore = undefined,
      name = glyph,
      obeysGravity = true,
      pushable = false,
      vision = 5,
      maxHp = 0,
      hp = maxHp,
      maxFp = 0,
      fp = maxFp,
      maxAp = 0,
      ap = maxAp,
      sp = 0,
      dp = 0,
      alive = hp > 0,
      experience = 0,
      inventorySize = 0,
      inventory = new Array(inventorySize),
      player = undefined,
      crushResistance = 0,
      xrayVision = 0,
      teleportThreshold = undefined,
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
    this.inky = inky;
    this.lore = lore;
    this.name = name;
    this.namePlural = name;
    this.obeysGravity = obeysGravity;
    this.pushable = pushable;
    this.vision = vision;
    this.alive = alive;
    this.maxHp = maxHp;
    this.hp = hp;
    this.maxFp = maxFp;
    this.fp = fp;
    this.maxAp = maxAp;
    this.ap = ap;
    this.sp = sp;
    this.dp = dp;
    this.experience = experience;
    this.inventory = inventory;
    this.inventorySize = inventorySize;
    this.player = player;
    this.crushResistance = crushResistance;
    this.xrayVision = xrayVision;
    this.reeling = false;
    this.teleportThreshold = teleportThreshold;
    this.teleportTracking = 0;
  }

  get(st: Stat): number {
    const base = this[st];
    let mod = 0;
    Object.values(this.equipment).forEach((it) => {
      if (it.bonus[st]) mod += it.bonus[st];
    });

    return base + mod;
  }

  fullHeal(): void {
    this.hp = this.get("maxHp");
    this.ap = this.get("maxAp");
    this.fp = this.get("maxFp");
    this.alive = true;
  }
}
