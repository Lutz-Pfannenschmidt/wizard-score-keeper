import { Game } from "./game.ts";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const game = new Game();
game.pushUrl();
game.log();

const wrapper = document.getElementById("wrapper") || document.createElement("div");

game.updateToGrid(wrapper);