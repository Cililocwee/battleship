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
      for (let i = bow[1]; i < size + bow[1]; i++) {
        coords.push([i, bow[0]]);
      }
    }
    if (orientation === "horizontal") {
      for (let i = bow[1]; i < size + bow[1]; i++) {
        coords.push([bow[0], i]);
      }
    }

    this.occupiedList[model] = coords;
  };

  this.recieveAttack = function (coords, model) {
    if (this.hitList[model].length === 0) {
      if (this.occupiedList[model][0].toString() === coords.toString()) {
        // HIT -- to call hit()
        this.hitList[model].push(coords);
        return true;
      } else {
        // MISS
        return false;
      }
    } else {
      // NO REHITS
      return false;
    }
  };
}

function boardFactory() {
  return new Board();
}

export default boardFactory;
