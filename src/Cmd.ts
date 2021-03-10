import XY from "./interfaces/XY";

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

export interface DropCmd {
  type: "drop";
  index: number;
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

export interface TargetCmd {
  type: "target";
  possibilities: XY[];
  callback: (pos: XY) => Cmd;
}

export interface UseCmd {
  type: "use";
  index: number;
  at?: XY;
}

export interface WaitCmd {
  type: "wait";
}

type Cmd =
  | AttackCmd
  | ClimbCmd
  | DigCmd
  | DropCmd
  | GetCmd
  | MoveCmd
  | PushCmd
  | TargetCmd
  | UseCmd
  | WaitCmd;
export default Cmd;
