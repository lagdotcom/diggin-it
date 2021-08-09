/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";
import { zanq } from "./zan";

const den1 =
  new Vault(
    "monster den 1",
    3,
    [
      "]]]]]]]]]]]]]]]]]",
      "]    :        : ]",
      "] 2 3:  1 | 2 :d]",
      "]:::::####|#####]",
      "]    :    |#    ]",
      "]$$ 3:    |# 3 @]",
      "]#########|]]]]]]",
      "]  1   1  |  1  ]",
      "]]]]]]]]]]|]]]]]]",
      "          |      ",
    ]
  );

const den2 =
  new Vault(
    "monster den 2",
    2,
    [
      "]]]]]]",
      "]R2   ",
      "]##^  ",
      "]S2^ ]",
      "]]]]]]",
    ]
  );

const bouldertower =
  new Vault(
    "boulder tower",
    2,
    [
      "]]]]]]]]]]",
      "]$OcO  OA]",
      "]##:::::#]",
      "]O  O  @O]",
      "]##::::##]",
      "] $ R O O]",
      "]###::::#]",
      "]O  O cR ]",
      "]#::::###]",
      "     @    ",
      "]]]]]]]]]]",
    ]
  );

const ozymandias =
  new Vault(
    "ozymandias",
    1,
    [
      "]]]]]]]]]",
      "]   $   ]",
      "] ^]]]^ ]",
      "] ^###^ ]",
      "] ^   ^ ]",
      "  ^ 1 ^  ",
      "]]]]]]]]]",
    ]
  );

