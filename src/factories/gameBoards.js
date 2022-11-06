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

  // the length of occupied should always be 17, or there's been an error and place boats needs to be called again
  this.occupied = [];
  this.missList = [];
  this.hitList = [];

  this.occupy = function () {
    for (let model in this.fleet) {
      this.occupied.push(...this.fleet[model][1]);
    }
    // filters duplicates from occupied
    this.occupied = Array.from(
      new Set(this.occupied.map(JSON.stringify)),
      JSON.parse
    );
  };

  // TODO Errors with overlaps and out of ranges prevent this from working properly

  this.giveBoatsAPosition = function (ship, bow) {
    let coords = [];
    let size = ship.hp;
    let errorFlag = false;
    const sizeError = "Error: Off the map";
    const overLapError = "Error: Overlapping boats";

    // if vertical, increments the y coord
    if (ship.orientation === "vertical") {
      // boat goes off the map
      if (bow[1] + size > 12) {
        return [sizeError, true];
      }

      for (let i = 0; i < size; i++) {
        // boats shouldn't overlap vertically
        if (this.checkIfCoordIsOccupied([bow[0], bow[1] + i])[1] === true) {
          errorFlag = true;
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
        return [sizeError, errorFlag];
      }
      for (let i = 0; i < size; i++) {
        // boats shouldn't overlap horizontally
        if (this.checkIfCoordIsOccupied([bow[0] + i, bow[1]])[1] === true) {
          errorFlag = true;
          return [overLapError, errorFlag];
        }
        // push the created coords to array
        coords.push([bow[0] + i, bow[1]]);
      }
    }
    if (!errorFlag) {
      this.fleet[ship.model][1] = coords;
      this.fleet[ship.model][0] = ship.orientation;
      ship.position.push(...coords);
      this.occupied.push(...coords);
    } else {
      return false;
    }
  };

  // pass in an object (model, bow, orientation)
  // this.giveBoatsAPosition = function (ship, bow) {
  //   let coords = [];
  //   let size = ship.hp;
  //   let errorFlag = false;

  //   // if vertical, increments the y coord
  //   if (ship.orientation === "vertical") {
  //     // Check if boat would go off map
  //     if (bow[1] + size > 12) {
  //       errorFlag = true;
  //       return "Out of range";
  //     }

  //     // Check if boat will overlap
  //     for (let i = 0; i < size; i++) {
  //       // boats shouldn't overlap vertically
  //       if (this.checkIfCoordIsOccupied([bow[0], bow[1] + i])) {
  //         errorFlag = true;
  //         return "Overlap";
  //       }

  //       // push the created coords to array
  //       coords.push([bow[0], bow[1] + i]);
  //     }
  //   }
  //   // if horizontal, increments the x coord
  //   if (ship.orientation === "horizontal") {
  //     // boat goes off the map
  //     if (bow[0] + size > 12) {
  //       errorFlag = true;
  //       return "Out of range";
  //     }
  //     for (let i = 0; i < size; i++) {
  //       // boats shouldn't overlap horizontally
  //       if (this.checkIfCoordIsOccupied(bow[0] + i, bow[1])) {
  //         errorFlag = true;
  //         return "Overlap";
  //       }
  //       // push the created coords to array
  //       coords.push([bow[0] + i, bow[1]]);
  //     }
  //   }
  //   if (!errorFlag) {
  //     // this.occupiedList[model] = coords;
  //     switch (ship.model) {
  //       case "carrier":
  //         this.fleet[ship.model][1].push(...coords);
  //         this.fleet[ship.model][0] = ship.orientation;
  //         this.occupy();
  //         break;
  //       case "battleship":
  //         this.fleet[ship.model][1].push(...coords);
  //         this.fleet[ship.model][0] = ship.orientation;
  //         this.occupy();
  //         break;
  //       case "destroyer":
  //         this.fleet[ship.model][1].push(...coords);
  //         this.fleet[ship.model][0] = ship.orientation;
  //         this.occupy();
  //         break;
  //       case "submarine":
  //         this.fleet[ship.model][1].push(...coords);
  //         this.fleet[ship.model][0] = ship.orientation;
  //         this.occupy();
  //         break;
  //       case "patrolboat":
  //         this.fleet[ship.model][1].push(...coords);
  //         this.fleet[ship.model][0] = ship.orientation;
  //         this.occupy();
  //         break;
  //     }
  //   } else {
  //     // this.occupiedList[model] = [];
  //     switch (ship.model) {
  //       case "carrier":
  //         this.fleet[ship.model][1] = [];
  //         break;
  //       case "battleship":
  //         this.fleet[ship.model][1] = [];
  //         break;
  //       case "destroyer":
  //         this.fleet[ship.model][1] = [];
  //         break;
  //       case "submarine":
  //         this.fleet[ship.model][1] = [];
  //         break;
  //       case "patrolboat":
  //         this.fleet[ship.model][1] = [];
  //         break;
  //     }
  //     return false;
  //   }
  // };

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
      return [coords, true];
    } else {
      return [coords, false];
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
      return false;
    } else if (hitStatus != -1) {
      // HIT
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

  // TODO Works in testing, not in implementation
  this.boardStatus = function () {
    if (this.hitList.length == this.occupied.length) {
      // GAME OVER
      console.log("Game Over");
      return true;
    } else {
      // CONTINUE
      console.log("Continue");
      return false;
    }
  };
}

function boardFactory() {
  return new Board();
}

export default boardFactory;
