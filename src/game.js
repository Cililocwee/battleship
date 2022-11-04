import boardFactory from "./factories/gameBoards";
import shipYard from "./factories/ships";

const gameloop = (() => {
  // initiating game

  // set up each board
  const computerBoard = boardFactory();
  const playerBoard = boardFactory();

  function randomcoords() {
    let randomx = Math.floor(Math.random() * 11);
    let randomy = Math.floor(Math.random() * 11);
    return [randomx, randomy];
  }

  function randomorient() {
    let toincoss = Math.random();
    if (toincoss < 0.5) {
      // console.log("vertical");
      return "vertical";
    }
    if (toincoss >= 0.5) {
      // console.log("horizontal");
      return "horizontal";
    }
  }

  // giving hit functionality to the enemygrid
  // * DOM-RELATED
  function activateEnemyCells() {
    let enemyOccupied = computerBoard.occupiedList;

    // get ids from coords
    let idlookup = [];

    for (let thing in enemyOccupied) {
      for (let i = 0; i < enemyOccupied[thing].length; i++) {
        idlookup.push(
          JSON.stringify(enemyOccupied[thing][i]).split(",").join("-")
        );
      }
    }

    for (let h = 0; h < idlookup.length; h++) {
      document.getElementById(idlookup[h]).classList.add("enemyoccupied");
    }
  }

  // ! REFACTOR THIS
  // check cycle for if the game is over
  const enemygrid = document.getElementById("enemygrid");
  enemygrid.addEventListener("click", () => {
    // true = game over
    computerBoard.boardStatus();
  });

  function plotEnemyBoats() {
    let carrier = shipYard("carrier", randomorient);
    let battleship = shipYard("battleship", randomorient);
    let destroyer = shipYard("destroyer", randomorient);
    let submarine = shipYard("submarine", randomorient);
    let patrolboat = shipYard("patrolboat", randomorient);

    computerBoard.giveBoatsAPosition(carrier, randomcoords());
    computerBoard.giveBoatsAPosition(battleship, randomcoords());
    computerBoard.giveBoatsAPosition(destroyer, randomcoords());
    computerBoard.giveBoatsAPosition(submarine, randomcoords());
    computerBoard.giveBoatsAPosition(patrolboat, randomcoords());

    computerBoard.putBoatsOnGrid(computerBoard.fleet, carrier);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, battleship);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, destroyer);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, submarine);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, patrolboat);

    console.log(computerBoard.occupied);
  }

  /*
  1. Put enemy boats on the map
  TODO Close off player entry of ships
   */
  function startGame() {
    plotEnemyBoats();
  }

  /*
  TODO Clear enemy boats from array
  TODO Clear enemy boats from grid 
  TODO Clear player boats */
  function resetGame() {
    for (let model in computerBoard.occupiedList) {
      computerBoard.occupiedList[model] = [];
    }
  }

  return {
    playerBoard,
    computerBoard,
    activateEnemyCells,
    resetGame,
    startGame,
  };
})();

export default gameloop;