const leak =
  new Vault(
    "gas leak",
    1,
    [
      "]]      ]]",
      "]]]|]]|]]]",
      "]| | ]|  ]",
      "]|##### ^]",
      "]|  R###^]",
      "]####x  ^]",
      "]##R##2 ^]",
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

const panic =
  new Vault(
    "panic room",
    1,
    [
      "]^]]]]",
      "]^F|@]",
      "]]]|]]",
      "]@S|  ",
      "]]]]]]",
    ]
  );

const chase =
  new Vault(
    "frightening chase",
    2,
    [
      "]]]]:::]]]]",
      "]222:  ##1]",
      "]]]]]]]:::]",
      "]Px  ##:12]",
      "]]]|]]]]]]]",
      "]2#|  # ^@]",
      "]]]]]]]]^]]",
      "]@ 1##  ^  ",
      "]]]]]]]]]]]",
    ]
  );

const stash =
  new Vault(
    "Cohagen's Stash",
    1,
    [
      "]]]]]]",
      "]    ]",
      "  AA1 ",
      "]]]]]]",
    ]
  );

const leprechaun =
  new Vault(
    "Leprechaun",
    1,
    [
      "!!!!^!!!!",
      "!   ^   !",
      "    ^    ",
      "!!!!^!!!!",
      "!$cc^ 26!",
      "!!!!!!!!!",
    ]
  );

const cool =
  new Vault(
    "Cool Drink",
    1,
    [
      "##   ##",
      "#     #",
      "#     #",
      "#  7  #",
      "#######",
    ],
    [
      "  ~~~  ",
      " ~~~~~ ",
      " ~~~~~ ",
      " ~~~~~ ",
      "       ",
    ]
  );

const cooler =
  new Vault(
    "Cooler Drink",
    2,
    [
      "###   ###",
      "!   C   !",
      "!!!!!!! !",
      "!  C    !",
      "! !!!!!!!",
      "!       !",
      "!!!86A!!!",
      "!!!###!!!",
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

const gas =
  new Vault(
    "Have A Gas",
    1,
    [
      "]]#]",
      "]$  ",
      "]]#]",
    ],
    [
      "    ",
      "  %%",
      "    ",
    ]
  );

const blast =
  new Vault(
    "Have A Blast",
    1,
    [
      "###",
      " B ",
      "###",
    ]
  );

const bridge =
  new Vault(
    "Bridge",
    1,
    [
      "]]]]]]]]]",
      "]OOOOOOO]",
      ":::::::::",
      "c       c",
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
      "         ",
    ]
  );

const secret =
  new Vault(
    "Beelzebub's Secret",
    3,
    [
      "::::]]]]]]]",
      ":         ]",
      "]]]]]]]]] ]",
      "]       ] ]",
      "] ]d@678] ]",
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

const safe =
  new Vault(
    "Safe T",
    1,
    [
      "#######",
      "   |   ",
      "###|###",
      "!!#|#!!",
      "!!#|#!!",
      "!!#|#!!",
      "!!#|#!!",
      "!!#|#!!",
    ]
  );

const remnant =
  new Vault(
    "Remnant",
    1,
    [
      "]]]]]]]]]",
      "    |    ",
      "]#]]|]]#]",
      "] ]]|]] ]",
      "#| c|  |#",
      "]|]]]]]|]",
      "]| c1 c|]",
      "]]]###]]]",
    ]
  );

const fool =
  new Vault(
    "Fool's Gold",
    2,
    [
      "!!!!!!!!",
      "# 2xc1 #",
      "!!!::!!!",
      "# 1cx2 #",
      "!!!!!!!!",
    ]
  );

const eye =
  new Vault(
    "Swimmer's Eye",
    1,
    [
      "   !###!    ",
      "  !    !##  ",
      " !    !   # ",
      "!    #  A  #",
      "!    #  !  #",
      " !    !   # ",
      "  !    !##  ",
      "   !##!!    ",
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

const wiggle =
  new Vault(
    "Wiggle Room",
    1,
    [
      "]###]   ",
      " ]S  ]1 ",
      "  ] | ] ",
      "   ]|  #",
      "   ]| 1#",
      " 1] | ] ",
      " ]  |]  ",
      "]1 B]   ",
      "]]]]]   ",
    ]
  );

const corridor =
  new Vault(
    "Corridor",
    2,
    [
      "]]]]]]]]]]",
      "  1  O    ",
      " WMW2OO2  ",
      "]]]]]]]]]]",
    ]
  );

const iam =
  new Vault(
    "I Am",
    1,
    [
      "!!###!!",
      "!  ^   ",
      "!!!^!!!",
      "  !^!  ",
      "  !^!  ",
      "!!!^!!!",
      "#6 ^2 !",
      "!!###!!",
    ]
  );

const iwas =
  new Vault(
    "I Was",
    1,
    [
      "!!###!!",
      "  2^ 7!",
      "!!!^!!!",
      "  !^!  ",
      "  !^!  ",
      "!!!^!!!",
      "!  ^  #",
      "!!!!!!!",
    ]
  );

const breakfast =
  new Vault(
    "Breakfast",
    1,
    [
      "::::",
      ": F:",
      "::::",
    ]
  );

const breakfast2 =
  new Vault(
    "Second Breakfast",
    1,
    [
      "####",
      "#FF#",
      "####",
    ]
  );

const pit =
  new Vault(
    "Hunter's Pit",
    2,
    [
      "#:::::::#",
      "##P    ##",
      "### 63###",
      "#########",
    ]
  );

const drowning =
  new Vault(
    "Gray Days Drowning",
    1,
    [
      "!!          !!",
      "#   !!!!     #",
      "!      1     !",
      "!  !!   !!   !",
      "! 1          !",
      "!   !!!!!! 1 !",
      "!    #dA#    !",
      "!!!!!!!!!!!!!!",
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

const e1m1 =
  new Vault(
    "Eee One Emm One",
    2,
    [
      "]]]]]]]]]^]",
      "]]]      ^]",
      "]@   # # ^]",
      "]]2   ^  ^]",
      "]]]  #^# ^]",
      "]]]]] ^ ]]]",
      "]]]]] ^ ]]]",
      "]]]]]]^]]]]",
    ]
  );

const scheme =
  new Vault(
    "the scheme",
    2,
    [
      "    d    ",
      "#  :::  #",
      "  1xxx2  ",
      "  :::::  ",
      " 2ccccc1 ",
      " ::::::: ",
      "#########",
    ]
  );

const toxic =
  new Vault(
    "toxic bam bam",
    2,
    [
      ":::   :::",
      " B:###:B#",
      "## #2 ###",
      "?  ??   ?",
      "@2   22 ?",
      "?????????",
    ],
    [
      "   %%%   ",
      "%%     % ",
      "  % %%   ",
      " %%  %%% ",
      "%%%%%%%% ",
      "         ",
    ],
    zanq
  );

const slinky =
  new Vault(
    "slinky",
    3,
    [
      " O       O ",
      "##       ##",
      "###     ###",
      "####2 2####",
      "#####3#####",
      "###########",
    ]
  );

const duo =
  new Vault(
    "scary duo",
    3,
    [
      "]]]",
      "3$3",
      "###",
    ]
  );

const sisyphus =
  new Vault(
    "sisyphus",
    3,
    [
      "      ]]",
      "    2]]]",
      "    ]]]]",
      "  3]]???",
      "  ]]????",
      "O]]]????",
    ],
    undefined,
    zanq
  );

const pitfall =
  new Vault(
    "pitfall gary",
    3,
    [
      "]]]]]]]]]]",
      "@|| ||| |2",
      "] | | | |]",
      "] |3| |d|]",
      "]  ]   ] ]",
      "]        ]",
      "]++++++++]",
      "]]]]]]]]]]",
    ]
  );

const cooker =
  new Vault(
    "pressure cooker",
    3,
    [
      " O O2@TOdO",
      "::::::::::",
      "2         ",
      "]        ]",
      "]        ]",
      "]        ]",
      "]        ]",
      "]]]]]]]]]]",
    ],
    [
      "          ",
      "          ",
      "          ",
      "          ",
      " &&&&&&&& ",
      " &&&&&&&& ",
      " &&&&&&&& ",
      "          ",
    ]
  );

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
  scheme,
  toxic,
  slinky,
  duo,
  sisyphus,
  pitfall,
  cooker,
];
/* eslint-enable radar/no-duplicate-string */
