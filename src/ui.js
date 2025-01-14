import {
  getPlacingShips,
  setPlacingShips,
  placeShipForPlayer,
} from "./game.js";
import { Ship } from "./ship.js";

import { Player } from "./player.js";

const ELEMENT_SIZE = 32; // px
const GAP_SIZE = 2; //px

const playerAContainer = document.querySelector("#playerA-board-container");
const playerBContainer = document.querySelector("#playerB-board-container");

const ship2Button = document.querySelector("#ship2-button");
const ship3AButton = document.querySelector("#ship3A-button");
const ship3BButton = document.querySelector("#ship3B-button");
const ship4Button = document.querySelector("#ship4-button");
const ship5Button = document.querySelector("#ship5-button");

const doneButton = document.querySelector("#done-button");

const playerA = new Player("playerA");

let currentShip = undefined;
let currentShipCoordinates = [];
let currentDirection = undefined;

const ship2 = new Ship(2);
const ship3A = new Ship(3);
const ship3B = new Ship(3);
const ship4 = new Ship(4);
const ship5 = new Ship(5);

window.addEventListener("load", () => {
  ship2Button.addEventListener("click", () => {
    currentShip = ship2;
    setPlacingShips(true);
  });

  ship3AButton.addEventListener("click", () => {
    currentShip = ship3A;
    setPlacingShips(true);
  });

  ship3BButton.addEventListener("click", () => {
    currentShip = ship3B;
    setPlacingShips(true);
  });

  ship4Button.addEventListener("click", () => {
    currentShip = ship4;
    setPlacingShips(true);
  });

  ship5Button.addEventListener("click", () => {
    currentShip = ship5;
    setPlacingShips(true);
  });

  doneButton.addEventListener("click", () => {
    if (confirmShipCoordinates()) {
      setPlacingShips(false);
      clearCurrentShipInfo();
    } else {
      currentShipCoordinates.forEach((coords) => {
        const element = document.querySelector(
          `[data-index='${coords.x * 10 + coords.y}']`,
        );

        element.innerHTML = "⚪️";
      });
      clearCurrentCoordinates();
    }
  });

  generateGrid(playerAContainer);
  generateGrid(playerBContainer);
});

function generateGrid(container) {
  container.innerHTML = "";

  const totalElements = 100;
  const containerWidth = 10 * ELEMENT_SIZE + (10 - 1) * GAP_SIZE;
  container.style.width = `${containerWidth}px`;

  for (let i = 0; i < totalElements; i++) {
    const button = document.createElement("button");

    button.classList.add("box", "flex", "center");
    button.setAttribute("data-index", i.toString());
    button.innerHTML = "⚪️";

    button.addEventListener("click", (event) => {
      if (
        getPlacingShips() &&
        isBlank(event.target) &&
        addCurrentShipCoordinates(getCoordinates(event.target))
      )
        event.target.innerHTML = "🔵";
    });

    container.appendChild(button);
  }
}

function getCoordinates(element) {
  const index = element.getAttribute("data-index");
  if (!index) return;

  const idx = parseInt(index);
  if (Number.isNaN(idx)) return;

  const x = Math.floor(index / 10);
  const y = index % 10;

  return { x, y };
}

function addCurrentShipCoordinates(coordinates) {
  if (currentShipCoordinates.length >= currentShip.size) return false;

  if (currentShipCoordinates.length === 0) {
    currentShipCoordinates.push(coordinates);
    return true;
  }

  if (currentShipCoordinates.length === 1) {
    const existingCoordinates = currentShipCoordinates[0];
    if (
      coordinates.x !== existingCoordinates.x &&
      coordinates.y !== existingCoordinates.y
    )
      return false;

    if (coordinates.x === existingCoordinates.x) {
      if (Math.abs(coordinates.y - existingCoordinates.y) !== 1) {
        return false;
      }

      currentShipCoordinates.push(coordinates);
      currentDirection = "h";
      return true;
    }

    if (coordinates.y === existingCoordinates.y) {
      if (Math.abs(coordinates.x - existingCoordinates.x) !== 1) return false;

      currentShipCoordinates.push(coordinates);
      currentDirection = "v";
      return true;
    }
  }

  if (currentDirection == undefined) return false;

  if (currentDirection === "h") {
    const mostLeft = getMostLeftCoords();
    const mostRight = getMostRightCoords();

    if (coordinates.x !== mostLeft.x) return false;

    if (coordinates.y !== mostLeft.y - 1 && coordinates.y !== mostRight.y + 1) {
      return false;
    }

    currentShipCoordinates.push(coordinates);
    return true;
  }

  if (currentDirection === "v") {
    const mostBottom = getMostBottomCoords();
    const mostTop = getMostTopCoords();

    if (coordinates.y !== mostBottom.y) return false;

    if (coordinates.x !== mostTop.x - 1 && coordinates.x !== mostBottom.x + 1)
      return false;

    currentShipCoordinates.push(coordinates);
    return true;
  }
}

function confirmShipCoordinates() {
  if (currentShipCoordinates.length !== currentShip.size) return false;

  const coords =
    currentDirection === "h" ? getMostLeftCoords() : getMostTopCoords();

  placeShipForPlayer(playerA, currentShip, coords, currentDirection);

  return true;
}

function getMostLeftCoords() {
  return currentShipCoordinates.reduce((prev, curr) =>
    prev.y <= curr.y ? prev : curr,
  );
}

function getMostRightCoords() {
  return currentShipCoordinates.reduce((prev, curr) =>
    prev.y >= curr.y ? prev : curr,
  );
}

function getMostBottomCoords() {
  return currentShipCoordinates.reduce((prev, curr) =>
    prev.x >= curr.x ? prev : curr,
  );
}

function getMostTopCoords() {
  return currentShipCoordinates.reduce((prev, curr) =>
    prev.x <= curr.x ? prev : curr,
  );
}

function isBlank(element) {
  return element.innerHTML === "⚪️";
}

function clearCurrentShipInfo() {
  currentShip = undefined;
  clearCurrentCoordinates();
  currentDirection = undefined;
}

function clearCurrentCoordinates() {
  currentShipCoordinates = [];
}
