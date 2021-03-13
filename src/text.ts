export function name(thing: {
  article?: string;
  charges?: number;
  name: string;
  namep: string;
}) {
  if (thing.charges) return `${thing.charges} ${thing.namep}`;
  if (thing.article) return `${thing.article} ${thing.name}`;
  return thing.name;
}

export function theName(thing: {
  article?: string;
  charges?: number;
  name: string;
  namep: string;
}) {
  if (thing.charges) return `${thing.charges} ${thing.namep}`;
  if (thing.article) return `the ${thing.name}`;
  return thing.name;
}

export function it(thing: { charges?: number; plural?: boolean }) {
  return thing.plural || thing.charges > 1 ? "them" : "it";
}
