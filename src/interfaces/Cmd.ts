import XY from "./XY";

export interface AttackCmd {
  type: "attack";
  x: number;
  y: number;
}

export interface BuyCmd {
  type: "buy";
  name: string;
}

export interface CancelCmd {
  type: "cancel";
}

export interface ClimbCmd {
  type: "climb";
  x: number;
  y: number;
}

export interface CreditsCmd {
  type: "credits";
}

export interface DigCmd {
  type: "dig";
  x: number;
  y: number;
}

export interface DropCmd {
  type: "drop";
  index: number;
}

export interface EquipCmd {
  type: "equip";
  index: number;
}

export interface ExamineCmd {
  type: "examine";
}

export interface ExitCmd {
  type: "exit";
}

export interface ExpandLogCmd {
  type: "expandlog";
}

export interface GetCmd {
  type: "get";
}

export interface HelpCmd {
  type: "help";
}

export interface InventoryCmd {
  type: "inventory";
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

export interface QueryCmd {
  type: "query";
}

export interface StartGameCmd {
  type: "start";
}

export interface StoryCmd {
  type: "story";
}

export interface TargetCmd {
  type: "target";
  possibilities: XY[];
  callback: (pos: XY) => Cmd;
}

export interface TitleCmd {
  type: "title";
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
  | BuyCmd
  | CancelCmd
  | ClimbCmd
  | CreditsCmd
  | DigCmd
  | DropCmd
  | EquipCmd
  | ExamineCmd
  | ExitCmd
  | ExpandLogCmd
  | GetCmd
  | HelpCmd
  | InventoryCmd
  | MoveCmd
  | PushCmd
  | QueryCmd
  | StartGameCmd
  | StoryCmd
  | TargetCmd
  | TitleCmd
  | UseCmd
  | WaitCmd;
export default Cmd;
