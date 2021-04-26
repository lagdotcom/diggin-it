import Game from "./Game";

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

export function initCheats(): void {
  (window as any).idclvl = testChangeLevel;
  (window as any).keepyourselfalive = testGodMode;
  (window as any).theboss = testTheInk;
}
