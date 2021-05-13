import { strict as assert } from "assert";
import { describe, it } from "mocha";

import Hotspots from "./Hotspots";

describe("Hotspots", () => {
  it("resolves spots", () => {
    const h = new Hotspots();
    h.register("one", 0, 0, 5, 5);
    h.register("two", 10, 10, 5, 5);

    assert.deepEqual(h.resolve(2, 2), ["one", 1, 1]);
    assert.deepEqual(h.resolve(10, 10), ["two", 0, 0]);
    assert.deepEqual(h.resolve(14, 14), ["two", 2, 2]);
    assert.deepEqual(h.resolve(15, 15), undefined);
  });

  it("resolves overlaps", () => {
    const h = new Hotspots();
    h.register("brood hall entrance", 5, 21, 13, 6);

    assert.equal(h.overlap(5, 16, 5, 5), false);
    assert.equal(h.overlap(13, 26, 7, 3), true);
    assert.equal(h.overlap(13, 27, 7, 3), false);
  });
});
