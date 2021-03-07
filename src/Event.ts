import Thing from './interfaces/Thing';

export interface EventMap {
  moved: { thing: Thing; mx: number; my: number; forced?: Thing };
}

export type EventName = keyof EventMap;
