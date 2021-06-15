import { ActorOptions } from "../Actor";

export const player: Partial<ActorOptions> = {
  glyph: "@",
  name: "you",
  article: "",
  canClimb: true,
  maxHp: 80,
  maxAp: 150,
  sp: 8,
  dp: 8,
  inventorySize: 20,
};
