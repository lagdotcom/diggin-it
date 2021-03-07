export interface ActorOptions {
  colour: string;
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
  colour: string;
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
      colour = "silver",
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
    this.colour = colour;
    this.digResistance = digResistance;
    this.digStrength = digStrength;
    this.glyph = glyph;
    this.name = name;
    this.obeysGravity = obeysGravity;
    this.pushable = pushable;
    this.vision = vision;
  }
}
