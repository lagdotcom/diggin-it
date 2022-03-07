import pkg from "../../package.json";
import Game from "../Game";
import ScrollingTextScreen from "./base/ScrollingTextScreen";

const helpLines = [
  `Diggin' It (v${pkg.version})`,
  "",
  "[Left Click]:",
  "Move to adjacent tile/climb adjacent step",
  "Attack adjacent enemy",
  "Select target on play field (ranged",
  " attacks and object placement)",
  "Wait (click on Jacques)",
  "Go through floor exits and doors",
  "Equip or unequip inventory equipment",
  "Use inventory items",
  "Use shop interface",
  "Check further action history",
  "",
  "[Right Click]:",
  "Dig adjacent tile without moving",
  "Grab item from play field (player must",
  " be standing on the same tile)",
  "Drop item from inventory",
  "Restart game upon death",
  "",
  "[Arrow Keys]:",
  "Move to adjacent tile",
  "Climb adjacent step",
  "",
  "[Esc]:",
  "Exit large screen menus",
  "Restart game upon death",
  "",
  "[Enter or >]:",
  "Go through floor exits and doors",
  "",
  "[Shift + Arrow Keys]:",
  "Dig adjacent tile without moving",
  "",
  "[g]:",
  "Grab item from play field (player must",
  " be standing on the same tile)",
  "",
  "[x]:",
  "Examine detailed item and",
  " enemy descriptions",
  "",
  "[. or 5]:",
  "Wait",
  "",
  "[?]:",
  "Show controls in game",
];

export default class HelpScreen extends ScrollingTextScreen {
  constructor(public g: Game) {
    super(g, "HelpScreen", helpLines);
  }

  onCancel() {
    this.g.emit("refreshed", {});
    this.g.tiles.clear();

    this.g.contexts.pop();
    this.g.contexts.top.render();
  }
}
