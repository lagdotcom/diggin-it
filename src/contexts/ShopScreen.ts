import { fg, targetColour } from "../colours";
import PickingUp from "../commands/PickingUp";
import Inventory from "../display/Inventory";
import Stats from "../display/Stats";
import { drawMulti, drawPanel } from "../drawing";
import { pocketwatch } from "../entities/items";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Item from "../Item";
import Soon from "../Soon";
import { ItemName, items } from "../tables";

type SpecialItem = "hp" | "sp" | "dp" | "repair";
const statItems = ["hp", "sp", "dp"];
type ShopItem = {
  item: ItemName | SpecialItem;
  glyph: string;
  name?: string;
  cost: number;
};

const isBrokenMemento = (i?: Item) => i?.glyph === "BrokenPocketwatch";

const ixNone = -1;
const ixScrollUp = -100;
const ixScrollDown = -101;

const columnCount = 5;
class ShopSection {
  dirty: boolean;
  highlighted: number;
  items: ShopItem[];
  offset: number;

  constructor(
    public parent: ShopScreen,
    public name: string,
    public x: number,
    public g = parent.g
  ) {
    this.dirty = true;
    this.highlighted = ixNone;
    this.items = [];
    this.offset = 0;
  }

  get canScrollUp() {
    return this.offset > 0;
  }
  get canScrollDown() {
    return this.items.length > this.offset + columnCount;
  }

  get hotspots() {
    const { x } = this;
    const h = new Hotspots<number>();

    let y = 7;
    for (let i = 0; i < columnCount; i++) {
      const index = this.offset + i;
      const item = this.items[index];
      if (!item) break;

      h.register(index, x + 1, y, 6, 2);
      y += 3;
    }

    if (this.canScrollUp) h.register(ixScrollUp, x + 1, 21, 1, 1);
    if (this.canScrollDown) h.register(ixScrollDown, x + 6, 21, 1, 1);

    return h;
  }

  get selectedItem() {
    if (this.highlighted >= 0) return this.items[this.highlighted];
  }

  addItem(item: ShopItem): this {
    this.parent.costs[item.item] = item.cost;
    this.dirty = true;
    this.items.push(item);
    return this;
  }

  addByName(item: ItemName, cost: number): this {
    this.parent.costs[item] = cost;

    const glyph = items[item].glyph;
    return this.addItem({ item, glyph, cost });
  }

  removeItem(item: ShopItem): this {
    const index = this.items.indexOf(item);
    if (index >= 0) this.items.splice(index, 1);

    this.dirty = true;
    return this;
  }

  scroll(direction: number) {
    if (direction === ixScrollUp && this.canScrollUp) this.offset--;
    if (direction === ixScrollDown && this.canScrollDown) this.offset++;

    this.dirty = true;
  }

  renderPanel() {
    const { x } = this;
    const { chars } = this.g;

    drawPanel(chars, x, 4, 8, 18, true);
    chars.drawText(x + 1, 5, this.name);
  }

  render() {
    const { x } = this;
    const { chars } = this.g;

    if (this.dirty) {
      this.dirty = false;
      this.renderPanel();
    }

    let y = 7;
    for (let i = 0; i <= 4; i++) {
      const index = this.offset + i;
      const item = this.items[index];
      if (!item) break;

      const highlighted = index === this.highlighted;
      const colour = highlighted ? fg(targetColour) : "";

      drawMulti(
        chars,
        x + 1,
        y,
        2,
        2,
        item.glyph,
        highlighted ? targetColour : undefined
      );
      if (item.name) chars.drawText(x + 3, y, colour + item.name);

      const cost = item.cost.toString();
      chars.drawText(x + 7 - cost.length, y + 1, colour + cost);

      y += 3;
    }

    if (this.canScrollUp)
      chars.draw(
        x + 1,
        21,
        "ScrollUp",
        this.highlighted === ixScrollUp ? targetColour : "transparent"
      );
    if (this.canScrollDown)
      chars.draw(
        x + 6,
        21,
        "ScrollDown",
        this.highlighted === ixScrollDown ? targetColour : "transparent"
      );
  }
}

export default class ShopScreen implements Context {
  firstRender: boolean;
  statsSection: ShopSection;
  useSection: ShopSection;
  equipSection: ShopSection;
  hpItem: ShopItem;
  spItem: ShopItem;
  dpItem: ShopItem;
  repairItem: ShopItem;
  stats: Stats;
  inventory: Inventory;
  sections: ShopSection[];
  rerender: Soon;
  item: ShopItem;
  costs: Record<string, number>;
  exit: [x: number, y: number, w: number, h: number];
  hotspots: Hotspots<string>;

