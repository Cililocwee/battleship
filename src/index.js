import css from "./style.css";
import gridSetup from "./factories/gridSetup";
import gameloop from "./factories/game";
import tools from "./factories/utilities";

/********** GAME SETUP  ************/
// make each player's board (grid)
gridSetup.makeEnemyBoard();
gridSetup.makePlayerBoard();

// set up each player's board (game)
const enemyboard = gameloop.enemyboard;
const playerboard = gameloop.playerboard;

// Enemy cells can be hit or missed
gameloop.activateEnemyCells();

// adds functionality to submit button
const submitBtn = document.getElementById("submit");
const shipSelection = document.getElementById("ships");

submitBtn.addEventListener("click", () => {
  let shiptype = tools.getShipType();
  let orientinput = tools.getOrientation();
  let coordinput = tools.getCoordinates();

  // debugging
  // console.log(shiptype);
  // console.log(coordinput);
  // console.log(orientinput);

  if (playerboard.positionBoats(shiptype, coordinput, orientinput)) {
    // Don't do anything if positionBoats returns false
    return false;
  } else {
    playerboard.positionBoats(shiptype, coordinput, orientinput);
  }
  console.log(playerboard.occupiedList);
  tools.colorBoard(playerboard.report()[0][shiptype]);

  // removes ships from list
  shipSelection[shipSelection.selectedIndex].remove();
});
