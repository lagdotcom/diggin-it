import { ItemOptions } from "../Item";

const notImplemented = "This isn't implemented yet. Sorry.";

export const pocketwatch: Partial<ItemOptions> = {
  glyph: "Pocketwatch",
  name: "pocketwatch",
  lore: "A constant reminder of why you are here, keep it safe and never give up!",
  use: "memento",
  useArgs: [3],
  charges: 1,
};
export const brokenPocketwatch: Partial<ItemOptions> = {
  glyph: "BrokenPocketwatch",
  name: "broken pocketwatch",
  lore: "A shattered image of what used to be and what could have been. Vague shapes stare back at you through a cracked lens, unrecognizable.",
};

// TODO mask
export const mask: Partial<ItemOptions> = {
  glyph: "GasMask",
  name: "gas mask",
  lore: "An absolute must in nearly any deeper dig or cave expedition, gas masks will prevent their users from asphyxiating or succumbing to the effects of dizziness and other symptoms of high toxicity gas. If the face shield or lens is damaged in any way, immediately discontinue use and get out of the gas affected area as soon as possible.",
};

export const pickaxe: Partial<ItemOptions> = {
  glyph: "Pickaxe",
  name: "pickaxe",
  slot: "weapon",
  bonus: { sp: 26 },
  bleedChance: 15,
  lore: "A digger's best friend, its function as a mining and exploration tool as well as a weapon is not to be underestimated. Many have abandoned them in recent times as the sparks from mining have a tendency to ignite gas, creating explosions and doing extreme harm to people and history alike.",
};

export const powerDrill: Partial<ItemOptions> = {
  glyph: "PowerDrill",
  name: "power drill",
  slot: "weapon",
  bonus: { sp: 42 },
  bleedChance: 30,
  knockBackChance: 20,
  lore: "Originally only used at quarries to grind down harder materials, the portable power drill became a staple of deep digs for its ability to quickly bore through almost anything. A flaw in the manufacturing process left many models with a pension for jamming, and it's a flaw that has yet to be addressed.",
};

export const pocketknife: Partial<ItemOptions> = {
  glyph: "PocketKnife",
  name: "pocket knife",
  namePlural: "pocket knives",
  slot: "weapon",
  bonus: { sp: 15 },
  bleedChance: 5,
  lore: "Good at opening cans, cutting strings and all manner of small but useful things, a pocket knife might not be much to look at or terribly handy in a fight, but is always a bread and butter survival tool that no explorer should leave home without.",
};

export const slingshot: Partial<ItemOptions> = {
  glyph: "Slingshot",
  name: "slingshot",
  slot: "weapon",
  bonus: { sp: 10 },
  charges: Infinity,
  use: "launcher",
  useAmmo: "Rock",
  useArgs: [3, 18],
  stunChance: 5,
  lore: "This simple tool may seem like a children's toy, but is actually quite handy for protection against small creatures. An easy tool to make as well, requiring only elastic bands and a well carved stick, fables tell of a legendary prankster whose sling never broke, a fabled marksman among gods until he tragically put his own eye out.",
};

export const shovel: Partial<ItemOptions> = {
  glyph: "Shovel",
  name: "shovel",
  slot: "weapon",
  bonus: { sp: 22 },
  stunChance: 10,
  knockBackChance: 5,
  lore: "Can you dig it? This simple question has been the start of many excavations and great adventures, and so too is it the start of yours!",
};

export const hammer: Partial<ItemOptions> = {
  glyph: "Hammer",
  name: "hammer",
  slot: "weapon",
  bonus: { sp: 28 },
  stunChance: 20,
  knockBackChance: 25,
  lore: "Every swing of the trusty hammer is guaranteed to be a smashing success, or so the guarantee says. While these are manufactured for stubborn rocks, they can also be handy for stubborn creatures and other dangers.",
};

