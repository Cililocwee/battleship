function Ship(model, orientation, bow) {
  this.model = model;
  this.orientation = orientation;
  this.bow = bow;
  this.status = "afloat";

  this.hit = function hit(strike = 1) {
    this.hp -= strike;
    if (this.hp <= 0) {
      this.isSunk();
    }
  };
  this.isSunk = function isSunk() {
    this.status = "sunk";
  };

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
}

function shipYard(model, orientation, bow) {
  return new Ship(model, orientation, bow);
}

export default shipYard;
