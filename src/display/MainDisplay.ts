import Game from "../Game";
import XY from "../interfaces/XY";
import Vision from "../systems/Vision";
import InfoPanel from "./InfoPanel";

export default class MainDisplay {
  dirtyBot: boolean;
  dirtyTop: boolean;

  constructor(
    public g: Game,
    public info: InfoPanel,
    public vision: Vision,
    public x = 0,
    public y = 0,
    public width = g.displayWidth,
    public height = g.displayHeight,
    public topHeight = 3
  ) {
    this.dirtyBot = true;
    this.dirtyTop = true;

    const maybeBoth = () => {
      this.dirtyBot = true;
      if (!info.target) this.dirtyTop = true;
    };
    g.on("died", maybeBoth);
    g.on("dropped", maybeBoth);
    g.on("equipped", maybeBoth);
    g.on("got", maybeBoth);
    g.on("mapChanged", maybeBoth);
    g.on("moved", maybeBoth);

    g.on("refreshed", () => (this.dirtyBot = this.dirtyTop = true));
    g.on("infoClosed", () => (this.dirtyTop = true));
  }

  render(): void {
    if (this.dirtyBot) this.renderBot();
    if (this.dirtyTop) this.renderTop();
  }

  renderBot(): void {
    this.dirtyBot = false;
    this.renderTiles(this.x, this.topHeight, this.width, this.height);
  }

  renderTop(): void {
    this.dirtyTop = false;
    this.renderTiles(this.x, this.y, this.width, this.topHeight);
  }

  getOffset(): XY {
    const { width, height } = this;
    const { player } = this.g;

    const xmod = Math.floor(width / 2 - player.x);
    const ymod = Math.floor(height / 2 - player.y);
    return [xmod, ymod];
  }

  private renderTiles(sx: number, sy: number, ex: number, ey: number) {
    const { memory, tiles } = this.g;
    const vision = this.vision.get();
    const [xmod, ymod] = this.getOffset();

    for (let y = sy; y < ey; y++) {
      for (let x = sx; x < ex; x++) {
        const tx = x - xmod,
          ty = y - ymod;

        const inFov = vision.get(tx, ty);
        const inMemory = memory.get(tx, ty);
        if (!inFov && !inMemory) {
          tiles.draw(x, y, " ");
          continue;
        }

        const colour = inFov ? "transparent" : "rgba(0,0,0,0.5)";
        const { actor, items, tile } = this.g.contents(tx, ty);

        const glyphs: string[] = [tile.glyph];
        glyphs.push(...items.map((i) => i.glyph));
        if (actor && inFov) glyphs.push(actor.glyph);

        const fgs = new Array<string>(glyphs.length).fill(colour);
        const bgs = new Array<string>(glyphs.length).fill("transparent");
        tiles.draw(x, y, glyphs, fgs, bgs);
      }
    }
  }
}