export const machete: Partial<ItemOptions> = {
  glyph: "Machete",
  name: "machete",
  slot: "weapon",
  bonus: { sp: 35 },
  bleedChance: 35,
  lore: "A choice item of bandits and intrepid explorers alike for entirely different reasons. Its large blade is thorough at sweeping through thick foliage and just as good at keeping one safe from the myriad dangers a deep cavern can hold.",
};

export const claws: Partial<ItemOptions> = {
  glyph: "Claws",
  name: "digging claws",
  article: "some",
  plural: true,
  slot: "weapon",
  bonus: { sp: 32 },
  bleedChance: 25,
  lore: "After studying how Muln moved underground for over a decade, the Finelli & Sons corporation were able to utilize what they learned and produce digging claws. Surprisingly practical for quickly maneuvering through soft dirt, they also serve for self-protection should the need arise.",
};

export const jackhammer: Partial<ItemOptions> = {
  glyph: "Jackhammer",
  name: "jackhammer",
  slot: "weapon",
  bonus: { sp: 45 },
  stunChance: 35,
  knockBackChance: 50,
  lore: "Outlawed in most mining sites due to the severe noise deafening many of its users, a handful still turn up where you least expect them. Jackhammers are nothing if not effective and are capable of chewing through the hardiest of things with ease, just make sure to bring earplugs.",
};

export const laserCutter: Partial<ItemOptions> = {
  glyph: "LaserCutter",
  name: "laser cutter",
  slot: "weapon",
  // TODO: explode chance
  bonus: { sp: 50 },
  poisonChance: 20,
  lore: "The ultimate in rock-cutting and digging technology, they were never actually released to market due to the danger its faulty battery presented. In seven out of every ten tests, the cutter was shown to explode after repeated use rendering them highly dangerous. How one found its way here is almost more mysterious than the depths themselves.",
};

export const clothes: Partial<ItemOptions> = {
  glyph: "ArmourA",
  name: "common clothes",
  article: "some",
  plural: true,
  slot: "armour",
  bonus: { maxHp: 5, dp: 8 },
  lore: "Tailored to be hardy for long hikes and short digs, this basic attire allows for very freeform movement and has tons of breathing room making it an ideal take along for any trip.",
};

export const reinforced: Partial<ItemOptions> = {
  glyph: "ArmourB",
  name: "reinforced attire",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 8, dp: 12 },
  lore: "Longer hikes and deeper digs require safer gear, but in a strange twist of fate these reinforced rags were picked up by fashionable youths and now sell for exorbitant sums of money.",
};

export const spelunkersKit: Partial<ItemOptions> = {
  glyph: "ArmourC",
  name: "spelunker's kit",
  slot: "armour",
  bonus: { maxHp: 12, dp: 15 },
  lore: "Lightly armoured and generally the preferred kit for the serious explorer, a common Spelunker's Kit will protect from small slips, general hazards and minor harmful substances.",
};

export const militaryMail: Partial<ItemOptions> = {
  glyph: "ArmourD",
  name: "military mail",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 15, dp: 16 },
  lore: "Usually only issued to military personnel, various pieces can still be rented for exceptionally dangerous expeditions. The design is slightly unwieldy for exploring, but the medium weight and thick plates make it decent protection from all manner of harm.",
};

export const squadLeaderGear: Partial<ItemOptions> = {
  glyph: "ArmourE",
  name: "squad leader's gear",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 18, dp: 18 },
  lore: "A strange find, as squad leader military gear is never used for expeditions and tends to only be found on the front lines during times of war or during military operations.\nPerhaps a stranded squadron once holed up in these deep tunnels.",
};

export const busterArmour: Partial<ItemOptions> = {
  glyph: "ArmourF",
  name: "buster armour",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 21, dp: 18 },
  lore: "Named after the loveable and obnoxious frog like creatures that seem to turn up everywhere, the Buster Armour is actually a relic from a nameless warrior race. Expert historians theorize the armour was made for rushing head first into battle, much like a feral Buster does when threatened.",
};

export const wingArmour: Partial<ItemOptions> = {
  glyph: "ArmourG",
  name: "wing armour",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 22, dp: 19 },
  lore: "Once used by a proud and nameless warrior race from forgotten times, it earned its nickname as those entering battles were said to move with the swiftness of a soaring bird. These armours are rarely excavated, and often not in a usable condition, a rare find indeed!",
};

