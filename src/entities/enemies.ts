import { ActorOptions } from "../Actor";

export const squimpy: Partial<ActorOptions> = {
  glyph: "Squimpy",
  name: "squimpy",
  colour: "yellow",
  ai: "wander",
  maxHp: 24,
  maxHpRange: 28,
  sp: 15,
  spRange: 18,
  dp: 4,
  dpRange: 7,
  attackRange: 2,
  experience: 80,
  lore: "Born with only a single eye to see and a mouth to eat, the Squimpy is not to be confused with it's eldest evolutionary relative, the Fachan. While generally harmless, if agitated or provoked the Squimpy is known for it's surprisingly potent and harmful saliva that is capable of leaving severe scarring akin to that of a burn.",
};
export const buster: Partial<ActorOptions> = {
  glyph: "Buster",
  name: "buster",
  colour: "pink",
  ai: "wander",
  maxHp: 20,
  maxHpRange: 25,
  sp: 18,
  spRange: 20,
  dp: 6,
  dpRange: 9,
  experience: 100,
  stunChance: 5,
  lore: "These toadish creatures can be found at every corner of Gantella, and yet this unique variant is native to the Lessonus region. A popular domesticated pet, the strange swirl adorning their head is not hair, but a small tail like appendage that wags when stimulated. In the wild, a Buster earns it's name by growing to the size of a large dog and throwing it's own weight relentlessly at anything it sees as a threat.",
};
export const canandra: Partial<ActorOptions> = {
  glyph: "Canandra",
  name: "canandra",
  colour: "orange",
  ai: "wander",
  canClimb: true,
  maxHp: 90,
  maxHpRange: 100,
  sp: 35,
  spRange: 38,
  dp: 22,
  dpRange: 26,
  experience: 800,
  poisonChance: 30,
  lore: "Canandras sport the fifth deadliest venom in the world and a constricting grip that few escape from and fewer live to tell tales about. If you're voyaging into hot, dry areas, always be aware of your surroundings and listen for the distinctive clacking of their quills and the sound of their territorial hiss. If bitten, seek medical attention immediately.",
};
export const crim: Partial<ActorOptions> = {
  glyph: "Crim",
  name: "crim",
  colour: "red",
  ai: "wander",
  maxHp: 85,
  maxHpRange: 95,
  sp: 17,
  spRange: 21,
  dp: 28,
  dpRange: 30,
  experience: 450,
  lore: 'Also known as the "Screaming Shells" due to their unsettling facial structure, Crims are self oriented creatures. They come out rarely to eat and then spend weeks hibernating within their shell while their food slowly digests. Shelled Crims are on the verge of extinction due to the fact their meat is treated as a rare food delicacy, and it is best to leave them unprovoked.',
};
export const flazza: Partial<ActorOptions> = {
  glyph: "Flazza",
  name: "flazza",
  colour: "cyan",
  ai: "fly",
  obeysGravity: false,
  maxHp: 35,
  maxHpRange: 40,
  sp: 22,
  spRange: 26,
  dp: 18,
  dpRange: 21,
  experience: 300,
  stunChance: 15,
  knockBackChance: 10,
  lore: 'Tentacled flying menaces that love the dark, Flazzas are known as the "Terror Flies of the Deep". They capture any prey smaller than them by dive bombing from above and attempting to break bones or outright kill their prey on the spot, should that fail they have a nasty tendency to envelop their victim within their carnivorous tentacles. They have an aversion to bright lights and thusly keep their homes far from that of modern civilization.',
};
export const glova: Partial<ActorOptions> = {
  glyph: "Glova",
  name: "glova",
  colour: "white",
  ai: "wander",
  canClimb: true,
  maxHp: 18,
  maxHpRange: 23,
  sp: 20,
  spRange: 22,
  dp: 15,
  dpRange: 19,
  experience: 80,
  destroyChance: 1,
  lore: "Comprised of bubbly, acidic slime-like globules, Glovas are cave-dwelling omnivores. Their translucent bodies envelop and break down most materials, allowing them to feed on moss, small animals, and unsuspecting lost wanderers.",
};
export const muln: Partial<ActorOptions> = {
  glyph: "Muln",
  name: "muln",
  colour: "blue",
  ai: "wander",
  maxHp: 48,
  maxHpRange: 55,
  sp: 22,
  spRange: 26,
  dp: 20,
  dpRange: 24,
  experience: 650,
  bleedChance: 10,
  knockBackChance: 15,
  lore: "Burrowing menaces responsible for missing crops, livestock and occasionally children, Muln often cause extreme agricultural grief and property damages in many areas surrounded by mountains or cave systems. If faced with a Muln infestation, it's recommended to evacuate immediately. Once you are somewhere safe, call professional trappers to capture and relocate them to more natural habitats.",
};
export const slobberfin: Partial<ActorOptions> = {
  glyph: "Slobberfin",
  name: "slobberfin",
  colour: "turquoise",
  ai: "wander",
  maxHp: 70,
  maxHpRange: 80,
  sp: 38,
  spRange: 42,
  dp: 24,
  dpRange: 28,
  experience: 700,
  bleedChance: 30,
  lore: "Deadly creatures capable of treading both water and land, Slobberfins are the number one cause of animal related deaths across Gantella. Highly territorial and adaptable creatures, the only thing standing between them and becoming apex predators is their extreme near sightedness and pension for living in cool and dark locales.",
};
export const splinter: Partial<ActorOptions> = {
  glyph: "Splinter",
  name: "splinter",
  colour: "brown",
  ai: "wander",
  canClimb: true,
  maxHp: 45,
  maxHpRange: 50,
  sp: 26,
  spRange: 29,
  dp: 22,
  dpRange: 26,
  attackRange: 3,
  experience: 500,
  stunChance: 20,
  knockBackChance: 10,
  lore: "According to religious texts recovered from Dwelvarkian ruins, Splinters are the remains of the largest tree to have ever existed, and a source from which the Dwelvarkians themselves spurned. During a war that lasted through the birth and death of the first sun to hang in the sky, a greedy and selfish race cut the tree down, taking it's limbs for themselves and fashioning living dolls in their image. The Splinters came not long after, seeking revenge and entangling unfortunate victims within their roots.",
};
export const telden: Partial<ActorOptions> = {
  glyph: "Telden",
  name: "telden",
  colour: "red",
  ai: "fly",
  obeysGravity: false,
  maxHp: 40,
  maxHpRange: 43,
  sp: 23,
  spRange: 26,
  dp: 15,
  dpRange: 19,
  attackRange: 2,
  experience: 500,
  poisonChance: 15,
  finalGasChance: 100,
  lore: "Heated debates about whether Teldens originated from mammals or annelids still permeate many historical and evolutionary discussions around this bizarre creature. Regardless of which side you take, the Telden certainly won't take yours. A Telden's deadly tongue and hideous breath leave behind an odour so noxious that it is considered to be a deadly gas.",
};
export const floater: Partial<ActorOptions> = {
  glyph: "InkFloater",
  name: "floater",
  colour: "darkblue",
  ai: "fly",
  obeysGravity: false,
  inky: true,
  maxHp: 75,
  maxHpRange: 85,
  sp: 32,
  spRange: 35,
  dp: 23,
  dpRange: 25,
  attackRange: 2,
  experience: 800,
  lore: "\"If this is not a trick or hallucination of oxygen deprived madness, this conjoined face seems to almost lament it's state of being. I must stay clear of these foul things, the stench is unfathomable and I can't be sure its touch isn't fatal in some way.\"\n- Jacques Splintertooth",
};
export const drifter: Partial<ActorOptions> = {
  glyph: "InkDrifter",
  name: "drifter",
  colour: "darkblue",
  ai: "wander",
  inky: true,
  canClimb: true,
  maxHp: 80,
  maxHpRange: 90,
  sp: 32,
  spRange: 35,
  dp: 25,
  dpRange: 28,
  knockBackChance: 20,
  experience: 800,
  lore: "\"I don't understand how, but this strange abomination drifts and glides about like a feather, mimicking movements of human and beast alike. It unsettles me greatly to know things like this exist in the world, but I've come too far to give up now!\"\n- Jacques Splintertooth",
};
export const theInk: Partial<ActorOptions> = {
  glyph: "Ink1",
  name: "ink",
  article: "the",
  colour: "purple",
  inky: true,
  obeysGravity: false,
  maxHp: 200,
  maxHpRange: 220,
  sp: 45,
  spRange: 48,
  dp: 28,
  dpRange: 32,
  knockBackChance: 15,
  experience: 3000,
  teleportThreshold: 30,
  lore: "\"Whatever this hideous creature is, it's far from cognizant of what's occurring around it. Strange beasts and horrifying grotesques spurn forth endlessly from this flying yolk of terror, as if ink dripping on tarnished paper. I must report this finding, I must know why it is here, and I know I must be closer than ever to the Wisher's Fragment.\"\n- Jacques Splintertooth",
};

