import css from "./style.css";
import gridSetup from "./grid/gridSetup";
import gameloop from "./gameLogic";
import shipYard from "./factories/ships";
import cellFunction from "./grid/cells";

/********** GAME SETUP  ************/
// Allows player to set up board
gridSetup.makePlayerBoard();

// set up each player's board (game)
const enemyboard = gameloop.computerBoard;
const playerboard = gameloop.playerBoard;

// variables for later use in setting up the game
const startBtn = document.getElementById("start");
const grid = document.getElementById("enemygrid");
const labelTop = document.getElementById("enemylabeltop");
const labelLeft = document.getElementById("enemylabelleft");

// Functionality for the Start Button (also resets a game in progress)
// TODO change text (Start Game) to Reset Game after initialization
// TODO make player grid reset on click too
startBtn.addEventListener("click", () => {
  grid.replaceChildren();
  labelTop.replaceChildren();
  labelLeft.replaceChildren();

  gridSetup.makeEnemyBoard();
  gameloop.startGame();

  // Enemy cells can be hit or missed
  gridSetup.activateEnemyCells();
  let computerBoxes = document.querySelectorAll("#enemygrid .box");
  gridSetup.plotComputerBoatsToGrid(computerBoxes, enemyboard);
  console.log(enemyboard.fleet);
});

// Functionality to submit button
const submitBtn = document.getElementById("submit");
const shipSelection = document.getElementById("ships");

// Functionality for the submit button
submitBtn.addEventListener("click", () => {
  let shiptype = cellFunction.getShipType();
  let orientinput = cellFunction.getOrientation();
  // let coordinput = cellFunction.getCoordinates();

  switch (shiptype) {
    case "carrier":
      const carrier = shipYard(shiptype, orientinput);
      playerboard.giveBoatsAPosition(carrier, cellFunction.getCoordinates());
      playerboard.putBoatsOnGrid(playerboard.fleet, carrier);
      document
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      cellFunction.updateDOMToShowPlayerBoats(carrier);
      break;
    case "battleship":
      const battleship = shipYard(shiptype, orientinput);
      playerboard.giveBoatsAPosition(battleship, cellFunction.getCoordinates());
      playerboard.putBoatsOnGrid(playerboard.fleet, battleship);
      document
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      cellFunction.updateDOMToShowPlayerBoats(battleship);
      break;
    case "destroyer":
      const destroyer = shipYard(shiptype, orientinput);
      playerboard.giveBoatsAPosition(destroyer, cellFunction.getCoordinates());
      playerboard.putBoatsOnGrid(playerboard.fleet, destroyer);
      document
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      cellFunction.updateDOMToShowPlayerBoats(destroyer);
      break;
    case "submarine":
      const submarine = shipYard(shiptype, orientinput);
      playerboard.giveBoatsAPosition(submarine, cellFunction.getCoordinates());
      playerboard.putBoatsOnGrid(playerboard.fleet, submarine);
      document
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      cellFunction.updateDOMToShowPlayerBoats(submarine);
      break;
    case "patrolboat":
      const patrolboat = shipYard(shiptype, orientinput);
      playerboard.giveBoatsAPosition(patrolboat, cellFunction.getCoordinates());
      playerboard.putBoatsOnGrid(playerboard.fleet, patrolboat);
      document
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      cellFunction.updateDOMToShowPlayerBoats(patrolboat);
      break;
  }

  // removes ships from list
  shipSelection[shipSelection.selectedIndex].remove();
});
