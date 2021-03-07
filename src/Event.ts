import Actor from './Actor';
import Item from './Item';

type Thing = Actor | Item;

export interface EventMap {
  moved: { thing: Thing; mx: number; my: number; forced?: Thing };
}

export type EventName = keyof EventMap;
