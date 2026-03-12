"use strict";

const Ship = (num) => {
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

class Gameboard {
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
  placeShip(num, coordinate, horizontal = true) {
    const ship = Ship(num);
    const [x, y] = coordinate;
    
    for (let i = 0; i < num; i++) {
      let newX = horizontal ? x : x + i; 
      let newY = horizontal ? y + i : y;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= this.arr.length ||
        newY >= this.arr.length
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
  
  randomPlaceShip() {
    let standardShips = [5, 4, 3, 3, 2];
    for (let i = 0; i < standardShips.length; i++) {
      try {
        this.placeShip(standardShips[i],[Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
          Math.floor(Math.random() * 2) == 1);
      } catch(error) {
        i--; 
      }
    }
  }

  allSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

class Player {
  constructor() {
    this.gameboard = new Gameboard;
  }
}

class Computer extends Player {
  constructor() {
    super();
  }
  arr = Array.from({length: 10}, () => {
    return Array(10).fill(false);
  });

  attack () {
    let coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    while(this.arr[coordinates[0]][coordinates[1]]) {
      coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
    this.arr[coordinates[0]][coordinates[1]] = true;
    return coordinates;
  }
}

export {
   // uncomment for running tests 
  Ship,
  Gameboard,
  Player,
  Computer
}
