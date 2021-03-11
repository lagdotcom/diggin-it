import { ActorOptions } from "./Actor";

export const player: Partial<ActorOptions> = {
  player: true,
  glyph: "@",
  name: "you",
  article: "",
  digStrength: 10,
  canClimb: true,
  maxhp: 20,
  maxap: 100,
  sp: 8,
  dp: 8,
  inventorySize: 20,
};

export const squimpy: Partial<ActorOptions> = {
  glyph: "Squimpy",
  name: "squimpy",
  colour: "red",
  maxhp: 12,
  ai: "wander",
  sp: 4,
  dp: 2,
};

export const crate: Partial<ActorOptions> = {
  glyph: "Crate",
  name: "crate",
  colour: "brown",
  digResistance: 10,
  pushable: true,
};

export const boulder: Partial<ActorOptions> = {
  glyph: "Boulder",
  name: "boulder",
  colour: "grey",
  digResistance: 20,
  pushable: true,
  heavy: true,
};

export const metal: Partial<ActorOptions> = {
  glyph: "MetalBlock",
  name: "metal block",
  colour: "cyan",
  pushable: true,
  heavy: true,
};
