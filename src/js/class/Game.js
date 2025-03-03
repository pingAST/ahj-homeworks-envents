import GoblinManager from "./GoblinManager";
import UIController from "./UIController";

export default class Game {
  constructor() {
    this.board = document.getElementById("game");
    this.cells = [];
    this.goblinManager = new GoblinManager(this.cells);
    this.ui = new UIController();
    this.state = {
      score: 0,
      misses: 0,
      isActive: false,
    };

    this.initialize();
  }

  initialize() {
    this.createBoard();
    this.setupEventListeners();
    this.start();
  }

  createBoard() {
    this.board.innerHTML = "";
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.cells.push(cell);
      this.board.appendChild(cell);
    }
  }

  setupEventListeners() {
    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => this.handleClick(cell));
    });
  }

  handleClick(cell) {
    if (!this.state.isActive) return;

    if (cell === this.goblinManager.currentCell) {
      this.state.score++;
      this.goblinManager.remove();
      clearTimeout(this.timeoutId);
      this.nextRound();
    }
  }

  start() {
    this.state = {
      score: 0,
      misses: 0,
      isActive: true,
    };
    this.ui.update(0, 0);
    this.nextRound();
  }

  nextRound() {
    if (!this.state.isActive) return;

    this.goblinManager.spawn();
    this.ui.update(this.state.score, this.state.misses);

    this.timeoutId = setTimeout(() => {
      this.state.misses++;
      this.ui.update(this.state.score, this.state.misses);

      if (this.state.misses >= 5) {
        this.end();
      } else {
        this.nextRound();
      }
    }, 1000);
  }

  async end() {
    this.state.isActive = false;
    this.goblinManager.remove();
    const shouldRestart = await this.ui.showGameOver(this.state.score);
    if (shouldRestart) this.start();
  }
}
