import { ActorOptions } from "./Actor";

export const player: Partial<ActorOptions> = {
  glyph: "@",
  name: "you",
  article: "",
  canClimb: true,
  maxHp: 80,
  maxAp: 150,
  sp: 8,
  dp: 8,
  inventorySize: 20,
};

export const squimpy: Partial<ActorOptions> = {
  glyph: "Squimpy",
  name: "squimpy",
  colour: "yellow",
  ai: "wander",
  maxHp: 24,
  sp: 15,
  dp: 6,
  experience: 25,
  lore:
    "Born with only a single eye to see and a mouth to eat, the Squimpy is not to be confused with its eldest evolutionary relative, the Fachan. While generally harmless, if agitated or provoked the Squimpy is known for its surprisingly potent and harmful saliva that, when left untreated, is capable of leaving severe scarring akin to that of a burn.",
};
export const buster: Partial<ActorOptions> = {
  glyph: "Buster",
  name: "buster",
  colour: "pink",
  ai: "wander",
  maxHp: 20,
  sp: 18,
  dp: 8,
  experience: 20,
  lore:
    "These odd, toad-like creatures can be found at every corner of Gantella, but none is quite as strange as those found around Lessonus. A popular domesticated pet, the strange swirl adorning their head is not hair, but a small tail like appendage that wags when stimulated. Don't be fooled, however, in the wild a Buster earns its name by growing to the size of a large dog and throwing its own weight relentlessly at anything it sees as a threat.",
};
export const canandra: Partial<ActorOptions> = {
  glyph: "Canandra",
  name: "canandra",
  colour: "orange",
  ai: "wander",
  canClimb: true,
  maxHp: 100,
  sp: 38,
  dp: 25,
  experience: 800,
  lore:
    "Canandras should be avoided at all costs in the wild, sporting the fifth deadliest venom in the world and a constricting grip that few escape from and fewer live to tell tales about. It's advised if you're voyaging into hot, dry areas to be always aware of your surroundings and to listen for the distinctive clacking of their quills and the sound of their territorial hiss. If bitten, seek medical attention immediately.",
};
export const crim: Partial<ActorOptions> = {
  glyph: "Crim",
  name: "crim",
  colour: "red",
  ai: "wander",
  maxHp: 85,
  sp: 20,
  dp: 28,
  experience: 450,
  lore:
    'Also known as the "Screaming Shells" due to their rather odd facial structure, Crims are very self oriented creatures. They come out rarely to eat and then spend weeks hibernating within their shell while their food slowly digests. Crims are best left alone when encountered and tend to only become hostile when threatened or provoked.',
};
export const flazza: Partial<ActorOptions> = {
  glyph: "Flazza",
  name: "flazza",
  colour: "cyan",
  ai: "fly",
  obeysGravity: false,
  maxHp: 38,
  sp: 25,
  dp: 20,
  experience: 300,
  lore:
    'Tentacled flying menaces that love the dark, Flazzas are known as the "Terror Flies of the Deep". They capture any prey smaller than them by dive bombing from above attempting to break bones or outright kill their prey on the spot, should that fail they have a nasty tendency to envelop their victim within their carnivorous tentacles. They have an aversion to bright lights and thankfully keep their homes far below anywhere they\'d become a real problem.',
};
export const glova: Partial<ActorOptions> = {
  glyph: "Glova",
  name: "glova",
  colour: "white",
  ai: "wander",
  canClimb: true,
  maxHp: 20,
  sp: 20,
  dp: 18,
  experience: 80,
  lore:
    "Comprised of bubbly acidic slime-like globules, Glovas are only ever seen below ground. Their translucent bodies often envelop and break down material slowly, allowing them to feed on moss and other natural growths, due to the potency of their slime, however, they have a tendency to eat through many other things and are best left to themselves whenever possible.",
};
export const muln: Partial<ActorOptions> = {
  glyph: "Muln",
  name: "muln",
  colour: "blue",
  ai: "wander",
  maxHp: 48,
  sp: 25,
  dp: 22,
  experience: 650,
  lore:
    "Burrowing menaces responsible for missing crops, livestock and occasionally children, Muln cause extreme agricultural grief and property damage in many areas surrounded by mountains or cave systems. When faced with a Muln problem, it's often recommended to call in professionals to trap and relocate them to more natural habitats, and it's strongly advised to avoid Muln habitats and evacuate immediately in case of infestation.", // TODO: 'habitat' repetition
};
export const slobberfin: Partial<ActorOptions> = {
  glyph: "Slobberfin",
  name: "slobberfin",
  colour: "turquoise",
  ai: "wander",
  maxHp: 70,
  sp: 40,
  dp: 26,
  experience: 700,
  lore:
    "Deadly both in the water and on land, Slobberfins are the number one cause of animal related deaths across Gantella. Slobberfins are highly territorial and highly adaptable creatures, and the only thing standing between them and becoming apex predators is their extreme near sightedness and pension for living in cool and dark locales.",
};
export const splinter: Partial<ActorOptions> = {
  glyph: "Splinter",
  name: "splinter",
  colour: "brown",
  ai: "wander",
  canClimb: true,
  maxHp: 45,
  sp: 28,
  dp: 22,
  experience: 350,
  lore:
    "According to religious texts recovered from Dwelvarkian ruins, Splinters are the remains of the largest tree to have ever existed, and a source from which the Dwelvarkians themselves spurned. During a war that lasted through the birth and death of the first sun to hang in the sky, a greedy and selfish race since scrubbed from history cut the tree down, taking it's limbs for themselves and fashioning their own creatures. The Splinters came not long after, seeking revenge and entangling those unfortunate enough to cross them within their roots.",
};
export const telden: Partial<ActorOptions> = {
  glyph: "Telden",
  name: "telden",
  colour: "red",
  ai: "fly",
  obeysGravity: false,
  maxHp: 40,
  sp: 25,
  dp: 18,
  experience: 500,
  lore:
    "Heated debates about whether Teldens originated from mammals or annelids still permeate many historical and evolutionary discussions around this bizarre creature. Regardless of which side you take, the Telden certainly won't take yours; its deadly tongue and hideous breath leave behind an odour noxious enough that it's widely considered as deadly as the thickest gasses. They are rarely seen outside of their natural dark underground habitats and should be avoided whenever possible.",
};
export const floater: Partial<ActorOptions> = {
  glyph: "InkFloater",
  name: "floater",
  colour: "darkblue",
  ai: "fly",
  inky: true,
  // TODO: mimic random flying enemy
  maxHp: 75,
  sp: 32,
  dp: 23,
  experience: 800,
  obeysGravity: false,
  lore:
    "\"If this is not a trick or hallucination of oxygen deprived madness, this conjoined face seems to almost lament its state of being. I must stay clear of these foul things, the stench is unfathomable and I can't be sure its touch isn't fatal in some way.\"\n- Jacques Splintertooth",
};
export const drifter: Partial<ActorOptions> = {
  glyph: "InkDrifter",
  name: "drifter",
  colour: "darkblue",
  ai: "wander",
  inky: true,
  canClimb: true,
  // TODO: mimic random ground enemy
  maxHp: 80,
  sp: 35,
  dp: 25,
  experience: 800,
  lore:
    "\"I don't understand how, but this strange abomination drifts and glides about like a feather, mimicking movements of human and beast alike. It unsettles me greatly to know things like this exist in the world, but I've come too far to give up now!\"\n- Jacques Splintertooth",
};
export const theInk: Partial<ActorOptions> = {
  glyph: "Ink1",
  name: "ink",
  article: "the",
  colour: "purple",
  inky: true,
  obeysGravity: false,
  maxHp: 200,
  sp: 45,
  dp: 30,
  experience: 3000,
  teleportThreshold: 30,
  lore:
    "\"Whatever this hideous creature is, it's far from cognizant of what's occurring around it. Strange beasts and horrifying grotesques spurn forth endlessly from this flying yolk of terror, as if ink dripping on tarnished paper. I must report this finding, I must know why it is here, and I know I must be closer than ever to the Wisher's Fragment.\"\n- Jacques Splintertooth",
};

export const crate: Partial<ActorOptions> = {
  glyph: "Crate",
  name: "crate",
  colour: "brown",
  durability: 2,
  pushable: true,
};

export const boulder: Partial<ActorOptions> = {
  glyph: "Boulder",
  name: "boulder",
  colour: "grey",
  durability: 5,
  pushable: true,
  heavy: true,
};

export const metal: Partial<ActorOptions> = {
  glyph: "MetalBlock",
  name: "metal block",
  colour: "cyan",
  durability: 10,
  pushable: true,
  heavy: true,
};
