import Game from "../Game";
import { MusicName } from "../music";

const zoneTracks: MusicName[] = ["shallow", "medium", "deep"];

export default class Music {
  constructor(public g: Game) {
    g.on("entered", ({ zone }) => g.play(zoneTracks[zone]));
  }
}
