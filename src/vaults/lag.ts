import Vault from "../Vault";

const shaft5 =
  new Vault(
    "shaft5",
    1,
    [
      "#?#",
      "#?#",
      "#?#",
      "#?#",
      "#?#",
    ]
  ).transform(
    "?",
    "^|",
    true
  );

const shaft11 =
  new Vault(
    "shaft11",
    1,
    [
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "#|#",
      "# #",
    ]
  );

const close =
  new Vault(
    "so close",
    1,
    [
      ":::::",
      ":::::",
      "::d::",
      "::#::",
      ":::::",
    ]
  );

const freebie =
  new Vault(
    "freebie",
    1,
    [
      ":::",
      ":x:",
      ":::",
    ]
  );

const quiet =
  new Vault(
    "quiet passage",
    1,
    [
      "######## #",
      "#####    #",
      "##      ##",
      "#   ######",
      "# ########",
    ]
  );

const nightmare =
  new Vault(
    "nightmare",
    2,
    [
      "]:]]]]]]]]]",
      "]   1 1 1 ]",
      "]]]]]]]]]:]",
      "] 2 2     ]",
      "]:]]]]]]]]]",
      "]   3   d6]",
      "]]]]]]]]]:]",
    ]
  );

export default [
  shaft5,
  shaft11,
  close,
  freebie,
  quiet,
  nightmare,
];
