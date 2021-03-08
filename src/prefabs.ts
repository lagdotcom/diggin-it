import { ActorOptions } from "./Actor";
import { ItemOptions } from "./Item";

export const player: Partial<ActorOptions> = {
  glyph: "@",
  name: "you",
  article: "",
  digStrength: 10,
  canClimb: true,
  hp: 30,
  ap: 100,
  inventorySize: 20,
  attack: 5,
};

export const squimpy: Partial<ActorOptions> = {
  glyph: "1",
  name: "squimpy",
  colour: "red",
  hp: 10,
  ai: "wander",
  attack: 2,
};

export const boulder: Partial<ActorOptions> = {
  glyph: "O",
  name: "boulder",
  colour: "grey",
  digResistance: 20,
  pushable: true,
};
export const metal: Partial<ActorOptions> = {
  glyph: "M",
  name: "metal block",
  colour: "cyan",
  pushable: true,
};

export const bomb: Partial<ItemOptions> = { glyph: "B", name: "bomb" };
export const rope: Partial<ItemOptions> = { glyph: "R", name: "rope" };
export const ladder: Partial<ItemOptions> = { glyph: "L", name: "ladder" };
export const rations: Partial<ItemOptions> = {
  glyph: "R",
  name: "Lessonus ration",
};
export const necklace: Partial<ItemOptions> = { glyph: "C", name: "necklace" };
export const flask: Partial<ItemOptions> = { glyph: "F", name: "flask" };
export const airTank: Partial<ItemOptions> = { glyph: "T", name: "air tank" };

export const coin: Partial<ItemOptions> = {
  glyph: "c",
  name: "coin",
  colour: "yellow",
  treasure: 50,
};
export const goldBar: Partial<ItemOptions> = {
  glyph: "b",
  name: "gold bar",
  colour: "yellow",
  treasure: 100,
};
export const smallGem: Partial<ItemOptions> = {
  glyph: "g",
  name: "small gem",
  colour: "blue",
  treasure: 200,
};
export const coinBag: Partial<ItemOptions> = {
  glyph: "$",
  name: "coin bag",
  colour: "yellow",
  treasure: 300,
};
export const relic: Partial<ItemOptions> = {
  glyph: "a",
  name: "ancient relic",
  colour: "red",
  treasure: 500,
};
export const treasureBox: Partial<ItemOptions> = {
  glyph: "t",
  name: "treasure box",
  colour: "brown",
  treasure: 800,
};
export const diamond: Partial<ItemOptions> = {
  glyph: "d",
  name: "diamond",
  colour: "pink",
  treasure: 1000,
};
export const fragment: Partial<ItemOptions> = {
  glyph: "f",
  name: "wisher's fragment",
  colour: "green",
  treasure: 5000,
};
