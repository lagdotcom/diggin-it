export interface ActorOptions {
  digResistance: number;
  digStrength: number;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;
}

export default class Actor {
  type: "actor";
  digResistance: number;
  digStrength: number;
  glyph: string;
  name: string;
  obeysGravity: boolean;
  pushable: boolean;
  vision: number;

  constructor(
    public x: number,
    public y: number,
    {
      digResistance = Infinity,
      digStrength = 0,
      glyph = "?",
      name = glyph,
      obeysGravity = true,
      pushable = false,
      vision = 5,
    }: Partial<ActorOptions> = {}
  ) {
    this.type = "actor";
    this.digResistance = digResistance;
    this.digStrength = digStrength;
    this.glyph = glyph;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.pushable = pushable;
    this.vision = vision;
  }
}
