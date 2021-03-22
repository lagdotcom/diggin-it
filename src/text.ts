import { lightBlue, lightGold, lightGreen, lightRed } from "./colours";

type Entity = {
  alive?: boolean;
  article?: string;
  charges?: number;
  name: string;
  namep: string;
  plural?: boolean;
  slot?: string;
  treasure?: number;
  use?: string;
};

export function colour(thing: Entity): string {
  if (thing.name === "you") return "";
  if (thing.alive) return `%c{${lightRed}}`;
  if (thing.slot) return `%c{${lightGreen}}`;
  if (thing.use) return `%c{${lightBlue}}`;
  if (thing.treasure) return `%c{${lightGold}}`;
  return "";
}

function iname(thing: Entity, article = thing.article): string {
  if (thing.charges > 1) return `${thing.charges} ${thing.namep}`;
  if (thing.article) return `${article} ${thing.name}`;
  return thing.name;
}

export function name(thing: Entity, capitalize = false): string {
  const n = iname(thing);
  return capitalize ? cap(n) : n;
}

export function cname(thing: Entity, capitalize = false): string {
  return colour(thing) + name(thing, capitalize) + "%c{}";
}

export function theName(thing: Entity, capitalize = false): string {
  const n = iname(thing, "the");
  return capitalize ? cap(n) : n;
}

export function ctheName(thing: Entity, capitalize = false): string {
  return colour(thing) + theName(thing, capitalize) + "%c{}";
}

export function it(thing: Entity): string {
  return thing.plural || thing.charges > 1 ? "them" : "it";
}

export function cap(n: string): string {
  return n[0].toUpperCase() + n.substr(1);
}
