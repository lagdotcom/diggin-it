import { RNG } from "rot-js";

import { ActorOptions } from "./Actor";
import {
  buster,
  canandra,
  crim,
  flazza,
  glova,
  grundilla,
  kreebus,
  muln,
  poregon,
  puffus,
  shockworm,
  slobberfin,
  splinter,
  squimpy,
  telden,
} from "./actors";
import { ItemOptions } from "./Item";
import {
  airTank,
  arrow,
  arsenalArmour,
  axe,
  bluePotion,
  bolas,
  bomb,
  bow,
  busterArmour,
  cherryBomb,
  claws,
  clothes,
  crossbow,
  femur,
  gildedPlate,
  greenPotion,
  hammer,
  helmet,
  jackhammer,
  ladder,
  laserCutter,
  machete,
  mambele,
  mask,
  medikit,
  militaryMail,
  pickaxe,
  pocketknife,
  powerDrill,
  rations,
  redPotion,
  reinforced,
  remote,
  rock,
  rope,
  ropeBomb,
  shovel,
  slabDP,
  slabHP,
  slabSP,
  slingshot,
  spear,
  specs,
  spelunkersKit,
  squadLeaderGear,
  staple,
  taser,
  valkyrieSet,
  wingArmour,
} from "./items";

const common = 10;
const uncommon = 5;
const rare = 2;
const ultraRare = 1;

type Distribution<T extends string> = Partial<Record<T, number>>;

const enemyTypes = {
  squimpy,
  buster,
  canandra,
  crim,
  flazza,
  glova,
  muln,
  slobberfin,
  splinter,
  telden,
  puffus,
  shockworm,
  kreebus,
  grundilla,
  poregon,
};
type EnemyName = keyof typeof enemyTypes;

// TODO: puffus, shockworm
const enemiesByZone: Distribution<EnemyName>[] = [
  {
    squimpy: uncommon,
    buster: common,
    poregon: rare,
  },
  {
    squimpy: common,
    buster: common,
    canandra: rare,
    crim: rare,
    flazza: uncommon,
    glova: uncommon,
    muln: uncommon,
    slobberfin: ultraRare,
    splinter: uncommon,
    telden: uncommon,
    poregon: common,
  },
  {
    squimpy: uncommon,
    canandra: uncommon,
    crim: uncommon,
    flazza: uncommon,
    glova: common,
    muln: uncommon,
    slobberfin: rare,
    splinter: common,
    telden: uncommon,
    kreebus: rare,
    grundilla: ultraRare,
  },
];

export function getRandomEnemy(zone: number): Partial<ActorOptions> {
  return enemyTypes[RNG.getWeightedValue(enemiesByZone[zone]) as EnemyName];
}

const weaponTypes = {
  pickaxe,
  powerDrill,
  pocketknife,
  slingshot,
  shovel,
  hammer,
  machete,
  claws,
  jackhammer,
  laserCutter,
  axe,
  spear,
  taser,
  femur,
  bow,
  crossbow,
};
type WeaponName = keyof typeof weaponTypes;

const weaponsByZone: Distribution<WeaponName>[] = [
  {
    pickaxe: uncommon,
    pocketknife: common,
    slingshot: uncommon,
    shovel: uncommon,
    hammer: rare,
    femur: common,
  },
  {
    pickaxe: uncommon,
    pocketknife: common,
    shovel: uncommon,
    hammer: rare,
    claws: rare,
    machete: rare,
    axe: rare,
    spear: ultraRare,
    taser: common,
    femur: common,
    bow: rare,
    crossbow: ultraRare,
  },
  {
    pickaxe: uncommon,
    pocketknife: common,
    shovel: uncommon,
    hammer: rare,
    powerDrill: rare,
    machete: rare,
    jackhammer: rare,
    laserCutter: rare,
    axe: rare,
    spear: ultraRare,
    taser: common,
    femur: common,
    bow: rare,
    crossbow: ultraRare,
  },
];

export function getRandomWeapon(zone: number): Partial<ItemOptions> {
  return weaponTypes[RNG.getWeightedValue(weaponsByZone[zone]) as WeaponName];
}

const armourTypes = {
  clothes,
  reinforced,
  spelunkersKit,
  militaryMail,
  squadLeaderGear,
  busterArmour,
  wingArmour,
  gildedPlate,
  valkyrieSet,
  arsenalArmour,
};
type ArmourName = keyof typeof armourTypes;

const armourByZone: Distribution<ArmourName>[] = [
  {
    clothes: uncommon,
    reinforced: common,
    spelunkersKit: uncommon,
    militaryMail: rare,
  },
  {
    spelunkersKit: common,
    militaryMail: common,
    squadLeaderGear: uncommon,
    busterArmour: rare,
    wingArmour: ultraRare,
  },
  {
    busterArmour: uncommon,
    wingArmour: uncommon,
    gildedPlate: uncommon,
    valkyrieSet: rare,
    arsenalArmour: ultraRare,
  },
];

export function getRandomArmour(zone: number): Partial<ItemOptions> {
  return armourTypes[RNG.getWeightedValue(armourByZone[zone]) as ArmourName];
}

const bombTypes = { bomb, cherryBomb, ropeBomb };
type BombName = keyof typeof bombTypes;

const bombWeights: Distribution<BombName> = {
  bomb: common,
  cherryBomb: rare,
  ropeBomb: rare,
};

export function getRandomBomb(zone: number): Partial<ItemOptions> {
  return bombTypes[RNG.getWeightedValue(bombWeights) as BombName];
}

const usableTypes = {
  airTank,
  arrow,
  bluePotion,
  bolas,
  bomb,
  cherryBomb,
  greenPotion,
  helmet,
  ladder,
  mambele,
  mask,
  medikit,
  rations,
  redPotion,
  remote,
  rock,
  rope,
  ropeBomb,
  specs,
  staple,
};
type UsableName = keyof typeof usableTypes;

const usableWeights: Distribution<UsableName> = {
  bomb: rare,
  ladder: uncommon,
  rations: uncommon,
  airTank: rare,
  rope: uncommon,
  specs: ultraRare,
  helmet: uncommon,
  // TODO bolas: rare,
  // TODO rock: common,
  // TODO mask: rare,
  // TODO remote: ultraRare,
  staple: common,
  // TODO mambele: uncommon,
  arrow: common,
  // TODO bluePotion: rare,
  // TODO redPotion: rare,
  // TODO greenPotion: rare,
  medikit: ultraRare,
  ropeBomb: rare,
  cherryBomb: rare,
};

export function getRandomUsable(zone: number): Partial<ItemOptions> {
  return usableTypes[RNG.getWeightedValue(usableWeights) as UsableName];
}

const slabs = [slabHP, slabSP, slabDP];
export function getSlab(zone: number): Partial<ItemOptions> {
  return slabs[zone];
}
