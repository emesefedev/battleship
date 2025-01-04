import { GameBoard } from "./game-board.js";

export class Player {
  constructor(name, isReal = true) {
    this.name = name;

    this.isReal = isReal;
    this.gameBoard = new GameBoard();
  }

  printGameBoard() {
    if (this.gameBoard != undefined) this.gameBoard.printGameBoard();
  }

  placeShip(ship, x, y, d) {
    this.gameBoard.placeShip(ship, x, y, d);
  }

  attack(player, x, y) {
    return player.gameBoard.receiveAttack(x, y);
  }
}
