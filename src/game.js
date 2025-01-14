import { Player } from "./player.js";
import { Ship } from "./ship.js";

export const playerA = new Player("playerA");
const playerB = new Player("playerB", false);

export const ship2 = new Ship(2);
export const ship3A = new Ship(3);
export const ship3B = new Ship(3);
export const ship4 = new Ship(4);
export const ship5 = new Ship(5);

let isPlayerATurn = true;
let currentPlayer;
let enemy;
let isGameOver = false;

let placingShip = false;
let placingShips = true;

// startGame();

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

function startGame() {
  playerB.placeShip(ship2, 0, 0, "v");
  playerB.placeShip(ship3A, 0, 1, "v");
  playerB.placeShip(ship3B, 0, 2, "v");
  playerB.placeShip(ship4, 0, 3, "v");
  playerB.placeShip(ship5, 0, 4, "v");

  currentPlayer = playerA;
  enemy = playerB;
}

function changeTurn() {
  isPlayerATurn = !isPlayerATurn;
  currentPlayer = isPlayerATurn ? playerA : playerB;
  enemy = isPlayerATurn ? playerB : playerA;
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

export function placeShipForPlayer(player, ship, coords, direction) {
  const { x, y } = coords;
  player.placeShip(ship, x, y, direction);
  player.printGameBoard();
}
