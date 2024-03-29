import { RNG } from "rot-js";

import XY from "./interfaces/XY";
import { Distribution } from "./utils";

import type Slot from "./interfaces/Slot";
import type Stat from "./interfaces/Stat";
import type Item from "./Item";
import type { EnemyName } from "./tables";
export type ActorAI = "wander" | "fly" | "ink";
export type AIData = { active?: boolean; dir?: number; spawn?: number };
export type PlayerData = { stats: number };

type ScreamTarget = "tier" | EnemyName;
type InkSpawnLocation = "player" | "random";
type InkTeleportType = "fire";
type ActorSpecialType =
  | "beginFinalBattle"
  | "blotHeart"
  | "blotEye"
  | "blotHand"
  | "doppelganger"
  | "ink";

export interface ActorOptions {
  ai: ActorAI;
  aiData: AIData;
  alive: boolean;
  article: string;
  championChance: number;
  canClimb: boolean;
  colour: string;
  dropChance: number;
  drops: Distribution<string>;
  dropQty: Record<string, [number, number]>;
  durability: number;
  equipment: Partial<Record<Slot, Item>>;
  explodeTimer: number;
  glyph: string;
  heavy: boolean;
  special: ActorSpecialType;
  inky: boolean;
  inkSpawn: EnemyName[];
  inkSpawnAmount: [number, number];
  inkSpawnLocation: InkSpawnLocation;
  inkSpawnTimer: number;
  inkTeleportType: InkTeleportType;
  inventory: (Item | undefined)[];
  inventorySize: number;
  lore: string;
  name: string;
  needsWater: boolean;
  obeysGravity: boolean;
  obeysTiles: boolean;
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
  attackRange: number;
  experience: number;
  player: PlayerData;
  crushResistance: number;
  xrayVision: number;
  teleportThreshold: number;
  poisoned: boolean;
  bleedAmount: number;
  bleedTimer: number;
  stunTimer: number;
  poisonChance: number;
  bleedChance: number;
  stunChance: number;
  knockBackChance: number; // TODO knockBackChance
  destroyChance: number; // TODO destroyChance
  finalBombChance: number;
  finalGasChance: number;
  finalScreamChance: number;
  finalScreamTarget: ScreamTarget;
  finalScreamCount: [min: number, max: number];
  parent: Actor;
}

