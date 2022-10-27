import boardFactory from "./gameBoards";

function Player(name) {
  this.name = name;

  this.declareAttack = function (board, coords) {
    let target = board.checkCoord(coords);

    return target[1];

    function randomAttack() {}
  };
}

export default Player;
