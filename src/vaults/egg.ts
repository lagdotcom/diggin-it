import Vault from "../Vault";
import { zanq } from "./zan";

const culvert =
  new Vault(
    "culvert",
    3,
    [
      " ]M        ",
      " ]M   3T   ",
      " ]M########",
      "M]]]]#:2   ",
      "M:S2]]#:   ",
      "]]]]]]]#:  ",
    ]
  );

const fennec =
  new Vault(
    "fennec",
    1,
    [
      " ##T ^ T## ",
      "#  ##^##  #",
      "#    ^    #",
      "# $  ^  F #",
      "# #  ^  # #",
      "#    ^    #",
      "#????^????#",
      "?????^?????",
    ],
    undefined,
    zanq
  );

const escapade =
  new Vault(
    "freestyle escapade",
    2,
    [
      "]#O#:##:::##",
      "####O   1c$#",
      "]]]]] ] ]]]]",
      "  $   ] ]A]]",
      " ###  ] ]#]]",
      " ??? ]] ]d]]",
      " ???2    #]]",
      " ??]]]] ] ]]",
      " ?]]@]] ]?]]",
      " ??????]]?]]",
    ],
    undefined,
    zanq
  );

const olympy =
  new Vault(
    "squimpy olympy",
    1,
    [
      "1O##",
      "##|1",
      "1|##",
      "##|1",
      "cccc",
      "####",
    ]
  );

const snail =
  new Vault(
    "snail",
    3,
    [
      "#################",
      "  2 T   3   T 2  ",
      "#################",
      "   OOOOOO        ",
      " OO::::::O       ",
      "O:::OOOO::O  : : ",
      "O::O::::O:O  :@: ",
      ":OO:OOOO::O::::::",
      "#################",
      "  3 P   2   S 3  ",
      "#################",
    ]
  );

const smokestacks =
  new Vault(
    "smokestacks",
    1,
    [
      "   8    ",
      " M M M  ",
      "M# # #M ",
      "M# A #M ",
      "########",
    ],
    [
      "%%%%%%%%",
      "% % % %%",
      "  % %  %",
      "  % %  %",
      "        ",
    ]
  );

const cosy =
  new Vault(
    "all cosy",
    1,
    [
      "?  W",
      "?1 W",
      "?WWW",
      "?W:W",
    ],
    undefined,
    zanq
  );

const skara =
  new Vault(
    "skara brae",
    3,
    [
      "?]]]?]?????????",
      "?]?$?O   O]]]]?",
      "??]]]]   ]  ]??",
      "]     2     ]O$",
      "O   ]]?$]]  ]]]",
      "] 3  ]O?]  2   ",
      "  ]]]???????]]]",
      "?O]?]?]d]]  ]$O",
      "]]]????]????]]]",
    ],
    undefined,
    zanq
  );

const lunar =
  new Vault(
    "lunar tear",
    3,
    [
      "###d###",
      "1#####1",
      "??121??",
      "??O3O??",
      "???1???",
      "??131??",
      "???1???",
    ],
    undefined,
    zanq
  );

const angband =
  new Vault(
    "worst room from angband",
    1,
    [
      "########",
      "##c#1#?#",
      " ?#c#1# ",
      "##1#?#c#",
      "########",
    ],
    undefined,
    zanq
  );

const cauldron =
  new Vault(
    "cauldron",
    2,
    [
      " M      M ",
      "#M      M#",
      "#M      M#",
      "##M2FF2M##",
      " ##MMMM## ",
    ],
    [
      "% %%%%%% %",
      "  %%%%%%  ",
      "  %%%%%%  ",
      "   %%%%   ",
      "%        %",
    ]
  );

const rats =
  new Vault(
    "rats in the walls",
    2,
    [
      "|]]]| |]]]|",
      "|]1]| |]2]|",
      "|]1]| |]1]|",
      "|]2]| |]2]|",
      "|]1]| |]1]|",
      "| O |A| O |",
      "]]]]:::]]]]",
    ]
  );

const scotland =
  new Vault(
    "scotland",
    2,
    [
      "^ ??????? ^",
      " ^ ????? ^ ",
      "? ^ ??? ^ ?",
      "?? ^ ? ^ ??",
      "??? ^#^ ???",
      "???? d ????",
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
