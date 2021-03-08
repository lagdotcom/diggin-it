export interface ActorOptions {
  alive: boolean;
  canClimb: boolean;
  colour: string;
  digResistance: number;
  digStrength: number;
  glyph: string;
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
  alive: boolean;
  canClimb: boolean;
  colour: string;
  digResistance: number;
  digStrength: number;
  glyph: string;
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
      canClimb = false,
      colour = "silver",
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
    }: Partial<ActorOptions> = {}
  ) {
    this.type = "actor";
    this.canClimb = canClimb;
    this.colour = colour;
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
  }
}
