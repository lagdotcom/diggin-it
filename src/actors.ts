import { ActorOptions } from "./Actor";

export const player: Partial<ActorOptions> = {
  player: true,
  glyph: "@",
  name: "you",
  article: "",
  canClimb: true,
  maxhp: 20,
  maxap: 150,
  sp: 8,
  dp: 8,
  inventorySize: 20,
};

export const squimpy: Partial<ActorOptions> = {
  glyph: "Squimpy",
  name: "squimpy",
  colour: "yellow",
  ai: "wander",
  maxhp: 24,
  sp: 15,
  dp: 6,
};
export const buster: Partial<ActorOptions> = {
  glyph: "Buster",
  name: "buster",
  colour: "pink",
  ai: "wander",
  maxhp: 20,
  sp: 18,
  dp: 8,
};
export const canandra: Partial<ActorOptions> = {
  glyph: "Canandra",
  name: "canandra",
  colour: "orange",
  ai: "wander",
  maxhp: 100,
  sp: 45,
  dp: 25,
};
export const crim: Partial<ActorOptions> = {
  glyph: "Crim",
  name: "crim",
  colour: "red",
  ai: "wander",
  maxhp: 85,
  sp: 20,
  dp: 28,
};
export const flazza: Partial<ActorOptions> = {
  glyph: "Flazza",
  name: "flazza",
  colour: "cyan",
  ai: "fly",
  maxhp: 32,
  sp: 25,
  dp: 15,
  obeysGravity: false,
};
export const glova: Partial<ActorOptions> = {
  glyph: "Glova",
  name: "glova",
  colour: "white",
  ai: "wander",
  maxhp: 15,
  sp: 20,
  dp: 18,
};
export const muln: Partial<ActorOptions> = {
  glyph: "Muln",
  name: "muln",
  colour: "blue",
  ai: "wander",
  maxhp: 43,
  sp: 25,
  dp: 22,
};
export const slobberfin: Partial<ActorOptions> = {
  glyph: "Slobberfin",
  name: "slobberfin",
  colour: "turquoise",
  ai: "wander",
  maxhp: 63,
  sp: 45,
  dp: 25,
};
export const splinter: Partial<ActorOptions> = {
  glyph: "Splinter",
  name: "splinter",
  colour: "brown",
  ai: "wander",
  maxhp: 38,
  sp: 28,
  dp: 19,
};
export const telden: Partial<ActorOptions> = {
  glyph: "Telden",
  name: "telden",
  colour: "red",
  ai: "fly",
  maxhp: 35,
  sp: 24,
  dp: 12,
  obeysGravity: false,
};
export const floater: Partial<ActorOptions> = {
  glyph: "InkFloater",
  name: "floater",
  colour: "darkblue",
  ai: "fly",
  // TODO: mimic random flying enemy
  obeysGravity: false,
};
export const drifter: Partial<ActorOptions> = {
  glyph: "InkDrifter",
  name: "drifter",
  colour: "darkblue",
  ai: "wander",
  // TODO: mimic random ground enemy
};
export const theInk: Partial<ActorOptions> = {
  glyph: "Ink1",
  name: "ink",
  article: "the",
  colour: "purple",
  maxhp: 200,
  sp: 40,
  dp: 25,
  obeysGravity: false,
};

export const crate: Partial<ActorOptions> = {
  glyph: "Crate",
  name: "crate",
  colour: "brown",
  durability: 2,
  pushable: true,
};

export const boulder: Partial<ActorOptions> = {
  glyph: "Boulder",
  name: "boulder",
  colour: "grey",
  durability: 5,
  pushable: true,
  heavy: true,
};

export const metal: Partial<ActorOptions> = {
  glyph: "MetalBlock",
  name: "metal block",
  colour: "cyan",
  durability: 10,
  pushable: true,
  heavy: true,
};
