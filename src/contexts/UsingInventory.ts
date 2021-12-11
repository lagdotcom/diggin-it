import Game from "../Game";
import Cmd, { DropCmd, UseCmd } from "../interfaces/Cmd";
import Context from "../interfaces/Context";
import { wrap } from "../utils";
import Dungeon from "./Dungeon";

export default class UsingInventory implements Context {
  constructor(public g: Game, public parent: Dungeon) {
    this.highlight(0);
  }

  exit(): void {
    this.highlight();
    this.g.contexts.pop();
  }

  highlight(index?: number): void {
    this.parent.inventory.selected = index;
    this.g.emit("inventoryChanged", {});
    this.parent.rerender.start();
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
      case "Escape":
      case "Backspace":
      case "n":
      case "N":
        e.preventDefault();
        return { type: "cancel" };
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
        this.exit();
        this.parent.rerender.start();
        break;

      case "move":
        this.highlight(this.destination(cmd.x, cmd.y));
        break;

      case "use":
        this.handleUse(cmd);
        break;

      case "drop":
        this.handleDrop(cmd);
        break;
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
    }
  }

  render(): void {
    this.parent.render();
  }
}
