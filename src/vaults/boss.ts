/* eslint-disable radar/no-duplicate-string */
import Vault from "../Vault";

const boss1 =
  new Vault(
    "boss 1",
    3,
    [
      "!!!!!!!!!!!!!!",
      "!   ^#< #^   !",
      "!   ^!!!!^   !",
      "!   ^    ^   !",
      "! B ^    ^ | !",
      "!!! ^!!  !!| !",
      "!   ^  4   | !",
      "!   ^      | !",
      "! ^!!!!!!!!  !",
      "! ^          !",
      "! ^  |   | @ !",
      "!!!!!|   |!!!!",
      "!    |   |   !",
      "!    |H f|   !",
      "!!!!!!!!!!!!!!",
    ]
  );

const boss2 =
  new Vault(
    "boss 2",
    3,
    [
      "!!!!!!!!!!!!!!",
      "!            !",
      "!   H f^   ^ !",
      "!  |]]]^ ]]^ !",
      "!  |   ^ 4 ^ !",
      "!  |@  ^   ^ !",
      "!  ]]| ^]]]^ !",
      "!::  | ^   ^ !",
      "!<:  | ^ @ ^ !",
      "!!!!!!!!!!!!!!",
    ]
  );

const boss3 =
  new Vault(
    "boss 3",
    3,
    [
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      "!            ]]]]]            !",
      "! ^   B    ^       ^   @    ^ !",
      "! ^]]::::]]^ ::::: ^]]]]]]]]^ !",
      "! ^   4    ^ : < : ^        ^ !",
      "! ^        ^ ]]]]] ^   H f  ^ !",
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ]
  );

// TODO the blot
const blotBoss =
  new Vault(
    "blot boss",
    4,
    [
      "!!!!!!!!!!!!!!!!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!IIIIIIIIIIIIII!",
      "!!!!!!!!!!!!!!!!",
    ]
  );

export default [
  boss1,
  boss2,
  boss3,
];
/* eslint-enable radar/no-duplicate-string */
