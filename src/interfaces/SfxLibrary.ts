export type SfxName =
  | "airWarn"
  | "championSight"
  | "chip"
  | "damageImpact"
  | "damageShock"
  | "damageTaser"
  | "dead"
  | "digDirt"
  | "digSand"
  | "explode"
  | "growlSight"
  | "gulp"
  | "heartbeat"
  | "hurt"
  | "inkDead"
  | "inkTeleport"
  | "itemGet"
  | "itemSelect"
  | "money"
  | "projectile"
  | "rockSmash"
  | "smallDead"
  | "smash";

export default interface SfxLibrary {
  play(sfx: SfxName): void;
}
