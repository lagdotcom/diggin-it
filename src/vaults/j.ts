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

const tower = new Vault("boulder tower", [
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

export default [
  den1,
  den2,
  tower,
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
];
