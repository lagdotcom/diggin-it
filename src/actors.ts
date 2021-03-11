import { ActorOptions } from "./Actor";

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
  glyph: "Squimpy",
  name: "squimpy",
  colour: "red",
  hp: 10,
  ai: "wander",
  attack: 2,
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
