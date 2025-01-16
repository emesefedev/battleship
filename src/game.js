import { Player } from "./player.js";
import { Ship } from "./ship.js";

export const playerA = new Player("playerA");
export const playerB = new Player("playerB", false);

export const ship2 = new Ship(2);
export const ship3A = new Ship(3);
export const ship3B = new Ship(3);
export const ship4 = new Ship(4);
export const ship5 = new Ship(5);

let isPlayerATurn = true;
let isGameOver = false;

let placingShip = false;
let placingShips = true;
let inGame = false;

// while (!isGameOver) {
//   let x = prompt("Enter coord X:");
//   let y = prompt("Enter coord Y:");
//   console.log(`${currentPlayer.name} attacks ${enemy.name} in ${x}, ${y})`);
//   currentPlayer.attack(enemy, x, y);

//   enemy.printGameBoard();

//   isGameOver = enemy.isGameOver();
//   if (!isGameOver) changeTurn();
// }

// console.log(`${currentPlayer.name} wins!`);

export function changeTurn() {
  isPlayerATurn = !isPlayerATurn;
}

export function getIsPlayerATurn() {
  return isPlayerATurn;
}

export function getPlacingShip() {
  return placingShip;
}

export function setPlacingShip(placingShipBool) {
  placingShip = placingShipBool;
}

export function getPlacingShips() {
  return placingShips;
}

export function setPlacingShips(placingShipsBool) {
  placingShips = placingShipsBool;
}

export function getInGame() {
  return inGame;
}

export function setInGame(inGameBool) {
  inGame = inGameBool;
}
