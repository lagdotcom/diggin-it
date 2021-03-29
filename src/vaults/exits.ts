/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

// TODO: too mean
// const recessed = new Vault("recessed exit", 1, [
//   "F ]]]^",
//   "]]] ]^",
//   "## >]^",
//   " M  M^",
// ]);

const divot = new Vault("divot exit", 1, [
  "^]]]]]]]]]",
  "^   g     ",
  "^#  #     ",
  "^##   ###^",
  "^#]#2>#]#^",
  "^#]]]!]]#^",
]);

const midgar = new Vault(
  "midgar exit",
  1,
  ["]]", "^>", "^!", "^?", "^?", "^?", "^?", "^?", "^?", "^?"],
  undefined,
  zanq
);

const merc = new Vault(
  "merc outfit",
  1,
  ["#######", "#? a ?#", "?? # ??", "111>111", "###!###"],
  undefined,
  zanq
);

const squiggle = new Vault("squiggle exit", 1, [
  "|]::::::::]|",
  "|]  212   ]|",
  "|] #]]]]]]c|",
  "|]  Ac6c  ]|",
  "|]1]]]]]# ]|",
  "|]]>      ]|",
]);

const gameboy = new Vault("gameboy exit", 1, ["]]]", " > ", "]!]"]);

const pyramid = new Vault("pyramid exit", 1, [
  "  $>  ",
  " 1]!1 ",
  "1]::]1",
  "]::::]",
]);

const moat = new Vault(
  "moat exit",
  1,
  ["   b  >", " ]   ]!", "]]   2]"],
  ["       ", "  ~~~  ", "  ~~~  "]
);

const miracle = new Vault("miracle exit", 1, [":d>:"]);

const zzvw = new Vault("zan-zan-zawa-veia exit", 1, [
  ":]]]]]]]:",
  "]:::::::]",
  "]     ::]",
  "]  :::  ]",
  "]::     ]",
  "]:::::::]",
  ":]]]]]]]:",
  "    >    ",
]);

const sandcastle = new Vault("sandcastle exit", 2, [
  "       ",
  " : : : ",
  " ::::: ",
  " : 1>: ",
]);

const hut = new Vault("quaint hut", 1, ["   ###   ", "  # > #  ", " #  !9 # "]);

const coin = new Vault("free coin", 1, ["####", "#c>#"]);

const dog = new Vault("secret guard dog", 3, [
  "#####",
  ":3  :",
  ":::::",
  ":   :",
  ":!>!:",
]);

const peace = new Vault("peace of mind", 1, [
  "  ####  ",
  " #    # ",
  "#      #",
  "# >F9  #",
]);

const crude = new Vault("two crude dudes", 2, [
  " ::::: ",
  " :   : ",
  " :2>2: ",
]);

const sandwich = new Vault("canned sandwich", 2, [
  "######",
  "#    #",
  "#2F>1#",
]);

const deadliest = new Vault("deadliest game", 3, [
  "]]]]]]]]]",
  "]O O  O ]",
  "]::::::::",
  "#   :>: #",
]);

const fishing = new Vault(
  "fishing spot",
  1,
  [" !!!!! ", " !   ! ", " # > # ", "!! ! !!"],
  ["       ", "       ", "       ", "  ~ ~  "]
);

const dad = new Vault("dad rock", 1, [" O####O ", " O 1> O "]);

const hard = new Vault("hard times", 2, [" ]]]]]] ", " O    O ", "OO 2> OO"]);

// TODO: too mean
// const fall = new Vault("don't fall", 3, [
//   "          ",
//   "          ",
//   "          ",
//   "     >    ",
// ]);

const igloo = new Vault("cruddy igloo", 1, [
  "   :::::   ",
  "  ::   ::  ",
  " ::     :: ",
  " :  >  F : ",
]);

const aristocrats = new Vault("the aristocrats", 3, [
  " #:::::::# ",
  " #       # ",
  " #123>123# ",
]);

const meme = new Vault("annoying meme", 2, [
  "##########",
  "#    #   #",
  "# 1  # 11#",
  "##########",
  "#    #   #",
  "#12  #1L>#",
  "########!#",
]);

export default [
  // recessed,
  divot,
  midgar,
  merc,
  squiggle,
  gameboy,
  pyramid,
  moat,
  miracle,
  zzvw,
  sandcastle,
  hut,
  coin,
  dog,
  peace,
  crude,
  sandwich,
  deadliest,
  fishing,
  dad,
  hard,
  // fall,
  igloo,
  aristocrats,
  meme,
];
/* eslint-enable radar/no-duplicate-string */
