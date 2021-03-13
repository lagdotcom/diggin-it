import Game from "./Game";

window.addEventListener("load", async () => {
  const root = document.getElementById("root");
  const g = new Game(root);
  await g.init();
});
