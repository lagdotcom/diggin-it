/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";

const unholyEntrance = new Vault("most unholy entrance", 2, [
  "***|***",
  "  2|   ",
  "***|***",
  "*  |2|*",
  "*****|*",
  "*| 3 |*",
  "*|*****",
  "*|SSSv*",
  "*******",
]);
const unholy = new Vault("most unholy", 2, [
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  "!!!!!!!!!!**********!!!!!!!!!!",
  "!!!!!!!!!!* <  O   *!!!!!!!!!!",
  "!!!!!!!!!!******   *!!!!!!!!!!",
  "!!!!!!!!!!*     1  *!!!!!!!!!!",
  "!!!!!!!!!!*    *****!!!!!!!!!!",
  "!!!!!!!!!!*  2  1  *!!!!!!!!!!",
  "!!!!!!!!!!*########*!!!!!!!!!!",
  "!!!!!!!!!!*Pg**23***!!!!!!!!!!",
  "!!!!!!!!!!*########*!!!!!!!!!!",
  "!************ |**  **********!",
  "!*|        1  |1    2 O    a*!",
  "!*|****$$********A*******|***!",
  "!*|  :::::      ********  1 *!",
  "!*|  : 23:         2 $  2 ***!",
  "!**********   1 2  **********!",
  "!!!!!!!!!!*::::::::*!!!!!!!!!!",
  "!!!!!!!!!!*########*!!!!!!!!!!",
  "!!!!!!!!!!****|*****!!!!!!!!!!",
  "!!!!!!!!!!* XGd K2>*!!!!!!!!!!",
  "!!!!!!!!!!**********!!!!!!!!!!",
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
]);

export const entrances = [unholyEntrance];
export const areas = { [unholyEntrance.name]: unholy };
/* eslint-enable radar/no-duplicate-string */