export const gildedPlate: Partial<ItemOptions> = {
  glyph: "ArmourH",
  name: "gilded plate",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 24, dp: 20 },
  lore: "Associated with ancient royalty and long forgotten civilizations, these plates are extremely rare and were only given to a King or Queen's most loyal and trusted guard. To wear these plates was to willingly be ready to give your life at any moment or reason for your people.",
};

export const valkyrieSet: Partial<ItemOptions> = {
  glyph: "ArmourI",
  name: "valkyrie set",
  slot: "armour",
  bonus: { maxHp: 25, dp: 22 },
  lore: "Among the most elite of elite warriors from the time of ancient rulers were those dubbed as Valkyries. A set of personal guards hand picked by a King or Queen from among the gilded elite based on combat prowess, it is said that no Valkyrie was ever defeated in combat.",
};

export const arsenalArmour: Partial<ItemOptions> = {
  glyph: "ArmourJ",
  name: "arsenal armour",
  article: "some",
  slot: "armour",
  bonus: { maxHp: 30, dp: 25 },
  // TODO: slows user?
  lore: "Heavy machine armour made for Lessonus military operations. Its plating and arsenal of weaponry makes movement unwieldly, but leaves its user highly protected from most manner of harm.\n...You can't help but wonder how or why it got down here, though.",
};

export const bomb: Partial<ItemOptions> = {
  glyph: "Bomb",
  name: "bomb",
  charges: 1,
  use: "bomb",
  useArgs: [4, -1, -1, 3, 3, 30],
  lore: "Powerful, effective, extremely dangerous. Capable of clearing vast swaths of dirt, rock and metals like but has a high chance to leave rubble in its wake, bombs are generally not used at dig sites any more due to their pension for causing cave-ins and irreversible damage. Use great caution and safe thinking when using these explosives.",
};

export const cherryBomb: Partial<ItemOptions> = {
  glyph: "CherryBomb",
  name: "cherry bomb",
  charges: 1,
  use: "bomb",
  useArgs: [6, 0, 0, 1, 1, 15],
  // TODO: throwable
  lore: "Tiny bombs with long fuses and small blasts, Cherry Bombs are rarely, if ever used for digging. A well placed or thrown Cherry Bomb is often enough to frighten or harm small creatures, but it's small blast radius and unusually long fuse make it highly impractical as little more than a prankster's tool.",
};

// TODO ropeBomb
export const ropeBomb: Partial<ItemOptions> = {
  glyph: "RopeBomb",
  name: "rope bomb",
  charges: 1,
  lore: notImplemented,
};

export const rope: Partial<ItemOptions> = {
  glyph: "Rope",
  name: "rope",
  use: "rope",
  charges: 1,
  useArgs: [4],
  lore: "Made for always letting you down, but not in a bad way.",
};

export const ladder: Partial<ItemOptions> = {
  glyph: "Ladder",
  name: "ladder",
  use: "ladder",
  charges: 1,
  useArgs: [4],
  lore: "Always here to lift you up when you need it most!",
};

export const rations: Partial<ItemOptions> = {
  glyph: "Rations",
  name: "Lessonus ration",
  use: "heal",
  charges: 1,
  useArgs: [20, 30],
  lore: "An abundance of these made their way into circulation during tension-filled times between Lessonus and Ziyadma, and fortunately they never became the staple food people expected them to be. Comes in many middling flavors like Bean Soup, Tofurkey, Veggie Bowl and Chocolate Beef. It'll do in a pinch or for a quick pick me up.",
};

export const bracelet: Partial<ItemOptions> = {
  glyph: "Bracelet",
  name: "Melogrini bracelet",
  holdBonus: { sp: 5, dp: -5 },
  lore: "A dignified mark of Melogrini trappers, this clasp is a symbol of strength and strong character. How this clasp came to rest miles below Lessonus soil remains a great mystery, as Melogrin has mysteriously kept it's borders closed to outsiders for decades. ...Perhaps, long ago, the shy and cautious Melogrini once inhabited a far greater portion of Gantella.",
};

