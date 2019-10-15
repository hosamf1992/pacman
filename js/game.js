'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPERFOOD = '&#127844';
var CHERRY = '&#127826';
var gEmptyLocation = [];
var cherryIntervalIdx = null;


var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  var cherryInterval = setInterval(addCherry, 15000);
  cherryIntervalIdx = cherryInterval;
  // console.table(gBoard);
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[1][8] = SUPERFOOD;
  board[1][1] = SUPERFOOD;
  board[8][8] = SUPERFOOD;
  board[8][1] = SUPERFOOD;
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  showModal(false);
  console.log('Game Over');
  gGame.isOn = false;
  clearIntervals();
  
}


function resetGame() {

  var modal = document.querySelector('.modal');
  modal.classList.add('hide');
  gGame.score = 0;
  updateScore(0);
  clearIntervals();
  init();



}


function showModal(isWin) {
  var changeText = document.querySelector('.msgText');
  if (isWin) {

    changeText.innerText = 'You Win!!'
  }
  else {
    changeText.innerText = 'You Lose!!'

  }
  var modal = document.querySelector('.modal');
  modal.classList.remove('hide');
}

function isWin() {
  var isWin = false;
  var countRow = 0;
  for (var i = 1; i <= 8; i++) {

    if (gBoard[i].indexOf(FOOD) === -1) {

      countRow++;

      //  isWin = true;
    }

  }

  if (countRow === 8) {
    isWin = true;
  }

  return isWin;
}

function addCherry() {
  gEmptyLocation = findEmptyLocation();
  if (gEmptyLocation.length > 0) {
    var rndIndex = rndNum(0, gEmptyLocation.length - 1);

    var iIndex = null;
    var jIndex = null;

    iIndex = gEmptyLocation[rndIndex].i;
    jIndex = gEmptyLocation[rndIndex].j;
    gBoard[iIndex][jIndex] = CHERRY;
    printMat(gBoard, '.board-container');
  }




}

function findEmptyLocation() {
  var res = [];
  for (var i = 1; i < 8; i++) {
    var pos = { i: 0, j: 0 };

    for (var j = 1; j < 8; j++) {

      if (gBoard[i][j] === " ") {

        pos = { i: i, j: j };
        res.push(pos);
      }
    }

  }
  return res;

}

function clearIntervals() {
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(cherryIntervalIdx);
  cherryIntervalIdx = null;
}