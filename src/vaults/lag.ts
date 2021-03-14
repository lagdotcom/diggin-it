import Vault from "../Vault";

const shaft5 = new Vault("shaft5", [
  "#?#",
  "#?#",
  "#?#",
  "#?#",
  "#?#",
]).transform("?", "^|");

const shaft11 = new Vault("shaft11", [
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
]);

const close = new Vault("so close", [
  ":::::",
  ":::::",
  "::d::",
  "::#::",
  ":::::",
]);

const freebie = new Vault("freebie", [":::", ":g:", ":::"]);

const quiet = new Vault("quiet passage", [
  "######## #",
  "#####    #",
  "##      ##",
  "#   ######",
  "# ########",
]);

const nightmare = new Vault("nightmare", [
  "]:]]]]]]]]]",
  "]   1 1 1 ]",
  "]]]]]]]]]:]",
  "] 2 2     ]",
  "]:]]]]]]]]]",
  "]   3   a6]",
  "]]]]]]]]]:]",
]);

export default [shaft5, shaft11, close, freebie, quiet, nightmare];
