import Vault from "../Vault";
import { zanq } from "./zan";

const shed1 = new Vault("shed 1", ["#??#", "#  #", " 12 ", ":#:#"], zanq);

const shed2 = new Vault(
  "shed 2",
  ["?:#:?", ":# #:", " 212 ", ":#|#:", "??|??", "??|??", "?:#:?"],
  zanq
);

const d2a2 = new Vault(
  "diablo 2 act 2",
  [":???:", ":::::", ":::::", " :3: ", ":::::", ":::::", ":???:"],
  zanq
);

const shak = new Vault(
  "shak's shak",
  ["]  ]]]]", "LRL   ]", "]]]   ", "???]2  ", "???]] ?"],
  zanq
);

const rope = new Vault("its rope", ["?R?R?R?"], zanq);

const ladder = new Vault("its ladder", ["?L?L?L?"], zanq);

const air = new Vault("its air", ["?A?A?"], zanq);

const stash = new Vault(
  "stash",
  ["??:::::", "::: ba:", ":   ]::", "]     ]", " 21212 ", ":::::::"],
  zanq
);

const deth = new Vault("dethsquad", ["1111223", "OOOOOOO"]);

const depot = new Vault("depot", [
  "]]]    ",
  "]  M   ",
  "]M MM  ",
  "]MMMMM ",
  "]]:::]]",
]);

const sinkhole = new Vault(
  "sinkhole",
  [
    "???????????",
    "?      ::#?",
    "?#      #?#",
    "???       :",
    "?#?      :?",
    "?#    :::?#",
    "?   ??????#",
  ],
  zanq
);

const tunnel = new Vault("tunnel", [
  "]#]]#]]#]",
  "         ",
  "         ",
  "]#]]#]]#]",
]);

const nope = new Vault("nope tunnel", [
  "]#]]#]]#]",
  "   %%% % ",
  " %%%%%%%%",
  "]#]]#]]#]",
]);

const escapade1 = new Vault(
  "escapade 1",
  ["??] O ", "O ] ]]", "]    ]", "]    ]", "]    ]", "] g g]", "]]]]]?"],
  zanq
);

const armoury1 = new Vault(
  "armouree 1",
  ["]]]]]", "]  ?]", "?5 8?", ":::::", "     "],
  zanq
);

const bakery = new Vault(
  "bakeree",
  ["]]]]]", "]  ?]", "?FFF?", ":::::", "     "],
  zanq
);

const plateau = new Vault(
  "plateau",
  [
    "  A2F2b  ",
    "  :::::  ",
    "   :::   ",
    "    :    ",
    "    : 111",
    "?????????",
  ],
  zanq
);

const cove = new Vault(
  "cove",
  ["11   ?", "]]]]]]", "]AAAA]", "]####]", "~~~~~~", "~~~~~~"],
  zanq
);

const meow = new Vault("meow", [" O   O ", "???O???", "  ???  "], zanq);

const nin = new Vault(
  "nin",
  ["]]]?]?]]]", "?]  ]  ]?", "?]  ]  ]?", "?]?]]]?]?"],
  zanq
);

const chaos1 = new Vault("chaos 1", [
  "     | ",
  "     |#",
  "2aRM1|#",
  "#######",
]);

const sorry = new Vault("sorry", [
  "]]]]:::]]]]",
  "]] ]   ] ]]",
  "]]]]   ]]]]",
  "]         ]",
  "     L     ",
  "~~~~###~~~~",
  "~~~~~~~~~~~",
]);

const bridgekeeper = new Vault(
  "bridgekeeper",
  ["      ", "      ", " $3 F ", "### ]]", "#    ]", "??????", "??????"],
  zanq
);

const clamber = new Vault(
  "clamber",
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
  zanq
);

const squimpyZone = new Vault("squimpy zone", [
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
