import { ItemOptions } from "./Item";

export const pocketwatch: Partial<ItemOptions> = {
  glyph: "Pocketwatch",
  name: "pocketwatch",
};
export const brokenPocketwatch: Partial<ItemOptions> = {
  glyph: "BrokenPocketwatch",
  name: "broken pocketwatch",
};

export const pocketknife: Partial<ItemOptions> = {
  glyph: "PocketKnife",
  name: "pocket knife",
  slot: "weapon",
  durability: 15,
  bonus: { sp: 5 },
};
export const pickaxe: Partial<ItemOptions> = {
  glyph: "Pickaxe",
  name: "pickaxe",
  slot: "weapon",
  durability: 10,
  bonus: { sp: 6 },
};

export const clothes: Partial<ItemOptions> = {
  glyph: "ArmourA",
  name: "common clothes",
  article: "some",
  plural: true,
  slot: "armour",
  bonus: { maxhp: 5, dp: 2 },
};

export const bomb: Partial<ItemOptions> = { glyph: "Bomb", name: "bomb" };
export const rope: Partial<ItemOptions> = {
  glyph: "Rope",
  name: "rope",
  use: "rope",
  charges: 1,
  useArgs: [4],
};
export const ladder: Partial<ItemOptions> = {
  glyph: "Ladder",
  name: "ladder",
  use: "ladder",
  charges: 1,
  useArgs: [4],
};
export const rations: Partial<ItemOptions> = {
  glyph: "Rations",
  name: "Lessonus ration",
};
export const bracelet: Partial<ItemOptions> = {
  glyph: "Bracelet",
  name: "Mellogrinian bracelet",
};
export const vial: Partial<ItemOptions> = { glyph: "Vial", name: "empty vial" };
export const airTank: Partial<ItemOptions> = {
  glyph: "Tank",
  name: "air tank",
  use: "air",
};

export const coin: Partial<ItemOptions> = {
  glyph: "Coin",
  name: "coin",
  colour: "yellow",
  treasure: 50,
};
export const goldBar: Partial<ItemOptions> = {
  glyph: "GoldBar",
  name: "gold bar",
  colour: "yellow",
  treasure: 100,
};
export const smallGem: Partial<ItemOptions> = {
  glyph: "Gem",
  name: "small gem",
  colour: "blue",
  treasure: 200,
};
export const coinBag: Partial<ItemOptions> = {
  glyph: "CoinBag",
  name: "coin bag",
  colour: "yellow",
  treasure: 300,
};
export const artifact: Partial<ItemOptions> = {
  glyph: "Artifact",
  name: "artifact",
  colour: "red",
  treasure: 500,
};
export const treasureBox: Partial<ItemOptions> = {
  glyph: "TreasureBox",
  name: "treasure box",
  colour: "brown",
  treasure: 800,
};
export const diamond: Partial<ItemOptions> = {
  glyph: "Diamond",
  name: "diamond",
  colour: "pink",
  treasure: 1000,
};
export const fragment: Partial<ItemOptions> = {
  glyph: "Fragment",
  name: "wisher's fragment",
  colour: "green",
  treasure: 5000,
};
