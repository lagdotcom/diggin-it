import PickingUp from "../commands/PickingUp";
import { drawMulti, drawPanel } from "../drawing";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Cmd, { BuyCmd, CancelCmd } from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Item, { ItemOptions } from "../Item";
import {
  airTank,
  bomb,
  busterArmour,
  claws,
  hammer,
  ladder,
  machete,
  militaryMail,
  pickaxe,
  rations,
  reinforced,
  rope,
  shovel,
  spelunkersKit,
  squadLeaderGear,
} from "../items";
import { pad } from "../utils";

type OfferType = "stat" | "use" | "weapon" | "armour";
interface Offer {
  glyph: string;
  name?: string;
  cost: number;
}

const positions: Record<OfferType, number> = {
  stat: 2,
  use: 12,
  weapon: 22,
  armour: 32,
};

const items: Record<string, Partial<ItemOptions>> = {
  [bomb.glyph]: bomb,
  [ladder.glyph]: ladder,
  [rations.glyph]: rations,
  [airTank.glyph]: airTank,
  [rope.glyph]: rope,

  [shovel.glyph]: shovel,
  [pickaxe.glyph]: pickaxe,
  [hammer.glyph]: hammer,
  [claws.glyph]: claws,
  [machete.glyph]: machete,

  [reinforced.glyph]: reinforced,
  [spelunkersKit.glyph]: spelunkersKit,
  [militaryMail.glyph]: militaryMail,
  [squadLeaderGear.glyph]: squadLeaderGear,
  [busterArmour.glyph]: busterArmour,
};

export default class ShopScreen implements Context {
  spots: Hotspots<string>;
  offers: Record<string, Offer>;
  stat: Offer[];
  use: Offer[];
  weapon: Offer[];
  armour: Offer[];

  constructor(public g: Game) {
    this.spots = new Hotspots();
    this.offers = {};
    this.stat = [];
    this.use = [];
    this.weapon = [];
    this.armour = [];

    const cost = this.getStatCost();
    this.addOffer("stat", "HP", cost, "HP");
    this.addOffer("stat", "SP", cost, "SP");
    this.addOffer("stat", "DP", cost, "DP");

    this.addOffer("use", bomb.glyph, 300);
    this.addOffer("use", ladder.glyph, 250);
    this.addOffer("use", rations.glyph, 500);
    this.addOffer("use", airTank.glyph, 300);
    this.addOffer("use", rope.glyph, 250);

    this.addOffer("weapon", shovel.glyph, 1000);
    this.addOffer("weapon", pickaxe.glyph, 1500);
    this.addOffer("weapon", hammer.glyph, 2200);
    this.addOffer("weapon", claws.glyph, 3000);
    this.addOffer("weapon", machete.glyph, 3500);

    this.addOffer("armour", reinforced.glyph, 400);
    this.addOffer("armour", spelunkersKit.glyph, 900);
    this.addOffer("armour", militaryMail.glyph, 1600);
    this.addOffer("armour", squadLeaderGear.glyph, 2500);
    this.addOffer("armour", busterArmour.glyph, 3600);

    this.renderPanels();
    this.render();
  }

  addOffer(type: OfferType, glyph: string, cost: number, name?: string): void {
    const x = positions[type];
    const y = 8 + this[type].length * 3;
    this.spots.register(glyph, x, y, 6, 2);

    const offer = { glyph, name, cost };
    this.offers[glyph] = offer;
    this[type].push(offer);
  }

  handle(cmd: CancelCmd | BuyCmd): void {
    const { player } = this.g;

    if (cmd.type === "cancel") {
      this.g.depth++;
      this.g.nextMap();
      return;
    }

    const offer = this.offers[cmd.name];
    let redocosts = false;
    if (offer.cost <= player.experience) {
      switch (offer.glyph) {
        case "HP":
          player.maxhp += 5;
          player.hp += 5;
          player.player.stats++;
          redocosts = true;
          break;

        case "SP":
          player.sp++;
          player.player.stats++;
          redocosts = true;
          break;

        case "DP":
          player.dp++;
          player.player.stats++;
          redocosts = true;
          break;

        default:
          const item = new Item(0, 0, items[cmd.name]);
          if (!PickingUp.addToInventory(this.g, player, item, true)) return;
          if (item.slot) player.equipment[item.slot] = item;
          break;
      }

      player.experience -= offer.cost;
      if (redocosts) this.recalculateStatOffers();
      return this.render();
    }
  }

  getStatCost(): number {
    return 50 * (this.g.player.player.stats + 1);
  }

  recalculateStatOffers(): void {
    const cost = this.getStatCost();
    this.stat.forEach((o) => (o.cost = cost));
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.code) {
      case "Escape":
      case "Backspace":
      case "n":
        return { type: "cancel" };
    }
  }
  onMouse(e: MouseEvent): Cmd {
    if (e.type === "mousemove") return;
    if (e.button === 2) return { type: "cancel" };

    if (e.button === 0) {
      const [ex, ey] = this.g.chars.eventToPosition(e);
      const spot = this.spots.resolve(ex, ey);
      if (spot) {
        const [name] = spot;
        if (name === "exit") return { type: "cancel" };
        return { type: "buy", name };
      }
    }
  }

  renderPanels(): void {
    const { chars, tiles } = this.g;

    tiles.clear();

    drawPanel(chars, 12, 1, 16, 3);
    chars.drawText(13, 2, "SPEND YOUR EXP");

    drawPanel(chars, 1, 5, 8, 18);
    chars.drawText(2, 6, "STATS");

    drawPanel(chars, 11, 5, 8, 18);
    chars.drawText(13, 6, "USE");

    drawPanel(chars, 21, 5, 8, 18);
    chars.drawText(22, 6, "WEAPON");

    drawPanel(chars, 31, 5, 8, 18);
    chars.drawText(32, 6, "ARMOUR");

    drawPanel(chars, 17, 24, 6, 3);
    chars.drawText(18, 25, "EXIT");
    this.spots.register("exit", 17, 24, 6, 3);

    chars.drawText(30, 1, "EXP TOTAL");
  }

  render(): void {
    const { chars, player } = this.g;

    chars.drawText(33, 2, pad(player.experience, 6, "0"));

    this.showOffers("stat");
    this.showOffers("use");
    this.showOffers("weapon");
    this.showOffers("armour");
  }

  showOffers(type: OfferType): void {
    const { chars } = this.g;

    const x = positions[type];
    let y = 8;

    this[type].forEach((o) => {
      drawMulti(chars, x, y, 2, 2, o.glyph);
      if (o.name) chars.drawText(x + 2, y, o.name);
      chars.drawText(x + 2, y + 1, pad(o.cost, 4, "0"));

      y += 3;
    });
  }
}
