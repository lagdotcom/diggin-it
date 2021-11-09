import { RNG } from "rot-js";

import Actor from "../Actor";
import {
  busterChampion,
  canandraChampion,
  crimChampion,
  flazzaChampion,
  glovaChampion,
  grundillaChampion,
  kreebusChampion,
  mulnChampion,
  poregonChampion,
  puffusChampion,
  shockwormChampion,
  slobberfinChampion,
  splinterChampion,
  squimpyChampion,
  teldenChampion,
} from "../entities/champions";
import { doppelganger } from "../entities/endGame";
import { floater, popper } from "../entities/enemies";
import { empty } from "../entities/tiles";
import Game from "../Game";
import XY from "../interfaces/XY";
import { generateBlotMap } from "../mapgen";
import { loadMap } from "../maps";
import { addBlotHand, addBlotHead, addBlotHeart } from "../prefabs";
import { ctheName } from "../text";
import Tile from "../Tile";
import { manhattan } from "../utils";

const DoppelgangerWait = 5;
const EyeSpawnWait = 15;
const EyeSpawnMonsters = [
  popper,
  floater,
  squimpyChampion,
  busterChampion,
  canandraChampion,
  crimChampion,
  flazzaChampion,
  glovaChampion,
  mulnChampion,
  slobberfinChampion,
  splinterChampion,
  teldenChampion,
  puffusChampion,
  shockwormChampion,
  kreebusChampion,
  grundillaChampion,
  poregonChampion,
];

export default class TheBlot {
  blotTiles: XY[];
  doppelgangerTimer: number;
  eyeTimer: number;

  constructor(public g: Game) {
    this.doppelgangerTimer = Infinity;
    this.eyeTimer = Infinity;

    g.on("entered", ({ depth, isSideArea }) => {
      if (depth === 11 && !isSideArea)
        this.doppelgangerTimer = DoppelgangerWait;
    });

    g.on("damaged", ({ victim }) => {
      if (victim.special === "beginFinalBattle") {
        this.doppelgangerTimer = Infinity;
        this.eyeTimer = EyeSpawnWait;

        g.log.add("The world shifts around you...");
        const [tiles, fluid, side, vaults] = generateBlotMap();

        loadMap(g, tiles, fluid);
        g.sideArea = side;
        g.vaults = vaults;

        const px = Math.floor(g.map.width / 2);
        const py = Math.floor(g.map.height / 2);
        g.move(g.player, px, py, "teleport");

        this.blotTiles = addBlotHead(g, 1, 1);
        addBlotHand(g, 10, 2, "BlotHandA");
        addBlotHand(g, 6, 2, "BlotHandB");
        addBlotHeart(g, 8, 1);

        g.emit("entered", { depth: 11, zone: 3, isSideArea: true });
      }
    });

    g.on("died", ({ victim }) => {
      switch (victim.special) {
        case "doppelganger":
          this.doppelgangerTimer = DoppelgangerWait;
          break;

        case "blotEye":
          this.removeHead();
          break;

        case "blotHeart":
          this.removeAllEnemies();
          this.removeHead();
          this.openTheDoor();
          break;

        case "blotHand":
          victim.parts.forEach((part) => g.remove(part));
          break;
      }
    });

    g.on("tick", () => {
      this.doppelgangerTimer--;
      this.eyeTimer--;

      if (this.doppelgangerTimer <= 0) {
        const [x, y] = this.getDoppelgangerSpawn();
        const enemy = new Actor(x, y, doppelganger);
        g.add(enemy);

        this.doppelgangerTimer = Infinity;
        g.emit("mapChanged", {});
      }

      if (this.eyeTimer <= 0) {
        const [x, y] = [5, 10];
        if (!g.actors.get(x, y)) {
          const data = RNG.getItem(EyeSpawnMonsters);
          const enemy = new Actor(x, y, {
            ...data,
            ai: "fly",
            aiData: { active: true },
          });
          g.add(enemy);
          g.log.add(`${ctheName(enemy, true)} appears from the blot's mouth!`);

          this.eyeTimer = EyeSpawnWait;
          g.emit("mapChanged", {});
        }
      }
    });
  }

  private getDoppelgangerSpawn(): XY {
    const { actors, map, player } = this.g;
    let trying = true,
      x = 0,
      y = 0;

    while (trying) {
      x = RNG.getUniformInt(1, map.width - 1);
      y = RNG.getUniformInt(1, map.height - 1);

      const distance = manhattan(x, y, player.x, player.y);
      if (distance < 5) continue;
      if (distance > 10) continue;

      if (!actors.get(x, y)) trying = false;
    }

    return [x, y];
  }

  private removeHead(): void {
    const blank = new Tile({ ...empty });

    this.eyeTimer = Infinity;
    this.blotTiles.forEach(([x, y]) => this.g.map.set(x, y, blank));
    this.g.emit("mapChanged", {});

    this.blotTiles = [];
  }

  private removeAllEnemies(): void {
    this.g.allActors.forEach((a) => {
      if (!a.player && a.maxHp) this.g.remove(a);
    });

    this.g.log.add("Everything falls still.");
  }

  private openTheDoor(): void {
    const { map } = this.g;

    for (let y = 0; y < map.height; y++)
      for (let x = 0; x < map.width; x++) {
        const tile = map.get(x, y);
        if (tile.exit === "closed") {
          tile.glyph = "FinalDoorOpen";
          tile.exit = "final";
        }
      }

    this.g.log.add("You hear a door creak open.");
  }
}
