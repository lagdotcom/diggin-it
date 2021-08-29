import Actor from "../Actor";
import { targetColour } from "../colours";
import Game from "../Game";
import XY from "../interfaces/XY";
import Item from "../Item";
import { traceline } from "../utils";
import { TileRender } from "./MainDisplay";

const asTag = ([x, y]: XY) => `${x},${y}`;

export default class RangeOverlay {
  actor?: Actor;
  item?: Item;
  range: Set<string>;
  signature: string;

  constructor(public g: Game) {
    const update = () => this.update();
    g.on("digged", update);
    g.on("mapChanged", update);
    g.on("moved", update);

    this.range = new Set<string>();
    this.signature = "";
    this.renderCb = this.renderCb.bind(this);
  }

  useActor(actor?: Actor): void {
    // TODO: this does not work well with the red ink
    if (actor !== this.actor) {
      this.actor = actor;
      this.item = undefined;
      this.update();
    }
  }

  useItem(item: Item): void {
    if (item !== this.item) {
      this.actor = undefined;
      this.item = item;
      this.update();
    }
  }

  private update(): void {
    const { actor, item, signature } = this;
    const { map, player } = this.g;

    this.range.clear();
    if (["launcher", "throw"].includes(item?.use))
      map
        .diamond(player.x, player.y, item.useArgs[0])
        .filter(([x, y]) => {
          const hit = traceline(this.g, player.x, player.y, x, y, player);
          return !hit || hit._type === "Actor";
        })
        .forEach((xy) => this.range.add(asTag(xy)));

    if (actor?.attackRange > 1)
      map
        .diamond(actor.x, actor.y, actor.attackRange)
        .filter(([x, y]) => {
          const hit = traceline(this.g, player.x, player.y, x, y, player);
          return !hit || hit._type === "Actor";
        })
        .forEach((xy) => this.range.add(asTag(xy)));

    const newSig = Array.from(this.range).reduce((a, b) => a + "/" + b, "");
    if (signature !== newSig) {
      this.signature = newSig;
      this.g.emit("refreshed", {});
    }
  }

  renderCb(data: TileRender): TileRender {
    const tag = asTag([data.x, data.y]);
    if (this.range.has(tag)) {
      data.glyphs.unshift("Targeting");
      data.fg = targetColour;
    }

    return data;
  }
}
