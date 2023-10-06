
//Initializing players

const player1 = {
  marker: 'x',
  isTurn: true,
  win: false
}

const player2 = {
  marker: 'o',
  isTurn: false,
  win: false
}

// initialize empty array of marks
let trackMarks = ['', '', '', '', '', '', '', '', ''];

// initialize game state
let gameOver = false;

// determine winning combinations
const winningCombinations = [
  // HORIZONTAL WINS
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // VERTICAL WINS
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // DIAGONAL WINS
  [0, 4, 8],
  [2, 4, 6]
];

// Function to check the game state (win, lose, or tie)
function checkGameState() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (trackMarks[a] && trackMarks[a] === trackMarks[b] && trackMarks[b] === trackMarks[c]) {
      gameOver = true; // Set gameOver to true when a player wins
      if (trackMarks[a] === 'x') {
        player1.win = true;
      } else if (trackMarks[a] === 'o') {
        player2.win = true;
      }
    }
  }

  // Check for a tie
  if (!gameOver && trackMarks.includes('') === false ) {
    gameOver = true; // Set gameOver to true when it's a tie
  }

  return { gameOver, player1Win: player1.win, player2Win: player2.win };
}

// Function to mark the board and alternate turns
function handleSquareClick(e) {
  // Prevent the page from re-loading after clicks
  e.preventDefault();

  const square = e.target;

  // Check if the clicked area is a square, unmarked, and not any other part of the document page
  if (square.className === 'square' && square.textContent === '' && gameOver === false) {

    // creating index from square
    let i = square.id;

    // update board with correct player mark, update track marks array with players' markers
    if (player1.isTurn) {
      square.textContent = player1.marker;
      trackMarks[i] = player1.marker;
    } else if (player2.isTurn) {
      square.textContent = player2.marker;
      trackMarks[i] = player2.marker;
    }
    
    // checking updated values of trackMarks
    console.log(trackMarks);

    // Toggle player turns
    player1.isTurn = !player1.isTurn;
    player2.isTurn = !player2.isTurn;
  }

  const gameState = checkGameState();

  if (gameState.gameOver) {
    if (gameState.player1Win) {
      console.log("Player 1 wins!");
    } 
    else if (gameState.player2Win) {
      console.log("Player 2 wins!");
    } 
    else {
      console.log("It's a tie!");
    }

    // Disable further clicks or perform any other end-of-game actions here.
  }
}


document.addEventListener('click', handleSquareClick);

// RESET BOARD
const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', resetBoard);

function resetBoard() {
  const squares = document.querySelectorAll('.square');
  // clear board on UI
  for (let square of squares) {
      square.textContent = '';
  }

  // reset player 1
  player1.isTurn = true;
  player1.win = false;

  // reset player 2
  player2.isTurn = false;
  player2.win = false;

  // reset board and game
  trackMarks = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;

  // clear previous messages from console
  console.clear()
}


