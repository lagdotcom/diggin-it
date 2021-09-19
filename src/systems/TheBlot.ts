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
import { floater, popper } from "../entities/enemies";
import { empty } from "../entities/tiles";
import Game from "../Game";
import XY from "../interfaces/XY";
import { generateBlotMap } from "../mapgen";
import { loadMap } from "../maps";
import { addBlotHead } from "../prefabs";
import { ctheName } from "../text";
import Tile from "../Tile";

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

    g.on("entered", ({ depth }) => {
      if (depth === 11) this.doppelgangerTimer = DoppelgangerWait;
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

        // TODO load heart, hands
        this.blotTiles = addBlotHead(g, 1, 1);
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
          // TODO remove all enemies, spawn door at bottom
          this.removeHead();
          break;
      }
    });

    g.on("tick", () => {
      this.doppelgangerTimer--;
      this.eyeTimer--;

      if (this.doppelgangerTimer <= 0) {
        // TODO spawn doppelganger
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

  private removeHead() {
    const blank = new Tile({ ...empty });

    this.eyeTimer = Infinity;
    this.blotTiles.forEach(([x, y]) => this.g.map.set(x, y, blank));
    this.g.emit("mapChanged", {});

    this.blotTiles = [];
  }
}
