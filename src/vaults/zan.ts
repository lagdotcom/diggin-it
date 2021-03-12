import Vault from "../Vault";

const transforms = [
  { src: "?", dst: "######:::::    cO".split(""), once: false },
];

const station1 = new Vault(
  "ladder station 1",
  [
    "???? ^ 1?",
    "?c??]^]##",
    "?????^???",
    "  ???^??]",
    "   1?^??]",
    "?]######]",
  ],
  transforms
);

const station2 = new Vault(
  "ladder station 2",
  ["#####", "? ^1?", "?#^#?", "? ^ ?", "?#^#?", "? ^ ?", "##^##"],
  transforms
);

const ruin1 = new Vault(
  "ruin 1",
  ["1???]] ]?", "????]] #1", "?]]]]]]]]", "????  ???"],
  transforms
);

const ruin2 = new Vault(
  "ruin 2",
  ["]#]]]]]c", "] O   ]]", "] O  O ]", "# O OO1#", "]##]]##]"],
  transforms
);

const ruin3 = new Vault(
  "ruin 3",
  ["]]]]]", "    O", "]]]]]", "?]]|#", " 2?|]", "###|#"],
  transforms
);

export default [station1, station2, ruin1, ruin2, ruin3];
