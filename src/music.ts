import consolationUrl from "../res/consolation-sting.mp3";
import mediumUrl from "../res/flowstone-flood.mp3";
import deepUrl from "../res/grumbles.mp3";
import shallowUrl from "../res/lost-in-lessonus.mp3";
import mysteryUrl from "../res/mystery-sting.mp3";
import inkUrl from "../res/sealed-in-ink.mp3";
import shinyUrl from "../res/shiny-sting.mp3";
import MusicLibrary, { MusicName } from "./interfaces/MusicLibrary";
import { fetchAudio } from "./utils";

class Player implements MusicLibrary {
  playing?: MusicName;

  constructor(private tracks: Record<MusicName, HTMLAudioElement>) {}

  private start(track: MusicName) {
    this.tracks[track].volume = 1;
    this.tracks[track].play().then(() => (this.playing = track));
  }

  play(track: MusicName): void {
    if (this.playing) {
      if (this.playing === track) return;
      this.stop();
    }

    this.start(track);
  }

  stop(): void {
    if (this.playing) {
      this.tracks[this.playing].pause();
      this.tracks[this.playing].currentTime = 0;
      this.playing = undefined;
    }
  }

  fadeOut(): Promise<void> {
    if (!this.playing) return;

    return new Promise<void>((resolve) => {
      const aud = this.tracks[this.playing];
      const timer = setInterval(() => {
        aud.volume = Math.max(0, aud.volume - 0.05);
        if (aud.volume <= 0) {
          this.stop();
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  }
}

export default async function getMusicLibrary(): Promise<MusicLibrary> {
  const [shallow, medium, deep, mystery, shiny, ink, consolation] =
    await Promise.all([
      fetchAudio(shallowUrl, true),
      fetchAudio(mediumUrl, true),
      fetchAudio(deepUrl, true),
      fetchAudio(mysteryUrl),
      fetchAudio(shinyUrl),
      fetchAudio(inkUrl, true),
      fetchAudio(consolationUrl),
    ]);

  return new Player({
    shallow,
    medium,
    deep,
    mystery,
    shiny,
    ink,
    consolation,
  });
}
