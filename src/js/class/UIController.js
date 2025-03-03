export default class UIController {
  constructor() {
    this.scoreElement = document.getElementById("score");
    this.missesElement = document.getElementById("misses");
    this.modal = document.getElementById("game-over-modal");
    this.finalScoreElement = document.getElementById("final-score");
    this.restartBtn = document.getElementById("restart-btn");
  }

  update(score, misses) {
    this.scoreElement.textContent = `Счет: ${score}`;
    this.missesElement.textContent = `Пропуски: ${misses}/5`;
  }

  async showGameOver(score) {
    return new Promise((resolve) => {
      this.finalScoreElement.textContent = score;
      this.modal.classList.add("visible");

      const handler = () => {
        this.modal.classList.remove("visible");
        this.restartBtn.removeEventListener("click", handler);
        resolve(true);
      };

      this.restartBtn.addEventListener("click", handler);
    });
  }
}
