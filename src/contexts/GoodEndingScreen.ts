import EndingScreen from "./base/EndingScreen";

export default class GoodEndingScreen extends EndingScreen {
  render(): void {
    const { chars, graphics, tiles } = this.g;

    switch (this.stage) {
      case 0:
        tiles.clear();
        chars.drawText(
          5,
          12,
          "Jacques approaches the altar, raising the Wisher's Fragment high above him in jubilant victory.",
          30
        );
        break;

      case 1:
        graphics.show("badEnd", 0, -8);
        break;

      case 2:
        graphics.clear(176, 48);
        chars.drawText(
          5,
          22,
          '"Is this truly the Fragment? It\'s so small, delicate and fragile. Truly I was commissioned to retrieve such a trifle of a thing?"',
          30
        );
        break;

      case 3:
        tiles.clear();
        chars.drawText(
          1,
          5,
          "Jacques placed the Wisher's Fragment carefully into his pack and began the arduous trek out. As daylight greeted him with its touch, he breathed a sigh of relief and sat down to stare at the setting sun, retrieving the pocket watch from his belongings and popping it open.\n\nStaring back at him from within are three familiar faces, that of his own and that of a lovely woman and their infant child. Jacques cracks a smile as a tear streams down his cheek, knowing that he'll soon return home after delivering the Fragment to his client.",
          38
        );
        break;

      case 4:
        graphics.show("goodEnd");
        break;

      case 5:
        chars.drawText(
          1,
          22,
          "\"I can't recall how many months it's been, toiling away and digging and inventing, and slowly losing my mind, but this is it! This little Fragment is all the money we'll ever need!\"\n\n\"...And yet, I'd trade every second spent getting it to just be safe at home with you Lillica, to be able to tuck Remi into bed and read him a story like a normal happy family.\"\n\n\"I'm sorry I've been gone for so long, I'm so, so sorry.\"\n\nClutching the pocket watch close to his chest, he closes it and begins the final leg of his journey, a happily ever after surely waiting on his horizon.",
          38
        );
        break;

      default:
        graphics.clear();
        chars.drawText(
          1,
          11,
          "...Or so he'd like to believe, but that, dear friends, is a story for another time.\n\n\nThe End",
          38
        );
        break;
    }
  }
}
