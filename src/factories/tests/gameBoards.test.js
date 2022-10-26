import boardFactory from "../gameBoards";

test("Creates boards succesfully", () => {
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

test("Carrier-vertical: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("carrier", [0, 0], "vertical");
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

test("Battleship-vertical: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "vertical");
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

test("Carrier-horizontal: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("carrier", [0, 0], "horizontal");
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

test("Horizontal: positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "horizontal");
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

test("Non-origin positioning - positionBoats correctly modifies occupiedList", () => {
  let game1 = boardFactory();
  game1.positionBoats("patrolboat", [0, 4], "horizontal");
  expect(game1.occupiedList).toEqual({
    carrier: [],
    battleship: [],
    destroyer: [],
    submarine: [],
    patrolboat: [
      [0, 4],
      [0, 5],
    ],
  });
  game1.positionBoats("battleship", [4, 4], "vertical");
  expect(game1.occupiedList).toEqual({
    carrier: [],
    battleship: [
      [4, 4],
      [5, 4],
      [6, 4],
      [7, 4],
    ],
    destroyer: [],
    submarine: [],
    patrolboat: [
      [0, 4],
      [0, 5],
    ],
  });
});

test("recieveAttack correctly triggers hit() in occupied space's boat", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "horizontal");

  expect(game1.recieveAttack([0, 0], "battleship")).toBe(true);
  expect(game1.recieveAttack([9, 9], "battleship")).toBe(false);
});

test("Can't hit the same coords twice", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [0, 0], "horizontal");

  expect(game1.recieveAttack([0, 0], "battleship")).toBe(true);
  expect(game1.recieveAttack([0, 0], "battleship")).toBe(false);

  game1.positionBoats("carrier", [6, 6], "horizontal");
  expect(game1.recieveAttack([6, 6], "carrier")).toBe(true);
  expect(game1.recieveAttack([6, 6], "carrier")).toBe(false);
});

test("Trying to hit the same position twice returns false", () => {
  let game1 = boardFactory();
  game1.positionBoats("battleship", [6, 6], "horizontal");
  expect(game1.recieveAttack([6, 6], "battleship")).toBe(true);
  expect(game1.recieveAttack([6, 6], "battleship")).toBe(false);
});

test("CAN hit the same boat more than once", () => {
  let game6 = boardFactory();
  game6.positionBoats("battleship", [0, 0], "horizontal");
  expect(game6.recieveAttack([0, 0], "battleship")).toBe(true);
  expect(game6.recieveAttack([0, 1], "battleship")).toBe(true);
});

test("Declares when a boat has been sunk", () => {
  let game = boardFactory();
  game.positionBoats("battleship", [0, 0], "horizontal");
  game.positionBoats("carrier", [6, 6], "vertical");
  game.recieveAttack([0, 0], "battleship");
  game.recieveAttack([0, 1], "battleship");
  game.recieveAttack([0, 2], "battleship");
  game.recieveAttack([0, 3], "battleship");
  expect(game.hpCheck("battleship")).toBe(true);
  expect(game.hpCheck("carrier")).toBe(false);
});
