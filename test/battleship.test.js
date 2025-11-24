const functions = require('./../code/logic.js');

test("ship object", () => {
  const ship = functions.newShip(2);
  expect(ship.length).toBe(2);
  expect(ship.timesHit).toBe(0);
  expect(ship.sunk).toBe(false);
  ship.hit();
  expect(ship.timesHit).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("gameboard", () => {
  const gameboard = new functions.gameboard;
  expect(gameboard.createShip(1, [0, 0]).length).toBe(1);
  gameboard.createShip(2, [6, 1], [6, 2]);
  expect(gameboard.arr[6][1].length).toBe(2);
  expect(gameboard.arr[6][2].length).toBe(2);
  expect(gameboard.arr[6][1].timesHit).toBe(0);
  expect(gameboard.receiveAttack([6, 1])).toBe(true);
  expect(gameboard.receiveAttack([6, 3])).toBe(false);
  expect(gameboard.arr[6][1].timesHit).toBe(1);
  expect(gameboard.arr[6][2].timesHit).toBe(1);
});


