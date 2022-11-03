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

  this.occupied = [];
  this.missList = [];
  this.hitList = [];

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
        if (
          JSON.stringify(this.occupied).indexOf(
            JSON.stringify([bow[0], bow[1] + i])
          ) != -1
        ) {
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
        if (
          JSON.stringify(this.occupied).indexOf(
            JSON.stringify(bow[0] + i, bow[1])
          ) != -1
        ) {
          errorFlag = true;
          return [overLapError, errorFlag];
        }
        // push the created coords to array
        coords.push([bow[0] + i, bow[1]]);
      }
    }
    if (!errorFlag) {
      // this.occupiedList[model] = coords;
      switch (model) {
        case "carrier":
          this.playerFleet[0][3] = coords;
          this.playerFleet[0][1] = orientation;
          this.occupied.push(...coords);
          break;
        case "battleship":
          this.playerFleet[1][3] = coords;
          this.playerFleet[1][1] = orientation;
          this.occupied.push(...coords);
          break;
        case "destroyer":
          this.playerFleet[2][3] = coords;
          this.playerFleet[2][1] = orientation;
          this.occupied.push(...coords);
          break;
        case "submarine":
          this.playerFleet[3][3] = coords;
          this.playerFleet[3][1] = orientation;
          this.occupied.push(...coords);
          break;
        case "patrolboat":
          this.playerFleet[4][3] = coords;
          this.playerFleet[4][1] = orientation;
          this.occupied.push(...coords);
          break;
      }
    } else {
      // this.occupiedList[model] = [];
      switch (model) {
        case "carrier":
          this.playerFleet[0][3] = [];
          break;
        case "battleship":
          this.playerFleet[1][3] = [];
          break;
        case "destroyer":
          this.playerFleet[2][3] = [];
          break;
        case "submarine":
          this.playerFleet[3][3] = [];
          break;
        case "patrolboat":
          this.playerFleet[4][3] = [];
          break;
      }
      return false;
    }
  };

  this.checkCoord = function (coords) {
    let coordJSON = JSON.stringify(coords);
    for (let i = 0; i < this.occupied; i++) {
      let occupiedJSON = JSON.stringify(this.occupied);
      let coordResult = occupiedJSON.indexOf(coordJSON);
      if (coordResult != -1) {
        return [coords, true];
      }
    }
    return [coords, false];
  };

  /* On call, the result of checkCoord should be assigned to a variable
  and used for recieveAttack */
  this.recieveAttack = function (coords) {
    let coordJSON = JSON.stringify(coords);
    let occupiedJSON = JSON.stringify(this.occupied);
    let hitJSON = JSON.stringify(this.hitList);

    let rehit = hitJSON.indexOf(coordJSON);
    let hitStatus = occupiedJSON.indexOf(coordJSON);

    if (rehit != -1) {
      // NO REHITS
      return false;
    } else if (hitStatus != -1) {
      // HIT
      //console.log("Hit");
      this.hitList.push(coords);
      return true;
    } else {
      // MISS
      this.missList.push(coords);
      return false;
    }
  };

  this.hpCheck = function (ship) {
    return ship.hp;
  };

  this.boardStatus = function () {
    if (this.hitList.length == this.occupied.length) {
      // GAME OVER
      return true;
    } else {
      // CONTINUE
      return false;
    }
  };
}

function boardFactory() {
  return new Board();
}

export default boardFactory;
