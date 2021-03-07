interface MoveCmd {
  type: "move";
  x: number;
  y: number;
}

type Cmd = MoveCmd;
export default Cmd;
