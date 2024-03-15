import { parsePlayerNames, parse2DArray, string2DArray, sumArray } from "./utils";

export class Game {
  players: string[];
  playerCount: number;
  maxRound: number;
  scores: number[][];
  guesses: number[][];

  constructor() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    this.players = parsePlayerNames(urlParams.get("players") || "Player 1,Player 2,Player 3");
    this.playerCount = this.players.length;
    this.maxRound = 60 / this.playerCount;
    this.scores = parse2DArray(urlParams.get("scores"), this.players.length, this.maxRound);
    this.guesses = parse2DArray(urlParams.get("guesses"), this.players.length, this.maxRound);
  }

  log() {
    console.log(this.players);
    console.log(this.scores);
    console.log(this.guesses);
  }

  pushUrl() {
    let url = `?scores=${string2DArray(this.scores)}`;
    url += `&guesses=${string2DArray(this.guesses)}`;
    url += `&players=${this.players.join(",")}`;
    window.history.replaceState({}, "", url);
  }

  updateToGrid(wrapper: HTMLElement) {
    wrapper.textContent = "";
    wrapper.style.gridTemplateColumns = `3rem ${this.players.map(() => "3fr 5em").join(" ")}`;
    wrapper.style.gridTemplateRows = `repeat(${this.maxRound + 2}, 1fr)`;

    // Header
    let header = document.createElement("div");
    header.innerHTML = "Player <br> Round";
    header.classList.add("border-b", "border-accent");
    wrapper.appendChild(header);
    for (let i = 0; i < this.players.length; i++) {
      let player = document.createElement("div");
      player.textContent = this.players[i];
      player.classList.add("border-l", "border-b", "border-accent", "col-span-2", "text-center", "font-bold", "p-1");
      wrapper.appendChild(player);
    }

    // Body
    for (let i = 0; i < this.maxRound; i++) {
      let round = document.createElement("div");
      round.textContent = (i + 1).toString();
      round.classList.add("border-b", "border-accent", "p-1");
      wrapper.appendChild(round);
      for (let j = 0; j < this.players.length; j++) {
        let score = document.createElement("input");
        score.textContent = this.scores[j][i]?.toString().replaceAll("NaN", "");
        score.type = "number";
        score.classList.add("border-l", "border-b", "border-accent", "p-1", "bg-transparent", "text-center");
        score.setAttribute("step", "10");
        score.addEventListener("input", (e) => {
          this.scores[j][i] = parseInt((e.target as HTMLInputElement).value || "0");
          this.pushUrl();
          this.updateScores();
        });
        wrapper.appendChild(score);
        let guess = document.createElement("input");
        guess.textContent = this.guesses[j][i]?.toString().replaceAll("NaN", "");
        guess.type = "number";
        guess.classList.add("border-l", "border-b", "border-accent", "p-1", "bg-transparent", "text-center");
        guess.setAttribute("max", (i + 1).toString());
        guess.setAttribute("min", "0");
        guess.addEventListener("input", (e) => {
          this.guesses[j][i] = parseInt((e.target as HTMLInputElement).value || "0");
          this.pushUrl();
        });
        wrapper.appendChild(guess);
      }
    }

    // Footer
    let footer = document.createElement("div");
    footer.textContent = "Total";
    footer.classList.add("p-1");
    wrapper.appendChild(footer);
    for (let i = 0; i < this.players.length; i++) {
      let total = document.createElement("p");
      total.setAttribute("score", this.players[i]);
      total.textContent = sumArray(this.scores[i]).toString();
      total.classList.add("border-l", "border-accent", "p-1", "col-span-2");
      wrapper.appendChild(total);
    }

  }
  updateScores() {
    let total = document.querySelectorAll("[score]");
    total.forEach((el) => {
      let player = el.getAttribute("score");
      if (player) {
        let score = sumArray(this.scores[this.players.indexOf(player)]);
        (el as HTMLElement).textContent = score.toString();
      }
    });
  }
}