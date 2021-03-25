/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

const tiramisu = new Vault(
  "tiramisu",
  1,
  [
    "?       ?",
    "]       ]",
    "?       ?",
    "]       ]",
    "?   1   ?",
    "]       ]",
    "?       ?",
  ],
  [
    "         ",
    " ~~~~~~~ ",
    "         ",
    " ~~~~~~~ ",
    "         ",
    " ~~~~~~~ ",
    "         ",
  ],
  zanq
);

const gym = new Vault(
  "buried gym",
  1,
  ["|?b?b?", "|?]|]?", "|?b|2?", "|?]?]?", "]     "],
  ["      ", "      ", "      ", "      ", " ~~~~~"],
  zanq
);

const rocks = new Vault(
  "loose rocks",
  1,
  ["O O O O", "?O?O?O?", " ? ? ? "],
  undefined,
  zanq
);

const net = new Vault(
  "safety net",
  1,
  ["]    ]", "?    ?", "F    ?", "]1111]", "]]]]#]"],
  undefined,
  zanq
);

const bubblegum = new Vault(
  "bubblegum",
  1,
  ["O?", "O?", "O?", "O?", "O?", "O?", "O?"],
  undefined,
  zanq
);

const nuclear = new Vault(
  "nuclear site",
  1,
  ["#########", "# #???# #", "# #???# #", "   ?x?   ", "# #???# #"],
  ["         ", " %     % ", " %     % ", " %     % ", " %     % "],
  zanq
);

const giga = new Vault(
  "gigasquimp",
  1,
  [
    "??????1111??????",
    "????11????11????",
    "???1????????1???",
    "??1??????????1??",
    "?1????1111????1?",
    "?1???1????1???1?",
    "1???1?1111?1???1",
    "1???1?1?11?1???1",
    "1????1????1????1",
    "1?????1111?????1",
    "?1??1??????1??1?",
    "?1??11111111?11?",
    "??1??????????1??",
    "???111????111???",
    "??1???1111???1??",
    "?1?????11?????1?",
  ],
  undefined,
  zanq
);

const shopping = new Vault("shopping", 1, [
  "]]]]]",
  "]   ]",
  "F 5 A",
  "] ] ]",
  "] ] ]",
  "] ] ]",
]);

const flag = new Vault(
  "flag",
  1,
  [
    "          ",
    "  ??  ??  ",
    "  ??  ??  ",
    "??  ??  ??",
    "??  ??  ??",
    "  ??  ??  ",
    "  ??  ??  ",
    "          ",
  ],
  [
    "          ",
    "~~  ~~  ~~",
    "~~  ~~  ~~",
    "  ~~  ~~  ",
    "  ~~  ~~  ",
    "~~  ~~  ~~",
    "~~  ~~  ~~",
    "          ",
  ],
  zanq
);

const egg = new Vault("egg timer", 1, [
  "#######",
  "  #:#  ",
  "  #:#  ",
  "   :   ",
  "  #2#  ",
  "  #:#  ",
  "#######",
]);

const slasher = new Vault("slasher of veils", 1, [
  "MMMMM",
  "M:::M",
  "M   M",
  "M 3 M",
]);

export default [
  tiramisu,
  gym,
  rocks,
  net,
  bubblegum,
  nuclear,
  giga,
  shopping,
  flag,
  egg,
  slasher,
];
/* eslint-enable radar/no-duplicate-string */
