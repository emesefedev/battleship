import { Ship } from "./ship.js";
import { Player } from "./player.js";

const ship2 = new Ship(2);
const ship3A = new Ship(3);
const ship3B = new Ship(3);
const ship4 = new Ship(4);
const ship5 = new Ship(5);

const playerA = new Player("playerA");
const playerB = new Player("playerB", false);

playerA.placeShip(ship2, 5, 7, "h");
playerA.placeShip(ship3A, 4, 7, "h");
playerA.placeShip(ship3B, 2, 1, "v");
playerA.placeShip(ship4, 0, 5, "h");
playerA.placeShip(ship5, 8, 3, "h");

playerB.placeShip(ship2, 0, 0, "v");
playerB.placeShip(ship3A, 0, 1, "v");
playerB.placeShip(ship3B, 0, 2, "v");
playerB.placeShip(ship4, 0, 3, "v");
playerB.placeShip(ship5, 0, 4, "v");

// playerA.printGameBoard();
// console.log("\n");
// playerB.printGameBoard();

playerA.attack(playerB, 0, 0);
playerA.attack(playerB, 2, 0);
playerA.attack(playerB, 1, 0);

playerB.printGameBoard();
