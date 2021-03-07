import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";

export default {
  input: pkg.main,
  output: {
    sourcemap: true,
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [
    nodePolyfills(),
    url({ limit: Infinity }),
    sourcemaps(),
    commonjs(),
    resolve(),
    typescript({ tsconfigDefaults: { sourceMap: true } }),
    serve({ contentBase: "dist", open: true }),
  ],
};
