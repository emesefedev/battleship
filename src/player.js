import { GameBoard } from "./game-board.js";
import { getRandomInt } from "./utilities.js";

export class Player {
  constructor(name, isReal = true) {
    this.name = name;

    this.isReal = isReal;
    this.gameBoard = new GameBoard();
  }

  printGameBoard() {
    if (this.gameBoard != undefined) this.gameBoard.printGameBoard();
  }

  isGameOver() {
    return this.gameBoard.isGameOver();
  }

  placeShip(ship, x, y, d) {
    this.gameBoard.placeShip(ship, x, y, d);
  }

  placeShipRandom(ship) {
    let x, y, d;
    do {
      x = getRandomInt(10);
      y = getRandomInt(10);
      d = getRandomInt(2) === 0 ? "h" : "v";
    } while (!this.canPlaceShip(ship, x, y, d));

    this.placeShip(ship, x, y, d);
    this.printGameBoard();
  }

  canPlaceShip(ship, x, y, d) {
    return this.gameBoard.canPlaceShip(ship, x, y, d).canBePlaced;
  }

  attack(player, x, y) {
    return player.gameBoard.receiveAttack(x, y);
  }

  hasAllShipsPlaced() {
    return this.gameBoard.allShipsPlaced();
  }
}
