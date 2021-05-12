import Actor from "../Actor";
import { drawPanel } from "../drawing";
import Game from "../Game";
import Thing from "../interfaces/Thing";
import Item from "../Item";
import { name } from "../text";
import Tile from "../Tile";

export default class InfoPanel {
  dirty: boolean;
  info: string;
  lore: boolean;
  target?: Thing | Tile;

  constructor(
    public g: Game,
    public x = 0,
    public y = 0,
    public width = 28,
    public height = 6
  ) {
    this.dirty = false;

    g.on("refreshed", () => (this.dirty = true));
  }

  clear(): void {
    if (!this.target) return;
    this.g.emit("infoClosed", {});

    this.dirty = true;
    this.lore = false;
    this.target = undefined;
  }

  useActor(actor: Actor): void {
    if (this.target === actor) return;
    this.dirty = true;
    this.g.emit("infoOpened", {});

    this.target = actor;
    this.info = name(actor);
    this.lore = !!actor.lore;
  }

  useItem(item: Item): void {
    if (this.target === item) return;
    this.dirty = true;
    this.g.emit("infoOpened", {});

    this.target = item;
    this.info = name(item);
    this.lore = !!item.lore;

    if (item.slot && this.g.player.equipment[item.slot] === item)
      this.info += " (eq)";
  }

  useTile(tile: Tile): void {
    if (this.target === tile) return;
    this.dirty = true;

    if (tile.name) {
      this.g.emit("infoOpened", {});
      this.target = tile;
      this.info = name(tile);
      this.lore = !!tile.lore;
    } else this.clear();
  }

  render(): void {
    if (!this.dirty || !this.target) return;
    this.dirty = false;

    const { chars } = this.g;

    drawPanel(chars, this.x, this.y, this.width, this.height, true);
    chars.drawText(this.x + 1, this.y + 1, this.info, this.width - 2);

    if (this.lore)
      chars.drawText(
        this.x + 1,
        this.y + this.height - 2,
        "e[X]amine for more."
      );
  }
}
