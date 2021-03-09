export interface AttackCmd {
  type: "attack";
  x: number;
  y: number;
}

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

export interface UseCmd {
  type: "use";
  index: number;
}

export interface WaitCmd {
  type: "wait";
}

type Cmd =
  | AttackCmd
  | ClimbCmd
  | DigCmd
  | GetCmd
  | MoveCmd
  | PushCmd
  | UseCmd
  | WaitCmd;
export default Cmd;
