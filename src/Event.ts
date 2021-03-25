import Actor from "./Actor";
import Thing from "./interfaces/Thing";
import Item from "./Item";
import Tile from "./Tile";

type DamageType = "bomb" | "combat" | "crush" | "fall" | "suffocation";
type NoData = Record<string, never>;

export interface EventMap {
  attacked: { attacker: Actor; victim: Actor };
  collapsed: { x: number; y: number };
  damaged: {
    attacker?: Actor;
    victim: Actor;
    amount: number;
    type: DamageType;
  };
  destroyed: { attacker: Actor; victim: Actor };
  died: { attacker: Actor; victim: Actor };
  digged: { tile: Tile; x: number; y: number };
  dropped: { actor: Actor; item: Item };
  effect: { effect: Item; duration: number };
  entered: { depth: number; zone: number };
  equipped: { actor: Actor; equipped?: Item; removed?: Item };
  fell: { thing: Thing; distance: number };
  got: { actor: Actor; item: Item };
  infoOpened: NoData;
  infoClosed: NoData;
  left: { depth: number; zone: number };
  litBomb: { item: Item };
  mapChanged: NoData;
  moved: { thing: Thing; mx: number; my: number; forced?: Thing };
  noticed: { actor: Actor };
  refreshed: NoData;
  tick: NoData;
  used: { actor: Actor; item: Item };
}

export type EventName = keyof EventMap;
