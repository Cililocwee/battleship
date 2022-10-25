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
    // check hit list
    for (model in this.hitList) {
      for (let i = 0; i < this.hitList[model].length; i++) {
        if (this.hitList[model][i].toString() === coords.toString()) {
          // NO REHITS
          return false;
        }
      }
    }

    /* There's an error in this loop. In the first go through, it is correctly finding the 
    coords in occupiedlist. However it won't incriment up. The second loop won't acknowledge that
    i should = 1 and won't check occupiedList[1] */
    // check occupied list
    for (model in this.occupiedList) {
      for (let i = 0; i < this.occupiedList[model].length; i++) {
        console.log(this.occupiedList[model]);
        if (this.occupiedList[model][i].toString() === coords.toString()) {
          // HIT
          this.hitList[model].push(coords);
          // console.log(this.hitList);
          console.log("blip");
          return true;
        } else {
          // MISS
          console.log("bloop");
          return false;
        }
      }
    }

    // if (this.hitList[model].length < this.occupiedList[model].length) {
    //   for (let i = 0; i < this.occupiedList[model].length; i++) {
    //     if (this.occupiedList[model][i].toString() === coords.toString()) {
    //       for (let h = 0; h < this.hitList[model].length; i++) {
    //         if (this.hitList[model][h].toString() === coords.toString()) {
    //           // NO REHITS
    //           return false;
    //         } else {
    //           // HIT -- to call hit()
    //           this.hitList[model].push(coords);
    //           return true;
    //         }
    //       }
    //     } else {
    //       // MISS
    //       return false;
    //     }
    //   }
    // }
  };
}

function boardFactory() {
  return new Board();
}

export default boardFactory;
