const cellFunction = (() => {
  // nodelist
  function updateDOMToShowPlayerBoats(boat) {
    const playerboxes = document.querySelectorAll("#playergrid .box");

    for (let i = 0; i < playerboxes.length; i++) {
      let splitCoords = playerboxes[i].id.split("-");
      let formattedCoords = splitCoords.join(",");
      for (let h = 0; h < boat.position.length; h++) {
        if (JSON.stringify(boat.position).indexOf(formattedCoords) != -1) {
          occupy(playerboxes[i]);
        }
      }
    }
  }

  function getShipType() {
    let shiptype = document.getElementById("ships").value;
    if (shiptype != "select") {
      return shiptype;
    }
  }

  function getCoordinates() {
    let list = document.getElementsByClassName("selected");
    let stringedId = list[0].id.split("-").join(",");
    return JSON.parse(stringedId);
  }

  function getOrientation() {
    return document.querySelector("input[name='orientation']:checked").value;
  }

  function occupy(targetnode) {
    targetnode.classList.add("occupiedalive");
  }

  function sink(targetnode) {
    targetnode.classList.add("occupiedsunk");
  }

  return {
    updateDOMToShowPlayerBoats,
    getShipType,
    getCoordinates,
    getOrientation,
    occupy,
  };
})();

export default cellFunction;
