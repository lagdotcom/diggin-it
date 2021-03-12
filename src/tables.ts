import { RNG } from "rot-js";

import {
  buster,
  canandra,
  crim,
  flazza,
  glova,
  muln,
  slobberfin,
  splinter,
  squimpy,
  telden,
} from "./actors";
import {
  armourC,
  armourD,
  armourE,
  armourF,
  armourH,
  armourI,
  arsenalArmour,
  claws,
  clothes,
  hammer,
  jackhammer,
  laserCutter,
  machete,
  pickaxe,
  pocketknife,
  powerDrill,
  reinforced,
  shovel,
  slingshot,
  wingArmour,
} from "./items";

const common = 10;
const uncommon = 5;
const rare = 2;
const ultrarare = 1;

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
};
type EnemyName = keyof typeof enemyTypes;

const enemiesByZone: Distribution<EnemyName>[] = [
  {
    squimpy: uncommon,
    buster: common,
  },
  {
    squimpy: common,
    buster: common,
    canandra: rare,
    crim: rare,
    flazza: uncommon,
    glova: uncommon,
    muln: uncommon,
    slobberfin: ultrarare,
    splinter: uncommon,
    telden: uncommon,
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
  },
];

export function getRandomEnemy(zone: number) {
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
};
type WeaponName = keyof typeof weaponTypes;

const weaponsByZone: Distribution<WeaponName>[] = [
  {
    pickaxe: uncommon,
    pocketknife: common,
    slingshot: uncommon,
    shovel: uncommon,
    hammer: rare,
  },
  {
    pickaxe: uncommon,
    pocketknife: common,
    shovel: uncommon,
    hammer: rare,
    claws: rare,
    machete: rare,
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
  },
];

export function getRandomWeapon(zone: number) {
  return weaponTypes[RNG.getWeightedValue(weaponsByZone[zone]) as WeaponName];
}

const armourTypes = {
  clothes,
  reinforced,
  armourC,
  armourD,
  armourE,
  armourF,
  wingArmour,
  armourH,
  armourI,
  arsenalArmour,
};
type ArmourName = keyof typeof armourTypes;

const armourByZone: Distribution<ArmourName>[] = [
  {
    clothes: uncommon,
    reinforced: common,
    armourC: uncommon,
    armourD: rare,
  },
  {
    armourC: common,
    armourD: common,
    armourE: uncommon,
    armourF: rare,
    wingArmour: ultrarare,
  },
  {
    armourF: uncommon,
    wingArmour: uncommon,
    armourH: uncommon,
    armourI: rare,
    arsenalArmour: ultrarare,
  },
];

export function getRandomArmour(zone: number) {
  return armourTypes[RNG.getWeightedValue(armourByZone[zone]) as ArmourName];
}
