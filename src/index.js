import css from "./style.css";
//  Create the games grids and layout
import boardFactory from "./factories/gameBoards";

const enemygrid = document.getElementById("enemygrid");
const playergrid = document.getElementById("playergrid");

// this may need to go on the gameboard object
function makeId(iterator) {
  let x;
  let y;

  if (iterator < 12) {
    x = iterator;
    y = 0;
  }

  if (iterator >= 12 && iterator < 24) {
    y = 1;
    x = iterator - 12;
  }

  if (iterator >= 24 && iterator < 36) {
    y = 2;
    x = iterator - 12 * 2;
  }

  if (iterator >= 36 && iterator < 48) {
    y = 3;
    x = iterator - 12 * 3;
  }

  if (iterator >= 48 && iterator < 60) {
    y = 4;
    x = iterator - 12 * 4;
  }

  if (iterator >= 60 && iterator < 72) {
    y = 5;
    x = iterator - 12 * 5;
  }

  if (iterator >= 72 && iterator < 84) {
    y = 6;
    x = iterator - 12 * 6;
  }

  if (iterator >= 84 && iterator < 96) {
    y = 7;
    x = iterator - 12 * 7;
  }

  if (iterator >= 96 && iterator < 108) {
    y = 8;
    x = iterator - 12 * 8;
  }

  if (iterator >= 108 && iterator < 120) {
    y = 9;
    x = iterator - 12 * 9;
  }

  if (iterator >= 120 && iterator < 132) {
    y = 10;
    x = iterator - 12 * 10;
  }

  if (iterator >= 132 && iterator < 144) {
    y = 11;
    x = iterator - 12 * 11;
  }

  return [x, y];
}

function displayGrid(target) {
  for (let i = 0; i < 144; i++) {
    let box = document.createElement("div");
    box.classList.add("box");

    // box.id = `box-${idVariable}`;
    let idVariable = makeId(i);

    box.id = `[${idVariable[0]}-${idVariable[1]}]`;
    box.onclick = showCoords;
    target.append(box);
  }
}

const enemyLabelTop = document.getElementById("enemylabeltop");
const enemyLabelLeft = document.getElementById("enemylabelleft");
const playerLabelTop = document.getElementById("playerlabeltop");
const playerLabelLeft = document.getElementById("playerlabelleft");

// this may need to go on the gameboard object
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

// debugging tool?
function showCoords(event) {
  //   console.log(this.id);
  // [1,1] = ['[1' , '1]']
  let splitCoords = this.id.split("-");
  let formattedCoords = splitCoords.join(", ");
  console.log(formattedCoords);
  document.getElementById("bowcoords").innerText = formattedCoords;
  return formattedCoords;
}

// calling displayGrid is part of the page loading, not the gameplay loop
displayGrid(enemygrid);
displayGrid(playergrid);

displayLabels(enemyLabelTop, 0);
displayLabels(enemyLabelLeft, 1);
displayLabels(playerLabelTop, 0);
displayLabels(playerLabelLeft, 1);

/****************************/
/**********************/
/* GENERAL TESTING */

const playerboard = boardFactory();

let shiptype;
let coordinput;
let orientinput;

function getShipType() {
  return document.getElementById("ships").value;
}

function getCoordinates() {
  return JSON.parse(document.getElementById("bowcoords").innerHTML);
}

function getOrientation() {
  return document.querySelector("input[name='orientation']:checked").value;
}

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
  shiptype = getShipType();
  orientinput = getOrientation();
  coordinput = getCoordinates();

  // debugging
  inputCheck();

  playerboard.positionBoats(shiptype, coordinput, orientinput);
  colorBoard(playerboard.report()[0][shiptype]);
});

// playerboard.positionBoats("carrier", [0, 0], "vertical");
// playerboard.positionBoats("patrolboat", [5, 7], "horizontal");
// playerboard.positionBoats("destroyer", [2, 2], "horizontal");
// playerboard.positionBoats("submarine", [4, 4], "horizontal");
// playerboard.positionBoats("battleship", [9, 8], "vertical");

// nodelist
const playerboxes = document.querySelectorAll("#playergrid .box");

/* Get an array of two objects from report: occupied and hit.
Take object at index 0 and iterate over its arrays of arrays
For each arrayB in each arrayA compare array B to the IDs of each node in playerboxes
if they are the same, call blackout on the playerbox  */

const report = playerboard.report();
const playercarrier = playerboard.report()[0].carrier;
const playerpatrol = playerboard.report()[0].patrolboat;
const playersub = playerboard.report()[0].submarine;
const playerdest = playerboard.report()[0].destroyer;
const playerbat = playerboard.report()[0].battleship;

function occupy(targetnode) {
  targetnode.classList.add("occupiedalive");
}

function hit(targetnode) {
  targetnode.classList.add("occupiedhit");
}

function sink(targetnode) {
  targetnode.classList.add("occupiedsunk");
}

function colorBoard(boat) {
  for (let i = 0; i < playerboxes.length; i++) {
    let splitCoords = playerboxes[i].id.split("-");
    let formattedCoords = splitCoords.join(",");
    for (let j = 0; j < 5; j++) {
      if (formattedCoords == JSON.stringify(boat[j])) {
        occupy(playerboxes[i]);
      }
    }
  }
}

function inputCheck() {
  console.log(shiptype);
  console.log(coordinput);
  console.log(orientinput);
}

// colorBoard(playercarrier);
// colorBoard(playerpatrol);
// colorBoard(playersub);
// colorBoard(playerdest);
// colorBoard(playerbat);