export const airTank: Partial<ItemOptions> = {
  glyph: "Tank",
  name: "air tank",
  article: "an",
  use: "air",
  charges: 1,
  useArgs: [90, 100],
  lore: "Underground air across Gantella is notorious for noxious gases and densely packed spaces where air barely creeps through. Spare oxygen canisters are a must for anyone looking to dive into even the most shallow of caverns.",
};

export const specs: Partial<ItemOptions> = {
  glyph: "Specs",
  name: "X-ray Specs",
  article: "a pair of",
  plural: true,
  lore: "Using Lessonian technology that traces the density and material of the environment, X-Ray Specs are the premiere tech of the last century. Highly sought after, these specs have the ability to show you what you're about to come across well before your pickaxe so much as scrapes a surface. Batteries included!",
  slot: "face",
  bonus: { xrayVision: 1 },
};

export const helmet: Partial<ItemOptions> = {
  glyph: "Helmet",
  name: "Miner's helmet",
  lore: "Patented during the great gold rush by Wilton B. Miner and named after his legacy, they vastly improved the safety of digs by providing protection from falling rocks as well as providing additional light in dark corridors and deep expanses.",
  slot: "head",
  bonus: { vision: 2, crushResistance: 0.5 },
};

export const rock: Partial<ItemOptions> = {
  glyph: "Rock",
  name: "rock",
  use: "throw",
  useArgs: [3, 3],
  stunChance: 1,
  charges: 1,
  lore: "Made for throwing, skipping, looking at, having lonely existential conversations with, and so much more!\n...Not a good meal, though.",
};

export const bolas: Partial<ItemOptions> = {
  glyph: "Bolas",
  name: "bolas",
  namePlural: "bolases",
  use: "throw",
  useArgs: [3, 1],
  stunChance: 100,
  charges: 1,
  lore: "Initially used by hunters to ensnare game, the Bolas persisted as a go-to for those with a skilled hand as a tool of the trade in both exploration and digging. Ensnaring creatures on the attack can be the difference between life and death, but should be used with caution and care all the same.",
};

export const coin: Partial<ItemOptions> = {
  glyph: "Coin",
  name: "coin",
  colour: "yellow",
  treasure: 50,
  lore: "Dropped out of pocket by a wayward adventurer, there's nothing too special about it, a lucky find and nothing more.",
};
export const goldBar: Partial<ItemOptions> = {
  glyph: "GoldBar",
  name: "gold bar",
  colour: "yellow",
  treasure: 100,
  lore: "When first dug out by early explorers, gold became a feverish commodity the world over. Used as a sign of wealth, dignity, and beauty it sent many young travelers abroad in search of glory and grandeur and sent far more to their own demise. These days a gold bar is barely worth a small grocery run, but it's money all the same.",
};
export const smallGem: Partial<ItemOptions> = {
  glyph: "Gem",
  name: "small gem",
  colour: "blue",
  treasure: 200,
  lore: "Seen on brooches, bracelets and jewellery the world over, these beautiful glistening gemstones make for wonderful gifts and are often exchanged amongst partners and significant others when making vows and promises.",
};
export const coinBag: Partial<ItemOptions> = {
  glyph: "CoinBag",
  name: "coin bag",
  colour: "yellow",
  treasure: 300,
  lore: "While not uncommon to bring a satchel for storing valuables, it's surprisingly common that these bags are used for storing currency. Unauthorized looters and ill prepared travelers often bring these in hopes of fast money and easy riches.",
};
export const artifact: Partial<ItemOptions> = {
  glyph: "Artifact",
  name: "artifact",
  colour: "red",
  treasure: 500,
  lore: "Mysterious artifacts that have cropped up through many points in history, legitimate ones have become quite valuable. A vast counterfeit market has made sceptics of many folks that they were ever real to begin with, and carbon dating has only deepened the mystery as no two artifacts appear to be from the same era.",
};
export const treasureBox: Partial<ItemOptions> = {
  glyph: "TreasureBox",
  name: "treasure box",
  colour: "brown",
  treasure: 800,
  lore: "Whether left behind and buried by earlier intrepid explorers or relics left by forgotten civilizations, whatever's inside must surely be of value.",
};
export const diamond: Partial<ItemOptions> = {
  glyph: "Diamond",
  name: "diamond",
  colour: "pink",
  treasure: 1000,
  lore: "The rarest of materials, diamonds are only found in the deepest trenches Gantella can muster. Raw diamond is extremely sought after by many explorers looking to turn their lot in life around, and just as sought after by those looking to make an extravagant statement about the size of their fortune.",
};
export const fragment: Partial<ItemOptions> = {
  glyph: "Fragment",
  name: "wisher's fragment",
  colour: "green",
  treasure: 5000,
  lore: "\"Unbelievable, it's actually real! What I've worked so hard for is finally within reach.\n...Can it truly grant wishes, though?\"\n- Jacques Splintertooth",
};

