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
    if (Math.random() < 0.5) {
      return "vertical";
    } else {
      return "horizontal";
    }
  }

  function plotEnemyBoats() {
    let carrier = shipYard("carrier", randomorient());
    let battleship = shipYard("battleship", randomorient());
    let destroyer = shipYard("destroyer", randomorient());
    let submarine = shipYard("submarine", randomorient());
    let patrolboat = shipYard("patrolboat", randomorient());
    let tryFlag = true;

    while (tryFlag) {
      computerBoard.occupied = [];
      computerBoard.giveBoatsAPosition(carrier, randomcoords());
      computerBoard.giveBoatsAPosition(battleship, randomcoords());
      computerBoard.giveBoatsAPosition(destroyer, randomcoords());
      computerBoard.giveBoatsAPosition(submarine, randomcoords());
      computerBoard.giveBoatsAPosition(patrolboat, randomcoords());
      if (computerBoard.occupied.length == 17) {
        tryFlag = false;
      }
    }

    computerBoard.grid = Array(12)
      .fill(null)
      .map(() => Array(12).fill(0));
    computerBoard.putBoatsOnGrid(computerBoard.fleet, carrier);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, battleship);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, destroyer);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, submarine);
    computerBoard.putBoatsOnGrid(computerBoard.fleet, patrolboat);

    console.log(computerBoard.occupied);
    console.table(computerBoard.grid);
  }

  /*
  1. Put enemy boats on the map
  TODO Close off player entry of ships
   */
  function startGame() {
    plotEnemyBoats();
  }

  return {
    playerBoard,
    computerBoard,
    startGame,
    randomcoords,
  };
})();

export default gameloop;
