import Game from "../Game";
import { graphics, music, tiles } from "./NullDrivers";

function trial() {
  const g = new Game(music, tiles, tiles, graphics);
}

trial();
