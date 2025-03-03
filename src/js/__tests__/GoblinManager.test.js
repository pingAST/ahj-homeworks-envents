import GoblinManager from "../class/GoblinManager";
import goblinImage from "../../img/goblin.png";

describe("GoblinManager Class", () => {
  let manager;
  const mockCells = [document.createElement("div")];

  beforeEach(() => {
    manager = new GoblinManager(mockCells);
  });

  test("should spawn goblin in random cell", () => {
    manager.spawn();
    expect(manager.goblin).toBeInstanceOf(Image);
    expect(manager.goblin.src).toContain(goblinImage);
    expect(manager.currentCell).toBe(mockCells[0]);
  });

  test("should remove goblin correctly", () => {
    manager.spawn();
    manager.remove();
    expect(manager.goblin).toBeNull();
    expect(manager.currentCell).toBeNull();
  });
});
