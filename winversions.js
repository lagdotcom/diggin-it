const pkg = require("./package.json");
const fs = require("fs");

const src = "DigginItWinWrap\\";

const asm = src + "Properties\\AssemblyInfo.cs";
function updateAssemblyInfo(ver) {
  const lines = fs.readFileSync(asm, { encoding: "utf8" }).split("\r\n");
  const code = [
    ...lines.slice(0, -3),
    `[assembly: AssemblyVersion("${ver}.0")]`,
    `[assembly: AssemblyFileVersion("${ver}.0")]`,
    "",
  ].join("\r\n");

  fs.writeFileSync(asm, code);
  console.log("updated:", asm);
}

const res = src + "Properties\\Resources.resx";
function updateResources(ver) {
  const raw = fs.readFileSync(res, { encoding: "utf8" });
  const i = raw.indexOf('<data name="Version" xml:space="preserve">');
  const j = raw.indexOf("<value>", i) + 7;
  const k = raw.indexOf("</value>", j);
  const code = raw.substr(0, j) + ver + raw.substr(k);

  fs.writeFileSync(res, code);
  console.log("updated:", res);
}

console.log("version:", pkg.version);
updateAssemblyInfo(pkg.version);
updateResources(pkg.version);
