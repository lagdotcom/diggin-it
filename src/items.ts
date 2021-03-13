import { ItemOptions } from "./Item";

export const pocketwatch: Partial<ItemOptions> = {
  glyph: "Pocketwatch",
  name: "pocketwatch",
};
export const brokenPocketwatch: Partial<ItemOptions> = {
  glyph: "BrokenPocketwatch",
  name: "broken pocketwatch",
};
export const detector: Partial<ItemOptions> = {
  glyph: "Detector",
  name: "gas detector",
};
export const mask: Partial<ItemOptions> = {
  glyph: "GasMask",
  name: "gas mask",
};

export const pickaxe: Partial<ItemOptions> = {
  glyph: "Pickaxe",
  name: "pickaxe",
  slot: "weapon",
  durability: 10,
  bonus: { sp: 28 },
};
export const powerDrill: Partial<ItemOptions> = {
  glyph: "PowerDrill",
  name: "power drill",
  slot: "weapon",
  durability: 18,
  bonus: { sp: 50 },
};
export const pocketknife: Partial<ItemOptions> = {
  glyph: "PocketKnife",
  name: "pocket knife",
  namep: "pocket knives",
  slot: "weapon",
  durability: 15,
  bonus: { sp: 15 },
};
export const slingshot: Partial<ItemOptions> = {
  glyph: "Slingshot",
  name: "slingshot",
  slot: "weapon",
  durability: 12,
  bonus: { sp: 15 },
};
export const shovel: Partial<ItemOptions> = {
  glyph: "Shovel",
  name: "shovel",
  slot: "weapon",
  durability: 12,
  bonus: { sp: 25 },
};
export const hammer: Partial<ItemOptions> = {
  glyph: "Hammer",
  name: "hammer",
  slot: "weapon",
  durability: 13,
  bonus: { sp: 32 },
};
export const machete: Partial<ItemOptions> = {
  glyph: "Machete",
  name: "machete",
  slot: "weapon",
  durability: 11,
  bonus: { sp: 45 },
};
export const claws: Partial<ItemOptions> = {
  glyph: "Claws",
  name: "digging claws",
  article: "some",
  plural: true,
  slot: "weapon",
  durability: 8,
  bonus: { sp: 38 },
};
export const jackhammer: Partial<ItemOptions> = {
  glyph: "Jackhammer",
  name: "jackhammer",
  slot: "weapon",
  durability: 18,
  bonus: { sp: 57 },
};
export const laserCutter: Partial<ItemOptions> = {
  glyph: "LaserCutter",
  name: "laser cutter",
  slot: "weapon",
  durability: 1000, // TODO: explode chance
  bonus: { sp: 60 },
};

export const clothes: Partial<ItemOptions> = {
  glyph: "ArmourA",
  name: "common clothes",
  article: "some",
  plural: true,
  slot: "armour",
  durability: 10,
  bonus: { maxhp: 5, dp: 8 },
};
export const reinforced: Partial<ItemOptions> = {
  glyph: "ArmourB",
  name: "reinforced attire",
  article: "some",
  slot: "armour",
  durability: 12,
  bonus: { maxhp: 8, dp: 12 },
};
export const armourC: Partial<ItemOptions> = {
  glyph: "ArmourC",
  name: "armour c",
  article: "some",
  slot: "armour",
  durability: 16,
  bonus: { maxhp: 15, dp: 15 },
};
export const armourD: Partial<ItemOptions> = {
  glyph: "ArmourD",
  name: "armour d",
  article: "some",
  slot: "armour",
  durability: 16,
  bonus: { maxhp: 20, dp: 16 },
};
export const armourE: Partial<ItemOptions> = {
  glyph: "ArmourE",
  name: "armour e",
  article: "some",
  slot: "armour",
  durability: 15,
  bonus: { maxhp: 24, dp: 18 },
};
export const armourF: Partial<ItemOptions> = {
  glyph: "ArmourF",
  name: "armour f",
  article: "some",
  slot: "armour",
  durability: 18,
  bonus: { maxhp: 30, dp: 18 },
};
export const wingArmour: Partial<ItemOptions> = {
  glyph: "ArmourG",
  name: "wing armour",
  article: "some",
  slot: "armour",
  durability: 18,
  bonus: { maxhp: 40, dp: 20 },
};
export const armourH: Partial<ItemOptions> = {
  glyph: "ArmourH",
  name: "armour h",
  article: "some",
  slot: "armour",
  durability: 16,
  bonus: { maxhp: 45, dp: 21 },
};
export const armourI: Partial<ItemOptions> = {
  glyph: "ArmourI",
  name: "armour i",
  article: "some",
  slot: "armour",
  durability: 19,
  bonus: { maxhp: 52, dp: 23 },
  // TODO: allows flight?
};
export const arsenalArmour: Partial<ItemOptions> = {
  glyph: "ArmourJ",
  name: "arsenal armour",
  article: "some",
  slot: "armour",
  durability: 20,
  bonus: { maxhp: 60, dp: 30 },
  // TODO: slows user?
};

export const bomb: Partial<ItemOptions> = {
  glyph: "Bomb",
  name: "bomb",
  charges: 1,
  use: "bomb",
  useArgs: [4, -1, -1, 3, 3, 45],
};

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
  use: "heal",
  charges: 1,
  useArgs: [10, 15],
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
  useArgs: [100, 100],
};
export const specs: Partial<ItemOptions> = {
  glyph: "Specs",
  name: "X-ray specs",
  plural: true,
};
export const helmet: Partial<ItemOptions> = {
  glyph: "Helmet",
  name: "miner's helmet",
};
export const jetpack: Partial<ItemOptions> = {
  glyph: "Jetpack",
  name: "jetpack",
};
export const rock: Partial<ItemOptions> = {
  glyph: "Rock",
  name: "rock",
};
export const bolas: Partial<ItemOptions> = {
  glyph: "Bolas",
  name: "bolas",
  namep: "bolases",
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