export const puffus: Partial<ActorOptions> = {
  // TODO inflated form
  glyph: "Puffus",
  name: "puffus",
  colour: "blue",
  ai: "wander",
  needsWater: true,
  maxHp: 39,
  maxHpRange: 47,
  sp: 21,
  spRange: 24,
  dp: 10,
  dpRange: 13,
  experience: 210,
  stunChance: 10,
  lore: "Native to deep and cool waters, Puffus are largely content tend to feed off various algaes and small microscopic fish. When threatened or attacked they will swell to over double their initial size, exposing highly painful barbs that can leave tingling and numbness in the affected wound for weeks.",
};

export const shockworm: Partial<ActorOptions> = {
  glyph: "Shockworm",
  name: "shockworm",
  colour: "green",
  ai: "fly",
  needsWater: true,
  maxHp: 56,
  maxHpRange: 62,
  sp: 32,
  spRange: 34,
  dp: 18,
  dpRange: 24,
  attackRange: 3,
  experience: 600,
  stunChance: 30,
  lore: 'Also commonly known as "Glowtubes" and "Sparknoodles", Shockworms inhabit dark fresh and salt water habitats. A carnivorous predator that can send massive voltage throughout their body and the surrounding body of water, they are harmful to local wildlife and most creatures of smaller stature than them. Shockworms may have relation to the ancient Breshava Trenchworms, if such a thing ever actually existed.',
};

