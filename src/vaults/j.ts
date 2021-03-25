/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";

const den1 = new Vault("monster den 1", 3, [
  "]]]]]]]]]]]]]]]]]",
  "]    :        : ]",
  "] 2 3:  1 | 2 :d]",
  "]:::::####|#####]",
  "]    :    |]    ]",
  "]$$ 3:    |# 3 a]",
  "]#########|]]]]]]",
  "]  1   1  |  1  ]",
  "]]]]]]]]]]|]]]]]]",
]);

const den2 = new Vault("monster den 2", 2, [
  "]]]]]]",
  "]R2   ",
  "]##^  ",
  "]R2^ ]",
  "]]]]]]",
]);

const bouldertower = new Vault("boulder tower", 2, [
  "]]]]]]]]]]",
  "]aOaO  OA]",
  "]##:::::#]",
  "]O  O  LO]",
  "]##::::##]",
  "] $ L O O]",
  "]###::::#]",
  "]O  O cL ]",
  "]#::::###]",
  "     L    ",
  "]]]]]]]]]]",
]);

const ozymandias = new Vault("ozymandias", 1, [
  "]]]]]]]]]",
  "]   c   ]",
  "] ^]]]^ ]",
  "] ^###^ ]",
  "] ^   ^ ]",
  "  ^ 1 ^  ",
  "]]]]]]]]]",
]);

const leak = new Vault(
  "gas leak",
  1,
  [
    "]]      ]]",
    "]]]|]]|]]]",
    "]| | ]|  ]",
    "]|##### ^]",
    "]|  R###^]",
    "]####x  ^]",
    "]#####2 ^]",
    "]###### ^ ",
    "]]]]]]]]]]",
  ],
  [
    "          ",
    "          ",
    " %%%% %%% ",
    " %     %% ",
    " %%%%   % ",
    "     %%%% ",
    "      %%% ",
    "       %% ",
    "          ",
  ]
);

const panic = new Vault("panic room", 1, [
  "]^]]]]",
  "]^F|H]",
  "]]]|]]",
  "]FF|  ",
  "]]]]]]",
]);

const chase = new Vault("frightening chase", 2, [
  "]]]]:::]]]]",
  "]222:  ##1]",
  "]]]]]]]:::]",
  "]Gx  ##:12]",
  "]]]|]]]]]]]",
  "]2#|  # ^x]",
  "]]]]]]]]^]]",
  "]L 1##  ^  ",
  "]]]]]]]]]]]",
]);

const stash = new Vault("Cohagen's Stash", 1, [
  "]]]]]]",
  "]    ]",
  "  AA1 ",
  "]]]]]]",
]);

const leprechaun = new Vault("Leprechaun", 1, [
  "]]]]^]]]]",
  "]   ^   ]",
  "    ^    ",
  "]]]]^]]]]",
  "]$gb^ 26]",
  "]]]]]]]]]",
]);

const cool = new Vault(
  "Cool Drink",
  1,
  ["##   ##", "#     #", "#     #", "#  9  #", "#######"],
  ["  ~~~  ", " ~~~~~ ", " ~~~~~ ", " ~~~~~ ", "       "]
);

const cooler = new Vault(
  "Cooler Drink",
  2,
  [
    "###   ###",
    "]       ]",
    "]]]]]]] ]",
    "]       ]",
    "] ]]]]]]]",
    "]       ]",
    "]]]96A]]]",
    "]]]###]]]",
  ],
  [
    "   ~~~   ",
    " ~~~~~~~ ",
    "       ~ ",
    " ~~~~~~~ ",
    " ~       ",
    " ~~~~~~~ ",
    "   ~~~   ",
    "         ",
  ]
);

const gas = new Vault(
  "Have A Gas",
  1,
  ["]]#]", "]G  ", "]]#]"],
  ["    ", "  %%", "    "]
);

const blast = new Vault("Have A Blast", 1, ["###", " B ", "###"]);

const bridge = new Vault(
  "Bridge",
  1,
  [
    "]]]]]]]]]",
    "]OOOOOOO]",
    ":::::::::",
    "c       c",
    "]       ]",
    "]       ]",
    "]       ]",
    "]       ]",
    "]]]]]]]]]",
  ],
  [
    "         ",
    "         ",
    "         ",
    "         ",
    " ~~~~~~~ ",
    " ~~~~~~~ ",
    " ~~~~~~~ ",
    " ~~~~~~~ ",
    "         ",
  ]
);

const secret = new Vault(
  "Beelzebub's Secret",
  3,
  [
    "::::]]]]]]]",
    ":         ]",
    "]]]]]]]]] ]",
    "]       ] ]",
    "] ]DG693] ]",
    "] ]]]]]]] ]",
    "]         ]",
    "]]]]]]]]]]]",
  ],
  [
    "           ",
    " %%%%%%%%% ",
    "         % ",
    " %%%%%%% % ",
    " % %%%%% % ",
    " %       % ",
    " %%%%%%%%% ",
    "           ",
  ]
);

