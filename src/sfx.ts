import projectileUrl from "../res/sfx/Arrow Dart Thrown Sound Cropped.wav";
import championSightUrl from "../res/sfx/Champion Sighting OR Summoning Death Cry Cropped.wav";
import chipUrl from "../res/sfx/Chipping at walls-boulders cropped.wav";
import damageImpactUrl from "../res/sfx/Damage Impact Cropped.wav";
import digDirtUrl from "../res/sfx/Dirt Dig Sound Cropped.wav";
import damageShockUrl from "../res/sfx/Electric Shock Cropped.wav";
import explodeUrl from "../res/sfx/Explosion Cropped.wav";
import heartbeatUrl from "../res/sfx/Huge Heartbeat Blot Cropped.wav";
import airWarnUrl from "../res/sfx/I_m sorry it_s the oxygen is low alarm cropped.wav";
import inkDeadUrl from "../res/sfx/Ink _ Blot Defeat Cropped.wav";
import inkTeleportUrl from "../res/sfx/Ink _ Blot Teleport Appear Growl Cropped.wav";
import itemUrl from "../res/sfx/Item Click Blip Cropped.wav";
import hurtUrl from "../res/sfx/Jacques Hurt Cropped.wav";
import growlSightUrl from "../res/sfx/Low Growl Slobberfin _ Grundilla Sighting Cropped.wav";
import moneyUrl from "../res/sfx/Money Grab Cropped.wav";
import digSandUrl from "../res/sfx/Sand Dig Cropped.wav";
import smallDeadUrl from "../res/sfx/Small Enemy Defeat Maybe Cropped.wav";
import damageTaserUrl from "../res/sfx/Taser Zap or Shock 2 Cropped.wav";
import SfxLibrary, { SfxName } from "./interfaces/SfxLibrary";
import { fetchAudio } from "./utils";

class SoundBank implements SfxLibrary {
  constructor(private sounds: Record<SfxName, HTMLAudioElement>) {}

  play(sfx: SfxName): void {
    const snd = this.sounds[sfx];
    if (!snd) return;

    if (snd.paused) snd.play();
    else snd.currentTime = 0;
  }
}

export default async function getSoundBank(): Promise<SoundBank> {
  const [
    airWarn,
    championSight,
    chip,
    damageImpact,
    damageShock,
    damageTaser,
    digDirt,
    digSand,
    explode,
    growlSight,
    heartbeat,
    hurt,
    inkDead,
    inkTeleport,
    item,
    money,
    projectile,
    smallDead,
  ] = await Promise.all([
    fetchAudio(airWarnUrl),
    fetchAudio(championSightUrl),
    fetchAudio(chipUrl),
    fetchAudio(damageImpactUrl),
    fetchAudio(damageShockUrl),
    fetchAudio(damageTaserUrl),
    fetchAudio(digDirtUrl),
    fetchAudio(digSandUrl),
    fetchAudio(explodeUrl),
    fetchAudio(growlSightUrl),
    fetchAudio(heartbeatUrl),
    fetchAudio(hurtUrl),
    fetchAudio(inkDeadUrl),
    fetchAudio(inkTeleportUrl),
    fetchAudio(itemUrl),
    fetchAudio(moneyUrl),
    fetchAudio(projectileUrl),
    fetchAudio(smallDeadUrl),
  ]);

  return new SoundBank({
    airWarn,
    championSight,
    chip,
    damageImpact,
    damageShock,
    damageTaser,
    digDirt,
    digSand,
    explode,
    growlSight,
    heartbeat,
    hurt,
    inkDead,
    inkTeleport,
    item,
    money,
    projectile,
    smallDead,
  });
}
