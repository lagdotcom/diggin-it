import Game from "../Game";
import { MusicName } from "../interfaces/MusicLibrary";

const zoneTracks: MusicName[] = ["shallow", "medium", "deep"];

export default class Music {
  constructor(public g: Game) {
    g.on("entered", ({ depth, zone }) => {
      if (depth < 10) g.music.play(zoneTracks[zone]);
      else g.music.stop();
    });

    g.on("noticed", ({ actor }) => {
      if (actor.glyph === "Ink1") g.music.play("ink");
    });

    g.on("left", ({ depth }) => {
      if (depth === 3 || depth === 6 || depth === 9) g.music.play("mystery");
    });
  }
}
