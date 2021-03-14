import Inventory from "../commands/Inventory";
import { drawMulti, drawPanel } from "../drawing";
import Game from "../Game";
import Hotspots from "../Hotspots";
import Cmd from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Item, { ItemOptions } from "../Item";
import {
  airTank,
  bomb,
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

    this.addOffer("stat", "HP", 50, "HP");
    this.addOffer("stat", "SP", 50, "SP");
    this.addOffer("stat", "DP", 50, "DP");
    this.recalculateStatOffers();

    this.addOffer("use", bomb.glyph, 300);
    this.addOffer("use", ladder.glyph, 250);
    this.addOffer("use", rations.glyph, 500);
    this.addOffer("use", airTank.glyph, 800);
    this.addOffer("use", rope.glyph, 250);

    this.addOffer("weapon", shovel.glyph, 1000);
    this.addOffer("weapon", pickaxe.glyph, 1500);
    this.addOffer("weapon", hammer.glyph, 2200);
    this.addOffer("weapon", claws.glyph, 3000);
    this.addOffer("weapon", machete.glyph, 3500);

    this.addOffer("armour", reinforced.glyph, 500);
    this.addOffer("armour", spelunkersKit.glyph, 650);
    this.addOffer("armour", militaryMail.glyph, 850);
    this.addOffer("armour", squadLeaderGear.glyph, 1000);

    this.renderPanels();
    this.render();
  }

  addOffer(type: OfferType, glyph: string, cost: number, name?: string) {
    const x = positions[type];
    const y = 8 + this[type].length * 3;
    this.spots.register(glyph, x, y, 6, 2);

    const offer = { glyph, name, cost };
    this.offers[glyph] = offer;
    this[type].push(offer);
  }

  handle(cmd: Cmd): void {
    const { player } = this.g;

    switch (cmd.type) {
      case "cancel":
        this.g.depth++;
        this.g.nextMap();
        break;

      case "buy":
        const offer = this.offers[cmd.name];
        var redocosts = false;
        if (offer.cost <= player.experience) {
          switch (offer.glyph) {
            case "HP":
              player.maxhp++;
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
              if (!Inventory.addToInventory(this.g, player, item, true)) return;
              if (item.slot) player.equipment[item.slot] = item;
              break;
          }

          player.experience -= offer.cost;
          if (redocosts) this.recalculateStatOffers();
          return this.render();
        }
        break;
    }
  }

  recalculateStatOffers() {
    const { player } = this.g;

    this.stat.forEach((o) => (o.cost = 50 + player.player.stats * 10));
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

    drawPanel(chars, 1, 5, 8, 19);
    chars.drawText(2, 6, "STATS");

    drawPanel(chars, 11, 5, 8, 19);
    chars.drawText(13, 6, "USE");

    drawPanel(chars, 21, 5, 8, 19);
    chars.drawText(22, 6, "WEAPON");

    drawPanel(chars, 31, 5, 8, 19);
    chars.drawText(32, 6, "ARMOUR");

    drawPanel(chars, 17, 25, 6, 3);
    chars.drawText(18, 26, "EXIT");
    this.spots.register("exit", 17, 25, 6, 3);

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

  showOffers(type: OfferType) {
    const { chars } = this.g;

    var x = positions[type];
    var y = 8;

    this[type].forEach((o) => {
      drawMulti(chars, x, y, 2, 2, o.glyph);
      if (o.name) chars.drawText(x + 2, y, o.name);
      chars.drawText(x + 2, y + 1, pad(o.cost, 4, "0"));

      y += 3;
    });
  }
}
