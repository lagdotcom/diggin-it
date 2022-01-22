import Hotspots from "../Hotspots";

describe("Hotspots", () => {
  it("resolves spots", () => {
    const h = new Hotspots();
    h.register("one", 0, 0, 5, 5);
    h.register("two", 10, 10, 5, 5);

    expect(h.resolve(2, 2)).toStrictEqual(["one", 1, 1]);
    expect(h.resolve(10, 10)).toStrictEqual(["two", 0, 0]);
    expect(h.resolve(14, 14)).toStrictEqual(["two", 2, 2]);
    expect(h.resolve(15, 15)).toBeUndefined();
  });

  it("resolves overlaps", () => {
    const h = new Hotspots();
    h.register("brood hall entrance", 5, 21, 13, 6);

    expect(h.overlap(5, 16, 5, 5)).toBeFalsy();
    expect(h.overlap(13, 26, 7, 3)).toBeTruthy();
    expect(h.overlap(13, 27, 7, 3)).toBeFalsy();
  });
});
