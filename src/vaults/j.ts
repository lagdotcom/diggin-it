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

const tower = new Vault("boulder tower", [
  "]]]]]]]]]]",
  "]aOaO  OA]",
  "]##:::::#]",
  "]O  O  LO]",
  "]##::::##]",
  "]   L O O]",
  "]###::::#]",
  "]O  O cL ]",
  "]#::::###]",
  "     L    ",
  "]]]]]]]]]]",
]);

export default [den1, tower];
