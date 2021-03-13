import Actor from "./Actor";
import Thing from "./interfaces/Thing";
import Item from "./Item";
import Tile from "./Tile";

type DamageType = "combat" | "crush" | "fall" | "suffocation";

export interface EventMap {
  attacked: { attacker: Actor; victim: Actor };
  collapsed: { x: number; y: number };
  damaged: {
    attacker?: Actor;
    victim: Actor;
    amount: number;
    type: DamageType;
  };
  died: { attacker: Actor; victim: Actor };
  digged: { tile: Tile; x: number; y: number };
  entered: { depth: number; zone: number };
  fell: { thing: Thing; distance: number };
  got: { actor: Actor; item: Item };
  moved: { thing: Thing; mx: number; my: number; forced?: Thing };
}

export type EventName = keyof EventMap;