const safe = new Vault("Safe T", 1, [
  "#######",
  "   |   ",
  "###|###",
  "]]#|#]]",
  "]]#|#]]",
  "]]#|#]]",
  "]]#|#]]",
  "]]#|#]]",
]);

const remnant = new Vault("Remnant", 1, [
  "]]]]]]]]]",
  "    |    ",
  "]#]]|]]#]",
  "] ]]|]] ]",
  "#| c|  |#",
  "]|]]]]]|]",
  "]| 91 c|]",
  "]]]###]]]",
]);

const fool = new Vault("Fool's Gold", 2, [
  "]]]]]]]]",
  "# 1cc1 #",
  "]]]::]]]",
  "# 1cc1 #",
  "]]]]]]]]",
]);

const eye = new Vault(
  "Swimmer's Eye",
  1,
  [
    "   ]###]    ",
    "  ]    ]##  ",
    " ]    ]   # ",
    "]    #  A  #",
    "]    #  ]  #",
    " ]    ]   # ",
    "  ]    ]##  ",
    "   ]##]]    ",
  ],
  [
    "            ",
    "            ",
    "            ",
    " ~~~~       ",
    " ~~~~ ~~ ~~ ",
    "  ~~~~ ~~~  ",
    "   ~~~~     ",
    "            ",
  ]
);

const wiggle = new Vault("Wiggle Room", 1, [
  "]###]   ",
  " ]F  ]1 ",
  "  ] | ] ",
  "   ]|  #",
  "   ]| 1#",
  " 1] | ] ",
  " ]  |]  ",
  "]1 B]   ",
  "]]]]]   ",
]);

const corridor = new Vault("Corridor", 2, [
  "]]]]]]]]]]",
  "  1  O    ",
  " WMW OO2  ",
  "]]]]]]]]]]",
]);

const iam = new Vault("I Am", 1, [
  "]]###]]",
  "]  ^   ",
  "]]]^]]]",
  "  ]^]  ",
  "  ]^]  ",
  "]]]^]]]",
  "#6 ^2 ]",
  "]]###]]",
]);

const iwas = new Vault("I Was", 1, [
  "]]###]]",
  "  2^ 6]",
  "]]]^]]]",
  "  ]^]  ",
  "  ]^]  ",
  "]]]^]]]",
  "]  ^  #",
  "]]]]]]]",
]);

const breakfast = new Vault("Breakfast", 1, ["::::", ": F:", "::::"]);

const breakfast2 = new Vault("Second Breakfast", 1, ["####", "#FF#", "####"]);

const pit = new Vault("Hunter's Pit", 2, [
  "#:::::::#",
  "##     ##",
  "### 63###",
  "#########",
]);

const drowning = new Vault(
  "Gray Days Drowning",
  1,
  [
    "]]          ]]",
    "#   ]]]]     #",
    "]            ]",
    "]  ]]   ]]   ]",
    "]            ]",
    "]   ]]]]]]   ]",
    "]    #dA#    ]",
    "]]]]]]]]]]]]]]",
  ],
  [
    "  ~~~~~~~~~~  ",
    " ~~~    ~~~~~ ",
    " ~~~~~~~~~~~~ ",
    " ~~  ~~~  ~~~ ",
    " ~~~~~~~~~~~~ ",
    " ~~~      ~~~ ",
    " ~~~~    ~~~~ ",
    "              ",
  ]
);

const e1m1 = new Vault("Eee One Emm One", 2, [
  "]]]]]]]]]^]",
  "]]]      ^]",
  "]9   # # ^]",
  "]]2   ^  ^]",
  "]]]  #^# ^]",
  "]]]]] ^ ]]]",
  "]]]]] ^ ]]]",
  "]]]]]]^]]]]",
]);

const bombastic = new Vault("bombastic", 1, ["]]]]]", "#B B#", "]###]"]);

const sad = new Vault("sad guy", 1, [
  "#######",
  "#     #",
  "#c  1 #",
  "#######",
]);

const tophat = new Vault("tophat", 1, [
  "  ]]]]]]  ",
  "  ] cBx]  ",
  "  ]::::]  ",
  "  ]    ]  ",
  "::##OO##::",
  "##########",
]);

const lucky = new Vault("LUCKY! CHA CHA CHA]", 1, [
  "]]]]###]]]]",
  "]]]#####]]]",
  "]]]3[6[3]]]",
  "###]]]]]###",
  "]]##]d]##]]",
  "]]]]]]]]]]]",
]);

const monsterbox = new Vault("monster box", 1, [
  "#####",
  "#3#2#",
  "##a##",
  "#2#1#",
  "#####",
]);

const arsenal = new Vault("arsenal", 1, ["]]]]]]]", "]L69BF]", "]]]]]]]"]);

