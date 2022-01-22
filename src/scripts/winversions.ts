// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFileSync, writeFileSync } = require("fs");

function updateCSProj(fn: string, ver: string) {
  const raw = readFileSync(fn, { encoding: "utf8" });
  const i = raw.indexOf("<PropertyGroup>");
  const j = raw.indexOf("<Version>", i) + 9;
  const k = raw.indexOf("</Version>", j);
  const code = raw.substr(0, j) + ver + raw.substr(k);

  writeFileSync(fn, code);
  console.log("updated:", fn);
}

const pkg: { version: string } = JSON.parse(
  readFileSync("package.json", { encoding: "utf-8" })
);
console.log("version:", pkg.version);

updateCSProj("DigginItWrapper/DigginItWrapper.csproj", pkg.version);
