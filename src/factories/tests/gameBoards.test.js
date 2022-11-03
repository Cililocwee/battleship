import boardFactory from "../gameBoards";

test("boardFactory - Creates boards succesfully", () => {
  const board = boardFactory();
  const checkcomputer = [
    ["carrier", null, 5, []],
    ["battleship", null, 4, []],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ];
  const checkplayer = [
    ["carrier", null, 5, []],
    ["battleship", null, 4, []],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ];

  expect(board.computerFleet).toEqual(expect.objectContaining(checkcomputer));
  expect(board.playerFleet).toEqual(expect.objectContaining(checkplayer));
});

test("positionBoats - 1. Carrier-vertical: positionBoats correctly modifies occupiedList", () => {
  let board = boardFactory();
  board.positionBoats("carrier", [0, 0], "vertical");
  expect(board.playerFleet).toEqual([
    [
      "carrier",
      "vertical",
      5,
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
    ],
    ["battleship", null, 4, []],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ]);
});

test("positionBoats - 2. Battleship-vertical: positionBoats correctly modifies occupiedList", () => {
  let board = boardFactory();
  board.positionBoats("battleship", [0, 0], "vertical");
  expect(board.playerFleet).toEqual([
    ["carrier", null, 5, []],
    [
      "battleship",
      "vertical",
      4,
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
    ],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ]);
});

test("positionBoats - 3. Carrier-horizontal: positionBoats correctly modifies occupiedList", () => {
  let board = boardFactory();
  board.positionBoats("carrier", [0, 0], "horizontal");
  expect(board.playerFleet).toEqual([
    [
      "carrier",
      "horizontal",
      5,
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ],
    ],
    ["battleship", null, 4, []],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ]);
});

test("positionBoats - 4. Battleship-horizontal: positionBoats correctly modifies occupiedList", () => {
  let board = boardFactory();
  board.positionBoats("battleship", [0, 0], "horizontal");
  expect(board.playerFleet).toEqual([
    ["carrier", null, 5, []],
    [
      "battleship",
      "horizontal",
      4,
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
    ],
    ["destroyer", null, 3, []],
    ["submarine", null, 3, []],
    ["patrolboat", null, 2, []],
  ]);
});

test("positionBoats - 5. Valid coordinates - positionBoats won't accept coordinates off the plane", () => {
  let board = boardFactory();
  expect(board.positionBoats("patrolboat", [11, 0], "horizontal")).toEqual([
    "Error: Off the map",
    false,
  ]);
});

test("positionBoats - 6. Can't overlap boats horizontally", () => {
  let board = boardFactory();
  board.positionBoats("carrier", [0, 0], "horizontal");
  expect(board.positionBoats("patrolboat", [0, 0], "horizontal")).toEqual([
    "Error: Overlapping boats",
    true,
  ]);
});

test("positionBoats - 7. Can't overlap boats vertically", () => {
  let board = boardFactory();
  board.positionBoats("carrier", [0, 0], "vertical");
  expect(board.positionBoats("patrolboat", [0, 0], "vertical")).toEqual([
    "Error: Overlapping boats",
    true,
  ]);
});

test("recieveAttack - 1. recieveAttack correctly triggers hit() in occupied space's boat", () => {
  let board = boardFactory();
  board.positionBoats("battleship", [0, 0], "horizontal");
  let coord = board.checkCoord([0, 0]);
  expect(board.recieveAttack(coord[0], coord[2])).toBe(true);
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

test("missList - Logs missed coords", () => {
  let board = boardFactory();
  board.positionBoats("battleship", [0, 0], "horizontal");
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

  board.positionBoats("patrolboat", [5, 5], "horizontal");
  board.recieveAttack([5, 5]);

  expect(board.boardStatus()).toBe(false);
  board.recieveAttack([6, 5]);

  expect(board.boardStatus()).toBe(true);
});
