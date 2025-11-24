"use strict";

const newShip = (num) => {
  const length = num;
  let timesHit = 0;
  let sunk = false;
  
  const hit = () => {
    ++timesHit;
  }

  const isSunk = () => {
    if (length <= timesHit) {
      sunk = true;
    }
    return sunk;
  }

  return {
    length,
    get timesHit() {
      return timesHit;
    },
    get sunk() {
      return sunk;
    },
    hit,
    isSunk
  };
};

class gameboard {
  constructor () {
    this.arr = [];
  };

  createShip(num, ...coordinates) {
    if (num != coordinates.length) {
      throw new Error(`Invalid coordinates provided.`);
    }
    const ship = newShip(num);

    coordinates.forEach((coordinate) => {
      if (!Array.isArray(coordinate) || coordinate.length > 2) {
        throw new Error(`Invalid coordinate ${coordinate} must be array an like [x, y].`);
      }

      const [x, y] = coordinate;

      if (this.arr[x] && this.arr[x][y]) {
        throw new Error(`cell [${x}, ${y}] already ocuppied by a ship.`);
      }

      if (!this.arr[x]) {
        this.arr[x] = [];
      }

      this.arr[x][y] = ship;

    })

    return ship;
  }
  missedAttacks = 0;
  receiveAttack(arr) {
    const [x, y] = arr;
    let hitState = false;
    if (this.arr[x][y]) {
      hitState = true;
      this.arr[x][y].hit();
      return hitState;
    }
    this.missedAttacks++;
    return hitState;
  }
}

module.exports = {
  newShip,
  gameboard
}
