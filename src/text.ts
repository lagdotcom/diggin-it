import { fg, lightBlue, lightGold, lightGreen, lightRed } from "./colours";

type Entity = {
  alive?: boolean;
  article?: string;
  charges?: number;
  name: string;
  namePlural: string;
  plural?: boolean;
  slot?: string;
  treasure?: number;
  use?: string;
};

export function colour(thing: Entity): string {
  if (thing.name === "you") return "";
  if (thing.alive) return fg(lightRed);
  if (thing.slot) return fg(lightGreen);
  if (thing.use) return fg(lightBlue);
  if (thing.treasure) return fg(lightGold);
  return "";
}

function iname(
  thing: Entity,
  article = thing.article,
  singular = false
): string {
  if (hasAmount(thing, singular)) return `${thing.charges} ${thing.namePlural}`;
  if (thing.article) return `${article} ${thing.name}`;
  return thing.name;
}

export function name(
  thing: Entity,
  capitalize = false,
  singular = false
): string {
  const n = iname(thing, thing.article, singular);
  return capitalize ? cap(n) : n;
}

export function cname(
  thing: Entity,
  capitalize = false,
  singular = false
): string {
  return colour(thing) + name(thing, capitalize, singular) + fg();
}

export function theName(
  thing: Entity,
  capitalize = false,
  singular = false
): string {
  const n = iname(thing, "the", singular);
  return capitalize ? cap(n) : n;
}

export function ctheName(
  thing: Entity,
  capitalize = false,
  singular = false
): string {
  return colour(thing) + theName(thing, capitalize, singular) + fg();
}

export function hasAmount(thing: Entity, singular = false): boolean {
  return thing.charges > 1 && thing.charges < Infinity && !singular;
}

export function it(thing: Entity): string {
  return thing.plural || hasAmount(thing) ? "them" : "it";
}

export function cap(n: string): string {
  return n[0].toUpperCase() + n.substr(1);
}
