import Vault from "../Vault";

const den1 = new Vault("monster den 1", [
  "!!!!!!!!!!!!!!!!!",
  "!    :        : !",
  "! 2 3:  1 | 2 :d!",
  "!:::::####|#####!",
  "!    :    |!    !",
  "!$$ 3:    |# 3 a!",
  "!#########|!!!!!!",
  "!  1   1  |  1  !",
  "!!!!!!!!!!|!!!!!!",
]);

const den2 = new Vault("monster den 2", [
  "!!!!!!",
  "!R2   ",
  "!##^  ",
  "!R2^ !",
  "!!!!!!",
]);

const bouldertower = new Vault("boulder tower", [
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

const ozymandias = new Vault("ozymandias", [
  "]]]]]]]]]",
  "]   c   ]",
  "] ^]]]^ ]",
  "] ^###^ ]",
  "] ^   ^ ]",
  "  ^ 1 ^  ",
  "]]]]]]]]]",
]);

// TODO: no way of overlaying % and others yet
const leak = new Vault("gas leak", [
  "!!      !!",
  "!!!|!!|!!!",
  "!|%|%!|%%!",
  "!|#####%^!",
  "!|%%R###^!",
  "!####x%%^!",
  "!#####2%^!",
  "!######%^ ",
  "!!!!!!!!!!",
]);

const panic = new Vault("panic room", [
  "]^]]]]",
  "]^F|H]",
  "]]]|]]",
  "]FF|  ",
  "]]]]]]",
]);

const chase = new Vault("frightening chase", [
  "!!!!:::!!!!",
  "!222:  ##1!",
  "!!!!!!!:::!",
  "!Gx  ##:12!",
  "!!!|!!!!!!!",
  "!2#|  # ^x!",
  "!!!!!!!!^!!",
  "!L 1##  ^  ",
  "!!!!!!!!!!!",
]);

const stash = new Vault("Cohagen's Stash", [
  "]]]]]]",
  "]    ]",
  "  AA1 ",
  "]]]]]]",
]);

const leprechaun = new Vault("Leprechaun", [
  "!!!!^!!!!",
  "!   ^   !",
  "    ^    ",
  "!!!!^!!!!",
  "!$gb^ 26!",
  "!!!!!!!!!",
]);

const cool = new Vault("Cool Drink", [
  "##~~~##",
  "#~~~~~#",
  "#~~~~~#",
  "#~~9~~#",
  "#######",
]);

const cooler = new Vault("Cooler Drink", [
  "###~~~###",
  "!~~~~~~~!",
  "!!!!!!!~!",
  "!~~~~~~~!",
  "!~!!!!!!!",
  "!~~~~~~~!",
  "!!!96A!!!",
  "!!!###!!!",
]);

const gas = new Vault("Have A Gas", ["]]#]", "]G%%", "]]#]"]);

const blast = new Vault("Have A Blast", ["###", " B ", "###"]);

const bridge = new Vault("Bridge", [
  "!!!!!!!!!",
  "!OOOOOOO!",
  ":::::::::",
  "c       c",
  "!~~~~~~~!",
  "!~~~~~~~!",
  "!~~~~~~~!",
  "!~~~~~~~!",
  "!!!!!!!!!",
]);

// TODO: won't work rn
const secret = new Vault("Beelzebub's Secret", [
  "::::]]]]]]]",
  ":%%%%%%%%%]",
  "]]]]]]]]]%]",
  "]%%%%%%%]%]",
  "]%]DG693]%]",
  "]%]]]]]]]%]",
  "]%%%%%%%%%]",
  "]]]]]]]]]]]",
]);

const safe = new Vault("Safe T", [
  "#######",
  "   |   ",
  "###|###",
  "!!#|#!!",
  "!!#|#!!",
  "!!#|#!!",
  "!!#|#!!",
  "!!#|#!!",
]);

const remnant = new Vault("Remnant", [
  "]]]]]]]]]",
  "    |    ",
  "]#]]|]]#]",
  "] ]]|]] ]",
  "#| c|  |#",
  "]|]]]]]|]",
  "]| 91 c|]",
  "]]]###]]]",
]);

const fool = new Vault("Fool's Gold", [
  "!!!!!!!!",
  "# 1cc1 #",
  "!!!::!!!",
  "# 1cc1 #",
  "!!!!!!!!",
]);

const eye = new Vault("Swimmer's Eye", [
  "   !###!    ",
  "  !    !##  ",
  " !    !   # ",
  "!~~~~#  A  #",
  "!~~~~#~~!~~#",
  " !~~~~!~~~# ",
  "  !~~~~!##  ",
  "   !##!!    ",
]);

const wiggle = new Vault("Wiggle Room", [
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

const corridor = new Vault("Corridor", [
  "]]]]]]]]]]",
  "  1  O    ",
  " WMW OO2  ",
  "]]]]]]]]]]",
]);

const iam = new Vault("I Am", [
  "!!###!!",
  "!  ^   ",
  "!!!^!!!",
  "  !^!  ",
  "  !^!  ",
  "!!!^!!!",
  "#6 ^2 !",
  "!!###!!",
]);

const iwas = new Vault("I Was", [
  "!!###!!",
  "  2^ 6!",
  "!!!^!!!",
  "  !^!  ",
  "  !^!  ",
  "!!!^!!!",
  "!  ^  #",
  "!!!!!!!",
]);

const breakfast = new Vault("Breakfast", ["::::", ": F:", "::::"]);

const breakfast2 = new Vault("Second Breakfast", ["####", "#FF#", "####"]);

const pit = new Vault("Hunter's Pit", [
  "#:::::::#",
  "##     ##",
  "### 63###",
  "#########",
]);

const drowning = new Vault("Gray Days Drowning", [
  "!!~~~~~~~~~~!!",
  "#~~~!!!!~~~~~#",
  "!~~~~~~~~~~~~!",
  "!~~!!~~~!!~~~!",
  "!~~~~~~~~~~~~!",
  "!~~~!!!!!!~~~!",
  "!~~~~#dA#~~~~!",
  "!!!!!!!!!!!!!!",
]);

const e1m1 = new Vault("Eee One Emm One", [
  "]]]]]]]]]^]",
  "]]]      ^]",
  "]9   # # ^]",
  "]]2   ^  ^]",
  "]]]  #^# ^]",
  "]]]]] ^ ]]]",
  "]]]]] ^ ]]]",
  "]]]]]]^]]]]",
]);

const bombastic = new Vault("bombastic", ["]]]]]", "#B B#", "]###]"]);

const sad = new Vault("sad guy", ["#######", "#     #", "#c  1 #", "#######"]);

const tophat = new Vault("tophat", [
  "  ]]]]]]  ",
  "  ] cBx]  ",
  "  ]::::]  ",
  "  ]    ]  ",
  "::##OO##::",
  "##########",
]);

const lucky = new Vault("LUCKY! CHA CHA CHA!", [
  "]]]]###]]]]",
  "]]]#####]]]",
  "]]]3[6[3]]]",
  "###]]]]]###",
  "]]##]d]##]]",
  "]]]]]]]]]]]",
]);

const monsterbox = new Vault("monster box", [
  "#####",
  "#3#2#",
  "##a##",
  "#2#1#",
  "#####",
]);

const arsenal = new Vault("arsenal", ["]]]]]]]", "]L69BF]", "]]]]]]]"]);

const wish = new Vault("make a wish", [
  "]]]]]]]]]]]",
  "]3: :F: :6]",
  "]::^:::^::]",
  "#  ^   ^  #",
  "#::^:::^::#",
  "#B:^:3:^:3#",
  "]]]]]]]]]]]",
]);

const fishhook = new Vault("fish hook", [
  "###:]#]",
  "##::]|]",
  "###:]|]",
  "]]x] |]",
  "] ]  ]#",
  "] AA]##",
  "]]]]###",
]);

const meanie = new Vault("hidden meanie", ["]]]", "]3]", "]]]"]);

const headache = new Vault("headache", [
  "[[[[[",
  "[O9O[",
  "[:::[",
  "     ",
  "#####",
]);

const the = new Vault("the vault", [
  "####]####",
  "###]]]###",
  "##]]]]]##",
  "]]]d d]]]",
  ":]]]x]]]:",
  "::]]]]]::",
  ":::]]]:::",
  "::::]::::",
]);

const tower = new Vault("tower", [
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

const echo = new Vault("echo", [
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

const well = new Vault("the well", [
  "]~~~~~]",
  "]~~~~~]",
  "]~~~~~]",
  "]~~~~~]",
  "]~~~~~]",
  "]~~~~~]",
  ":::::::",
  "##:::##",
]);

const moon = new Vault("moon", [
  "#########",
  "###   ###",
  "##    2##",
  "### B ###",
  "#########",
]);

const heart = new Vault("heart", [
  "#########",
  "#   #   #",
  "::     ::",
  "::: F :::",
  "#########",
]);

const morgue = new Vault("ultimate morgue", [
  "]]]]]]]]",
  "]OOOOOO]",
  "]OOOOOO]",
  "]OOOOOO]",
  "]::::::]",
  "  gcgc  ",
  "]]]]]]]]",
]);

const money = new Vault("mmmmmonay", [
  "]]]]]]]]",
  "]]]]]]]]",
  "]]]]]]]]",
  "]]dgcx]]",
  "]::::::]",
  "        ",
  "::::::::",
]);

const pancake = new Vault("pancake maker", [
  " OOOOOOOOO ",
  ":::::::::::",
  "#         #",
  "]         ]",
  "]111111111]",
  "]:::::::::]",
]);

const luckybar = new Vault("lucky bar", ["###", "#g#", "###"]);

const lame = new Vault("lame home", ["####", "#1 :", "####"]);

const shirt = new Vault("lucky shirt", ["###", "#9#", "###"]);

const shoe = new Vault("shoe", ["]]]]   ", "#  ]]]]", "#  L  #", "#######"]);

const shoe2 = new Vault("other shoe", [
  "   ]]]]",
  "]]]]  #",
  "#  R  #",
  "#######",
]);

const shoe3 = new Vault("double shoe", [
  "   ]]]]^]]]]   ",
  "]]]]  #^#  ]]]]",
  "#2BR  #^#  La2#",
  "#######^#######",
]);

const gong = new Vault("bonkey gong", [
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
