import commonjs from "@rollup/plugin-commonjs";
import file from "rollup-plugin-import-file";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";

// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;
const outputDir = production ? "dist" : "demo";

/** @type {import('rollup').OutputOptions[]} */
const output = [];
/** @type {import('rollup').Plugin[]} */
const plugins = [
  nodePolyfills(),
  json({ preferConst: true }),
  file({ output: outputDir, extensions: /\.mp3/ }),
  url({ limit: 30 * 1024 }),
  sourcemaps(),
  resolve(),
  typescript({ tsconfigDefaults: { sourceMap: true } }),
  commonjs(),
];
if (!production) {
  output.push({
    sourcemap: true,
    file: "demo/bundle.js",
    format: "iife",
  });
  plugins.push(serve({ contentBase: "demo", open: true }));
} else {
  output.push({
    file: "dist/bundle.min.js",
    format: "iife",
    plugins: [terser()],
  });
}

/** @type {import('rollup').RollupOptions} */
const options = { input: pkg.main, output, plugins };
export default options;
