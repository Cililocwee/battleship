const tools = (() => {
  // nodelist
  function colorBoard(boat) {
    const playerboxes = document.querySelectorAll("#playergrid .box");

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

  function getShipType() {
    return document.getElementById("ships").value;
  }

  function getCoordinates() {
    return JSON.parse(document.getElementById("bowcoords").innerHTML);
  }

  function getOrientation() {
    return document.querySelector("input[name='orientation']:checked").value;
  }

  function occupy(targetnode) {
    targetnode.classList.add("occupiedalive");
  }

  function hit(targetnode) {
    targetnode.classList.add("occupiedhit");
  }

  function sink(targetnode) {
    targetnode.classList.add("occupiedsunk");
  }

  return { colorBoard, getShipType, getCoordinates, getOrientation, occupy };
})();

export default tools;