const wish = new Vault("make a wish", 1, [
  "]]]]]]]]]]]",
  "]3: :F: :6]",
  "]::^:::^::]",
  "#  ^   ^  #",
  "#::^:::^::#",
  "#B:^:3:^:3#",
  "]]]]]]]]]]]",
]);

const fishhook = new Vault("fish hook", 1, [
  "###:]#]",
  "##::]|]",
  "###:]|]",
  "]]x] |]",
  "] ]  ]#",
  "] AA]##",
  "]]]]###",
]);

const meanie = new Vault("hidden meanie", 1, ["]]]", "]3]", "]]]"]);

const headache = new Vault("headache", 1, [
  "[[[[[",
  "[O9O[",
  "[:::[",
  "     ",
  "#####",
]);

const the = new Vault("the vault", 1, [
  "####]####",
  "###]]]###",
  "##]]]]]##",
  "]]]d d]]]",
  ":]]]x]]]:",
  "::]]]]]::",
  ":::]]]:::",
  "::::]::::",
]);

const tower = new Vault("tower", 1, [
  "]]^]]",
  "] ^ ]",
  "]1^ ]",
  "]]^ ]",
  "] ^2]",
  "] ^]]",
  "] ^B]",
  "] ^]]",
  "]c^2]",
  "]]^]]",
  "] ^ ]",
]);

const echo = new Vault("echo", 1, [
  "]]]^]]]",
  "]  ^  ]",
  "]  ^  ]",
  "]  ^  ]",
  "]  ^  ]",
  "]  ^  ]",
  "]  ^  ]",
  "]  ^  ]",
  "]  ^  ]",
]);

const well = new Vault(
  "the well",
  1,
  [
    "]     ]",
    "]     ]",
    "]     ]",
    "]     ]",
    "]     ]",
    "]     ]",
    ":::::::",
    "##:::##",
  ],
  [
    " ~~~~~ ",
    " ~~~~~ ",
    " ~~~~~ ",
    " ~~~~~ ",
    " ~~~~~ ",
    " ~~~~~ ",
    "       ",
    "       ",
  ]
);

const moon = new Vault("moon", 1, [
  "#########",
  "###   ###",
  "##    2##",
  "### B ###",
  "#########",
]);

const heart = new Vault("heart", 1, [
  "#########",
  "#   #   #",
  "::     ::",
  "::: F :::",
  "#########",
]);

const morgue = new Vault("ultimate morgue", 1, [
  "]]]]]]]]",
  "]OOOOOO]",
  "]OOOOOO]",
  "]OOOOOO]",
  "]::::::]",
  "  gcgc  ",
  "]]]]]]]]",
]);

const money = new Vault("mmmmmonay", 1, [
  "]]]]]]]]",
  "]]]]]]]]",
  "]]]]]]]]",
  "]]dgcx]]",
  "]::::::]",
  "        ",
  "::::::::",
]);

const pancake = new Vault("pancake maker", 1, [
  " OOOOOOOOO ",
  ":::::::::::",
  "#         #",
  "]         ]",
  "]111111111]",
  "]:::::::::]",
]);

const luckybar = new Vault("lucky bar", 1, ["###", "#g#", "###"]);

const lame = new Vault("lame home", 1, ["####", "#1 :", "####"]);

const shirt = new Vault("lucky shirt", 1, ["###", "#9#", "###"]);

const shoe = new Vault("shoe", 1, ["]]]]   ", "#  ]]]]", "#  L  #", "#######"]);

const shoe2 = new Vault("other shoe", 1, [
  "   ]]]]",
  "]]]]  #",
  "#  R  #",
  "#######",
]);

const shoe3 = new Vault("double shoe", 1, [
  "   ]]]]^]]]]   ",
  "]]]]  #^#  ]]]]",
  "#2BR  #^#  La2#",
  "#######^#######",
]);

const gong = new Vault("bonkey gong", 1, [
  "]|1||||]",
  " |]|||| ",
  "]||||1|]",
  " |1||]| ",
  "]|]||||]",
  "]||3|2|]",
  "]||]|]|]",
  "]||||||]",
  "]| dd |]",
]);

export default [
  den1,
  den2,
  bouldertower,
  ozymandias,
  leak,
  panic,
  chase,
  stash,
  leprechaun,
  cool,
  cooler,
  gas,
  blast,
  bridge,
  secret,
  safe,
  remnant,
  fool,
  eye,
  wiggle,
  corridor,
  iam,
  iwas,
  breakfast,
  breakfast2,
  pit,
  drowning,
  e1m1,
  bombastic,
  sad,
  tophat,
  lucky,
  monsterbox,
  arsenal,
  wish,
  fishhook,
  meanie,
  headache,
  the,
  tower,
  echo,
  well,
  moon,
  heart,
  morgue,
  money,
  pancake,
  luckybar,
  lame,
  shirt,
  shoe,
  shoe2,
  shoe3,
  gong,
];
/* eslint-enable radar/no-duplicate-string */
