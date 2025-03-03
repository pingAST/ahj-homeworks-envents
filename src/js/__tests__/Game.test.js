import Game from "../class/Game";
import GoblinManager from "../class/GoblinManager";
import UIController from "../class/UIController";

jest.mock("../class/GoblinManager");
jest.mock("../class/UIController");

describe("Game Class", () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="game"></div>
      <div id="score"></div>
      <div id="misses"></div>
      <div id="game-over-modal">
        <span id="final-score"></span>
        <button id="restart-btn"></button>
      </div>
    `;

    GoblinManager.mockClear();
    UIController.mockClear();

    game = new Game();
  });

  test("should create game board with 16 cells", () => {
    const cells = document.getElementsByClassName("cell");
    expect(cells.length).toBe(16);
  });

  test("should initialize GoblinManager and UIController", () => {
    expect(GoblinManager).toHaveBeenCalledTimes(1);
    expect(UIController).toHaveBeenCalledTimes(1);
  });

  test("should handle cell click correctly", () => {
    const mockCell = document.createElement("div");
    game.cells = [mockCell];
    game.state.isActive = true;
    game.goblinManager.currentCell = mockCell;

    game.handleClick(mockCell);

    expect(game.state.score).toBe(1);
    expect(game.goblinManager.remove).toHaveBeenCalled();
  });

  test("should count misses correctly", async () => {
    jest.useFakeTimers();
    game.nextRound();

    jest.advanceTimersByTime(1000);
    expect(game.state.misses).toBe(1);

    jest.useRealTimers();
  });

  test("should end game after 5 misses", async () => {
    jest.useFakeTimers();

    game.state.misses = 4;
    game.nextRound();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(game.state.isActive).toBe(false);
    expect(game.ui.showGameOver).toHaveBeenCalledWith(0);
  });

  test("should restart game properly", () => {
    game.start();
    expect(game.state.score).toBe(0);
    expect(game.state.misses).toBe(0);
    expect(game.state.isActive).toBe(true);
  });
});
