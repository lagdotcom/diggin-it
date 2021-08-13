import { explosion } from "../entities/temps";
import { empty } from "../entities/tiles";
import Game from "../Game";
import Item from "../Item";
import Tile from "../Tile";

export default class Bombs {
  bombs: Item[];

  constructor(public g: Game) {
    this.bombs = [];
    g.on("litBomb", ({ item }) => this.bombs.push(item));
    g.on("tick", () => this.run());
  }

  run(): void {
    const remove: Item[] = [];
    this.bombs.forEach((bomb) => {
      const [fuse, xm, ym, w, h, dmg] = bomb.useArgs;

      if (fuse < 2) {
        remove.push(bomb);
        this.g.log.add("There is a large explosion!");
        this.g.removeItem(bomb);

        for (let yo = 0; yo < h; yo++) {
          for (let xo = 0; xo < w; xo++) {
            this.explode(bomb.x + xm + xo, bomb.y + ym + yo, dmg);
          }
        }

        return;
      }

      bomb.useArgs = [fuse - 1, xm, ym, w, h, dmg];
    });

    this.bombs = this.bombs.filter((bomb) => !remove.includes(bomb));
  }

  explode(x: number, y: number, dmg: number): void {
    const { map, player } = this.g;

    const { actor, items, tile } = this.g.contents(x, y);
    if (actor?.alive) {
      actor.hp -= dmg;
      this.g.emit("damaged", {
        attacker: player,
        victim: actor,
        amount: dmg,
        type: "bomb",
      });
    }

    items.forEach((item) => this.g.emit("exploded", { item }));

    if (tile.solid && !tile.indestructible) {
      // TODO: create rock?
      map.set(x, y, new Tile(empty));
      this.g.emit("digged", { tile, x, y, type: "bomb" });
    }

    const effect = new Item(x, y, explosion);
    this.g.addItem(effect);
    this.g.emit("effect", { effect, duration: 2 });
  }
}
