import Game from "../Game";
import { MusicName } from "../music";

const zoneTracks: MusicName[] = ["shallow", "medium", "deep"];

export default class Music {
  constructor(public g: Game) {
    g.on("entered", ({ depth, zone }) => {
      if (depth < 10) g.playMusic(zoneTracks[zone]);
      else g.fadeOutMusic();
    });

    g.on("noticed", ({ actor }) => {
      if (actor.glyph === "Ink1") g.playMusic("ink");
    });

    g.on("left", ({ depth }) => {
      if (depth === 3 || depth === 6 || depth === 9) {
        g.fadeOutMusic().then(() => g.playMusic("mystery"));
      }
    });
  }
}
