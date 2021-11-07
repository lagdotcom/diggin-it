import { TileOptions } from "../Tile";

const bedrock = { name: "", article: "", solid: true, indestructible: true };
export const border: Partial<TileOptions> = { ...bedrock, glyph: "Bedrock" };
export const borderFinal: Partial<TileOptions> = {
  ...bedrock,
  glyph: "BedrockF",
};

const dirt = { name: "dirt", article: "", solid: true, durability: 1 };
export const dirtShallow: Partial<TileOptions> = {
  ...dirt,
  glyph: "DirtS",
  colour: "brown",
};
export const dirtMiddle: Partial<TileOptions> = {
  ...dirt,
  glyph: "DirtM",
  colour: "green",
};
export const dirtDeep: Partial<TileOptions> = {
  ...dirt,
  glyph: "DirtD",
  colour: "purple",
  name: "dirt",
};
export const dirtFinal: Partial<TileOptions> = {
  ...dirt,
  glyph: "DirtF",
  colour: "red",
  name: "dirt",
};

const sand = {
  name: "sand",
  article: "",
  solid: true,
  durability: 1,
  collapses: true,
};
export const sandShallow: Partial<TileOptions> = {
  ...sand,
  glyph: "SandS",
  colour: "yellow",
};
export const sandMiddle: Partial<TileOptions> = {
  ...sand,
  glyph: "SandM",
  colour: "blue",
};
export const sandDeep: Partial<TileOptions> = {
  ...sand,
  glyph: "SandD",
  colour: "red",
};
export const sandFinal: Partial<TileOptions> = {
  ...sand,
  glyph: "SandF",
  colour: "purple",
};

export const brick: Partial<TileOptions> = {
  glyph: "Brick",
  name: "brick wall",
  solid: true,
  durability: 10,
};
export const vaultBrick: Partial<TileOptions> = {
  glyph: "SideBrick",
  name: "brick wall",
  solid: true,
  durability: 20,
};

export const unset: Partial<TileOptions> = {
  glyph: "?",
  name: "mistake",
  solid: true,
};
export const empty: Partial<TileOptions> = {
  glyph: " ",
  name: "",
  article: "",
};
export const gas: Partial<TileOptions> = {
  glyph: "Gas",
  name: "noxious gas",
  article: "",
  airCost: 5,
};
export const magma: Partial<TileOptions> = {
  glyph: "Lava",
  name: "magma",
  article: "",
  airCost: 3,
  hpCost: 5,
  canSwimIn: true,
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
  exit: "normal",
};
export const vaultExit: Partial<TileOptions> = {
  glyph: "SideExit",
  name: "exit",
  article: "an",
  destroyIncomingPushes: true,
  exit: "side",
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
export const darkWater = {
  ...water,
  name: "",
  glyph: "DarkWater",
  colour: "black",
  airCost: 1, // TODO dark water air cost
};

export const inkDoor: Partial<TileOptions> = {
  glyph: "InkDoor",
  name: "mysterious door",
  colour: "purple",
  exit: "closed",
  destroyIncomingPushes: true,
};

export const hugeDoor: Partial<TileOptions> = {
  glyph: "HugeDoor",
  name: "huge door",
  colour: "green",
  exit: "slabs",
  // turns into HugeDoorOpen# and gains exit: 'normal',
};

export const stapleTile: Partial<TileOptions> = {
  glyph: "StapleTile",
  name: "staple",
  canClimb: true,
};

export const pike: Partial<TileOptions> = {
  glyph: "WoodenSpike",
  name: "pike",
  solid: true,
  durability: 2,
  lore: "A trick of the Poregons, or perhaps leftover hunting traps left by previous explorers, falling on these pikes would almost certainly prove quite painful, if not fatal. Be wary of where you step, and tread lightly lest your life come to a pointed end.",
  fallOntoDamage: 40,
  walkOntoDamage: 15,
};

export const coral: Partial<TileOptions> = {
  glyph: "Coral",
  name: "coral",
  solid: true,
  durability: 3,
  lore: "A simple coral structure, somehow this hardy specimen has adapted from the ocean floor and taken root in these underground corridors and caverns. ",
};

export const finalDoor: Partial<TileOptions> = {
  glyph: "FinalDoor",
  name: "mysterious door",
  colour: "green",
  exit: "closed",
  // turns into FinalDoorOpen and gains exit: 'final',
  destroyIncomingPushes: true,
};
