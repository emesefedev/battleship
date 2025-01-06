const ELEMENT_SIZE = 32; // px
const GAP_SIZE = 2; //px

const playerAContainer = document.querySelector("#playerA-board-container");
const playerBContainer = document.querySelector("#playerB-board-container");

function generateGrid(container) {
  container.innerHTML = "";

  const totalElements = 100;
  const containerWidth = 10 * ELEMENT_SIZE + (10 - 1) * GAP_SIZE;
  container.style.width = `${containerWidth}px`;

  for (let i = 0; i < totalElements; i++) {
    const button = document.createElement("button");

    button.classList.add("box", "flex", "center");
    button.innerHTML = "⚪️";

    button.addEventListener("click", (event) => {
      event.target.innerHTML = "🔵";
    });

    container.appendChild(button);
  }
}

window.addEventListener("load", () => {
  generateGrid(playerAContainer);
  generateGrid(playerBContainer);
});
