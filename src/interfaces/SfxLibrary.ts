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
  | "gulp"
  | "heartbeat"
  | "hurt"
  | "inkDead"
  | "inkTeleport"
  | "item"
  | "money"
  | "projectile"
  | "rockSmash"
  | "smallDead"
  | "smash";

export default interface SfxLibrary {
  play(sfx: SfxName): void;
}
