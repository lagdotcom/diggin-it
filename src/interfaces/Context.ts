import Cmd from "./Cmd";

type Context = {
  handle(cmd: Cmd): void;
  onKey(e: KeyboardEvent): Cmd;
  onMouse(e: MouseEvent): Cmd;
  render(): void;
};
export default Context;
