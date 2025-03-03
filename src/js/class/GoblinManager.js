import goblinImage from "../../img/goblin.png";

export default class GoblinManager {
  constructor(cells) {
    this.cells = cells;
    this.goblin = null;
    this.currentCell = null;
  }

  spawn() {
    this.remove();
    const index = Math.floor(Math.random() * this.cells.length);
    this.currentCell = this.cells[index];

    this.goblin = new Image();
    this.goblin.src = goblinImage;
    this.goblin.className = "gnome-img";
    this.currentCell.appendChild(this.goblin);
  }

  remove() {
    if (this.goblin) {
      this.goblin.remove();
      this.goblin = null;
      this.currentCell = null;
    }
  }
}
