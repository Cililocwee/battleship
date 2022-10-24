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

test("Battleship-horizontal: positionBoats correctly modifies occupiedList", () => {
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
});

test.todo("Declares when a boat has been sunk");

test.todo("Declares when the game is over");
