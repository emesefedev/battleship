//import "./style.css";
import { GameBoard } from "./game-board.js";
import { Ship } from "./ship.js";

const ship2 = new Ship(2);
const ship3A = new Ship(3);
const ship3B = new Ship(3);
const ship4 = new Ship(4);
const ship5 = new Ship(5);

const board = new GameBoard();
//board.printBoard();

board.placeShip(ship2, 5, 7, "h");
board.placeShip(ship3A, 4, 7, "h");
board.placeShip(ship3B, 2, 1, "v");
board.placeShip(ship4, 0, 5, "h");
board.placeShip(ship5, 8, 3, "h");

board.printBoard();

board.receiveAttack(0, 0);
board.receiveAttack(2, 1);
board.receiveAttack(3, 1);
board.receiveAttack(4, 1);

console.log(board.attackLog);
