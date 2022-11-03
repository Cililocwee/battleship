import shipYard from "./ships";

function Board() {
  this.grid = Array(12)
    .fill(null)
    .map(() => Array(12).fill(0));

  this.computerFleet = [
    ["carrier", null, 5, []],
    ["battleship", null, 4, []],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ];

  this.playerFleet = [
    ["carrier", null, 5, []],
    ["battleship", null, 4, []],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ];

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

  this.missList = [];

  this.positionBoats = function (model, bow, orientation) {
    let coords = [];
    let size;
    let errorFlag = false;
    const sizeError = "Error: Off the map";
    const overLapError = "Error: Overlapping boats";
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
    // if vertical, increments the y coord
    if (orientation === "vertical") {
      // boat goes off the map
      if (bow[1] + size > 12) {
        return [sizeError, true];
      }

      for (let i = 0; i < size; i++) {
        // boats shouldn't overlap vertically
        if (this.checkCoord([bow[0], bow[1] + i])[1] === true) {
          errorFlag = true;
          return [overLapError, errorFlag];
        }
        // push the created coords to array
        coords.push([bow[0], bow[1] + i]);
      }
    }
    // if horizontal, increments the x coord
    if (orientation === "horizontal") {
      // boat goes off the map
      if (bow[0] + size > 12) {
        return [sizeError, errorFlag];
      }
      for (let i = 0; i < size; i++) {
        // boats shouldn't overlap horizontally
        if (this.checkCoord([bow[0] + i, bow[1]])[1] === true) {
          errorFlag = true;
          return [overLapError, errorFlag];
        }
        // push the created coords to array
        coords.push([bow[0] + i, bow[1]]);
      }
    }
    if (!errorFlag) {
      this.occupiedList[model] = coords;
    } else {
      this.occupiedList[model] = [];
      return false;
    }
  };

  this.checkCoord = function (coords) {
    let coordJSON = JSON.stringify(coords);
    for (let model in this.occupiedList) {
      let occupiedJSON = JSON.stringify(this.occupiedList[model]);
      let coordResult = occupiedJSON.indexOf(coordJSON);
      if (coordResult != -1) {
        // console.log([coords, true, model]);
        return [coords, true, model];
      }
    }
    return [coords, false];
  };

  /* On call, the result of checkCoord should be assigned to a variable
  and used for recieveAttack */
  this.recieveAttack = function (coords, model) {
    let coordJSON = JSON.stringify(coords);
    let occupiedJSON = JSON.stringify(this.occupiedList[model]);
    let hitJSON = JSON.stringify(this.hitList[model]);

    let rehit = hitJSON.indexOf(coordJSON);
    let hitStatus = occupiedJSON.indexOf(coordJSON);

    if (rehit != -1) {
      // NO REHITS
      return false;
    } else if (hitStatus != -1) {
      // HIT
      console.log("Hit");
      this.hitList[model].push(coords);
      return true;
    } else {
      // MISS
      this.missList.push(coords);
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

  this.boardStatus = function () {
    if (JSON.stringify(this.hitList) === JSON.stringify(this.occupiedList)) {
      // GAME OVER
      return true;
    } else {
      // CONTINUE
      return false;
    }
  };

  this.report = function () {
    return [this.occupiedList, this.hitList];
  };
}

function boardFactory() {
  return new Board();
}

export default boardFactory;
