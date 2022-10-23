import shipYard from "../ships";

test("Ship factory makes ships with correct attributes", () => {
  const ship = shipYard("battleship", "vertical", [0, 0]);
  expect(ship.model).toBe("battleship");
  expect(ship.orientation).toBe("vertical");
  expect(ship.bow).toEqual([0, 0]);
  expect(ship.hp).toEqual(4);
});

test("Ship factory makes ships with correct attributes", () => {
  const ship = shipYard("carrier", "vertical", [0, 0]);
  expect(ship.model).toBe("carrier");
  expect(ship.orientation).toBe("vertical");
  expect(ship.bow).toEqual([0, 0]);
  expect(ship.hp).toEqual(5);
});

test("Ship's hit function lowers hp", () => {
  const ship = shipYard("battleship", "vertical", [0, 0]);
  expect(ship.hp).toEqual(4);
  ship.hit();
  expect(ship.hp).toEqual(3);
});

test("Ship gets sunk when isSunk is called", () => {
  const ship = shipYard("battleship", "vertical", [0, 0]);
  expect(ship.status).toBe("afloat");
  ship.isSunk();
  expect(ship.status).toBe("sunk");
});

test("Ship gets sunk after enough hits", () => {
  const ship = shipYard("battleship", "vertical", [0, 0]);
  ship.hit(4);
  expect(ship.status).toBe("sunk");
});
