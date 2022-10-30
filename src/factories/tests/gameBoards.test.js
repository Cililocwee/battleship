import boardFactory from "../gameBoards";

test("boardFactory - Creates boards succesfully", () => {
  const board = boardFactory();
  const checklist = {
    carrier: [],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  };
  expect(board.occupiedList).toEqual(expect.objectContaining(checklist));
});

test("positionBoats - 1. Carrier-vertical: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("carrier", [0, 0], "vertical");
  expect(game1.occupiedList).toEqual({
    carrier: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  });
});

test("positionBoats - 2. Battleship-vertical: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "vertical");
  expect(game1.occupiedList).toEqual({
    carrier: [],
    battleship: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  });
});

test("positionBoats - 3. Carrier-horizontal: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("carrier", [0, 0], "horizontal");
  expect(game1.occupiedList).toEqual({
    carrier: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  });
});

test("positionBoats - 4. Horizontal: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "horizontal");
  expect(game1.occupiedList).toEqual({
    carrier: [],
    battleship: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    destroyer: [],
    submarine: [],
    patrolboat: [],
  });
});

test("positionBoats - 5. Non-origin positioning - positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("patrolboat", [4, 0], "horizontal");
  expect(game1.occupiedList).toEqual({
    carrier: [],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [
      [4, 0],
      [5, 0],
    ],
  });
  game1.positionBoats("battleship", [4, 4], "vertical");
  expect(game1.occupiedList).toEqual({
    carrier: [],
    battleship: [
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
    ],
    destroyer: [],
    submarine: [],
    patrolboat: [
      [4, 0],
      [5, 0],
    ],
  });
});

test("positionBoats - 6. Valid coordinates - positionBoats won't accept coordinates off the plane", () => {
  let game1 = boardFactory();
  expect(game1.positionBoats("patrolboat", [11, 0], "horizontal")).toBe(
    "Error: Off the map"
  );
});

test("positionBoats - 7. Can't overlap boats", () => {
  let game1 = boardFactory();
  game1.positionBoats("carrier", [0, 0], "horizontal");
  expect(game1.positionBoats("patrolboat", [0, 0], "horizontal")).toBe(
    "Error: Overlapping boats"
  );
});

test("recieveAttack - 1. recieveAttack correctly triggers hit() in occupied space's boat", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "horizontal");
  let coord = game1.checkCoord([0, 0]);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(true);
});

test("recieveAttack - 2. Can't hit the same coords twice", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "horizontal");

  let coord = game1.checkCoord([0, 0]);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(true);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(false);

  game1.positionBoats("carrier", [6, 6], "horizontal");
  coord = game1.checkCoord([6, 6]);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(true);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(false);
});

test("recieveAttack - 3. Trying to hit the same position twice returns false", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [6, 6], "horizontal");
  let coord = game1.checkCoord([6, 6]);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(true);
  expect(game1.recieveAttack(coord[0], coord[2])).toBe(false);
});

test("recieveAttack - 4. CAN hit the same boat more than once", () => {
  let game6 = boardFactory();
  game6.positionBoats("battleship", [0, 0], "horizontal");
  let coord = game6.checkCoord([0, 0]);
  expect(game6.recieveAttack(coord[0], coord[2])).toBe(true);
  coord = game6.checkCoord([1, 0]);
  expect(game6.recieveAttack(coord[0], coord[2])).toBe(true);
});

test("Declares when a boat has been sunk", () => {
  let game = boardFactory();
  game.positionBoats("battleship", [0, 0], "horizontal");
  game.positionBoats("carrier", [6, 6], "vertical");
  let coord = game.checkCoord([0, 0]);
  game.recieveAttack(coord[0], coord[2]);
  coord = game.checkCoord([1, 0]);
  game.recieveAttack(coord[0], coord[2]);
  coord = game.checkCoord([2, 0]);
  game.recieveAttack(coord[0], coord[2]);
  coord = game.checkCoord([3, 0]);
  game.recieveAttack(coord[0], coord[2]);
  expect(game.hpCheck("battleship")).toBe(true);
  expect(game.hpCheck("carrier")).toBe(false);
});

test("missList - Logs missed coords", () => {
  let game = boardFactory();
  game.positionBoats("battleship", [0, 0], "horizontal");
  game.recieveAttack([6, 6], "battleship");
  expect(game.missList).toEqual([[6, 6]]);
  game.recieveAttack([7, 7], "battleship");
  expect(game.missList).toEqual([
    [6, 6],
    [7, 7],
  ]);
});

test("checkCoord - 1. Returns model of occupied space", () => {
  let game = boardFactory();
  game.positionBoats("patrolboat", [4, 4], "vertical");
  expect(game.checkCoord([4, 4])).toEqual([[4, 4], true, "patrolboat"]);
});

test("checkCoord - 2. Returns model of occupied space", () => {
  let game = boardFactory();
  game.positionBoats("submarine", [7, 6], "horizontal");
  expect(game.checkCoord([8, 6])).toEqual([[8, 6], true, "submarine"]);
});

test("gameBoard.boardStatus()- Can report when all ships are sunk", () => {
  let game = boardFactory();

  expect(game.boardStatus()).toBe(true);

  game.positionBoats("patrolboat", [5, 5], "horizontal");
  let coord = game.checkCoord([5, 5]);
  game.recieveAttack(coord[0], coord[2]);

  expect(game.boardStatus()).toBe(false);
  coord = game.checkCoord([6, 5]);
  game.recieveAttack(coord[0], coord[2]);

  expect(game.boardStatus()).toBe(true);
});
