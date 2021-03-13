import { TileOptions } from "./Tile";

export const border: Partial<TileOptions> = {
  glyph: "Bedrock",
  name: "",
  solid: true,
  indestructible: true,
};
export const dirtShallow: Partial<TileOptions> = {
  glyph: "DirtS",
  colour: "brown",
  name: "dirt",
  solid: true,
  durability: 1,
};
export const dirtMiddle: Partial<TileOptions> = {
  glyph: "DirtM",
  colour: "green",
  name: "dirt",
  solid: true,
  durability: 1,
};
export const dirtDeep: Partial<TileOptions> = {
  glyph: "DirtD",
  colour: "purple",
  name: "dirt",
  solid: true,
  durability: 1,
};
export const sandShallow: Partial<TileOptions> = {
  glyph: "SandS",
  colour: "yellow",
  name: "sand",
  article: "",
  solid: true,
  durability: 1,
  collapses: true,
};
export const sandMiddle: Partial<TileOptions> = {
  glyph: "SandM",
  colour: "blue",
  name: "sand",
  article: "",
  solid: true,
  durability: 1,
  collapses: true,
};
export const sandDeep: Partial<TileOptions> = {
  glyph: "SandD",
  colour: "red",
  name: "sand",
  article: "",
  solid: true,
  durability: 1,
  collapses: true,
};

export const brick: Partial<TileOptions> = {
  glyph: "Brick",
  name: "brick",
  solid: true,
  durability: 10,
};

export const unset: Partial<TileOptions> = { glyph: "?", name: "mistake" };
export const empty: Partial<TileOptions> = {
  glyph: " ",
  name: "nothing",
  article: "",
};
export const gas: Partial<TileOptions> = {
  glyph: "Gas",
  name: "noxious gas",
  article: "",
  airCost: 5,
};

export const entrance: Partial<TileOptions> = {
  glyph: "Entrance",
  name: "entrance",
  article: "an",
};
export const exit: Partial<TileOptions> = {
  glyph: "Exit",
  name: "exit",
  article: "an",
  destroyIncomingPushes: true,
};
export const ladderTileTop: Partial<TileOptions> = {
  glyph: "LadderTileT",
  name: "ladder",
  canClimb: true,
};
export const ladderTile: Partial<TileOptions> = {
  glyph: "LadderTile",
  name: "ladder",
  canClimb: true,
};
export const ladderTileBottom: Partial<TileOptions> = {
  glyph: "LadderTileB",
  name: "ladder",
  canClimb: true,
};
export const ropeTileTop: Partial<TileOptions> = {
  glyph: "RopeTileT",
  name: "rope",
  canClimb: true,
};
export const ropeTile: Partial<TileOptions> = {
  glyph: "RopeTile",
  name: "rope",
  canClimb: true,
};
export const ropeTileBottom: Partial<TileOptions> = {
  glyph: "RopeTileB",
  name: "rope",
  canClimb: true,
};
export const water: Partial<TileOptions> = {
  glyph: "Water",
  name: "water",
  article: "",
  colour: "blue",
  canSwimIn: true,
  airCost: 3,
};
