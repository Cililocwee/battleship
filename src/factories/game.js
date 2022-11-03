import boardFactory from "./gameBoards";
const gameloop = (() => {
  // initiating game

  // set up enemy's board
  const enemyboard = boardFactory();

  function randomcoords() {
    let randomx = Math.floor(Math.random() * 11);
    let randomy = Math.floor(Math.random() * 11);
    return [randomx, randomy];
  }

  function randomorient() {
    let toincoss = Math.random();
    if (toincoss < 0.5) {
      console.log("vertical");
      return "vertical";
    }
    if (toincoss >= 0.5) {
      console.log("horizontal");
      return "horizontal";
    }
  }

  // function plotEnemyBoats() {
  //   enemyboard.positionBoats("carrier", randomcoords, randomorient);
  //   enemyboard.positionBoats("battleship", randomcoords, randomorient);
  //   enemyboard.positionBoats("destroyer", randomcoords, randomorient);
  //   enemyboard.positionBoats("submarine", randomcoords, randomorient);
  //   enemyboard.positionBoats("patrol", randomcoords, randomorient);
  // }

  // set up player's board
  const playerboard = boardFactory();

  // giving hit functionality to the enemygrid
  // DOM-RELATED
  function activateEnemyCells() {
    let enemyOccupied = enemyboard.occupiedList;

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

  // REFACTOR THIS
  // check cycle for if the game is over
  const enemygrid = document.getElementById("enemygrid");
  enemygrid.addEventListener("click", () => {
    // true = game over
    enemyboard.boardStatus();
  });

  // function startGame() {
  //   plotEnemyBoats();
  // }

  // function resetGame() {
  //   for (let model in enemyboard.occupiedList) {
  //     enemyboard.occupiedList[model] = [];
  //   }
  // }

  return { playerboard, enemyboard, activateEnemyCells };
})();

export default gameloop;
