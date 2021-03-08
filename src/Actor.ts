import Item from "./Item";

export interface ActorOptions {
  ai: string;
  aiData: Record<string, any>;
  alive: boolean;
  article: string;
  attack: number;
  canClimb: boolean;
  colour: string;
  defense: number;
  digResistance: number;
  digStrength: number;
  glyph: string;
  inventory: Item[];
  inventorySize: number;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  hp: number;
  fp: number;
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
  attack: number;
  canClimb: boolean;
  colour: string;
  defense: number;
  digResistance: number;
  digStrength: number;
  glyph: string;
  inventory: Item[];
  inventorySize: number;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
  hp: number;
  fp: number;
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
      attack = 0,
      canClimb = false,
      colour = "silver",
      defense = 0,
      digResistance = Infinity,
      digStrength = 0,
      glyph = "?",
      name = glyph,
      obeysGravity = true,
      pushable = false,
      vision = 5,
      hp = 0,
      fp = 0,
      ap = 0,
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
    this.attack = attack;
    this.canClimb = canClimb;
    this.colour = colour;
    this.defense = defense;
    this.digResistance = digResistance;
    this.digStrength = digStrength;
    this.glyph = glyph;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.pushable = pushable;
    this.vision = vision;
    this.alive = alive;
    this.hp = hp;
    this.fp = fp;
    this.ap = ap;
    this.sp = sp;
    this.dp = dp;
    this.experience = experience;
    this.inventory = inventory;
    this.inventorySize = inventorySize;
  }
}
