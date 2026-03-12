import './styles.css';
import * as logic from './logic.js';

const body = document.querySelector('body');
const startButton = document.querySelector('.startButton');
const startBox = document.querySelector('.start');
startButton.onclick = () => {
  startBox.style.display = "none";
}
const elPlayer = document.querySelector('.player > .board');
const playerLogic = new logic.Player();
playerLogic.gameboard.randomPlaceShip();
// playerLogic.gameboard.receiveAttack();
//
const elComputer = document.querySelector('.computer > .board');
const computerLogic = new logic.Computer();
computerLogic.gameboard.randomPlaceShip();

const computerAttack = (computer, player) => {
  if (player) {
    const [x, y] = computer.attack();
    if (player[x][y].cellData.gameboard.arr[x][y]) {
      player[x][y].elCell.style.backgroundColor = "grey";
      player[x][y].cellData.gameboard.receiveAttack([x, y]);
      if (player[x][y].cellData.gameboard.allSunk()) {
        gameOver("Computer");
      }
    } else {
      player[x][y].elCell.style.backgroundColor = "lightblue";
    }
  }
}

const gameOver = (string) => {
  const resultBox = body.querySelector('.result');
  const resultText = document.createElement('h2');
  resultBox.appendChild(resultText);
  resultText.innerText = `${string} Won`;
  resultBox.style.display = 'flex';
};

const createCellElement = (value, x, y, oppArr) => { 
  const elCell = document.createElement('div');
  const cellData = value;
  if (oppArr) {
  elCell.onclick = () => {
    if (cellData.gameboard.arr[x][y]) {
      elCell.style.backgroundColor = "grey";
      cellData.gameboard.receiveAttack([x, y]);
      if(cellData.gameboard.allSunk()) {
        gameOver("Player");
      };
    } else {
      elCell.style.backgroundColor = "lightblue";
    }
    setTimeout(() => {
      if (oppArr) {
        computerAttack(value, oppArr);
      }
    }, 500)
  };
  }
  return {
    elCell,
    cellData
  };
}

const renderBoard = (selector, data, oppArr = null) => {
  const cells = [];
  for (let i = 0; i < 10; i++) {
    cells[i] = [];
    const row = document.createElement('div');
    row.classList = 'horizontalArr';
    for (let j = 0; j < 10; j++) {
      const cell = createCellElement(data, i, j, oppArr);
      cells[i][j] = cell;
      cell.elCell.classList = 'verticalArr';
      row.appendChild(cell.elCell);
    }
    selector.appendChild(row);
  }
  return cells;
};

const playersCells = renderBoard(elPlayer, playerLogic);
renderBoard(elComputer, computerLogic, playersCells);

