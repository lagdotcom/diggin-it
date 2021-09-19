import { ActorOptions } from "../Actor";

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

// TODO real heart, eye, hands
