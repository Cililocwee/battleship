function Board() {
  this.grid = Array(12)
    .fill(null)
    .map(() => Array(12).fill(0));

  // IMPORT SHIPS! MAKE SHIPS! USE SHIP DATA! Genius >_>
  // * Fleet holds the objects and the coords, the objects hold the hp and orientation
  this.fleet = {
    carrier: [null, []],
    battleship: [null, []],
    destroyer: [null, []],
    submarine: [null, []],
    patrolboat: [null, []],
  };

  this.occupied = [];
  this.missList = [];
  this.hitList = [];

  this.occupy = function () {
    for (let model in this.fleet) {
      this.occupied.push(...this.fleet[model][1]);
    }
  };

  // pass in an object (model, bow, orientation)
  this.giveBoatsAPosition = function (ship, bow) {
    let coords = [];
    let size;
    let errorFlag = false;
    const sizeError = "Error: Off the map";
    const overLapError = "Error: Overlapping boats";
    let errorMessage;
    switch (ship.model) {
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
    if (ship.orientation === "vertical") {
      // boat goes off the map
      if (bow[1] + size > 12) {
        errorMessage = sizeError;
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
          errorMessage = overLapError;
          return [overLapError, errorFlag];
        }

        // push the created coords to array
        coords.push([bow[0], bow[1] + i]);
      }
    }
    // if horizontal, increments the x coord
    if (ship.orientation === "horizontal") {
      // boat goes off the map
      if (bow[0] + size > 12) {
        errorMessage = sizeError;
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
          errorMessage = overLapError;
          return [overLapError, errorFlag];
        }
        // push the created coords to array
        coords.push([bow[0] + i, bow[1]]);
      }
    }
    if (!errorFlag) {
      // this.occupiedList[model] = coords;
      switch (ship.model) {
        case "carrier":
          this.fleet[ship.model][1].push(...coords);
          this.fleet[ship.model][0] = ship.orientation;
          this.occupy();
          break;
        case "battleship":
          this.fleet[ship.model][1].push(...coords);
          this.fleet[ship.model][0] = ship.orientation;
          this.occupy();
          break;
        case "destroyer":
          this.fleet[ship.model][1].push(...coords);
          this.fleet[ship.model][0] = ship.orientation;
          this.occupy();
          break;
        case "submarine":
          this.fleet[ship.model][1].push(...coords);
          this.fleet[ship.model][0] = ship.orientation;
          this.occupy();
          break;
        case "patrolboat":
          this.fleet[ship.model][1].push(...coords);
          this.fleet[ship.model][0] = ship.orientation;
          this.occupy();
          break;
      }
    } else {
      console.log(errorMessage);
      // this.occupiedList[model] = [];
      switch (ship.model) {
        case "carrier":
          this.fleet[ship.model][1] = [];
          break;
        case "battleship":
          this.fleet[ship.model][1] = [];
          break;
        case "destroyer":
          this.fleet[ship.model][1] = [];
          break;
        case "submarine":
          this.fleet[ship.model][1] = [];
          break;
        case "patrolboat":
          this.fleet[ship.model][1] = [];
          break;
      }
      return false;
    }
  };

  this.putBoatsOnGrid = function (fleet, ship) {
    for (let i = 0; i < ship.hp; i++) {
      this.grid[fleet[ship.model][1][i][0]][fleet[ship.model][1][i][1]] =
        ship.model;
    }
  };

  this.checkIfCoordIsOccupied = function (coords) {
    let coordJSON = JSON.stringify(coords);
    let occupiedJSON = JSON.stringify(this.occupied);
    let coordResult = occupiedJSON.indexOf(coordJSON);

    if (coordResult != -1) {
      return true;
    } else {
      return false;
    }
  };

  /* On call, the result of checkIfCoordIsOccupied should be assigned to a variable
  and used for recieveAttack */

  this.recieveAttack = function (coords) {
    let coordJSON = JSON.stringify(coords);
    let occupiedJSON = JSON.stringify(this.occupied);
    let hitJSON = JSON.stringify(this.hitList);

    let rehit = hitJSON.indexOf(coordJSON);
    let hitStatus = occupiedJSON.indexOf(coordJSON);

    if (rehit != -1) {
      // NO REHITS
      // console.log("rehit");
      return false;
    } else if (hitStatus != -1) {
      // HIT
      // console.log("Hit");
      this.hitList.push(coords);
      return true;
    } else {
      // MISS
      // console.log("miss");
      this.missList.push(coords);
      return false;
    }
  };

  this.hpCheck = function (ship) {
    return ship.hp;
  };

  this.boardStatus = function () {
    // console.log(`Hitlist: ${this.hitList}`);
    // console.log(`Occupied: ${this.occupied}`);
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
