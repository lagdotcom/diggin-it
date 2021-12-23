import Game from "../Game";
import { MusicName } from "../interfaces/MusicLibrary";

const zoneTracks: MusicName[] = ["shallow", "medium", "deep"];

export default class Music {
  constructor(public g: Game) {
    g.on("entered", ({ depth, zone, isSideArea }) => {
      if (depth < 10) g.music.play(zoneTracks[zone]);
      else if (depth === 11) {
        if (isSideArea) g.music.play("blot");
        else g.music.play("eleven");
      } else g.music.stop();
    });

    g.on("noticed", ({ actor }) => {
      if (
        actor.glyph === "Ink1" ||
        actor.glyph === "GreenInk1" ||
        actor.glyph === "RedInk1"
      ) {
        g.music.play("ink");
        g.sfx.play("inkTeleport");
      }
    });

    g.on("left", ({ depth }) => {
      if (depth === 3 || depth === 6 || depth === 9) g.music.play("mystery");
    });

    g.on("got", ({ item }) => {
      if (item.sting === "slab" && g.music.playing === "vault")
        g.music.play("vaultComplete");
    });
  }
}
