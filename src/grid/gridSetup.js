// DOM related grid rendering

const gridSetup = (function () {
  // creates IDs for the box divs
  function makeIdForBoxes(iterator) {
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

  // creates box divs for a grid
  function renderGrid(target) {
    for (let i = 0; i < 144; i++) {
      let box = document.createElement("div");
      box.classList.add("box");

      // box.id = `box-${idVariable}`;
      let idVariable = makeIdForBoxes(i);

      box.id = `[${idVariable[0]}-${idVariable[1]}]`;
      if (target.id === "playergrid") {
        // box.onclick = showCoords;
        box.onclick = console.log(target.id);
      }

      if (target.id === "enemygrid") {
        box.addEventListener("click", () => {
          if (box.classList.contains("enemyoccupied")) {
            box.classList.add("occupiedhit");
          } else {
            box.classList.add("miss");
          }
        });
      }

      target.append(box);
    }
  }

  // constructs the actual labels (grid coordinates)
  function renderLabels(target, flag) {
    for (let i = 0; i < 12; i++) {
      let box = document.createElement("div");
      box.classList.add("box");
      if (flag == 0) {
        box.innerText = String.fromCharCode(65 + i);
      }
      if (flag == 1) {
        box.innerText = i + 1;
      }

      target.append(box);
    }
  }

  // * Utility
  // returns id
  function coordsToId(coords) {
    // ['[1' , '1]'] = [1,1]
    let splitCoords = coords.split(", ");
    let formattedCoords = splitCoords.join("-");
    return formattedCoords;
  }

  // * Utility
  // returns coords
  function idToCoords() {
    // [1,1] = ['[1' , '1]']
    let splitCoords = this.id.split("-");
    let formattedCoords = splitCoords.join(", ");
    return formattedCoords;
  }

  function makeEnemyBoard() {
    const enemygrid = document.getElementById("enemygrid");
    const enemyLabelTop = document.getElementById("enemylabeltop");
    const enemyLabelLeft = document.getElementById("enemylabelleft");

    renderGrid(enemygrid);
    renderLabels(enemyLabelTop, 0);
    renderLabels(enemyLabelLeft, 1);
  }

  function makePlayerBoard() {
    const playergrid = document.getElementById("playergrid");
    const playerLabelTop = document.getElementById("playerlabeltop");
    const playerLabelLeft = document.getElementById("playerlabelleft");

    renderGrid(playergrid);
    renderLabels(playerLabelTop, 0);
    renderLabels(playerLabelLeft, 1);
  }

  // adds enemy boats to DOM grid
  function plotComputerBoatsToGrid(nodelist, board) {
    for (let i = 0; i < board.occupied.length; i++) {
      for (let j = 0; j < nodelist.length; j++) {
        // console.log(coordsToId(board.occupied[i]));
        // console.log(nodelist[j].id);
        if (
          JSON.stringify(board.occupied[i]) ===
          nodelist[j].id.split("-").join(",")
        ) {
          nodelist[j].classList.add("enemyoccupied");
        }
      }
    }
  }
  // displays coords on page (when player selecting where to put ship)
  function showCoords() {
    document.getElementById("bowcoords").innerText = idToCoords();
  }

  return {
    idToCoords,
    coordsToId,
    renderGrid,
    renderLabels,
    makeEnemyBoard,
    makePlayerBoard,
    plotComputerBoatsToGrid,
  };
})();

export default gridSetup;
