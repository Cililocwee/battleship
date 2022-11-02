import boardFactory from "./gameBoards";
const gameloop = (() => {
  // initiating game

  // setting up the enemy's board
  const enemyboard = boardFactory();

  // need to add class "enemyoccupied" to each of these coords
  enemyboard.positionBoats("battleship", [0, 0], "horizontal");
  enemyboard.positionBoats("carrier", [0, 1], "horizontal");
  enemyboard.positionBoats("submarine", [0, 2], "horizontal");
  enemyboard.positionBoats("destroyer", [0, 3], "horizontal");
  enemyboard.positionBoats("patrolboat", [0, 4], "horizontal");

  console.log(enemyboard.report()[0]);

  // player part
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

  return { playerboard, enemyboard, activateEnemyCells };
})();

export default gameloop;
