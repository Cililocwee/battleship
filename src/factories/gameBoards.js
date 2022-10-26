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
    let coordJSON = JSON.stringify(coords);
    let occupiedJSON = JSON.stringify(this.occupiedList[model]);
    let hitJSON = JSON.stringify(this.hitList[model]);
    let rehit = hitJSON.indexOf(coordJSON);
    let hitStatus = occupiedJSON.indexOf(coordJSON);

    if (rehit != -1) {
      return false;
    }
    if (hitStatus != -1) {
      this.hitList[model].push(coords);
      return true;
    } else {
      return false;
    }
  };

  this.hpCheck = function (model) {
    if (this.occupiedList[model].length === this.hitList[model].length) {
      return true;
    } else {
      return false;
    }
  };
}

function boardFactory() {
  return new Board();
}

export default boardFactory;
