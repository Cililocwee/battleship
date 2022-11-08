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
  }

  function startGame() {
    plotEnemyBoats();
  }

  // * Updates misslist, hitlist, dynamically chooses boxes without hit or miss
  function computerFiresAShot() {
    let playerCells = document.querySelectorAll(
      "#playergrid .box:not(.occupiedhit):not(.miss)"
    );
    let blindChoice = Math.floor(Math.random() * playerCells.length);

    if (playerCells[blindChoice].classList.contains("occupiedalive")) {
      playerCells[blindChoice].classList.add("occupiedhit");
      playerBoard.hitList.push(
        JSON.parse(playerCells[blindChoice].id.split("-").join(","))
      );
    } else {
      playerCells[blindChoice].classList.add("miss");
      playerBoard.missList.push(
        JSON.parse(playerCells[blindChoice].id.split("-").join(","))
      );
    }
  }

  function reinitializeGame() {
    const shipSelection = document.getElementById("ships");
    shipSelection.replaceChildren();
    const carrier = document.createElement("option");
    carrier.value = "carrier";
    carrier.innerHTML = "Carrier";
    shipSelection.add(carrier);

    const battleship = document.createElement("option");
    battleship.value = "battleship";
    battleship.innerHTML = "Battleship";
    shipSelection.add(battleship);

    const destroyer = document.createElement("option");
    destroyer.value = "destroyer";
    destroyer.innerHTML = "Destroyer";
    shipSelection.add(destroyer);

    const submarine = document.createElement("option");
    submarine.value = "submarine";
    submarine.innerHTML = "Submarine";
    shipSelection.add(submarine);

    const patrolboat = document.createElement("option");
    patrolboat.value = "patrolboat";
    patrolboat.innerHTML = "Patrolboat";
    shipSelection.add(patrolboat);

    const select = document.createElement("option");
    select.value = "select";
    select.innerHTML = "---";
    shipSelection.add(select);

    playerBoard.resetBoard();
    computerBoard.resetBoard();

    for (const box of document.querySelectorAll(".box")) {
      box.className = "box";
    }
  }
  return {
    playerBoard,
    computerBoard,
    startGame,
    randomcoords,
    computerFiresAShot,
    reinitializeGame,
  };
})();

export default gameloop;
