export function name(thing: { article?: string; name: string }) {
  if (thing.article) return `${thing.article} ${thing.name}`;
  return thing.name;
}

export function theName(thing: { name: string }) {
  return `the ${thing.name}`;
}
