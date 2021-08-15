import { drawPanel } from "../drawing";
import Game from "../Game";
import Hotspots from "../Hotspots";
import XY from "../interfaces/XY";
import { hasAmount } from "../text";
import RangeOverlay from "./RangeOverlay";

const colourEq = "rgba(255,255,0,0.1)";
const colourSel = "rgba(255,255,255,0.2)";
const colourEqSel = "rgba(255,255,0,0.3)";

export default class Inventory {
  dirty: boolean;
  selected?: number;
  spots: Hotspots<number>;

  constructor(
    public g: Game,
    public overlay: RangeOverlay,
    public x = 28,
    public y = 12,
    public width = 12,
    public height = 10
  ) {
    this.dirty = true;

    const dirty = () => (this.dirty = true);
    g.on("dropped", dirty);
    g.on("equipped", dirty);
    g.on("got", dirty);
    g.on("refreshed", dirty);
    g.on("used", dirty);

    this.createHotspots();
  }

  private createHotspots() {
    this.spots = new Hotspots();
    let x = 29,
      y = 13;
    for (let i = 0; i < this.g.player.inventorySize; i++) {
      this.spots.register(i, x, y, 2, 2);

      x += 2;
      if (i % 5 === 4) {
        y += 2;
        x = 29;
      }
    }
  }

  useMouse(mouse: XY): void {
    const spot = this.getHover(mouse);
    if (spot !== this.selected) {
      this.selected = spot;
      this.dirty = true;

      const item =
        typeof spot === "number" ? this.g.player.inventory[spot] : undefined;
      this.overlay.useItem(item);
    }
  }

  getHover(mouse?: XY): number | undefined {
    if (mouse) {
      const spot = this.spots.resolve(...mouse);
      return spot ? spot[0] : undefined;
    }
  }

  render(): void {
    if (!this.dirty) return;
    this.dirty = false;

    const { chars, player } = this.g;

    drawPanel(chars, this.x, this.y, this.width, this.height);

    let x = 29,
      y = 13;
    for (let i = 0; i < player.inventorySize; i++) {
      const item = player.inventory[i];

      if (!item) {
        // TODO: this sucks
        drawPanel(chars, x, y, 2, 2);
      } else {
        const equipped = item.slot && player.equipment[item.slot] === item;
        const selected = this.selected === i;
        const tileBg = equipped
          ? selected
            ? colourEqSel
            : colourEq
          : selected
          ? colourSel
          : undefined;

        chars.draw(x, y, item.glyph + "1", undefined, tileBg);
        chars.draw(x + 1, y, item.glyph + "2", undefined, tileBg);
        const bl = [item.glyph + "3"];
        const br = [item.glyph + "4"];
        const fg = ["transparent", "transparent"];
        const bg = [tileBg ? tileBg : "black", "transparent"];

        if (hasAmount(item)) {
          const amount = Math.min(99, item.charges);
          const tens = Math.floor(amount / 10).toString();
          const digits = (amount % 10).toString();

          br.push("qty" + digits);
          if (amount > 9) bl.push("qty" + tens);
        }

        chars.draw(x, y + 1, bl, fg, bg);
        chars.draw(x + 1, y + 1, br, fg, bg);
      }

      x += 2;
      if (i % 5 === 4) {
        y += 2;
        x = 29;
      }
    }
  }
}
