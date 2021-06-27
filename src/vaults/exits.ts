/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

const recessed =
  new Vault(
    "recessed exit",
    1,
    [
      "F ]]]^",
      "]]] ]^",
      "## >]^",
      " M!!M^",
    ]
  );

const divot =
  new Vault(
    "divot exit",
    2,
    [
      "^]]]]]]]]]",
      "^   $     ",
      "^#  #     ",
      "^##   ###^",
      "^#2#2>#c#^",
      "^#]]!!!]#^",
    ]
  );

const midgar =
  new Vault(
    "midgar exit",
    1,
    [
      "]]]",
      "]^>",
      "]^!",
      "?^?",
      "?^?",
      "?^?",
      "?^?",
      "?^?",
      "?^?",
      " ^ ",
      "!!!",
    ],
    undefined,
    zanq
  );

const merc =
  new Vault(
    "merc outfit",
    2,
    [
      "#######",
      "#? P ?#",
      "?? # ??",
      "121>121",
      "###!###",
    ],
    undefined,
    zanq
  );

const squiggle =
  new Vault(
    "squiggle exit",
    2,
    [
      "|          |",
      "|]::::::::]|",
      "|]  212   ]|",
      "|] #]]]]]]c|",
      "|]  @c7c  ]|",
      "|]1]]]]]# ]|",
      "|]]]  >    |",
      "######!#####",
    ]
  );

const gameboy =
  new Vault(
    "gameboy exit",
    1,
    [
      "]]]",
      " > ",
      "]!]",
    ]
  );

const pyramid =
  new Vault(
    "pyramid exit",
    1,
    [
      "  $>  ",
      " 1!!1 ",
      "1!dd!1",
      "!dddd!",
    ]
  );

const moat =
  new Vault(
    "moat exit",
    1,
    [
      "     c> ",
      " !~~~!! ",
      "!!~~~2!!",
    ],
    [
      "        ",
      "  ~~~   ",
      "  ~~~~  ",
    ]
  );

const miracle =
  new Vault(
    "miracle exit",
    1,
    [
      "#:??:#",
      " :P>: ",
      "!!!!!!",
    ],
    undefined,
    zanq
  );

const zzvw =
  new Vault(
    "zan-zan-zawa-veia exit",
    3,
    [
      ":]]]]]]]:",
      "]:::::::]",
      "]     ::]",
      "]  :::  ]",
      "]::     ]",
      "]:::::::]",
      ":]]]]]]]:",
      "  3 > 22 ",
    ]
  );

const sandcastle =
  new Vault(
    "sandcastle exit",
    2,
    [
      "^     ^",
      "^: : :^",
      " ::::: ",
      " :21>: ",
    ]
  );

const hut =
  new Vault(
    "quaint hut",
    1,
    [
      "   ###   ",
      "  # > #  ",
      " #  !F # ",
    ]
  );

const coin =
  new Vault(
    "free coin",
    1,
    [
      "####",
      "#c>#",
    ]
  );

const dog =
  new Vault(
    "secret guard dog",
    3,
    [
      "#####",
      ":3  :",
      ":::::",
      ":  c:",
      ":!>!:",
    ]
  );

const peace =
  new Vault(
    "peace of mind",
    1,
    [
      "  ####  ",
      " #    # ",
      "#      #",
      "# >F@  #",
    ]
  );

const crude =
  new Vault(
    "two crude dudes",
    2,
    [
      " ::::: ",
      " :   : ",
      " :2>2: ",
    ]
  );

const sandwich =
  new Vault(
    "canned sandwich",
    2,
    [
      "######",
      "#    #",
      "#2F>1#",
    ]
  );

const deadliest =
  new Vault(
    "deadliest game",
    2,
    [
      "]]]]]]]]]",
      "]O O  O ]",
      "]::::::::",
      "#   :>: #",
    ]
  );

const fishing =
  new Vault(
    "fishing spot",
    1,
    [
      " !!!!! ",
      " #   # ",
      "!! > !!",
    ],
    [
      "       ",
      "       ",
      "  ~ ~  ",
    ]
  );

const dad =
  new Vault(
    "dad rock",
    1,
    [
      " O####O ",
      " O 1> O ",
    ]
  );

const hard =
  new Vault(
    "hard times",
    2,
    [
      " ]]]]]] ",
      " O    O ",
      "OO 2> OO",
    ]
  );

// TODO: too mean
// const fall = new Vault("don't fall", 3, [
//   "          ",
//   "          ",
//   "          ",
//   "     >    ",
// ]);

const igloo =
  new Vault(
    "cruddy igloo",
    1,
    [
      "   :::::   ",
      "  ::   ::  ",
      " ::     :: ",
      " :  >  F : ",
    ]
  );

const aristocrats =
  new Vault(
    "the aristocrats",
    3,
    [
      " #:::::::# ",
      " #       # ",
      " #123>123# ",
    ]
  );

const meme =
  new Vault(
    "annoying meme",
    2,
    [
      "##########",
      "#    #   #",
      "#B1  # 11#",
      "##########",
      "#    #   #",
      "#12  #1R>#",
      "########!#",
    ]
  );

export default [
  recessed,
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
