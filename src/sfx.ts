import airWarnUrl from "../res/sfx/airWarn.mp3";
import championSightUrl from "../res/sfx/championSight.mp3";
import chipUrl from "../res/sfx/chip.mp3";
import damageImpactUrl from "../res/sfx/damageImpact.mp3";
import damageShockUrl from "../res/sfx/damageShock.mp3";
import damageTaserUrl from "../res/sfx/damageTaser.mp3";
import deadUrl from "../res/sfx/dead.mp3";
import digDirtUrl from "../res/sfx/digDirt.mp3";
import digSandUrl from "../res/sfx/digSand.mp3";
import explodeUrl from "../res/sfx/explode.mp3";
import growlSightUrl from "../res/sfx/growlSight.mp3";
import gulpUrl from "../res/sfx/gulp.mp3";
import heartbeatUrl from "../res/sfx/heartbeat.mp3";
import hurtUrl from "../res/sfx/hurt.mp3";
import inkDeadUrl from "../res/sfx/inkDead.mp3";
import inkTeleportUrl from "../res/sfx/inkTeleport.mp3";
import itemGetUrl from "../res/sfx/itemGet.mp3";
import itemSelectUrl from "../res/sfx/itemSelect.mp3";
import moneyUrl from "../res/sfx/money.mp3";
import projectileUrl from "../res/sfx/projectile.mp3";
import rockSmashUrl from "../res/sfx/rockSmash.mp3";
import smallDeadUrl from "../res/sfx/smallDead.mp3";
import smashUrl from "../res/sfx/smash.mp3";
import SfxLibrary, { SfxName } from "./interfaces/SfxLibrary";
import { fetchAudio } from "./utils";

class SoundBank implements SfxLibrary {
  constructor(private sounds: Record<SfxName, HTMLAudioElement>) {}

  play(sfx: SfxName): void {
    const snd = this.sounds[sfx];
    if (!snd) return;

    // TODO options
    snd.volume = 0.8;
    if (snd.paused) snd.play();
    else snd.currentTime = 0;
  }
}

export default async function getSoundBank(): Promise<SoundBank> {
  const [
    airWarn,
    championSight, // TODO unused
    chip,
    damageImpact, // TODO unused
    damageShock, // TODO unused
    damageTaser, // TODO unused
    dead,
    digDirt,
    digSand,
    explode,
    growlSight, // TODO unused
    gulp,
    heartbeat, // TODO unused
    hurt,
    inkDead,
    inkTeleport,
    itemGet,
    itemSelect,
    money,
    projectile,
    rockSmash,
    smallDead,
    smash,
  ] = await Promise.all([
    fetchAudio(airWarnUrl),
    fetchAudio(championSightUrl),
    fetchAudio(chipUrl),
    fetchAudio(damageImpactUrl),
    fetchAudio(damageShockUrl),
    fetchAudio(damageTaserUrl),
    fetchAudio(deadUrl),
    fetchAudio(digDirtUrl),
    fetchAudio(digSandUrl),
    fetchAudio(explodeUrl),
    fetchAudio(growlSightUrl),
    fetchAudio(gulpUrl),
    fetchAudio(heartbeatUrl),
    fetchAudio(hurtUrl),
    fetchAudio(inkDeadUrl),
    fetchAudio(inkTeleportUrl),
    fetchAudio(itemGetUrl),
    fetchAudio(itemSelectUrl),
    fetchAudio(moneyUrl),
    fetchAudio(projectileUrl),
    fetchAudio(rockSmashUrl),
    fetchAudio(smallDeadUrl),
    fetchAudio(smashUrl),
  ]);

  return new SoundBank({
    airWarn,
    championSight,
    chip,
    damageImpact,
    damageShock,
    damageTaser,
    dead,
    digDirt,
    digSand,
    explode,
    growlSight,
    gulp,
    heartbeat,
    hurt,
    inkDead,
    inkTeleport,
    itemGet,
    itemSelect,
    money,
    projectile,
    rockSmash,
    smallDead,
    smash,
  });
}
