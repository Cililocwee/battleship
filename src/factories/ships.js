function Ship(model, orientation) {
  this.model = model;
  this.orientation = orientation;
  this.status = "afloat";

  switch (model) {
    case "carrier":
      this.hp = 5;
      break;
    case "battleship":
      this.hp = 4;
      break;
    case "destroyer":
      this.hp = 3;
      break;
    case "submarine":
      this.hp = 3;
      break;
    case "patrolboat":
      this.hp = 2;
      break;
  }

  this.hit = function hit() {
    this.hp--;
    if (this.hp <= 0) {
      this.status = "sunk";
      return `You sunk a ${model}`;
    }
  };

  this.isSunk = function isSunk() {
    this.status == "sunk" ? true : false;
  };
}

function shipYard(model, orientation, bow) {
  return new Ship(model, orientation, bow);
}

export default shipYard;
