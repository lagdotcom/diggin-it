import Game from "../Game";
import Cmd, { DropCmd, UseCmd } from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import Item from "../Item";
import Soon from "../Soon";
import { wrap } from "../utils";
import Dungeon from "./Dungeon";
import ExamineScreen from "./ExamineScreen";

export default class UsingInventory implements Context {
  current?: Item;
  rerender: Soon;

  constructor(public g: Game, public parent: Dungeon) {
    this.rerender = new Soon("UsingInventory", this.render.bind(this));
    g.log.add("Selecting... (ESC/r-click to cancel)");
    this.highlight(0);
  }

  exit(): void {
    this.highlight();
    this.parent.info.clear();
    this.g.contexts.pop();
  }

  highlight(index?: number): void {
    this.parent.inventory.selected = index;
    this.g.emit("inventoryChanged", {});
    this.rerender.start();

    this.current = this.g.player.inventory[index];
  }

  destination(mx: number, my: number): number {
    const start = this.parent.inventory.selected || 0;
    return wrap(start + mx + my * 5, this.g.player.inventorySize);
  }

  onKey(e: KeyboardEvent): Cmd {
    switch (e.key) {
      case "ArrowLeft":
        return { type: "move", x: -1, y: 0 };
      case "ArrowRight":
        return { type: "move", x: 1, y: 0 };
      case "ArrowUp":
        return { type: "move", x: 0, y: -1 };
      case "ArrowDown":
        return { type: "move", x: 0, y: 1 };

      case "Enter":
      case "Return":
        return { type: "use", index: this.parent.inventory.selected };

      case "d":
      case "D":
        return { type: "drop", index: this.parent.inventory.selected };

      case "Tab":
      case "i":
      case "I":
      case "Escape":
      case "Backspace":
      case "n":
      case "N":
        e.preventDefault();
        return { type: "cancel" };

      case "x":
        return { type: "examine" };
    }
  }

  onMouse(e: MouseEvent): Cmd {
    // defer to Dungeon mouse handling (unless it would make you move)
    const cmd = this.parent.onMouse(e);
    if (cmd && cmd.type !== "move") {
      this.exit();
      return cmd;
    }

    // allow quitting the usual way
    if (e.button === 2) {
      e.preventDefault();
      return { type: "cancel" };
    }
  }

  handle(cmd: Cmd): void {
    switch (cmd.type) {
      case "cancel":
        this.parent.rerender.start();
        return this.exit();
      case "move":
        return this.highlight(this.destination(cmd.x, cmd.y));
      case "use":
        return this.handleUse(cmd);
      case "drop":
        return this.handleDrop(cmd);
      case "examine":
        return this.handleExamine();
    }
  }

  handleDrop(cmd: DropCmd): void {
    if (!this.g.player.inventory[cmd.index]) return;

    this.exit();
    this.parent.handleDrop(cmd);
  }

  handleUse({ index }: UseCmd): void {
    const item = this.g.player.inventory[index];
    if (item) {
      this.exit();
      this.parent.handle(this.parent.getInventoryUseCmd(item, index));
      this.rerender.stop();
    }
  }

  handleExamine(): void {
    const item = this.g.player.inventory[this.parent.inventory.selected];
    if (item) this.g.contexts.push(new ExamineScreen(this.g, item));
  }

  render(): void {
    this.parent.render();

    if (this.current) {
      this.parent.info.useItem(this.current);
      this.parent.info.render();
    }
  }
}
