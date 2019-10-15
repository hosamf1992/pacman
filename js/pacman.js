var gPacman;
// const PACMAN = '&#9786;';

var PACMAN = '<img class="pacman" src="img/pacman.png">';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;

  // console.log('eventKeyboard:', eventKeyboard);



  var nextLocation = getNextLocation(eventKeyboard);


  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log(nextCell);


  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // if pacman eats a power food

  if (gPacman.isSuper === true && nextCell === SUPERFOOD) return;
  // console.log(nextCell);
  if (nextCell === SUPERFOOD) {


    gPacman.isSuper = true;
    changeGhostColor(true);


    // printMat(gBoard, '.board-container');
    setTimeout(function () {
      changeGhostColor(false);
      // printMat(gBoard, '.board-container');
      gPacman.isSuper = false;

    },
      5000);

  }



  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    // console.log(gPacman.location);
    gBoard[gPacman.location.i][gPacman.location.j] = '';
  }
  // if cherry
  if (nextCell === CHERRY) {
    updateScore(10);
    // console.log(gPacman.location);
    gBoard[gPacman.location.i][gPacman.location.j] = '';
  }

  if (gPacman.isSuper === true && nextCell === GHOST) {

    // console.log('yes');
    // gBoard[gPacman.location.i][gPacman.location.j] = '';
    renderCell(gPacman.location, EMPTY);

    gGhosts.shift();
    createGhost(gBoard);
  }
  if (gPacman.isSuper === false && nextCell === GHOST) {

    gameOver()
    renderCell(gPacman.location, EMPTY);
    return;
  }



  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  if (isWin()) {
    gGame.isOn = false;
    clearIntervals();
    showModal(true);

  }

}



function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };


  switch (keyboardEvent.code) {
    case 'ArrowUp':
      PACMAN = '<img class="pacman rotateUp" src="img/pacman.png">';

      nextLocation.i--;

      break;
    case 'ArrowDown':
      PACMAN = '<img class="pacman rotateDown" src="img/pacman.png">';

      nextLocation.i++;

      break;
    case 'ArrowLeft':

      PACMAN = '<img class="pacman rotateLeft" src="img/pacman.png">';
      nextLocation.j--;


      break;
    case 'ArrowRight':
      PACMAN = '<img class="pacman" src="img/pacman.png">';
      nextLocation.j++;

      break;
    default: return null;
  }


  return nextLocation;
}