export default class Actor {
  _type: "Actor";
  ai?: ActorAI;
  aiData: AIData;
  alive: boolean;
  article: string;
  canClimb: boolean;
  championChance: number;
  colour: string;
  dropChance: number;
  drops: Distribution<string>;
  dropQty: Record<string, [number, number]>;
  durability: number;
  equipment: Partial<Record<Slot, Item>>;
  explodeTimer: number;
  glyph: string;
  heavy: boolean;
  special?: ActorSpecialType;
  parts?: Actor[];
  partOffsets?: XY[];
  parent?: Actor;
  width: number;
  height: number;
  inky: boolean;
  inkSpawn: EnemyName[];
  inkSpawnAmount: [number, number];
  inkSpawnLocation?: InkSpawnLocation;
  inkSpawnTimer: number;
  inkTeleportType?: InkTeleportType;
  inventory: Item[];
  inventorySize: number;
  lore?: string;
  name: string;
  namePlural: string;
  needsWater: boolean;
  obeysGravity: boolean;
  obeysTiles: boolean;
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
  attackRange: number;
  experience: number;
  player?: PlayerData;
  crushResistance: number;
  xrayVision: number;
  reeling: boolean;
  teleportThreshold?: number;
  teleportTracking: number;
  poisoned: boolean;
  bleedAmount: number;
  bleedTimer: number;
  stunTimer: number;
  poisonChance: number;
  bleedChance: number;
  stunChance: number;
  knockBackChance: number;
  destroyChance: number;
  finalBombChance: number;
  finalGasChance: number;
  finalScreamChance: number;
  finalScreamTarget: ScreamTarget;
  finalScreamCount: [min: number, max: number];

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
      explodeTimer = Infinity,
      glyph = "?",
      heavy = false,
      special = undefined,
      inky = false,
      inkSpawn = [],
      inkSpawnAmount = [0, 0],
      inkSpawnLocation = undefined,
      inkSpawnTimer = Infinity,
      inkTeleportType = undefined,
      lore = undefined,
      name = glyph,
      needsWater = false,
      obeysGravity = true,
      obeysTiles = true,
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
      attackRange = 1,
      experience = 0,
      inventorySize = 0,
      inventory = new Array(inventorySize),
      player = undefined,
      crushResistance = 0,
      championChance = 0,
      xrayVision = 0,
      teleportThreshold = undefined,
      poisoned = false,
      bleedAmount = 0,
      bleedTimer = 0,
      stunTimer = 0,
      poisonChance = 0,
      bleedChance = 0,
      stunChance = 0,
      knockBackChance = 0,
      destroyChance = 0,
      finalBombChance = 0,
      finalGasChance = 0,
      finalScreamChance = 0,
      finalScreamTarget = undefined,
      finalScreamCount = [0, 0],
      dropChance = 0,
      drops = {},
      dropQty = {},
      parent = undefined,
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
    this.special = special;
    this.inky = inky;
    this.inkSpawn = inkSpawn;
    this.inkSpawnAmount = inkSpawnAmount;
    this.inkSpawnLocation = inkSpawnLocation;
    this.inkSpawnTimer = inkSpawnTimer;
    this.inkTeleportType = inkTeleportType;
    this.explodeTimer = explodeTimer;
    this.lore = lore;
    this.name = name;
    this.namePlural = name;
    this.needsWater = needsWater;
    this.obeysGravity = obeysGravity;
    this.obeysTiles = obeysTiles;
    this.pushable = pushable;
    this.vision = vision;
    this.alive = alive;
    this.maxHp = maxHpRange ? RNG.getUniformInt(maxHp, maxHpRange) : maxHp;
    this.hp = this.maxHp;
    this.maxAp = maxAp;
    this.sp = spRange ? RNG.getUniformInt(sp, spRange) : sp;
    this.dp = dpRange ? RNG.getUniformInt(dp, dpRange) : dp;
    this.attackRange = attackRange;
    this.experience = experience;
    this.inventory = inventory;
    this.inventorySize = inventorySize;
    this.player = player;
    this.championChance = championChance;
    this.crushResistance = crushResistance;
    this.xrayVision = xrayVision;
    this.reeling = false;
    this.teleportThreshold = teleportThreshold;
    this.teleportTracking = 0;
    this.poisoned = poisoned;
    this.bleedAmount = bleedAmount;
    this.bleedTimer = bleedTimer;
    this.stunTimer = stunTimer;
    this.poisonChance = poisonChance;
    this.bleedChance = bleedChance;
    this.stunChance = stunChance;
    this.knockBackChance = knockBackChance;
    this.destroyChance = destroyChance;
    this.finalBombChance = finalBombChance;
    this.finalGasChance = finalGasChance;
    this.finalScreamChance = finalScreamChance;
    this.finalScreamTarget = finalScreamTarget;
    this.finalScreamCount = finalScreamCount;
    this.dropChance = dropChance;
    this.drops = drops;
    this.dropQty = dropQty;
    this.parent = parent;
    this.width = 1;
    this.height = 1;
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

  setParts(...parts: Actor[]): void {
    const offsets: XY[] = [];

    let highestX = 0;
    let highestY = 0;
    parts.forEach((p) => {
      offsets.push([p.x - this.x, p.y - this.y]);
      if (p.x > highestX) highestX = p.x;
      if (p.y > highestY) highestY = p.y;
    });

    this.parts = parts;
    this.partOffsets = offsets;
    this.width = highestX + 1;
    this.height = highestY + 1;
  }
}