export const rags: Partial<ItemOptions> = {
  glyph: "Rags",
  name: "plain rags",
  article: "some",
  plural: true,
  slot: "armour",
  bonus: { maxHp: 0, dp: 5 },
  lore: "You've been wearing these for a bit too long and it's starting to show; these old rags are barely protecting you from the heat and cold, let alone whatever may lurk around the corner.",
};
export const pointedStick: Partial<ItemOptions> = {
  glyph: "Stick",
  name: "pointed stick",
  slot: "weapon",
  bonus: { sp: 12 },
  stunChance: 1,
  bleedChance: 1,
  knockBackChance: 1,
  lore: "You have to defend yourself somehow, yet why you came armed with only a stick is a mystery even to yourself.",
};

// TODO remote
export const remote: Partial<ItemOptions> = {
  glyph: "Remote",
  name: "remote",
  charges: 1,
  lore: notImplemented,
};

export const staple: Partial<ItemOptions> = {
  glyph: "Staple",
  name: "staple",
  use: "staple",
  charges: 1,
  lore: "Often used as a quick leg up when a ladder isn't handy, Wall Staples allow for safe traversal up and down at user's leisure. A rather odd invention, as securing these massive steel staples can be quite a chore, but no adventurer's kit would be complete without a few.",
};

export const mambele: Partial<ItemOptions> = {
  glyph: "Mambele",
  name: "mambele",
  use: "throw",
  useArgs: [3, 23], // TODO: range?
  charges: 1,
  lore: "A hooked weapon that's equal parts axe and knife, Mambeles are usually found native to islander and Melogrin culture as they share a common ancestry. Finding one in the deep caverns of Lessonus is at least a little baffling, but all the same, with a good throwing arm a Mambele can do devastating damage and protect against even the most vicious predators.",
};

export const slabHP: Partial<ItemOptions> = {
  glyph: "RedSlab",
  name: "ancient slab of vigor",
  article: "an",
  holdBonus: { maxHp: 10, championChance: 5 },
  lore: '"The slab beckons as I feel words pulse in my mind as fleeting as sparks at night. I know not what it is, only that it calls to me with promises of renewed energy and hidden knowledge." - Jacques Splintertooth',
};
export const slabSP: Partial<ItemOptions> = {
  glyph: "GreenSlab",
  name: "ancient slab of power",
  article: "an",
  holdBonus: { sp: 5, championChance: 5 },
  lore: '"The slab beckons as I feel a tingling course through my veins as swift as a powerful breeze. I know not what it is, only that it calls to me with promises of renewed strength and hidden knowledge." - Jacques Splintertooth',
};
export const slabDP: Partial<ItemOptions> = {
  glyph: "BlueSlab",
  name: "ancient slab of grit",
  article: "an",
  holdBonus: { dp: 5, championChance: 10 },
  lore: '"The slab beckons as I feel a frigid chill like the touch of a frozen hand. I know not what it is, only that it calls to me with promises of renewed fortitude and hidden knowledge." - Jacques Splintertooth',
};

