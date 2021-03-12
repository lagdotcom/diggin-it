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

export default [den1, den2, tower, ozymandias, leak, panic, chase];
