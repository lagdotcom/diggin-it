import Game from "../Game";
import { wordWrap } from "../utils";
import ScrollingTextScreen from "./base/ScrollingTextScreen";

const credits = `CREDITS

Written & Directed by:
Jacob J. Ritz

Planning:
- Paul Davies (@lagdotcom)
- Jacob J. Ritz (@UltraJDude)

Programming:
- Paul Davies

Art:
- Jacob J. Ritz

Music:
- Zan-zan-zawa-veia (@zanzanzawa)

Sound Effects:
- Jacob J. Ritz

Room Design:
- Paul Davies
- Jacob J. Ritz
- Zan-zan-zawa-veia

Additional Writing & Editing:
- Pauli M. Kohberger (@moon__hotel)

Additional Testing:
- Nicholas Houser
- Cloud8745

Trailer Assistance:
- Craig LeBarron`;

export default class CreditsScreen extends ScrollingTextScreen {
  x: number;
  y: number;

  constructor(g: Game) {
    super(g, "CreditsScreen", wordWrap(credits, g.charsWidth - 2));
  }
}
