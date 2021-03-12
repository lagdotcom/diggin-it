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
  width: number;
  height: number;
  transforms: VaultTransform[];

  constructor(
    public name: string,
    rows: string[],
    transforms: VaultTransform[] = []
  ) {
    this.grid = LinearGrid.from(rows.map((row) => row.split("")));
    this.width = this.grid.width;
    this.height = this.grid.height;
    this.transforms = transforms;
  }

  transform(src: string, dst: string, once = true) {
    this.transforms.push({ src, dst: dst.split(""), once });
    return this;
  }

  resolve() {
    const chose: Record<string, string> = {};
    return this.grid.transform((ch) => {
      for (var i = 0; i < this.transforms.length; i++) {
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
  }
}
