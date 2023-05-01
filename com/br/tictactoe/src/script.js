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
  const cells = document.querySelectorAll(".cell");
  const emptyCells = Array.from(cells).filter(
    (cell) => cell.textContent === ""
  );

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomEmptyCell = emptyCells[randomIndex];

    randomEmptyCell.textContent = "O";

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
