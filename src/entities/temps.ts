import { ItemOptions } from "../Item";

export const litBomb: Partial<ItemOptions> = {
  glyph: "Bomb",
  name: "lit bomb",
  canPickUp: false,
};

export const explosion: Partial<ItemOptions> = {
  glyph: "Explosion",
  name: "explosion",
  canPickUp: false,
  obeysGravity: false,
};
