/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

const tiramisu =
  new Vault(
    "tiramisu",
    1,
    [
      "?       ?",
      "]:::::::]",
      "?   1   ?",
      "]:::::::]",
    ],
    [
      " ~~~~~~~ ",
      "         ",
      " ~~~~~~~ ",
      "         ",
    ],
    zanq
  );

const gym =
  new Vault(
    "buried gym",
    2,
    [
      "|?2?$?",
      "|?]|]?",
      "|?P|2?",
      "|?]?]?",
      "]    ?",
    ],
    [
      "      ",
      "      ",
      "      ",
      "      ",
      " ~~~~ ",
    ],
    zanq
  );

const rocks =
  new Vault(
    "loose rocks",
    2,
    [
      "O O O O",
      "?O?O?O?",
      ":?:?#?#",
    ],
    undefined,
    zanq
  );

const net =
  new Vault(
    "safety net",
    2,
    [
      "]    ]",
      "F    ?",
      "]2121]",
      "]++++]",
    ],
    undefined,
    zanq
  );

const bubblegum =
  new Vault(
    "bubblegum",
    1,
    [
      "O?",
      "O?",
      "O?",
      "O?",
      "O?",
      "O?",
    ],
    undefined,
    zanq
  );

const nuclear =
  new Vault(
    "nuclear site",
    2,
    [
      "#########",
      "#       #",
      "#       #",
      "   ?B?   ",
      "# #???# #",
    ],
    [
      "         ",
      " %%%%%%% ",
      " %%%%%%% ",
      "%%%   %%%",
      " %     % ",
    ],
    zanq
  );

const giga =
  new Vault(
    "gigasquimp",
    3,
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

const shopping =
  new Vault(
    "shopping",
    1,
    [
      "]]]]]",
      "F 7 A",
      "] ] ]",
      "] ] ]",
      "] ] ]",
    ]
  );

const flag =
  new Vault(
    "flag",
    2,
    [
      "::##::##::",
      "  ??  ??  ",
      "cc 2  2 cc",
      "??????????",
      "cc  cc  cc",
      "??xc??cx??",
      "  ??  ??  ",
      "##########",
    ],
    [
      "          ",
      "~~  ~~  ~~",
      "  ~~~~~~  ",
      "          ",
      "  ~~  ~~  ",
      "  ~~  ~~  ",
      "~~  ~~  ~~",
      "          ",
    ],
    zanq
  );

const egg =
  new Vault(
    "egg timer",
    2,
    [
      "^#######^",
      "^  #:#  ^",
      "^  #:#  ^",
      "^   :   ^",
      "^  #2#  ^",
      "^x #:# x^",
      "^#######^",
    ]
  );

const slasher =
  new Vault(
    "slasher of veils",
    3,
    [
      "MMMMM",
      "M:::M",
      "M   M",
      "M 3 M",
      "#####",
    ]
  );

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
