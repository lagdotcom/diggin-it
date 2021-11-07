import EndingScreen from "./EndingScreen";

export default class TrueBadEndingScreen extends EndingScreen {
  render(): void {
    const { chars, graphics, tiles } = this.g;

    switch (this.stage) {
      case 0:
        tiles.clear();
        chars.drawText(
          5,
          12,
          "As the monstrous beast oozes and drips into nothingness, the black tar surrounding Jacques dissipates.",
          30
        );
        break;

      case 1:
        graphics.show("trueBadEnd", 0, -8);
        break;

      case 2:
        graphics.clear(176, 48);
        chars.drawText(
          5,
          22,
          "Clutching his head and screaming, Jacques cannot help but feel he has been staring at himself since entering the mysterious door.",
          30
        );
        break;

      case 3:
        graphics.clear(176, 48);
        chars.drawText(
          1,
          21,
          "Though the vast black mass has vanished, it sticks to his mind like a parasite. The echo of a woman's voice and a child's cry repeat endlessly in rhythmic cycle. Countless voices of past regrets personify and bellow their selfish desires.",
          38
        );
        break;

      case 4:
        graphics.clear(168, 56);
        chars.drawText(
          5,
          22,
          '"Melogrin, the sin. Isole, the infinite. Agnareth, the cage." A thousand voices more begin to chant.',
          30
        );
        break;

      case 5:
        graphics.clear();
        chars.drawText(
          1,
          1,
          '"Begone from me, leave!" Jacques cries, falling to his knees.',
          38
        );
        break;

      case 6:
        graphics.clear();
        chars.drawText(
          1,
          1,
          "They do not, Jacques shakily claws his way out from the pit, finding himself standing before the Wisher's Fragment he so foolishly left behind.",
          38
        );
        break;

      case 7:
        graphics.show("badEnd", 0, -8);
        break;

      case 8:
        graphics.clear(176, 48);
        chars.drawText(
          5,
          22,
          '"These selfish desires, these horrible voices, I wish for everything to return how it was before I entertained these miserable thoughts!"',
          30
        );
        break;

      case 9:
        graphics.clear();
        chars.drawText(
          5,
          8,
          'Remembering nothing of this long voyage and sitting beside his wife and child in their ramshackle apartment, Jacques holds them close before departing on his first expedition.\n\n"I\'ll see you soon Lillica, Remi. I promise!"\n\n\nTO BE CONTINUED...',
          30
        );
        break;
    }
  }
}
