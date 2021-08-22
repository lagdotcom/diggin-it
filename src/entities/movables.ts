import { ActorOptions } from "../Actor";

export const crate: Partial<ActorOptions> = {
  glyph: "Crate",
  name: "crate",
  colour: "brown",
  durability: 2,
  pushable: true,
  dropChance: 50,
  drops: { "@": 1 },
};

export const boulder: Partial<ActorOptions> = {
  glyph: "Boulder",
  name: "boulder",
  colour: "grey",
  durability: 5,
  pushable: true,
  heavy: true,
  dropChance: 80,
  drops: { rock: 1 },
  dropQty: { rock: [1, 4] },
};

export const metal: Partial<ActorOptions> = {
  glyph: "MetalBlock",
  name: "metal block",
  colour: "cyan",
  durability: 10,
  pushable: true,
  heavy: true,
  dropChance: 60,
  drops: { "@": 4, "6": 1, "7": 1 },
};
