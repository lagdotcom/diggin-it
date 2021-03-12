import Vault from "./Vault";

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

const shafts = [shaft5, shaft11];
export default shafts;
