import mediumUrl from "../res/flowstone-flood.mp3";
import deepUrl from "../res/grumbles.mp3";
import shallowUrl from "../res/lost-in-lessonus.mp3";
import mysteryUrl from "../res/mystery-sting.mp3";
import shinyUrl from "../res/shiny-sting.mp3";

function fetchMusic(url: string, loop = false): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const aud = document.createElement("audio");
    aud.addEventListener("canplaythrough", () => resolve(aud));
    aud.addEventListener("error", () => {
      console.log("couldn't load:", url);
      // reject(aud);
    });
    aud.loop = loop;
    aud.src = url;
  });
}

export type MusicName = "shallow" | "medium" | "deep" | "mystery" | "shiny";
export type MusicLibrary = Record<MusicName, HTMLAudioElement>;

export default async function loadAllMusic(): Promise<MusicLibrary> {
  const [shallow, medium, deep, mystery, shiny] = await Promise.all([
    fetchMusic(shallowUrl, true),
    fetchMusic(mediumUrl, true),
    fetchMusic(deepUrl, true),
    fetchMusic(mysteryUrl),
    fetchMusic(shinyUrl),
  ]);

  return { shallow, medium, deep, mystery, shiny };
}
