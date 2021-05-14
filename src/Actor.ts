import { RNG } from "rot-js";

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
  needsWater: boolean;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  maxHp: number;
  maxHpRange: number;
  hp: number;
  maxAp: number;
  ap: number;
  sp: number;
  spRange: number;
  dp: number;
  dpRange: number;
  experience: number;
  player: PlayerData;
  crushResistance: number;
  xrayVision: number;
  teleportThreshold: number;
}

export default class Actor {
  _type: "Actor";
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
  needsWater: boolean;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  maxHp: number;
  hp: number;
  maxAp: number;
  ap: number;
  sp: number;
  spRange: number;
  dp: number;
  dpRange: number;
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
      needsWater = false,
      obeysGravity = true,
      pushable = false,
      vision = 5,
      maxHp = 0,
      maxHpRange = 0,
      maxAp = 0,
      sp = 0,
      spRange = 0,
      dp = 0,
      dpRange = 0,
      alive = maxHp > 0,
      experience = 0,
      inventorySize = 0,
      inventory = new Array(inventorySize),
      player = undefined,
      crushResistance = 0,
      xrayVision = 0,
      teleportThreshold = undefined,
    }: Partial<ActorOptions> = {}
  ) {
    this._type = "Actor";
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
    this.needsWater = needsWater;
    this.obeysGravity = obeysGravity;
    this.pushable = pushable;
    this.vision = vision;
    this.alive = alive;
    this.maxHp = maxHpRange ? RNG.getUniformInt(maxHp, maxHpRange) : maxHp;
    this.hp = this.maxHp;
    this.maxAp = maxAp;
    this.sp = spRange ? RNG.getUniformInt(sp, spRange) : sp;
    this.dp = dpRange ? RNG.getUniformInt(dp, dpRange) : dp;
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
    this.inventory.forEach((it) => {
      if (it.holdBonus[st]) mod += it.holdBonus[st];
    });

    return base + mod;
  }

  fullHeal(): void {
    this.hp = this.get("maxHp");
    this.ap = this.get("maxAp");
    this.alive = true;
  }
}