  constructor(public g: Game) {
    this.costs = {};
    this.firstRender = true;
    this.rerender = new Soon(() => this.render(), true);

    this.exit = [17, g.charsHeight - 3, 6, 3];
    this.hotspots = new Hotspots();
    this.hotspots.register("exit", ...this.exit);

    this.hpItem = { item: "hp", glyph: "HP", name: "HP", cost: 0 };
    this.spItem = { item: "sp", glyph: "SP", name: "SP", cost: 0 };
    this.dpItem = { item: "dp", glyph: "DP", name: "DP", cost: 0 };
    this.updateStatCosts();

    this.statsSection = new ShopSection(this, "STATS", 2)
      .addItem(this.hpItem)
      .addItem(this.spItem)
      .addItem(this.dpItem);

    if (g.player.inventory.find(isBrokenMemento)) {
      this.repairItem = { item: "repair", glyph: "Pocketwatch", cost: 9999 };
      this.statsSection.addItem(this.repairItem);
    }

    this.useSection = new ShopSection(this, " USE", 10)
      .addByName("staple", 140)
      .addByName("ladder", 280)
      .addByName("rope", 280)
      .addByName("bomb", 380)
      .addByName("ropeBomb", 520)
      .addByName("cherryBomb", 570)
      .addByName("greenloaf", 230)
      .addByName("rations", 450)
      .addByName("medikit", 800)
      .addByName("breathTablet", 170)
      .addByName("airGum", 340)
      .addByName("airTank", 660)
      .addByName("serum", 450)
      .addByName("adrenaline", 450)
      .addByName("suture", 450)
      .addByName("rock", 90)
      .addByName("arrow", 190)
      .addByName("blowdart", 190)
      .addByName("mambele", 340)
      .addByName("bolas", 660);

    this.equipSection = new ShopSection(this, "EQUIP", 18)
      .addByName("pocketknife", 840)
      .addByName("shovel", 1140)
      .addByName("pickaxe", 1700)
      .addByName("hammer", 2520)
      .addByName("axe", 3040)
      .addByName("claws", 3420)
      .addByName("machete", 3950)
      .addByName("slingshot", 570)
      .addByName("blowgun", 2600)
      .addByName("bow", 3800)
      .addByName("clothes", 750)
      .addByName("reinforced", 1120)
      .addByName("spelunkersKit", 1600)
      .addByName("militaryMail", 2180)
      .addByName("squadLeaderGear", 2650)
      .addByName("busterArmour", 3050)
      .addByName("wingArmour", 3300);

    this.stats = new Stats(g);
    this.inventory = new Inventory(g);
    this.sections = [this.statsSection, this.useSection, this.equipSection];
  }

  getStatCost(): number {
    return 100 * (this.g.player.player.stats + 1);
  }
  updateStatCosts(): void {
    const cost = this.getStatCost();
    this.hpItem.cost = cost;
    this.spItem.cost = cost;
    this.dpItem.cost = cost;
    this.costs["hp"] = cost;
    this.costs["sp"] = cost;
    this.costs["dp"] = cost;
  }

  handle(cmd: Cmd): void {
    const { player } = this.g;

    if (cmd.type === "cancel") {
      this.rerender.stop();
      this.g.depth++;
      this.g.nextMap();
      return;
    }

    if (cmd.type === "buy") {
      const isStat = statItems.includes(cmd.name);
      const cost = this.costs[cmd.name];
      if (player.experience < cost) return;

      if (cmd.name === "repair") {
        const index = player.inventory.findIndex(isBrokenMemento);
        player.inventory[index] = new Item(0, 0, pocketwatch);

        this.statsSection.removeItem(this.repairItem);
        this.statsSection.renderPanel();
      } else if (isStat) {
        player.player.stats++;
        if (cmd.name === "hp") {
          player.maxHp += 5;
          player.hp += 5;
        } else if (cmd.name === "sp") {
          player.sp++;
        } else if (cmd.name === "dp") {
          player.dp++;
        }

        this.updateStatCosts();
      } else {
        const item = new Item(0, 0, items[cmd.name as ItemName]);
        if (!PickingUp.addToInventory(this.g, player, item, true)) return;
        if (item.slot) player.equipment[item.slot] = item;
      }

      player.experience -= cost;
      this.g.emit("refreshed", {});
      this.rerender.start();
    }
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.code) {
      case "Escape":
      case "Backspace":
      case "n":
      case "N":
        return { type: "cancel" };
    }
  }

  onMouse(e: MouseEvent): Cmd {
    if (e.button === 2) {
      e.preventDefault();
      return { type: "cancel" };
    }

    const pos = this.g.chars.eventToPosition(e);
    if (e.type === "click" && e.button === 0) {
      const spot = this.hotspots.resolve(...pos);
      if (spot) return { type: "cancel" };

      for (const s of this.sections) {
        if (s.highlighted === ixNone) continue;

        const item = s.selectedItem;
        if (item) return { type: "buy", name: item.item };

        s.scroll(s.highlighted);
        this.rerender.start();
        return;
      }
    }

    for (const s of this.sections) {
      const h = s.hotspots;
      const i = h.resolve(...pos);
      if (i) s.highlighted = i[0];
      else s.highlighted = ixNone;
    }
    this.rerender.start();
  }

  render(): void {
    const { chars, tiles } = this.g;

    if (this.firstRender) {
      this.firstRender = false;
      tiles.clear();

      drawPanel(chars, 7, 0, 16, 3);
      chars.drawText(8, 1, "SPEND YOUR EXP");

      const [x, y, w, h] = this.exit;
      drawPanel(chars, x, y, w, h);
      chars.drawText(x + 1, y + 1, "EXIT");
    }

    this.stats.render();
    this.inventory.render();

    this.statsSection.render();
    this.useSection.render();
    this.equipSection.render();
  }
}
