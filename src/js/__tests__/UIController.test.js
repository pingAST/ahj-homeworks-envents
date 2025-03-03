import UIController from "../class/UIController";

describe("UIController Class", () => {
  let ui;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="score"></div>
      <div id="misses"></div>
      <div id="game-over-modal">
        <span id="final-score"></span>
        <button id="restart-btn"></button>
      </div>
    `;

    ui = new UIController();
  });

  test("should update score display", () => {
    ui.update(5, 2);
    expect(ui.scoreElement.textContent).toBe("Счет: 5");
    expect(ui.missesElement.textContent).toBe("Пропуски: 2/5");
  });

  test("should handle game over modal", async () => {
    const mockResolve = jest.fn();
    const promise = ui.showGameOver(10).then(mockResolve);

    await new Promise((resolve) => setTimeout(resolve, 0));
    ui.restartBtn.click();

    await promise;
    expect(mockResolve).toHaveBeenCalled();
  });
});
