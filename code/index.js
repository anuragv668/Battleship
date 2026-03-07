import './styles.css';
import * as logic from './logic.js';

const body = document.querySelector('body');

const player = document.querySelector('.player > .board');
const playerLogic = new logic.Player();
playerLogic.gameboard.randomPlaceShip();

const computer = document.querySelector('.computer > .board');
const computerLogic = new logic.Computer();
computerLogic.gameboard.randomPlaceShip();
// const createCell = () => {
//   null;  pending progress
// }


const populateBoard = (selector, data) => {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList = 'horizontalArr';
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList = 'verticalArr';
      const cellData = data.gameboard.arr[i][j];
      if (cellData && cellData.length) {
        cell.textContent = cellData.length;
      } else {
        cell.textContent = 0;
      }
      row.appendChild(cell);
    }
    selector.appendChild(row);
  }
};

populateBoard(player, playerLogic);
populateBoard(computer, computerLogic);

