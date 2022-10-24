function Board() {
  this.occupiedList = {
    carrier: [],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  };

  this.hitList = {
    carrier: [],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  };

  this.positionBoats = function (model, bow, orientation) {
    let coords = [];
    let size;

    switch (model) {
      case "carrier":
        size = 5;
        break;
      case "battleship":
        size = 4;
        break;
      case "destroyer":
        size = 3;
        break;
      case "submarine":
        size = 3;
        break;
      case "patrolboat":
        size = 2;
        break;
    }

    if (orientation === "vertical") {
      for (let i = 0; i < size; i++) {
        coords.push([i, bow[0]]);
      }
    }
    if (orientation === "horizontal") {
      for (let i = 0; i < size; i++) {
        coords.push([bow[0], i]);
      }
    }

    this.occupiedList[model] = coords;
  };

  this.recieveAttack = function (coords, model) {
    // if the coords aren't in the hitList
    if (this.hitList.battleship.length === 0) {
      if (this.occupiedList.battleship[0].toString() === coords.toString()) {
        //hit
        this.hitList.battleship.push(coords);
        console.log(this.hitList);
        return true;
      } else {
        // miss
        return false;
      }
    } else {
      // if the coords ARE in the hitlist
      // no re-hits
      return false;
    }
  };
}

function boardFactory() {
  return new Board();
}

// let game1 = boardFactory();
// game1.positionBoats("carrier", [0, 0], "horizontal");

export default boardFactory;
