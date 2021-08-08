import { RNG } from "rot-js";

import { ActorOptions } from "./Actor";
import {
  busterChampion,
  canandraChampion,
  crimChampion,
  flazzaChampion,
  glovaChampion,
  grundillaChampion,
  kreebusChampion,
  mulnChampion,
  poregonChampion,
  puffusChampion,
  shockwormChampion,
  slobberfinChampion,
  splinterChampion,
  squimpyChampion,
  teldenChampion,
} from "./entities/champions";
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
} from "./entities/enemies";
import {
  adrenaline,
  airGum,
  airTank,
  arrow,
  arsenalArmour,
  artifact,
  axe,
  bluePotion,
  bolas,
  bomb,
  bow,
  bracelet,
  breathTablet,
  busterArmour,
  cherryBomb,
  claws,
  clothes,
  coin,
  coinBag,
  crossbow,
  diamond,
  femur,
  gildedPlate,
  goldBar,
  greenloaf,
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
  ring,
  rock,
  rope,
  ropeBomb,
  serum,
  shovel,
  slabDP,
  slabHP,
  slabSP,
  slingshot,
  smallGem,
  spear,
  specs,
  spelunkersKit,
  squadLeaderGear,
  staple,
  suture,
  taser,
  treasureBox,
  valkyrieSet,
  wingArmour,
} from "./entities/items";
import { ItemOptions } from "./Item";
import { Distribution, pickByWeight } from "./utils";

const common = 10;
const uncommon = 5;
const rare = 2;
const ultraRare = 1;

export interface PickerOptions {
  zone: 0 | 1 | 2;
  fluid: string;
  championChance: number;
}
export type Picker<T> = (options: PickerOptions) => Partial<T>;

const items = {
  adrenaline,
  airGum,
  airTank,
  arrow,
  arsenalArmour,
  artifact,
  axe,
  bluePotion,
  bolas,
  bomb,
  bow,
  bracelet,
  breathTablet,
  busterArmour,
  cherryBomb,
  claws,
  clothes,
  coin,
  coinBag,
  crossbow,
  diamond,
  femur,
  gildedPlate,
  goldBar,
  greenloaf,
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
  ring,
  rock,
  rope,
  ropeBomb,
  serum,
  shovel,
  slabDP,
  slabHP,
  slabSP,
  slingshot,
  smallGem,
  spear,
  specs,
  spelunkersKit,
  squadLeaderGear,
  staple,
  suture,
  taser,
  treasureBox,
  valkyrieSet,
  wingArmour,
};
export type ItemName = keyof typeof items;

const enemies = {
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
export type EnemyName = keyof typeof enemies;

const champions: Record<EnemyName, Partial<ActorOptions>> = {
  buster: busterChampion,
  canandra: canandraChampion,
  crim: crimChampion,
  flazza: flazzaChampion,
  glova: glovaChampion,
  grundilla: grundillaChampion,
  kreebus: kreebusChampion,
  muln: mulnChampion,
  poregon: poregonChampion,
  puffus: puffusChampion,
  shockworm: shockwormChampion,
  slobberfin: slobberfinChampion,
  splinter: splinterChampion,
  squimpy: squimpyChampion,
  telden: teldenChampion,
};

const airEnemiesByZone: Distribution<EnemyName>[] = [
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
    grundilla: ultraRare,
  },
];

const waterEnemiesByZone: Distribution<EnemyName>[] = [
  { puffus: common },
  { puffus: common, shockworm: uncommon },
  { puffus: common, shockworm: common, kreebus: rare },
];

export const getRandomEnemy: Picker<ActorOptions> = ({
  championChance,
  zone,
  fluid,
}) => {
  const name =
    fluid === "~"
      ? pickByWeight(waterEnemiesByZone[zone])
      : pickByWeight(airEnemiesByZone[zone]);

  if (RNG.getPercentage() <= championChance) return champions[name];
  return enemies[name];
};

export const getRandomChampion: Picker<ActorOptions> = ({ zone, fluid }) =>
  getRandomEnemy({ championChance: 100, zone, fluid });

