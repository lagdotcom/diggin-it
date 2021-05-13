import Vault from "../Vault";
import { zanq } from "./zan";

const shed1 = new Vault(
  "shed 1",
  1,
  ["#??#", "#  #", " 12 ", ":#:#"],
  undefined,
  zanq
);

const shed2 = new Vault(
  "shed 2",
  1,
  ["?:#:?", ":# #:", " 212 ", ":#|#:", "??|??", "??|??", "?:#:?"],
  undefined,
  zanq
);

const d2a2 = new Vault(
  "diablo 2 act 2",
  1,
  [":???:", ":::::", ":::::", " :3: ", ":::::", ":::::", ":???:"],
  undefined,
  zanq
);

const shak = new Vault(
  "shak's shak",
  1,
  ["]  ]]]]", "LRL   ]", "]]]    ", "???]2  ", "???]] ?"],
  undefined,
  zanq
);

const rope = new Vault("its rope", 1, ["?R?R?R?"], undefined, zanq);

const ladder = new Vault("its ladder", 1, ["?L?L?L?"], undefined, zanq);

const air = new Vault("its air", 1, ["?A?A?"], undefined, zanq);

const stash = new Vault(
  "stash",
  1,
  ["??:::::", "::: ba:", ":   ]::", "]     ]", " 21212 ", ":::::::"],
  undefined,
  zanq
);

const deth = new Vault("dethsquad", 1, ["1111223", "OOOOOOO"]);

const depot = new Vault("depot", 1, [
  "]]]    ",
  "]  M   ",
  "]M MM  ",
  "]MMMMM ",
  "]]:::]]",
]);

const sinkhole = new Vault(
  "sinkhole",
  1,
  [
    "???????????",
    "?      ::#?",
    "?#      #?#",
    "???       :",
    "?#?      :?",
    "?#    :::?#",
    "?   ??????#",
  ],
  undefined,
  zanq
);

const tunnel = new Vault("tunnel", 1, [
  "]#]]#]]#]",
  "         ",
  "         ",
  "]#]]#]]#]",
]);

const nope = new Vault(
  "nope tunnel",
  1,
  ["]#]]#]]#]", "         ", "         ", "]#]]#]]#]"],
  ["         ", "   %%% % ", " %%%%%%%%", "         "]
);

const escapade1 = new Vault(
  "escapade 1",
  1,
  ["??] O ", "O ] ]]", "]    ]", "]    ]", "]    ]", "] g g]", "]]]]]?"],
  undefined,
  zanq
);

const armoury1 = new Vault(
  "armouree 1",
  1,
  ["]]]]]", "]  ?]", "?5 8?", ":::::", "     "],
  undefined,
  zanq
);

const bakery = new Vault(
  "bakeree",
  1,
  ["]]]]]", "]  ?]", "?FFF?", ":::::", "     "],
  undefined,
  zanq
);

const plateau = new Vault(
  "plateau",
  1,
  [
    "  A2F2b  ",
    "  :::::  ",
    "   :::   ",
    "    :    ",
    "    : 111",
    "?????????",
  ],
  undefined,
  zanq
);

const cove = new Vault(
  "cove",
  1,
  ["11   ?", "]]]]]]", "]AAAA]", "]####]", "      ", "      "],
  ["      ", "      ", "      ", "      ", "~~~~~~", "~~~~~~"],
  zanq
);

const meow = new Vault(
  "meow",
  1,
  [" O   O ", "???O???", "  ???  "],
  undefined,
  zanq
);

const nin = new Vault(
  "nin",
  1,
  ["]]]?]?]]]", "?]  ]  ]?", "?]  ]  ]?", "?]?]]]?]?"],
  undefined,
  zanq
);

const chaos1 = new Vault("chaos 1", 1, [
  "     | ",
  "     |#",
  "2aRM1|#",
  "#######",
]);

const sorry = new Vault(
  "sorry",
  1,
  [
    "]]]]:::]]]]",
    "]] ]   ] ]]",
    "]]]]   ]]]]",
    "]         ]",
    "     L     ",
    "    ###    ",
    "           ",
  ],
  [
    "           ",
    "           ",
    "           ",
    "           ",
    "           ",
    "~~~~   ~~~~",
    "~~~~~~~~~~~",
  ]
);

const bridgekeeper = new Vault(
  "bridgekeeper",
  1,
  ["      ", "      ", " $3 F ", "### ]]", "#    ]", "??????", "??????"],
  undefined,
  zanq
);

const clamber = new Vault(
  "clamber",
  1,
  [
    "      ccc     ",
    "]]]]]]]]]]]]]?",
    "]           ]?",
    "]F  ] ] 0 ] ]?",
    "]]^]] ]]]]] ]?",
    "] ^         ]?",
    "] ^         ]?",
    "] ^ 2 2 2 2 ??",
  ],
  undefined,
  zanq
);

const squimpyZone = new Vault("squimpy zone", 1, [
  "        1 F5",
  "    1M  ]:::",
  "1O  ::::::::",
  "::::::::]]]]",
]);

export default [
  shed1,
  shed2,
  d2a2,
  shak,
  rope,
  ladder,
  air,
  stash,
  deth,
  depot,
  sinkhole,
  tunnel,
  nope,
  escapade1,
  armoury1,
  bakery,
  plateau,
  cove,
  meow,
  nin,
  chaos1,
  sorry,
  bridgekeeper,
  clamber,
  squimpyZone,
];
