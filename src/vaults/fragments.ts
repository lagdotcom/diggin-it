import Vault from "../Vault";
import { zanq } from "./zan";

const station1 = new Vault(
  "ladder station 1",
  1,
  [
    "???? ^ 1?",
    "?c??]^]##",
    "?????^???",
    "  ???^??]",
    "   1?^??]",
    "?]######]",
  ],
  undefined,
  zanq
);

const station2 = new Vault(
  "ladder station 2",
  1,
  ["#####", "? ^1?", "?#^#?", "? ^ ?", "?#^#?", "? ^ ?", "##^##"],
  undefined,
  zanq
);

const ruin1 = new Vault(
  "ruin 1",
  1,
  ["1???]] ]?", "????]] #1", "?]]]]]]]]", "????  ???"],
  undefined,
  zanq
);

const ruin2 = new Vault(
  "ruin 2",
  1,
  ["]#]]]]]c", "] O   ]]", "] O  O ]", "# O OO1#", "]##]]##]"],
  undefined,
  zanq
);

const ruin3 = new Vault(
  "ruin 3",
  1,
  ["]]]]]", "    O", "]]]]]", "?]]|#", " 2?|]", "###|#"],
  undefined,
  zanq
);

export default [station1, station2, ruin1, ruin2, ruin3];
