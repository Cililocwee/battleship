import shipYard from "../ships";

test("Ship factory makes ships with correct attributes", () => {
  const ship = shipYard("battleship", "vertical");
  expect(ship.model).toBe("battleship");
  expect(ship.orientation).toBe("vertical");
  expect(ship.hp).toEqual(4);
  expect(ship.status).toBe("afloat");
});

test("Ship factory makes ships with correct attributes", () => {
  const ship = shipYard("carrier", "vertical");
  expect(ship.model).toBe("carrier");
  expect(ship.orientation).toBe("vertical");
  expect(ship.hp).toEqual(5);
  expect(ship.status).toBe("afloat");
});

test("Ship's hit function lowers hp", () => {
  const ship = shipYard("battleship", "vertical");
  expect(ship.hp).toEqual(4);
  ship.hit();
  expect(ship.hp).toEqual(3);
});

test("Ship gets sunk when out of hp", () => {
  let ship = shipYard("patrolboat", "vertical");
  expect(ship.status).toBe("afloat");
  ship.hit();
  ship.hit();
  expect(ship.status).toBe("sunk");
});

test("Declares when a boat has been sunk", () => {
  let ship = shipYard("patrolboat", "vertical");
  expect(ship.status).toBe("afloat");
  ship.hit();
  expect(ship.hit()).toBe("You sunk a patrolboat");
});
