const PositionStatus = {
  Miss: "⭕️",
  Blank: "⚪️",
  Hit: "❌",
  Ship: "🔵",
};

const ShipDirection = {
  Vertical: "v",
  Horizontal: "h",
};

export class GameBoard {
  constructor(size = 10, maxShips = 5) {
    this.size = size;
    this.maxShips = maxShips;

    this.ships = {};
    this.totalShips = 0;
    this.totalShipsSunk = 0;

    this.attackLog = {};
  }

  printGameBoard() {
    for (let i = 0; i < this.size; i++) {
      let line = "";
      for (let j = 0; j < this.size; j++) {
        let value = this.isBlank(i, j)
          ? PositionStatus.Blank
          : PositionStatus.Ship;

        value = this.isInLog(i, j)
          ? this.attackLog[this.getKeyFromCoords(i, j)]
          : value;

        line += value + " ";
      }
      console.log(line);
    }
  }

  getKeyFromCoords(x, y) {
    return `${x},${y}`;
  }

  receiveAttack(x, y) {
    if (this.isInLog(x, y)) throw new Error("Repeated Attack");

    let status = PositionStatus.Miss;

    if (!this.isBlank(x, y)) {
      status = PositionStatus.Hit;

      const ship = this.ships[this.getKeyFromCoords(x, y)];
      ship.hit();

      if (ship.isSunk()) {
        console.log("Ship sunk!!!");
        this.totalShipsSunk++;
      }

      if (this.isGameOver()) console.log("GAME OVER");
    }

    this.saveAttack(x, y, status);

    return status;
  }

  isGameOver() {
    return this.totalShipsSunk === this.totalShips;
  }

  saveAttack(x, y, status) {
    this.attackLog[this.getKeyFromCoords(x, y)] = status;
  }

  placeShip(ship, x, y, d) {
    if (this.totalShips >= this.maxShips)
      throw new Error("No more ships allowed");

    if (d !== ShipDirection.Vertical && d !== ShipDirection.Horizontal)
      throw new Error("Invalid Direction");

    if (!this.isBetweenBoardLimits(x, y)) throw new Error("Out Of Limits");

    if (d === ShipDirection.Vertical) {
      if (
        !this.isBetweenBoardLimits(x + ship.size - 1, y) ||
        !this.canPlaceShipVertically(ship, x, y)
      )
        throw new Error(`Can't place ship of size ${ship.size} vertically`);

      this.placeShipVertically(ship, x, y);
    } else {
      if (
        !this.isBetweenBoardLimits(x, y + ship.size - 1) ||
        !this.canPlaceShipHorizontally(ship, x, y)
      )
        throw new Error(`Can't place ship of size ${ship.size} horizontally`);

      this.placeShipHorizontally(ship, x, y);
    }

    this.totalShips++;
  }

  placeShipVertically(ship, x, y) {
    for (let i = x; i < x + ship.size; i++) {
      this.ships[`${i},${y}`] = ship;
    }
  }

  placeShipHorizontally(ship, x, y) {
    for (let j = y; j < y + ship.size; j++) {
      this.ships[`${x},${j}`] = ship;
    }
  }

  allShipsPlaced() {
    return this.totalShips === this.maxShips;
  }

  isBetweenBoardLimits(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  isBlank(x, y) {
    return !(this.getKeyFromCoords(x, y) in this.ships);
  }

  isInLog(x, y) {
    return this.getKeyFromCoords(x, y) in this.attackLog;
  }

  canPlaceShipVertically(ship, x, y) {
    for (let i = x; i < x + ship.size; i++) {
      if (!this.isBlank(i, y)) return false;
    }
    return true;
  }

  canPlaceShipHorizontally(ship, x, y) {
    for (let j = y; j < y + ship.size; j++) {
      if (!this.isBlank(x, j)) return false;
    }
    return true;
  }
}
