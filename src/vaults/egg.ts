/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

const culvert = new Vault("culvert", 3, [
  " ]M        ",
  " ]M   3    ",
  " ]M########",
  "M]]]]#:    ",
  "M:G2]]#:   ",
  "]]]]]]]#:  ",
]);

const fennec = new Vault(
  "fennec",
  1,
  [
    "#####^#####",
    "#    ^    #",
    "#    ^    #",
    "# g  ^  F #",
    "# #  ^  # #",
    "#    ^    #",
    "#????^????#",
    "?????^?????",
  ],
  [
    "           ",
    " %       % ",
    " %%     %% ",
    " %%%   %%% ",
    " %%%% %%%% ",
    " %%%%%%%%% ",
    " % %%%%% % ",
    "  %%% %%%  ",
  ],
  zanq
);

const escapade = new Vault(
  "freestyle escapade",
  2,
  [
    "]#O#]]]]]]]]",
    "####O   1bb]",
    "]]]]]]] ]]]]",
    "  $   ] ] ]]",
    " ###  ] ]A]]",
    " ????]] ]d]]",
    " ???]]]  #]]",
    " ??]]]] ] ]]",
    " ?]]]]] ]]]]",
    "      ]]]]]]",
  ],
  undefined,
  zanq
);

const olympy = new Vault(
  "squimpy olympy",
  1,
  ["1O##", "##|1", "1|##", "##|1", "cccc"],
  ["%%%%", "%%%%", "~~~~", "~~~~", "    "]
);

const snail = new Vault("snail", 3, [
  "#################",
  "  2     2     2  ",
  "#################",
  "   OOOOOO        ",
  " OO::::::O       ",
  "O:::OOOO::O  : : ",
  "O::O::::O:O  :H: ",
  ":OO:OOOO::O::::::",
  "#################",
  "  2     2     2  ",
  "#################",
]);

const smokestacks = new Vault(
  "smokestacks",
  1,
  ["   F    ", " M M M  ", "M# # #M ", "M# a #M ", "########"],
  [" %%%%%%%", "  %%%%  ", "  % %   ", "  % %   ", "        "]
);

const cosy = new Vault(
  "all cosy",
  1,
  ["?  W", "?1 W", "?WWW", "?W:W"],
  undefined,
  zanq
);

const skara = new Vault(
  "skara brae",
  2,
  [
    "?]]]?]?????????",
    "?]???O???O]]]]?",
    "??]]]]???]??]??",
    "]???????????]O?",
    "O???]]??]]??]]]",
    "]?????]O?]?????",
    "??]]]???????]]]",
    "?O]?]?]]]]??]gO",
    "]]]????]????]]]",
  ],
  undefined,
  zanq
);

const lunar = new Vault(
  "lunar tear",
  3,
  ["###x###", "1#####1", "?11211?", "??131??", "???1???", "??121??", "???1???"],
  undefined,
  zanq
);

const angband = new Vault(
  "worst room from angband",
  1,
  ["########", "##c#1#?#", " ?#c#1# ", "##1#?#c#", "########"],
  undefined,
  zanq
);

const cauldron = new Vault(
  "cauldron",
  2,
  [" M c c cM ", "#M      M#", "#M      M#", "##M2FF2M##", " ##MMMM## "],
  ["  ~~~~~~  ", "  ~~~~~~  ", "  ~~~~~~  ", "   ~~~~   ", "          "]
);

const rats = new Vault("rats in the walls", 2, [
  "|]]]| |]]]|",
  "|]1]| |]1]|",
  "|]1]| |]1]|",
  "|]1]| |]1]|",
  "|]1]| |]1]|",
  "| O |A| O |",
]);

const scotland = new Vault(
  "scotland",
  1,
  [
    "^ ??????? ^",
    " ^ ????? ^ ",
    "? ^ ??? ^ ?",
    "?? ^ ? ^ ??",
    "??? ^#^ ???",
    "???? X ????",
    "??? ^#^ ???",
    "?? ^ ? ^ ??",
    "? ^ ??? ^ ?",
    " ^ ????? ^ ",
    "^ ??????? ^",
  ],
  undefined,
  zanq
);

export default [
  culvert,
  fennec,
  escapade,
  olympy,
  snail,
  smokestacks,
  cosy,
  skara,
  lunar,
  angband,
  cauldron,
  rats,
  scotland,
];
/* eslint-enable radar/no-duplicate-string */
