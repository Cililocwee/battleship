import boardFactory from "../gameBoards";
import shipYard from "../ships";

test("boardFactory - Creates boards succesfully", () => {
  let board = boardFactory();
  expect(board).toEqual(expect.any(Object));
});

test("giveBoatsAPosition - 1. vertical: giveBoatsAPosition correctly modifies board.occupied", () => {
  let board = boardFactory();
  let patrolboat = shipYard("patrolboat", "vertical");
  board.giveBoatsAPosition(patrolboat, [0, 0]);
  expect(board.fleet).toEqual({
    carrier: [null, []],
    battleship: [null, []],
    destroyer: [null, []],
    submarine: [null, []],
    patrolboat: [
      "vertical",
      [
        [0, 0],
        [0, 1],
      ],
    ],
  });
});

test("giveBoatsAPosition - 2. horizontal: giveBoatsAPosition correctly modifies board.occupied", () => {
  let board = boardFactory();
  let patrolboat = shipYard("patrolboat", "horizontal");
  board.giveBoatsAPosition(patrolboat, [0, 0]);
  expect(board.fleet).toEqual({
    carrier: [null, []],
    battleship: [null, []],
    destroyer: [null, []],
    submarine: [null, []],
    patrolboat: [
      "horizontal",
      [
        [0, 0],
        [1, 0],
      ],
    ],
  });
});

test("giveBoatsAPosition - 3. Valid coordinates - giveBoatsAPosition won't accept coordinates off the plane", () => {
  let board = boardFactory();
  let patrolboat = shipYard("patrolboat", "horizontal");
  expect(board.giveBoatsAPosition(patrolboat, [11, 0])).toEqual([
    "Error: Off the map",
    false,
  ]);
});

test("giveBoatsAPosition - 4. Can't overlap boats horizontally", () => {
  let board = boardFactory();
  let carrier = shipYard("carrier", "horizontal");
  let patrolboat = shipYard("patrolboat", "horizontal");
  board.giveBoatsAPosition(carrier, [0, 0]);
  expect(board.giveBoatsAPosition(patrolboat, [0, 0])).toEqual([
    "Error: Overlapping boats",
    true,
  ]);
});

test("giveBoatsAPosition - 5. Can't overlap boats vertically", () => {
  let board = boardFactory();
  let carrier = shipYard("carrier", "vertical");
  let patrolboat = shipYard("patrolboat", "vertical");
  board.giveBoatsAPosition(carrier, [0, 0]);
  expect(board.giveBoatsAPosition(patrolboat, [0, 0])).toEqual([
    "Error: Overlapping boats",
    true,
  ]);
});

test("recieveAttack - 1. recieveAttack correctly triggers hit() in occupied space's boat", () => {
  let board = boardFactory();
  let battleship = shipYard("battleship", "horizontal");
  board.giveBoatsAPosition(battleship, [0, 0]);
  expect(board.recieveAttack([0, 0])).toBe(true);
});

test("recieveAttack - 2. Can't hit the same coords twice", () => {
  let board = boardFactory();
  let battleship = shipYard("battleship", "horizontal");
  let carrier = shipYard("carrier", "horizontal");
  board.giveBoatsAPosition(battleship, [0, 0]);

  expect(board.recieveAttack([0, 0])).toBe(true);
  expect(board.recieveAttack([0, 0])).toBe(false);

  board.giveBoatsAPosition(carrier, [6, 6]);

  expect(board.recieveAttack([6, 6])).toBe(true);
  expect(board.recieveAttack([6, 6])).toBe(false);
});

test("recieveAttack - 3. Trying to hit the same position twice returns false", () => {
  let board = boardFactory();
  let battleship = shipYard("battleship", "horizontal");
  board.giveBoatsAPosition(battleship, [6, 6]);
  expect(board.recieveAttack([6, 6])).toBe(true);
  expect(board.recieveAttack([6, 6])).toBe(false);
});

test("recieveAttack - 4. CAN hit the same boat more than once", () => {
  let board = boardFactory();
  let battleship = shipYard("battleship", "horizontal");
  board.giveBoatsAPosition(battleship, [0, 0]);

  expect(board.recieveAttack([0, 0])).toBe(true);

  expect(board.recieveAttack([1, 0])).toBe(true);
});

test("missList - Logs missed coords", () => {
  let board = boardFactory();
  let battleship = shipYard("battleship", "horizontal");

  board.giveBoatsAPosition(battleship, [0, 0]);
  board.recieveAttack([6, 6], "battleship");
  expect(board.missList).toEqual([[6, 6]]);
  board.recieveAttack([7, 7], "battleship");
  expect(board.missList).toEqual([
    [6, 6],
    [7, 7],
  ]);
});

test("gameBoard.boardStatus()- Can report when all ships are sunk", () => {
  let board = boardFactory();
  let patrolboat = shipYard("patrolboat", "horizontal");

  board.giveBoatsAPosition(patrolboat, [5, 5]);
  board.recieveAttack([5, 5]);

  expect(board.boardStatus()).toBe(false);
  board.recieveAttack([6, 5]);

  expect(board.boardStatus()).toBe(true);
});

test("Can tell if a coordinate is occupied", () => {
  let board = boardFactory();
  let patrolboat = shipYard("patrolboat", "horizontal");

  board.giveBoatsAPosition(patrolboat, [0, 0]);

  expect(board.checkIfCoordIsOccupied([0, 0])).toBe(true);
  expect(board.checkIfCoordIsOccupied([9, 9])).toBe(false);
});

test("Grid has correct positions", () => {
  let board = boardFactory();
  // first make a ship
  let patrolboat = shipYard("patrolboat", "vertical");
  let carrier = shipYard("carrier", "horizontal");
  // Then use the object to give a position
  board.giveBoatsAPosition(patrolboat, [8, 8]);
  board.giveBoatsAPosition(carrier, [1, 1]);
  // Then use the board's fleet and the object to put into grid
  board.putBoatsOnGrid(board.fleet, patrolboat);
  board.putBoatsOnGrid(board.fleet, carrier);

  const consoleSpy = jest.spyOn(console, "table");
  console.table(board.grid);

  expect(consoleSpy).toHaveBeenCalledWith(board.grid);
});
