import Game from "../Game";

export default class Sound {
  constructor(public g: Game) {
    g.on("chipped", () => g.sfx.play("chip"));

    g.on("damaged", ({ victim }) => {
      if (victim.player) g.sfx.play("hurt");
    });

    g.on("digged", ({ tile, type }) => {
      if (type === "dig") {
        if (tile.name === "sand") return g.sfx.play("digSand");
        return g.sfx.play("digDirt");
      }
    });

    g.on("exploded", () => g.sfx.play("explode"));

    g.on("used", ({ item }) => {
      if (item.use === "throw") g.sfx.play("projectile");
    });
  }
}
