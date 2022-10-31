import css from "./style.css";
import boardFactory from "./factories/gameBoards";
import gridSetup from "./factories/gridSetup";

/********** GAME SETUP  ************/
// setting up for the game
const enemygrid = document.getElementById("enemygrid");
const playergrid = document.getElementById("playergrid");

const enemyLabelTop = document.getElementById("enemylabeltop");
const enemyLabelLeft = document.getElementById("enemylabelleft");
const playerLabelTop = document.getElementById("playerlabeltop");
const playerLabelLeft = document.getElementById("playerlabelleft");

// calling displayGrid is part of the page loading, not the gameplay loop
gridSetup.displayGrid(enemygrid);
gridSetup.displayGrid(playergrid);

gridSetup.displayLabels(enemyLabelTop, 0);
gridSetup.displayLabels(enemyLabelLeft, 1);
gridSetup.displayLabels(playerLabelTop, 0);
gridSetup.displayLabels(playerLabelLeft, 1);

// initiating game
const playerboard = boardFactory();

let shiptype;
let coordinput;
let orientinput;

// display setup
function getShipType() {
  return document.getElementById("ships").value;
}

function getCoordinates() {
  return JSON.parse(document.getElementById("bowcoords").innerHTML);
}

function getOrientation() {
  return document.querySelector("input[name='orientation']:checked").value;
}

// adds functionality to submit button
const submitBtn = document.getElementById("submit");
const shipSelection = document.getElementById("ships");

submitBtn.addEventListener("click", () => {
  shiptype = getShipType();
  orientinput = getOrientation();
  coordinput = getCoordinates();

  // debugging
  inputCheck();

  if (playerboard.positionBoats(shiptype, coordinput, orientinput)) {
    // Don't do anything if positionBoats returns false
    return false;
  } else {
    playerboard.positionBoats(shiptype, coordinput, orientinput);
  }
  // console.log(playerboard.occupiedList);
  colorBoard(playerboard.report()[0][shiptype]);

  // removes ships from list
  shipSelection[shipSelection.selectedIndex].remove();
});

/**********  DOM manipulation ***********/

// nodelist
const playerboxes = document.querySelectorAll("#playergrid .box");

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
