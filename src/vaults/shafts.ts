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

export default [shaft5, shaft11];
