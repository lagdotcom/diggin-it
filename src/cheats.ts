import {
  artifact,
  coin,
  coinBag,
  diamond,
  goldBar,
  smallGem,
  treasureBox,
} from "./entities/items";
import Game from "./Game";
import Item from "./Item";
import { generateMap } from "./mapgen";
import { ItemName, items as AllItems } from "./tables";
import { name } from "./text";

function testTheInk() {
  const g = Game.INSTANCE;

  g.log.add("You fall into a black hole!");
  g.depth = 10;
  g.nextMap();
}

function testGodMode() {
  const g = Game.INSTANCE;

  g.log.add("You feel incredible!");
  g.player.maxHp = 999;
  g.player.hp = 999;
  g.player.maxAp = 999;
  g.player.ap = 999;
  g.player.dp = 100;
  g.player.sp = 50;
  g.emit("refreshed", {});
  g.contexts.top.render();
}

function testChangeLevel(depth: number) {
  const g = Game.INSTANCE;

  g.log.add("You fall into a black hole!");
  g.depth = depth;
  g.nextMap();
}

const treasures = {
  c: coin.treasure,
  b: goldBar.treasure,
  g: smallGem.treasure,
  $: coinBag.treasure,
  a: artifact.treasure,
  x: treasureBox.treasure,
  d: diamond.treasure,
};

function makeFreq(
  src: string,
  freq: Record<string, number> = {}
): Record<string, number> {
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    freq[ch] = freq[ch] ? freq[ch] + 1 : 1;
  }

  return freq;
}

function getMoneyOnLevel(freq: Record<string, number>) {
  return (
    (freq.c || 0) * treasures.c +
    (freq.b || 0) * treasures.b +
    (freq.g || 0) * treasures.g +
    (freq.$ || 0) * treasures.$ +
    (freq.a || 0) * treasures.a +
    (freq.x || 0) * treasures.x +
    (freq.d || 0) * treasures.d
  );
}

function gatherStats(count = 100, depth = 1) {
  const freq: Record<string, number> = {};

  for (let i = 0; i < count; i++) {
    const [tiles] = generateMap(depth);
    const raw = tiles.join("");

    makeFreq(raw, freq);
  }

  return freq;
}

function getUniqueKeys(freqs: Record<string, unknown>[]) {
  const set = new Set(freqs.flatMap((fr) => Object.keys(fr)));
  const keys = Array.from(set);
  keys.sort();
  return keys;
}

function gatherAllStats(count = 100) {
  const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const freqs = floors.map((n) => gatherStats(count, n));
  const keys = getUniqueKeys(freqs);

  const lines = ["floor\tmoney\t" + keys.join("\t")];
  freqs.forEach((floor, n) => {
    const parts = [
      n + 1,
      getMoneyOnLevel(floor) / count,
      ...keys.map((k) => floor[k] / count || 0),
    ];
    lines.push(parts.join("\t"));
  });
  return lines.join("\n");
}

function spawnItem(typ: ItemName, qty = 1) {
  const g = Game.INSTANCE;

  if (typ in AllItems) {
    const item = new Item(g.player.x, g.player.y, AllItems[typ]);
    if (item.charges) item.charges = qty;
    g.addItem(item);

    g.log.add(`${name(item, true)} appears at your feet.`);
  } else g.log.add(`What the heck is a ${typ}?`);

  g.emit("refreshed", {});
  g.contexts.top.render();
}

export function initCheats(): void {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (window as any).g = Game.INSTANCE;
  (window as any).idclvl = testChangeLevel;
  (window as any).keepyourselfalive = testGodMode;
  (window as any).theboss = testTheInk;
  (window as any).gather = gatherAllStats;
  (window as any).gimme = spawnItem;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
