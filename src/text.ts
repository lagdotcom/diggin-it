export function name(thing: { article?: string; name: string }) {
  if (thing.article) return `${thing.article} ${thing.name}`;
  return thing.name;
}

export function theName(thing: { article?: string; name: string }) {
  if (thing.article) return `the ${thing.name}`;
  return thing.name;
}

export function it(thing: { plural?: boolean }) {
  return thing.plural ? "them" : "it";
}
