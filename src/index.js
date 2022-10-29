import css from "./style.css";
//  Create the games grids and layout

const enemygrid = document.getElementById("enemygrid");
const playergrid = document.getElementById("playergrid");

// this may need to go on the gameboard object
function displayGrid(target) {
  for (let i = 0; i < 144; i++) {
    let box = document.createElement("div");
    let idVariable = i;
    box.classList.add("box");
    box.id = `box-${idVariable}`;
    box.onclick = showCoords;
    target.append(box);
  }
}

const enemyLabelTop = document.getElementById("enemylabeltop");
const enemyLabelLeft = document.getElementById("enemylabelleft");
const playerLabelTop = document.getElementById("playerlabeltop");
const playerLabelLeft = document.getElementById("playerlabelleft");

// this may need to gon on the gameboard object
function displayLabels(target, flag) {
  for (let i = 0; i < 12; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    if (flag == 0) {
      box.innerText = i;
    }
    if (flag == 1) {
      box.innerText = String.fromCharCode(65 + i);
    }

    target.append(box);
  }
}

displayLabels(enemyLabelTop, 0);
displayLabels(enemyLabelLeft, 1);
displayLabels(playerLabelTop, 0);
displayLabels(playerLabelLeft, 1);
function showCoords(event) {
  let x;
  let y;
  let id = this.id.split("-")[1];

  if (id < 12) {
    y = 0;
    x = id;
  }

  if (id >= 12 && id < 24) {
    y = 1;
    x = id - 12;
  }

  if (id >= 24 && id < 36) {
    y = 2;
    x = id - 12 * 2;
  }

  if (id >= 36 && id < 48) {
    y = 3;
    x = id - 12 * 3;
  }

  if (id >= 48 && id < 60) {
    y = 4;
    x = id - 12 * 4;
  }

  if (id >= 60 && id < 72) {
    y = 5;
    x = id - 12 * 5;
  }

  if (id >= 72 && id < 84) {
    y = 6;
    x = id - 12 * 6;
  }

  if (id >= 84 && id < 96) {
    y = 7;
    x = id - 12 * 7;
  }

  if (id >= 96 && id < 108) {
    y = 8;
    x = id - 12 * 8;
  }

  if (id >= 108 && id < 120) {
    y = 9;
    x = id - 12 * 9;
  }

  if (id >= 120 && id < 132) {
    y = 10;
    x = id - 12 * 10;
  }

  if (id >= 132 && id < 144) {
    y = 11;
    x = id - 12 * 11;
  }

  console.log(`[${x}, ${y}]`);
}

// calling displayGrid is part of the page loading, not the gameplay loop
displayGrid(enemygrid);
displayGrid(playergrid);
