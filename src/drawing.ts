import { Display } from "rot-js";

export function drawPanel(
  chars: Display,
  sx: number,
  sy: number,
  width: number,
  height: number
) {
  var top = false,
    left = false,
    bottom = false,
    right = false;

  for (var y = 0; y < height; y++) {
    top = y === 0;
    bottom = y === height - 1;

    for (var x = 0; x < width; x++) {
      left = x === 0;
      right = x === width - 1;

      // TODO: bitmasking?
      const tile = left
        ? top
          ? "b7"
          : bottom
          ? "b1"
          : "b4"
        : right
        ? top
          ? "b9"
          : bottom
          ? "b3"
          : "b6"
        : top
        ? "b8"
        : bottom
        ? "b2"
        : "b5";

      chars.draw(sx + x, sy + y, tile, "transparent", "black");
    }
  }
}
