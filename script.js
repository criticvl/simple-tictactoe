var board;
var playerTurn;
const gameContainer = document.getElementById("gameContainer");
const endContainer = document.getElementById("endContainer");
const winner = document.getElementById("winner");

function startGame() {
  endContainer.style.opacity = "0";

  setTimeout(function () {
    endContainer.style.display = "none";
    gameContainer.style.display = "grid ";
  }, 500);
  setTimeout(function () {
    gameContainer.style.opacity = "1";
  }, 1000);

  board = [
    ["NONE", "NONE", "NONE"],
    ["NONE", "NONE", "NONE"],
    ["NONE", "NONE", "NONE"],
  ];

  playerTurn = "0";

  drawBoard();
}

function drawBoard() {
  clearBoard();
  var gameContainer = document.getElementById("gameContainer");
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var cell = document.createElement("button");
      cell.className = "cell";
      if (board[i][j] == "NONE") {
        cell.textContent = "";
      } else {
        cell.textContent = board[i][j];
      }
      cell.addEventListener("click", makeMove.bind(null, i, j));
      gameContainer.appendChild(cell);
    }
  }
}

function makeMove(i, j) {
  if (board[i][j] == "" || board[i][j] == "X" || board[i][j] == "O") {
    return;
  }
  if (playerTurn % 2 == 0) {
    board[i][j] = "X";
  } else {
    board[i][j] = "O";
  }
  playerTurn++;
  drawBoard();
  checkWin();
}

function clearBoard() {
  gameContainer.textContent = "";
}

function checkWin() {
  var win = false;
  if (
    board[0][0] == board[0][1] &&
    board[0][0] == board[0][2] &&
    board[0][0] != "NONE"
  ) {
    win = true;
  }
  if (
    board[1][0] == board[1][1] &&
    board[1][0] == board[1][2] &&
    board[1][0] != "NONE"
  ) {
    win = true;
  }
  if (
    board[2][0] == board[2][1] &&
    board[2][0] == board[2][2] &&
    board[2][0] != "NONE"
  ) {
    win = true;
  }
  if (
    board[0][0] == board[1][0] &&
    board[0][0] == board[2][0] &&
    board[0][0] != "NONE"
  ) {
    win = true;
  }
  if (
    board[0][1] == board[1][1] &&
    board[0][1] == board[2][1] &&
    board[0][1] != "NONE"
  ) {
    win = true;
  }
  if (
    board[0][2] == board[1][2] &&
    board[0][2] == board[2][2] &&
    board[0][2] != "NONE"
  ) {
    win = true;
  }
  if (
    board[0][0] == board[1][1] &&
    board[0][0] == board[2][2] &&
    board[0][0] != "NONE"
  ) {
    win = true;
  }
  if (
    board[0][2] == board[1][1] &&
    board[0][2] == board[2][0] &&
    board[0][2] != "NONE"
  ) {
    win = true;
  }

  if (win) {
    disableButtons();

    if (playerTurn % 2 == 0) {
      winner.textContent = "Player O wins!";
    } else {
      winner.textContent = "Player X wins!";
    }
    gameContainer.style.opacity = "0";
    setTimeout(function () {
      gameContainer.style.display = "none";
      endContainer.style.display = "flex";
    }, 500);
    setTimeout(function () {
      endContainer.style.opacity = "1";
    }, 1000);
    return;
  }

  if (playerTurn == 9) {
    disableButtons();

    winner.textContent = "Draw!";
    gameContainer.style.opacity = "0";
    setTimeout(function () {
      gameContainer.style.display = "none";
      endContainer.style.display = "flex";
    }, 500);
    setTimeout(function () {
      endContainer.style.opacity = "1";
    }, 1000);
  }
}

function disableButtons() {
  var buttons = document.getElementsByClassName("cell");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

document.getElementById("restartButton").addEventListener("click", startGame);

startGame();
