export interface ClimbCmd {
  type: "climb";
  x: number;
  y: number;
}

export interface GetCmd {
  type: "get";
}

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

type Cmd = ClimbCmd | DigCmd | GetCmd | MoveCmd | PushCmd;
export default Cmd;
