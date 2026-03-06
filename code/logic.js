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
  constructor (matrix = 10) {
    this.arr = [];
    for (let i = 0; i < matrix; i++) {
      this.arr[i] = []
      for (let j = 0; j < matrix; j++) {
        this.arr[i][j] = null;
      }
    }
  };
  ships = [];

  // createShip(num, ...coordinates) {
  //   if (num != coordinates.length) {
  //     throw new Error(`Invalid coordinates provided.`);
  //   }
  //   const ship = newShip(num);
  //
  //   coordinates.forEach((coordinate) => {
  //     if (!Array.isArray(coordinate) || coordinate.length > 2) {
  //       throw new Error(`Invalid coordinate ${coordinate} must be array an like [x, y].`);
  //     }
  //
  //     const [x, y] = coordinate;
  //
  //     if (this.arr[x][y]) {
  //       throw new Error(`cell [${x}, ${y}] already ocuppied by a ship.`);
  //     }
  //     this.arr[x][y] = ship;
  //   });
  //   this.ships.push(ship);
  //   return ship;
  // }

  placeShip(num, coordinate, horizontal = true) {
    const ship = newShip(num);
    const [x, y] = coordinate;
    
    for (let i = 0; i < num; i++) {
      let newX = horizontal ? x : x + i; 
      let newY = horizontal ? y + i : y;

      if (
        newX < 0 ||
        newY < 0 ||
        newX > this.arr.length ||
        newY > this.arr.length
      ) {
        throw new Error("ship out of bounds");
      }
      if (this.arr[newX][newY]) {
        throw new Error("cell aquired by another ship");
      }
    }

    for (let i = 0; i < num; i++) {
      let newX = horizontal ? x : x + i; 
      let newY = horizontal ? y + i : y;
      this.arr[newX][newY] = ship;
    }
    this.ships.push(ship);
  }

  missedAttacks = 0;
  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    let hitState = false;
    if (this.arr[x][y]) {
      hitState = true;
      this.arr[x][y].hit();
      return hitState;
    }
    this.missedAttacks++;
    return hitState;
  }

  allSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

class Player {
  constructor() {
    this.gameboard = new gameboard;
  }
}

class Computer extends Player {
  constructor() {
    super();
  }
}

export {
   // uncomment for running tests 
  newShip,
  gameboard,
  Player,
  Computer
}
