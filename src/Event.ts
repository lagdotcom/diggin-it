import Thing from "./interfaces/Thing";
import Tile from "./Tile";

export interface EventMap {
  collapsed: { x: number; y: number };
  digged: { tile: Tile; x: number; y: number };
  fell: { thing: Thing; distance: number };
  moved: { thing: Thing; mx: number; my: number; forced?: Thing };
}

export type EventName = keyof EventMap;
