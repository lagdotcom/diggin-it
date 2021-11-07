import { ActorOptions } from "../Actor";
import { TileOptions } from "../Tile";
import { border } from "./tiles";

export const doppelganger: Partial<ActorOptions> = {
  glyph: "Doppelganger",
  name: "doppelganger",
  colour: "white",
  ai: "fly",
  aiData: { active: true },
  obeysGravity: false,
  obeysTiles: false,
  special: "doppelganger",
  maxHp: 1,
  sp: 45,
  experience: 1,
  knockBackChance: 50,
  lore: '"A pained memory reveals itself.\nI recall only my choices.\n  The silent screaming does not stop."\n - Jacques Splintertooth',
};

const heartLore =
  '"I can feel the pulse of my own heart beating to the same rhythm. It controls my very breath in a commanding fashion, suggesting that this is where my true heart lies.\n...There is something, a memory of a small ticking and two silhouettes calling my name over and over."\n - Jacques Splintertooth';

export const fakeHeart: Partial<ActorOptions> = {
  glyph: "BlotHeart",
  name: "huge throbbing heart",
  article: "a",
  colour: "red",
  obeysGravity: false,
  maxHp: Infinity,
  special: "beginFinalBattle",
  lore: heartLore,
  attackRange: 0,
};

export const blotHeart: Partial<ActorOptions> = {
  name: "blot",
  article: "the",
  colour: "blue",
  special: "blotHeart",
  obeysGravity: false,
  maxHp: 385,
  maxHpRange: 425,
  sp: 50,
  spRange: 53,
  dp: 40,
  dpRange: 44,
  experience: 20000,
  attackRange: 3,
  poisonChance: 10,
  bleedChance: 10,
  stunChance: 10,
  lore: heartLore,
};

const blotLore =
  '"Spilling out further than the mind can conceive, like an ever expanding blot of writhing visages that reflect countless potential selves trying to break free from their own shackles. I cannot tell if the self lies within, or if the abomination is simply what becomes of the self when left to anguish in lonesome solitude.\nI see only where my misplaced dreams have led me." \n - Jacques Splintertooth"';

export const blotEye: Partial<ActorOptions> = {
  glyph: "BlotEye",
  name: "blot",
  article: "the",
  colour: "blue",
  special: "blotEye",
  obeysGravity: false,
  maxHp: 666,
  sp: 0,
  dp: 35,
  experience: 10000,
  lore: blotLore,
};

export const blotHead: Partial<TileOptions> = {
  ...border,
  name: "blot",
  article: "the",
  colour: "blue",
  opaque: false,
  xrayOpaque: false,
  lore: blotLore,
};

export const blotHand: Partial<ActorOptions> = {
  name: "blot",
  article: "the",
  colour: "blue",
  special: "blotHand",
  aiData: { active: true },
  obeysGravity: false,
  maxHp: 260,
  maxHpRange: 300,
  sp: 55,
  spRange: 60,
  dp: 36,
  dpRange: 41,
  experience: 5000,
  knockBackChance: 40,
  lore: '"Violently do these hands reach and clasp into the abyss, clutching nothing and perhaps searching and feeling for an exit they are unable to reach. I cannot help but fathom I have been similarly trapped here, lured into a blotted existence by my own machinations."\n - Jacques Splintertooth',
};
