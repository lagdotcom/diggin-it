import { drawPanel } from "../drawing";
import Game from "../Game";

export default class Inventory {
  dirty: boolean;

  constructor(
    public g: Game,
    public x = 28,
    public y = 10,
    public width = 12,
    public height = 12
  ) {
    this.dirty = true;

    const dirty = () => (this.dirty = true);
    g.on("dropped", dirty);
    g.on("got", dirty);
    g.on("refreshed", dirty);
    g.on("used", dirty);
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
        chars.draw(x, y, item.glyph + "1");
        chars.draw(x + 1, y, item.glyph + "2");
        const bl = [item.glyph + "3"];
        const br = [item.glyph + "4"];
        const fg = ["transparent", "transparent"];
        const bg = ["black", "transparent"];

        if (item.charges > 1) {
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
