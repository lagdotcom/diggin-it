import Cmd from '../Cmd';

export default interface Context {
  onKey(e: KeyboardEvent): Cmd;
  handle(cmd: Cmd): void;
  render(): void;
}
