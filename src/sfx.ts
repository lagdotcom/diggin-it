import projectileUrl from "../res/sfx/Arrow Dart Thrown Sound Cropped MP3d.mp3";
import championSightUrl from "../res/sfx/Champion Sighting OR Summoning Death Cry Cropped MP3d.mp3";
import chipUrl from "../res/sfx/Chipping at walls-boulders cropped MP3d.mp3";
import damageImpactUrl from "../res/sfx/Damage Impact Cropped MP3d.mp3";
import digDirtUrl from "../res/sfx/Dirt Dig Sound Cropped MP3d.mp3";
import damageShockUrl from "../res/sfx/Electric Shock Cropped MP3d.mp3";
import explodeUrl from "../res/sfx/Explosion Cropped MP3d.mp3";
import heartbeatUrl from "../res/sfx/Huge Heartbeat Blot Cropped MP3d.mp3";
import airWarnUrl from "../res/sfx/I_m sorry it_s the oxygen is low alarm cropped MP3d.mp3";
import inkDeadUrl from "../res/sfx/Ink _ Blot Defeat Cropped MP3d.mp3";
import inkTeleportUrl from "../res/sfx/Ink _ Blot Teleport Appear Growl Cropped MP3d.mp3";
import itemUrl from "../res/sfx/Item Click Blip Cropped MP3d.mp3";
import hurtUrl from "../res/sfx/Jacques Hurt Cropped MP3d.mp3";
import growlSightUrl from "../res/sfx/Low Growl Slobberfin _ Grundilla Sighting Cropped MP3d.mp3";
import moneyUrl from "../res/sfx/Money Grab Cropped MP3d.mp3";
import digSandUrl from "../res/sfx/Sand Dig Cropped MP3d.mp3";
import smallDeadUrl from "../res/sfx/Small Enemy Defeat Maybe Cropped MP3d.mp3";
import damageTaserUrl from "../res/sfx/Taser Zap or Shock 2 Cropped MP3d.mp3";
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
