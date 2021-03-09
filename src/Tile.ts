export interface TileOptions {
  canClimb: boolean;
  canStandOn: boolean;
  canSwimIn: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  digResistance: number;
  name: string;
  opaque: boolean;
  solid: boolean;
}

export default class Tile {
  type: "tile";
  canClimb: boolean;
  canStandOn: boolean;
  canSwimIn: boolean;
  colour: string;
  destroyIncomingPushes: boolean;
  digResistance: number;
  name: string;
  opaque: boolean;
  solid: boolean;

  constructor(
    public glyph: string,
    {
      solid = false,
      canClimb = false,
      canStandOn = solid,
      canSwimIn = false,
      colour = "white",
      destroyIncomingPushes = false,
      digResistance = Infinity,
      name = glyph,
      opaque = solid,
    }: Partial<TileOptions> = {}
  ) {
    this.type = "tile";
    this.canClimb = canClimb;
    this.canStandOn = canStandOn;
    this.canSwimIn = canSwimIn;
    this.colour = colour;
    this.destroyIncomingPushes = destroyIncomingPushes;
    this.digResistance = digResistance;
    this.name = name;
    this.opaque = opaque;
    this.solid = solid;
  }
}

export const border = new Tile("Bedrock", { name: "", solid: true });
export const dirt = new Tile("Dirt", {
  colour: "brown",
  name: "dirt",
  solid: true,
  digResistance: 10,
});
export const sand = new Tile("Sand", {
  colour: "yellow",
  name: "sand",
  solid: true,
  digResistance: 1,
});

export const unset = new Tile("?", { name: "" });
export const air = new Tile("Air", { colour: "pink" });
export const empty = new Tile(" ", { name: "" });
export const entrance = new Tile("Entrance", { name: "how you got here" });
export const exit = new Tile("Exit", {
  name: "exit",
  destroyIncomingPushes: true,
});
export const ladderTile = new Tile("LadderTile", {
  name: "ladder",
  canClimb: true,
  canStandOn: true,
});
export const ropeTile = new Tile("RopeTile", {
  name: "rope",
  canClimb: true,
  canStandOn: true,
});
export const water = new Tile("Water", {
  name: "water",
  colour: "blue",
  canSwimIn: true,
});
