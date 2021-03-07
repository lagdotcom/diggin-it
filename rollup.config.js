import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";

const output = [];
const plugins = [
  nodePolyfills(),
  url({ limit: Infinity }),
  sourcemaps(),
  resolve(),
  commonjs(),
  typescript({ tsconfigDefaults: { sourceMap: true } }),
];
if (process.env.ROLLUP_WATCH) {
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

const rollupConfig = { input: pkg.main, output, plugins };
export default rollupConfig;
