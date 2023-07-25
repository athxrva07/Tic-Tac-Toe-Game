const board = document.getElementById('board');
const status = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWin = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      highlightWinningCells(a, b, c);
      status.textContent = `Player ${currentPlayer} wins!`;
      break;
    }
  }

  if (gameActive && !gameBoard.includes('')) {
    gameActive = false;
    status.textContent = "It's a tie!";
  }
};

const highlightWinningCells = (a, b, c) => {
  cells[a].classList.add('win');
  cells[b].classList.add('win');
  cells[c].classList.add('win');
};

const makeMove = (cellIndex) => {
  if (gameBoard[cellIndex] || !gameActive) return;
  
  gameBoard[cellIndex] = currentPlayer;
  cells[cellIndex].textContent = currentPlayer;
  
  checkWin();
  
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  status.textContent = `Player ${currentPlayer}'s Turn`;
};

cells.forEach((cell, index) => cell.addEventListener('click', () => makeMove(index)));
