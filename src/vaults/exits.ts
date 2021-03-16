/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

// TODO: too mean
// const recessed = new Vault("recessed exit", [
//   "F ]]]^",
//   "]]] ]^",
//   "## >]^",
//   " M  M^",
// ]);

const divot = new Vault("divot exit", [
  "^]]]]]]]]]",
  "^   g     ",
  "^#  #     ",
  "^##   ###^",
  "^#]#2>#]#^",
  "^#]]]!]]#^",
]);

const midgar = new Vault(
  "midgar exit",
  ["]]", "^>", "^!", "^?", "^?", "^?", "^?", "^?", "^?", "^?"],
  zanq
);

const merc = new Vault(
  "merc outfit",
  ["#######", "#? a ?#", "?? # ??", "111>111", "###!###"],
  zanq
);

const squiggle = new Vault("squiggle exit", [
  "|]::::::::]|",
  "|]  212   ]|",
  "|] #]]]]]]c|",
  "|]  Ac6c  ]|",
  "|]1]]]]]# ]|",
  "|]]>      ]|",
]);

const gameboy = new Vault("gameboy exit", ["]]]", " > ", "]!]"]);

const pyramid = new Vault("pyramid exit", [
  "  $>  ",
  " 1]!1 ",
  "1]::]1",
  "]::::]",
]);

const moat = new Vault("moat exit", ["   b  >", " ]~~~]!", "]]~~~2]"]);

const miracle = new Vault("miracle exit", [":d>:"]);

const zzvw = new Vault("zan-zan-zawa-veia exit", [
  ":]]]]]]]:",
  "]:::::::]",
  "]     ::]",
  "]  :::  ]",
  "]::     ]",
  "]:::::::]",
  ":]]]]]]]:",
  "    >    ",
]);

const sandcastle = new Vault("sandcastle exit", [
  "       ",
  " : : : ",
  " ::::: ",
  " : 1>: ",
]);

const hut = new Vault("quaint hut", ["   ###   ", "  # > #  ", " #  !9 # "]);

const coin = new Vault("free coin", ["####", "#c>#"]);

const dog = new Vault("secret guard dog", [
  "#####",
  ":3  :",
  ":::::",
  ":   :",
  ":!>!:",
]);

const peace = new Vault("peace of mind", [
  "  ####  ",
  " #    # ",
  "#      #",
  "# >F9  #",
]);

const crude = new Vault("two crude dudes", [" ::::: ", " :   : ", " :2>2: "]);

const sandwich = new Vault("canned sandwich", ["######", "#    #", "#2F>1#"]);

const deadliest = new Vault("deadliest game", [
  "]]]]]]]]]",
  "]O O  O ]",
  "]::::::::",
  "#   :>: #",
]);

const fishing = new Vault("fishing spot", [
  " !!!!! ",
  " !   ! ",
  " # > # ",
  "!!~!~!!",
]);

const dad = new Vault("dad rock", [" O####O ", " O 1> O "]);

const hard = new Vault("hard times", [" ]]]]]] ", " O    O ", "OO 2> OO"]);

const fall = new Vault("don't fall", [
  "          ",
  "          ",
  "          ",
  "     >    ",
]);

const igloo = new Vault("cruddy igloo", [
  "   :::::   ",
  "  ::   ::  ",
  " ::     :: ",
  " :  >  F : ",
]);

const aristocrats = new Vault("the aristocrats", [
  " #:::::::# ",
  " #       # ",
  " #123>123# ",
]);

const meme = new Vault("annoying meme", [
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
  fall,
  igloo,
  aristocrats,
  meme,
];
/* eslint-enable radar/no-duplicate-string */
