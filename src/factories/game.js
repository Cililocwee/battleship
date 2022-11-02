import boardFactory from "./gameBoards";
const gameloop = (() => {
  // initiating game

  // set up enemy's board
  const enemyboard = boardFactory();

  // need to add coord randomization
  let randomflag = true;
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

  // need to pass random numbers into the coords
  // if recieve something back, try again

  function plotEnemyBoats() {
    for (let model in enemyboard.occupiedList) {
      while (enemyboard.occupiedList[model].length == 0) {
        enemyboard.positionBoats(model, randomcoords(), randomorient());
      }
    }
  }

  //plotEnemyBoats();

  // set up player's board
  const playerboard = boardFactory();

  // giving hit functionality to the enemygrid
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

  function startGame() {
    plotEnemyBoats();
  }

  function resetGame() {
    for (let model in enemyboard.occupiedList) {
      enemyboard.occupiedList[model] = [];
    }
  }

  return { playerboard, enemyboard, activateEnemyCells, startGame, resetGame };
})();

export default gameloop;
