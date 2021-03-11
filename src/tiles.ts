import Tile from "./Tile";

export const border = new Tile("Bedrock", { name: "", solid: true });
export const dirtShallow = new Tile("DirtS", {
  colour: "brown",
  name: "dirt",
  solid: true,
  digResistance: 10,
});
export const dirtMiddle = new Tile("DirtM", {
  colour: "green",
  name: "dirt",
  solid: true,
  digResistance: 10,
});
export const dirtDeep = new Tile("DirtD", {
  colour: "purple",
  name: "dirt",
  solid: true,
  digResistance: 10,
});
export const sandShallow = new Tile("SandS", {
  colour: "yellow",
  name: "sand",
  solid: true,
  digResistance: 1,
  collapses: true,
});
export const sandMiddle = new Tile("SandM", {
  colour: "blue",
  name: "sand",
  solid: true,
  digResistance: 1,
  collapses: true,
});
export const sandDeep = new Tile("SandD", {
  colour: "red",
  name: "sand",
  solid: true,
  digResistance: 1,
  collapses: true,
});

export const unset = new Tile("?", { name: "" });
export const air = new Tile("Air", { colour: "pink" });
export const empty = new Tile(" ", { name: "" });
export const entrance = new Tile("Entrance", { name: "how you got here" });
export const exit = new Tile("Exit", {
  name: "exit",
  destroyIncomingPushes: true,
});
export const ladderTileTop = new Tile("LadderTileT", {
  name: "ladder",
  article: "a",
  canClimb: true,
});
export const ladderTile = new Tile("LadderTile", {
  name: "ladder",
  article: "a",
  canClimb: true,
});
export const ladderTileBottom = new Tile("LadderTileB", {
  name: "ladder",
  article: "a",
  canClimb: true,
});
export const ropeTileTop = new Tile("RopeTileT", {
  name: "rope",
  article: "a",
  canClimb: true,
});
export const ropeTile = new Tile("RopeTile", {
  name: "rope",
  article: "a",
  canClimb: true,
});
export const ropeTileBottom = new Tile("RopeTileB", {
  name: "rope",
  article: "a",
  canClimb: true,
});
export const water = new Tile("Water", {
  name: "water",
  colour: "blue",
  canSwimIn: true,
});
