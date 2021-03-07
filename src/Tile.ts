export interface TileOptions {
  canStandOn: boolean;
  destroyIncomingPushes: boolean;
  digResistance: number;
  name: string;
  opaque: boolean;
  solid: boolean;
}

export default class Tile {
  type: "tile";
  canStandOn: boolean;
  destroyIncomingPushes: boolean;
  digResistance: number;
  name: string;
  opaque: boolean;
  solid: boolean;

  constructor(
    public glyph: string,
    {
      solid = false,
      canStandOn = solid,
      destroyIncomingPushes = false,
      digResistance = Infinity,
      name = glyph,
      opaque = solid,
    }: Partial<TileOptions> = {}
  ) {
    this.type = "tile";
    this.canStandOn = canStandOn;
    this.destroyIncomingPushes = destroyIncomingPushes;
    this.digResistance = digResistance;
    this.name = name;
    this.opaque = opaque;
    this.solid = solid;
  }
}

export const border = new Tile("!", { solid: true });
export const dirt = new Tile("#", {
  name: "dirt",
  solid: true,
  digResistance: 10,
});
export const sand = new Tile("s", {
  name: "sand",
  solid: true,
  digResistance: 1,
});

export const unset = new Tile("?");
export const air = new Tile("A");
export const empty = new Tile(" ");
export const entrance = new Tile("<");
export const exit = new Tile(">", { destroyIncomingPushes: true });
export const ladder = new Tile("H", { canStandOn: true });
export const water = new Tile("~");
