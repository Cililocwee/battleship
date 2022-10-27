import boardFactory from "../gameBoards";
import Player from "../player";

test("declareAttack should return results", () => {
  let john = new Player(john);
  let game = boardFactory();
  game.positionBoats("patrolboat", [0, 0], "horizontal");

  expect(john.declareAttack(game, [0, 0])).toBe(true);
  expect(john.declareAttack(game, [9, 9])).toBe(false);
});
