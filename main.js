import { Game } from "./src/game.js";

window.startGame = () => {
  document.getElementById("menu").style.display = "none";
  const game = new Game();
  game.start();
};
