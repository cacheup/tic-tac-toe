const gameBoard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];
  const resetBoard = () => {
   for(let i = 0; i < 9; i++){
      _board[i] = "";
    }
  }
  const displayBoard = () => {
    const spaces = document.querySelectorAll('.space');
    for(let i = 0; i < 9; i++){
      spaces[i].textContent = _board[i];
    }
  }
  const markBoard = (space, marker) => {
    if(space > -1 && space < 9) {
      if(_board[space] == ""){
         _board[space] = marker;
      }
    }
  }
  const isThreeinRow = (space, marker) => {
    switch (space) {
      case 0:
        if(_board[1] == marker && _board[2] == marker) {return true;}
        if(_board[3] == marker && _board[6] == marker) {return true;}
        if(_board[4] == marker && _board[8] == marker) {return true;}
        return false;
      case 1:
        if(_board[0] == marker && _board[2] == marker) {return true;}
        if(_board[4] == marker && _board[7] == marker) {return true;}
        return false;
      case 2:
        if(_board[0] == marker && _board[1] == marker) {return true;}
        if(_board[4] == marker && _board[6] == marker) {return true;}
        if(_board[5] == marker && _board[8] == marker) {return true;}
        return false;
      case 3:
        if(_board[0] == marker && _board[6] == marker) {return true;}
        if(_board[4] == marker && _board[5] == marker) {return true;}
        return false;
      case 4:
        if(_board[0] == marker && _board[8] == marker) {return true;}
        if(_board[1] == marker && _board[7] == marker) {return true;}
        if(_board[2] == marker && _board[6] == marker) {return true;}
        if(_board[3] == marker && _board[5] == marker) {return true;}
        return false;
      case 5:
        if(_board[2] == marker && _board[8] == marker) {return true;}
        if(_board[3] == marker && _board[4] == marker) {return true;}
        return false;
      case 6:
        if(_board[0] == marker && _board[3] == marker) {return true;}
        if(_board[2] == marker && _board[4] == marker) {return true;}
        if(_board[7] == marker && _board[8] == marker) {return true;}
        return false;
      case 7:
        if(_board[1] == marker && _board[4] == marker) {return true;}
        if(_board[6] == marker && _board[8] == marker) {return true;}
        return false;
      case 8:
        if(_board[0] == marker && _board[4] == marker) {return true;}
        if(_board[2] == marker && _board[5] == marker) {return true;}
        if(_board[6] == marker && _board[7] == marker) {return true;}
        return false;
      default:
        return false;
    }
  }
  return {
    resetBoard,
    displayBoard,
    markBoard,
    isThreeinRow
  };
})();

const playerFactory = (name, marker) => {
  const markBoard = (space) => {
    gameBoard.markBoard(space, marker);
  }
  return {
    name,
    marker,
    markBoard
  };
}

const game = (() => {
  const _player1 = playerFactory("P1", "x");
  const _player2 = playerFactory("P2", "o");
  const _computer = playerFactory("computer", "o");
  let _currentPlayer = _player1;
  let _count = 1;
  let _isVersusComputer = false;
  const _result = document.querySelector('.result');
  const _board = document.querySelectorAll('.space');
  _board.forEach(space => space.classList.add('disabled'));
  _board.forEach(space => space.addEventListener('click', () => {
    if(space.textContent == "") {
      _currentPlayer.markBoard(+space.getAttribute('id'));
      space.textContent = _currentPlayer.marker;
      if(gameBoard.isThreeinRow(+space.getAttribute('id'), _currentPlayer.marker)) {
        _board.forEach(space => space.classList.add('disabled'));
        _result.textContent = `${_currentPlayer.name} won!`;
        return;
      }
      if(_count == 9) {
        _board.forEach(space => space.classList.add('disabled'));
        _result.textContent = "It's a tie!";
        return;
      }
      _count++;
      if(!_isVersusComputer) {
        _currentPlayer = _currentPlayer == _player1 ? _player2 : _player1;
      }
      else {
        _computerMove();
      }

    }
  }));
  const _newGameBtn = document.querySelector('button');
  _newGameBtn.addEventListener('click', () => {
    newGame();
  });
  const _resetGame = () => {
    _count = 1;
    _currentPlayer = _player1;
    gameBoard.resetBoard();
    gameBoard.displayBoard();
    _result.textContent = "";
    _board.forEach(space => space.classList.remove('disabled'));
  }
  const _computerMove = () => {
    let emptySpaces = [];
    for(let i = 0; i < _board.length; i++) {
      if(_board[i].textContent == '') {
        emptySpaces.push(i);
      }
    }
    let markedBoard = false;
    for(let i = 0; i < emptySpaces.length; i++) {
      if(gameBoard.isThreeinRow(emptySpaces[i], _computer.marker)) {
        _computer.markBoard(emptySpaces[i]);
        gameBoard.displayBoard();
        _board.forEach(space => space.classList.add('disabled'));
        _result.textContent = `${_computer.name} won!`;
        return;
      }
      if(gameBoard.isThreeinRow(emptySpaces[i], _player1.marker)) {
        _computer.markBoard(emptySpaces[i]);
        markedBoard = true;
        break;
      }
    }
    if(markedBoard == false) {
      _computer.markBoard(emptySpaces[Math.floor(Math.random()*emptySpaces.length)]);
    }
    gameBoard.displayBoard();
    if(_count == 9) {
      _board.forEach(space => space.classList.add('disabled'));
      _result.textContent = "It's a tie!";
      return;
    }
    _count++;
  }
  const newGame = () => {
    _isVersusComputer = confirm("Do you wish to play against computer?");
    let player1Name = prompt("Enter player one name", `${_player1.name}`);
    if(player1Name != null && player1Name != '') {
      _player1.name = player1Name;
    }
    if(_isVersusComputer == false) {
      let player2Name = prompt("Enter player two name", `${_player2.name}`);
      if(player2Name != null && player2Name != '') {
       _player2.name = player2Name;
      }
    }
    _resetGame();
    if(_isVersusComputer) {
      _computerMove();
    }
  }
  return {
    newGame
  }
})();