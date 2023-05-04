document.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-bg");

  toggleButton.addEventListener("click", () => {
    if (document.body.style.backgroundColor === "black") {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "black";
    }
  });
});

function getBoard() {
  const cells = document.querySelectorAll(".cell");
  const board = [[], [], []];
  cells.forEach((cell, index) => {
    const rowIndex = Math.floor(index / 3);
    const columnIndex = index % 3;
    board[rowIndex][columnIndex] = cell.textContent;
  });
  return board;
}

function handleCellClick(event) {
  const clickedCell = event.target;

  if (clickedCell.textContent === "") {
    clickedCell.textContent = "X";
    if (hasTreeInALine()) {
      alert("You win!");
      setTimeout(() => {
        location.reload();
      }, 1000);
      return;
    }
    computerPlay();
  }
}

function computerPlay() {
  const bestMove = findBestMove(getBoard());
  const cells = document.querySelectorAll(".cell");
  const chosenCell = cells[bestMove.row * 3 + bestMove.col];
  chosenCell.textContent = "O";

  if (gameOver()) {
    alert("Computer wins!");
    setTimeout(() => {
      location.reload();
    }, 1000);
    return;
  } else if (checkDraw()) {
    alert("Draw!");
    setTimeout(() => {
      location.reload();
    }, 1000);
    return;
  }
}

function findBestMove(board) {
  let bestValue = -Infinity;
  let bestMove = null;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        board[row][col] = "O";
        const moveValue = minimax(board, 0, false);
        board[row][col] = "";
        if (moveValue > bestValue) {
          bestValue = moveValue;
          bestMove = { row, col };
        }
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const score = evaluate(board);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    const moves = validMoves(board);
    moves.forEach((move) => {
      board[move.row][move.col] = "O";
      best = Math.max(best, minimax(board, depth + 1, !isMaximizing));
      board[move.row][move.col] = "";
    });
    return best;
  } else {
    let best = Infinity;
    const moves = validMoves(board);
    moves.forEach((move) => {
      board[move.row][move.col] = "X";
      best = Math.min(best, minimax(board, depth + 1, !isMaximizing));
      board[move.row][move.col] = "";
    });
    return best;
  }
}

function isBoardFull(board) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") return false;
    }
  }
  return true;
}
function evaluate(board) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      if (board[row][0] === "O") return 10;
      if (board[row][0] === "X") return -10;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      if (board[0][col] === "O") return 10;
      if (board[0][col] === "X") return -10;
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === "O") return 10;
    if (board[0][0] === "X") return -10;
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === "O") return 10;
    if (board[0][2] === "X") return -10;
  }

  return 0;
}

function validMoves(board) {
  const moves = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") moves.push({ row, col });
    }
  }
  return moves;
}

function hasTreeInALine() {
  const cells = document.querySelectorAll(".cell");
  const board = [[], [], []];
  cells.forEach((cell, index) => {
    const rowIndex = Math.floor(index / 3);
    const columnIndex = index % 3;
    board[rowIndex][columnIndex] = cell;
  });
  for (let row = 0; row < 3; row++) {
    // validate if has 3 o's on the same line
    if (
      board[row][0].textContent === "X" &&
      board[row][1].textContent === "X" &&
      board[row][2].textContent === "X"
    ) {
      board[row][0].style.backgroundColor = "green";
      board[row][1].style.backgroundColor = "green";
      board[row][2].style.backgroundColor = "green";
      return true;
    }
  }
  for (let column = 0; column < 3; column++) {
    // validate if has 3 x's on the same column
    if (
      board[0][column].textContent === "X" &&
      board[1][column].textContent === "X" &&
      board[2][column].textContent === "X"
    ) {
      board[0][column].style.backgroundColor = "green";
      board[1][column].style.backgroundColor = "green";
      board[2][column].style.backgroundColor = "green";
      return true;
    }
  }
  // validate if has 3 x's diagonally
  if (
    board[0][0].textContent === "X" &&
    board[1][1].textContent === "X" &&
    board[2][2].textContent === "X"
  ) {
    board[0][0].style.backgroundColor = "green";
    board[1][1].style.backgroundColor = "green";
    board[2][2].style.backgroundColor = "green";
    return true;
  }
  if (
    board[0][2].textContent === "X" &&
    board[1][1].textContent === "X" &&
    board[2][0].textContent === "X"
  ) {
    board[0][2].style.backgroundColor = "green";
    board[1][1].style.backgroundColor = "green";
    board[2][0].style.backgroundColor = "green";
    return true;
  }
}
function checkDraw() {
  //check if draw
  const cells = document.querySelectorAll(".cell");
  const emptyCells = Array.from(cells).filter(
    (cell) => cell.textContent === ""
  );
  if (emptyCells.length === 0) {
    alert("Draw!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
function gameOver() {
  const cells = document.querySelectorAll(".cell");
  const board = [[], [], []];
  cells.forEach((cell, index) => {
    const rowIndex = Math.floor(index / 3);
    const columnIndex = index % 3;
    board[rowIndex][columnIndex] = cell;
  });

  for (let row = 0; row < 3; row++) {
    if (
      board[row][0].textContent === "O" &&
      board[row][1].textContent === "O" &&
      board[row][2].textContent === "O"
    ) {
      board[row][0].style.backgroundColor = "red";
      board[row][1].style.backgroundColor = "red";
      board[row][2].style.backgroundColor = "red";
      return true;
    }
  }

  for (let column = 0; column < 3; column++) {
    if (
      board[0][column].textContent === "O" &&
      board[1][column].textContent === "O" &&
      board[2][column].textContent === "O"
    ) {
      board[0][column].style.backgroundColor = "red";
      board[1][column].style.backgroundColor = "red";
      board[2][column].style.backgroundColor = "red";
      return true;
    }
  }

  if (
    board[0][0].textContent === "O" &&
    board[1][1].textContent === "O" &&
    board[2][2].textContent === "O"
  ) {
    board[0][0].style.backgroundColor = "red";
    board[1][1].style.backgroundColor = "red";
    board[2][2].style.backgroundColor = "red";
    return true;
  }

  if (
    board[0][2].textContent === "O" &&
    board[1][1].textContent === "O" &&
    board[2][0].textContent === "O"
  ) {
    board[0][2].style.backgroundColor = "red";
    board[1][1].style.backgroundColor = "red";
    board[2][0].style.backgroundColor = "red";
    return true;
  }

  return false;
}