export const kreebus: Partial<ActorOptions> = {
  glyph: "Kreebus",
  name: "kreebus",
  colour: "pink",
  ai: "fly",
  obeysGravity: false,
  maxHp: 68,
  maxHpRange: 75,
  sp: 32,
  spRange: 35,
  dp: 23,
  dpRange: 26,
  attackRange: 2,
  experience: 800,
  lore: "Descended from ancient sea dragons of ages long past, the Kreebus was first sighted in the waters of the Aelonic Ocean. It is unknown how, but these vicious mini sea dragons are capable of flight through magical property alone and are relentlessly aggressive when approached. A tell-tale sign of their presence is unusually heated or warm waters in areas that would not normally have them, as a Kreebus is capable of producing extreme heat blasts reminiscent of flames.",
};

export const grundilla: Partial<ActorOptions> = {
  glyph: "Grundilla",
  name: "grundilla",
  colour: "yellow",
  ai: "wander",
  canClimb: true,
  maxHp: 115,
  maxHpRange: 130,
  sp: 45,
  spRange: 50,
  dp: 30,
  dpRange: 35,
  knockBackChance: 35,
  experience: 950,
  lore: "Once faced with near-extinction due to over hunting, Grundillas soon evolved from a docile forest and cave-dwelling species into violent territorial beasts. They became capable of lifting six times their own weight, and as a result are able to climb almost any terrain with ease. From hunted to hunters, an encounter with a wild Grundilla is almost always fatal; do not approach these creatures under any circumstances.",
};

export const poregon: Partial<ActorOptions> = {
  glyph: "Poregon",
  name: "poregon",
  colour: "cyan",
  ai: "wander",
  canClimb: true,
  maxHp: 32,
  maxHpRange: 37,
  sp: 18,
  spRange: 22,
  dp: 16,
  dpRange: 20,
  attackRange: 2,
  knockBackChance: 10,
  experience: 350,
  finalBombChance: 5,
  lore: "A strange race of creatures that are said to be pranksters, reincarnations of mischievous spirits of the past or even those that have fallen far away from home. Their mushroom like appearance hides what appear to be intentions both good and bad, some claim to have been saved in their hour of need, while others still claim to have seen hideous rituals and gruesome sights at Poregon camps. Caution is advised.",
};

export const theGreenInk: Partial<ActorOptions> = {
  glyph: "GreenInk1",
  name: "ink",
  article: "the",
  colour: "green",
  inky: true,
  obeysGravity: false,
  maxHp: 160,
  maxHpRange: 175,
  sp: 38,
  spRange: 42,
  dp: 25,
  dpRange: 29,
  knockBackChance: 25,
  experience: 3000,
  teleportThreshold: 30,
  lore: "\"Whatever this hideous creature is, it's far from cognizant of what's occurring around it. Exploding younglings spurn forth endlessly from this flying yolk of terror, as if ink dripping on tarnished paper. I must report this finding, I must know why it is here, and I know I must be closer than ever to the Wisher's Fragment.\" - Jacques Splintertooth",
};
export const popper: Partial<ActorOptions> = {
  glyph: "InkPopper",
  name: "popper",
  colour: "green",
  ai: "fly", // TODO: explodes 5 turns after spawning
  inky: true,
  obeysGravity: false,
  maxHp: 4,
  maxHpRange: 6,
  sp: 50,
  dp: 8,
  dpRange: 10,
  experience: 800,
  lore: '"A strange mucus sack seems to encase these skull-like younglings, or perhaps the sack is the volatile chemical that causes these beasts to erupt in defence of their horrifying parental figure. I must steer clear of these nuisances, or deal with them quickly lest I am done irrevocable harm." - Jacques Splintertooth',
};

export const theRedInk: Partial<ActorOptions> = {
  glyph: "RedInk1",
  name: "ink",
  article: "the",
  colour: "red",
  inky: true,
  obeysGravity: false,
  maxHp: 230,
  maxHpRange: 260,
  sp: 45,
  spRange: 48,
  dp: 33,
  dpRange: 36,
  attackRange: 3,
  knockBackChance: 5,
  experience: 3000,
  teleportThreshold: 30,
  // TODO: leaves fire when teleporting
  lore: "\"Whatever this hideous creature is, it's far from cognizant of what's occurring around it. Extreme heat emanates all around this flying yolk of terror, all while it parades a legion of faces that sag like ink saturated paper. I must report this finding, I must know why it is here, and I know I must be closer than ever to the Wisher's Fragment.\" - Jacques Splintertooth",
};

// TODO: the blot