const weaponsByZone: Distribution<ItemName>[] = [
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

export const getRandomWeapon: Picker<ItemOptions> = ({ zone }) =>
  items[pickByWeight(weaponsByZone[zone])];

const armourByZone: Distribution<ItemName>[] = [
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

export const getRandomArmour: Picker<ItemOptions> = ({ zone }) =>
  items[pickByWeight(armourByZone[zone])];

const airWeights: Distribution<ItemName> = {
  breathTablet: common,
  airGum: uncommon,
  airTank: rare,
};

export const getRandomAirItem: Picker<ItemOptions> = () =>
  items[pickByWeight(airWeights)];

const bombWeights: Distribution<ItemName> = {
  bomb: common,
  cherryBomb: rare,
  ropeBomb: rare,
};

export const getRandomBomb: Picker<ItemOptions> = () =>
  items[pickByWeight(bombWeights)];

const foodWeights: Distribution<ItemName> = {
  // TODO scraps: common,
  rations: uncommon,
  medikit: rare,
};

export const getRandomFood: Picker<ItemOptions> = () =>
  items[pickByWeight(foodWeights)];

const climbingWeights: Distribution<ItemName> = {
  staple: common,
  ladder: uncommon,
  rope: uncommon,
};

export const getRandomClimbingTool: Picker<ItemOptions> = () =>
  items[pickByWeight(climbingWeights)];

const cureWeights: Distribution<ItemName> = {
  serum: common,
  adrenaline: common,
  suture: common,
};

export const getRandomCure: Picker<ItemOptions> = () =>
  items[pickByWeight(cureWeights)];

const projectileWeights: Distribution<ItemName> = {
  rock: common,
  mambele: uncommon,
  arrow: common,
  // bolas: uncommon,
};

export const getRandomProjectile: Picker<ItemOptions> = () =>
  items[pickByWeight(projectileWeights)];

const usableWeights: Distribution<ItemName> = {
  bomb: rare,
  ladder: uncommon,
  rations: uncommon,
  airTank: rare,
  rope: uncommon,
  // TODO bolas: rare,
  rock: common,
  staple: common,
  mambele: uncommon,
  arrow: common,
  bluePotion: rare,
  redPotion: rare,
  greenPotion: rare,
  medikit: ultraRare,
  ropeBomb: rare,
  cherryBomb: rare,
  greenloaf: common,
  serum: uncommon,
  adrenaline: uncommon,
  suture: uncommon,
  breathTablet: uncommon,
  airGum: uncommon,
};

export const getRandomUsable: Picker<ItemOptions> = () =>
  items[pickByWeight(usableWeights)];

const supremeWeights: Distribution<ItemName> = {
  bracelet: ultraRare,
  helmet: ultraRare,
  specs: ultraRare,
  // TODO mask: ultraRare,
  // TODO remote: ultraRare,
  // TODO ring: ultraRare,
};

export const getSupremeItem: Picker<ItemOptions> = () =>
  items[pickByWeight(supremeWeights)];

const slabs = [slabHP, slabSP, slabDP];
export const getSlab: Picker<ItemOptions> = ({ zone }) => slabs[zone];

const potionTypes = [bluePotion, greenPotion, redPotion];
export const getRandomPotion: Picker<ItemOptions> = () =>
  RNG.getItem(potionTypes);

const smallTreasures = [coin, smallGem, goldBar];
export const getSmallTreasure: Picker<ItemOptions> = () =>
  RNG.getItem(smallTreasures);

const mediumTreasures = [coinBag, artifact];
export const getMediumTreasure: Picker<ItemOptions> = () =>
  RNG.getItem(mediumTreasures);

const bigTreasures = [treasureBox, diamond];
export const getBigTreasure: Picker<ItemOptions> = () =>
  RNG.getItem(bigTreasures);

const allTreasures = [
  coin,
  smallGem,
  goldBar,
  coinBag,
  artifact,
  treasureBox,
  diamond,
];
export const getRandomTreasure: Picker<ItemOptions> = () =>
  RNG.getItem(allTreasures);
