const functions = require('./../code/logic.js');

test("ship object", () => {
  const ship = functions.ship(2);
  expect(ship.length).toBe(2);
  expect(ship.timesHit).toBe(0);
  expect(ship.sunk).toBe(false);
  ship.hit();
  expect(ship.timesHit).toBe(1);
  expect(ship.isSunk()).toBe(false);
});
