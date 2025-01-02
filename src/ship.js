export class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  isSunk() {
    return this.hits === this.size;
  }

  hit() {
    if (!this.isSunk()) this.hits++;
  }
}
