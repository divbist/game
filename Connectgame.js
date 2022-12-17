var player1 = prompt("Player One: Enter Your Name , you will be X");
var player1Symbol = 'X';

var player2 = prompt("Player Two: Enter Your Name, you will be O");
var player2Symbol = 'O';

var game_on = true;
var table = $('table tr');

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}
// Change the text of a cell
function changeSymbol(rowIndex,colIndex,symbol) {
  // return table.eq(rowIndex).find('td').eq(colIndex).find('td').css('textContent',symbol);
  return table.eq(rowIndex).find('td').eq(colIndex).text(symbol);
}

// Report Back to current symbol of a cell
function returnSymbol(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).text();
}

// // Take in column index, returns the bottom row that is still gray
// function checkBottom(colIndex) {
//   var colorReport = returnSymbol(5,colIndex);
//   for (var row = 5; row > -1; row--) {
//     colorReport = returnSymbol(row,colIndex);
//     if (colorReport === 'rgb(128, 128, 128)') {
//       return row
//     }
//   }
// }

// Check to see if 4 inputs are the same color
function symbolMatchCheck(one,two,three){
  return (one===two && one===three && (one ==='X'|| one ==='O') && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (symbolMatchCheck(returnSymbol(row,col), returnSymbol(row,col+1) ,returnSymbol(row,col+2), returnSymbol(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (symbolMatchCheck(returnSymbol(row,col), returnSymbol(row+1,col) ,returnSymbol(row+2,col), returnSymbol(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (symbolMatchCheck(returnSymbol(row,col), returnSymbol(row+1,col+1) ,returnSymbol(row+2,col+2), returnSymbol(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (symbolMatchCheck(returnSymbol(row,col), returnSymbol(row-1,col+1) ,returnSymbol(row-2,col+2), returnSymbol(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}


// Start with Player One
var currentPlayer = 1;
var currentName = player1;
var currentSymbol = player1Symbol;

// Start with Player One
$('h3').text(player1+": it is your turn, please pick a cell to mark your X.");


  // Recognize what column was chosen
  $('td').click(function(){
    var col = $(this).index();
    var $tr = $(this).closest('tr');
    var row = $tr.index();
  // Get back bottom available row to change
  // var bottomAvail = checkBottom(col);

  // Drop the chip in that column at the bottomAvail Row
  changeSymbol(row,col,currentSymbol);

  // if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        $('h1').text(currentName+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }

  // If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a cell to mark your X.");
    currentSymbol = player1Symbol;
  }else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a cell to mark your 0.");
    currentSymbol = player2Symbol;
  }

})
