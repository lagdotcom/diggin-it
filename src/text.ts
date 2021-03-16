type Nameable = {
  article?: string;
  charges?: number;
  name: string;
  namep: string;
  plural?: boolean;
};

export function name(thing: Nameable): string {
  if (thing.charges > 1) return `${thing.charges} ${thing.namep}`;
  if (thing.article) return `${thing.article} ${thing.name}`;
  return thing.name;
}

export function theName(thing: Nameable): string {
  if (thing.charges > 1) return `${thing.charges} ${thing.namep}`;
  if (thing.article) return `the ${thing.name}`;
  return thing.name;
}

export function it(thing: Nameable): string {
  return thing.plural || thing.charges > 1 ? "them" : "it";
}