// TODO vanish ring
export const ring: Partial<ItemOptions> = {
  glyph: "Ring",
  name: "vanish ring",
  lore: notImplemented,
};

export const arrow: Partial<ItemOptions> = {
  glyph: "Arrow",
  name: "arrow",
  use: "throw",
  article: "an",
  useArgs: [3, 15],
  charges: 1,
  lore: "Arrows manufactured for use with crossbows and longbows, skilled hands and keen eyes can even throw these by themselves, though it's not recommended.",
};

export const blowdart: Partial<ItemOptions> = {
  glyph: "Blowdart",
  name: "blow dart",
  use: "throw",
  useArgs: [3, 10],
  poisonChance: 10,
  charges: 1,
  lore: "Darts crafted by hunters, Poregons, and ancient native tribes alike. Their small size makes them very easy to carry in large quantities, and a puncture wound leaves nary a trace of evidence.",
};

export const bluePotion: Partial<ItemOptions> = {
  glyph: "BluePotion",
  name: "blue liquid",
  charges: 1,
  lore: "A mysterious blue liquid. The bottle is cool to the touch and uncorking it reveals a strong, musky scent.",
  use: "gainDP",
  useArgs: [1, 3],
};

export const redPotion: Partial<ItemOptions> = {
  glyph: "RedPotion",
  name: "red liquid",
  charges: 1,
  lore: "A mysterious red liquid. The bottle is warm to the touch and uncorking it reveals an alcoholic cinnamon scent.",
  use: "gainHP",
  useArgs: [5, 10],
};

export const greenPotion: Partial<ItemOptions> = {
  glyph: "GreenPotion",
  name: "green liquid",
  charges: 1,
  use: "gainSP",
  useArgs: [1, 3],
  lore: "A mysterious green liquid. The bottle feels oddly heavy and uncorking it reveals a powerful citrussy scent.",
};

export const medikit: Partial<ItemOptions> = {
  glyph: "Medikit",
  name: "emergency kit",
  use: "heal",
  charges: 1,
  useArgs: [50, 60],
  lore: "Field medical kit provided by the Green Clover Medical Group. No hospital or warzone is left ungraced by it's presence, and most homes contain at least one of these for extreme emergencies.",
};

export const axe: Partial<ItemOptions> = {
  glyph: "Axe",
  name: "axe",
  slot: "weapon",
  // TODO reach: 2,
  bonus: { sp: 30 },
  bleedChance: 25,
  knockBackChance: 15,
  lore: "An axe appearing of Melogrini make, but is actually just an imitation of their craftsmanship. Make no mistake, imitation or not it's sharp edge and sturdy craftsmanship makes it a worthwhile tool for defence, survival, and exploration.",
};

export const spear: Partial<ItemOptions> = {
  glyph: "Spear",
  name: "spear",
  slot: "weapon",
  // TODO reach: 3,
  bonus: { sp: 27 },
  bleedChance: 10,
  knockBackChance: 10,
  lore: "Simple hunting spear, effective for both fishing and defence. It's long reach and sharp edge lends itself to slightly longer range fighting and can keep it's user safer from close range harm.",
};

export const taser: Partial<ItemOptions> = {
  glyph: "Taser",
  name: "taser",
  slot: "weapon",
  // TODO zapSelfInWater: true,
  bonus: { sp: 25 },
  stunChance: 35,
  lore: "Tools for self defence against predators and thieves alike, a simple taser delivers enough of a shock to stun most targets into submission, allowing for an easier escape. This version appears modified to deliver lethal voltage.",
};

export const femur: Partial<ItemOptions> = {
  glyph: "Bone",
  name: "femur",
  slot: "weapon",
  bonus: { sp: 20 },
  stunChance: 5,
  knockBackChance: 35,
  lore: "Sturdy bone fashioned into a makeshift club. It may not be the most practical weapon, but it could be used in a pinch. Strangely, it seems impossible to make out who or what this bone once belonged to.",
};

