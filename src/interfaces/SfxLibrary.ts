export type SfxName =
  | "airWarn"
  | "championSight"
  | "chip"
  | "damageImpact"
  | "damageShock"
  | "damageTaser"
  | "digDirt"
  | "digSand"
  | "explode"
  | "growlSight"
  | "heartbeat"
  | "hurt"
  | "inkDead"
  | "inkTeleport"
  | "item"
  | "money"
  | "projectile"
  | "smallDead";

export default interface SfxLibrary {
  play(sfx: SfxName): void;
}
