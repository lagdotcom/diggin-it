import Game from "./Game";

window.addEventListener("load", async () => {
  const g = new Game();
  await g.init();
  g.start();
});
