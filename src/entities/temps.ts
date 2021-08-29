import { ItemOptions } from "../Item";

export const litBomb: Partial<ItemOptions> = {
  glyph: "Bomb",
  name: "lit bomb",
  canPickUp: false,
};

export const explosion: Partial<ItemOptions> = {
  glyph: "Explosion",
  name: "explosion",
  article: "an",
  canPickUp: false,
  obeysGravity: false,
};

export const fire: Partial<ItemOptions> = {
  glyph: "Fire",
  name: "fire",
  article: "some",
  canPickUp: false,
};
