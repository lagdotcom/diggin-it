import { RNG } from "rot-js";

import Grid from "./interfaces/Grid";
import LinearGrid from "./LinearGrid";

interface VaultTransform {
  src: string;
  dst: string[];
  once: boolean;
}

export default class Vault {
  grid: Grid<string>;
  fluidGrid: Grid<string>;
  width: number;
  height: number;
  transforms: VaultTransform[];

  constructor(
    public name: string,
    public difficulty: number,
    rows: string[],
    fluids?: string[],
    transforms: VaultTransform[] = []
  ) {
    this.grid = LinearGrid.from(rows.map((row) => row.split("")));
    this.fluidGrid = fluids
      ? LinearGrid.from(fluids.map((row) => row.split("")))
      : new LinearGrid(this.grid.width, this.grid.height, () => " ");
    this.width = this.grid.width;
    this.height = this.grid.height;
    this.transforms = transforms;

    // sanity checks
    // if (
    //   this.grid.width !== this.fluidGrid.width ||
    //   this.grid.height !== this.fluidGrid.height
    // )
    //   throw new Error(
    //     `Vault ${name}: width/height of tiles and fluids don't match`
    //   );

    // for (let y = 0; y < this.height; y++)
    //   for (let x = 0; x < this.width; x++) {
    //     if (this.grid.get(x, y) === undefined)
    //       throw new Error(`Vault ${name}: tile @${x},${y} undefined`);
    //     if (this.fluidGrid.get(x, y) === undefined)
    //       throw new Error(`Vault ${name}: fluid @${x},${y} undefined`);
    //   }
  }

  transform(src: string, dst: string, once = true): this {
    this.transforms.push({ src, dst: dst.split(""), once });
    return this;
  }

  resolve(): [tiles: Grid<string>, fluids: Grid<string>] {
    const chose: Record<string, string> = {};
    const transformed = this.grid.transform((ch) => {
      for (let i = 0; i < this.transforms.length; i++) {
        const { src, dst, once } = this.transforms[i];
        if (src === ch) {
          if (once) {
            if (!chose[ch]) chose[ch] = RNG.getItem(dst);
            return chose[ch];
          }

          return RNG.getItem(dst);
        }
      }

      return ch;
    });

    return RNG.getPercentage() <= 50
      ? [transformed, this.fluidGrid]
      : [transformed.mirror(), this.fluidGrid.mirror()];
  }
}