export const bow: Partial<ItemOptions> = {
  glyph: "Bow",
  name: "bow",
  slot: "weapon",
  bonus: { sp: 10 },
  charges: Infinity,
  use: "launcher",
  useAmmo: "Arrow",
  useArgs: [5, 32],
  bleedChance: 10,
  lore: "A typical hunting bow used widely across the world, it's string fashioned from typical linen or hemp and it's wood polished to a fine sheen. A true marksman needs no other partner, whether for combat, defence or sport a good sturdy bow will see to all your needs.",
};

export const crossbow: Partial<ItemOptions> = {
  glyph: "Crossbow",
  name: "crossbow",
  slot: "weapon",
  bonus: { sp: 10 },
  charges: Infinity,
  use: "launcher",
  useAmmo: "Arrow",
  useArgs: [3, 36],
  bleedChance: 15,
  lore: "Quicker aiming and with far more kickback and power than a typical bow, the crossbow is only for a true hunting enthusiast. Outlawed in many regions and countries for being too close to an actual military weapon, these tend to be quite hard to come by and are a hot commodity on various black markets.",
};

export const greenloaf: Partial<ItemOptions> = {
  glyph: "Greenloaf",
  name: "stale greenloaf",
  use: "heal",
  charges: 1,
  useArgs: [10, 15],
  lore: "Greenloaf bread is native to Lessonus and created with local wheat and various other ingredients. Most notable for it's rather hard texture and excellent flavor, Greenloaf should be eaten and enjoyed within one week of baking, lest it go stale and stiff as a board.",
};

export const serum: Partial<ItemOptions> = {
  glyph: "Serum",
  name: "serum",
  use: "curePoison",
  charges: 1,
  lore: "Medical serum capable of purging the most potent of poisons. A notable achievement in the medical field, this cure-all was a massive breakthrough after renowned trapper Meridith Grynn was able to ensnare an Abyssal Canandra and collect it's venom unharmed.",
};

export const adrenaline: Partial<ItemOptions> = {
  glyph: "Adrenaline",
  name: "adrenaline",
  article: "a vial of",
  use: "cureStun",
  charges: 1,
  lore: "Supposedly strong enough to raise the dead, a small dose of adrenaline will get even the stiffest joints back in motion. Used specifically in the medical profession, a number of adrenaline addicts manage to circulate a rather large supply through back alley black market outfits. Adrenaline addiction has become increasingly common in athletic events and physically taxing labour.",
};

export const suture: Partial<ItemOptions> = {
  glyph: "Suture",
  name: "suture",
  use: "cureBleed",
  charges: 1,
  lore: '"No suture? Suit yourself!"\nMade for quick stitching of deep wounds and stopping bleeding.',
};

export const breathTablet: Partial<ItemOptions> = {
  glyph: "BreathTablet",
  name: "breath mint",
  use: "air",
  charges: 1,
  useArgs: [20, 25],
  lore: "Not to be confused with a breath tablet, these ingestible mints contain a unique formula to improve breathing and instantly clear sinus ailments. Perfect for the intrepid hiker and budding explorer.",
};

export const airGum: Partial<ItemOptions> = {
  glyph: "AirGum",
  name: "air gum",
  article: "a pack of",
  use: "air",
  charges: 1,
  useArgs: [40, 50],
  lore: "A long lasting chew with a minty after taste! It's like chewing a tooth-paste that helps you breathe better.",
};

export const blowgun: Partial<ItemOptions> = {
  glyph: "Blowgun",
  name: "blowdart gun",
  slot: "weapon",
  bonus: { sp: 5 },
  charges: Infinity,
  use: "launcher",
  useAmmo: "Blowdart",
  useArgs: [3, 25],
  poisonChance: 30,
  lore: "A tool of the poregons and ancient native hunters driven from their homes during the Great Invasion. Blow Darts are a handy tool in the hands of assassins and hunters alike, utilizing sharply tipped darts coated in various animal venoms, ranging from those that cause minor numbness to those that can kill in an instant.",
};
