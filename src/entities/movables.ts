import { ActorOptions } from "../Actor";

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
