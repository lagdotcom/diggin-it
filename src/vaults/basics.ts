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
];
