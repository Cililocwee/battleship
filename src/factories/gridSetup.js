const gridSetup = (function () {
  // creates IDs for the box divs
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

  // creates box divs for a grid
  function displayGrid(target) {
    for (let i = 0; i < 144; i++) {
      let box = document.createElement("div");
      box.classList.add("box");

      // box.id = `box-${idVariable}`;
      let idVariable = makeId(i);

      box.id = `[${idVariable[0]}-${idVariable[1]}]`;
      if (target.id === "playergrid") {
        box.onclick = showCoords;
      }

      target.append(box);
    }
  }

  // constructs the actual labels (grid coordinates)
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

  // formats coordinates based on box ID
  function showCoords(event) {
    //   console.log(this.id);
    // [1,1] = ['[1' , '1]']
    let splitCoords = this.id.split("-");
    let formattedCoords = splitCoords.join(", ");
    console.log(formattedCoords);
    document.getElementById("bowcoords").innerText = formattedCoords;
    return formattedCoords;
  }

  return { displayGrid, displayLabels };
})();

export default gridSetup;
