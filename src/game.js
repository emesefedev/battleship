import { Player } from "./player.js";

const playerB = new Player("playerB", false);

let isPlayerATurn = true;
let currentPlayer;
let enemy;
let isGameOver = false;

let placingShips = false;

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

  currentPlayer = playerA;
  enemy = playerB;
}

function changeTurn() {
  isPlayerATurn = !isPlayerATurn;
  currentPlayer = isPlayerATurn ? playerA : playerB;
  enemy = isPlayerATurn ? playerB : playerA;
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
