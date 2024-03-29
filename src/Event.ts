import Actor from "./Actor";
import Thing from "./interfaces/Thing";
import Zone from "./interfaces/Zone";
import Item from "./Item";
import Tile from "./Tile";

export type DamageType =
  | "autoExplosion"
  | "bomb"
  | "burning"
  | "combat"
  | "crush"
  | "fall"
  | "finalScream"
  | "gasExplosion"
  | "status"
  | "suffocation"
  | "trap";
export type DigType = "dig" | "bomb";
export type MoveType =
  | "walk"
  | "fall"
  | "crush"
  | "climb"
  | "push"
  | "teleport";
export type StatusType = "bleed" | "poison" | "stun";
type NoData = Record<string, never>;

export interface EventMap {
  attacked: { attacker: Actor; victim: Actor; item?: Item };
  chipped: { attacker: Actor; victim?: Actor; tile?: Tile };
  collapsed: { x: number; y: number };
  damaged: {
    attacker?: Actor;
    victim: Actor;
    amount: number;
    type: DamageType;
  };
  destroyed: { attacker: Actor; victim: Actor };
  died: { attacker: Actor; victim: Actor };
  digged: { tile: Tile; x: number; y: number; type: DigType };
  dropped: { actor: Actor; item: Item };
  effect: { effect: Item; duration: number };
  entered: { depth: number; zone: Zone; isSideArea: boolean };
  equipped: { actor: Actor; equipped?: Item; removed?: Item };
  exploded: { item: Item };
  fell: { thing: Thing; distance: number };
  got: { actor: Actor; item: Item };
  infoOpened: NoData;
  infoClosed: NoData;
  inventoryChanged: NoData;
  left: { depth: number; zone: Zone };
  litBomb: { item: Item };
  mapChanged: NoData;
  moved: {
    thing: Thing;
    mx: number;
    my: number;
    type: MoveType;
    forced?: Thing;
  };
  noticed: { actor: Actor };
  refreshed: NoData;
  statusApplied: { attacker?: Actor; victim: Actor; type: StatusType };
  statusRemoved: { actor: Actor; type: StatusType };
  tick: NoData;
  used: { actor: Actor; item: Item };
}

export type EventName = keyof EventMap;
