export interface DigCmd {
  type: "dig";
  x: number;
  y: number;
}

export interface MoveCmd {
  type: "move";
  x: number;
  y: number;
}

export interface PushCmd {
  type: "push";
  x: number;
  y: number;
  mx: number;
  my: number;
}

type Cmd = DigCmd | MoveCmd | PushCmd;
export default Cmd;
