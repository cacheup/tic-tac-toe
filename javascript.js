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
  return {
    resetBoard,
    displayBoard,
    markBoard
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
  let _currentPlayer = _player1;
  const _spaces = document.querySelectorAll('.space');
  _spaces.forEach(space => space.addEventListener('click', () => {
    if(space.textContent == "") {
      _currentPlayer.markBoard(space.getAttribute('id'));
      space.textContent = _currentPlayer.marker;
      _currentPlayer = _currentPlayer == _player1 ? _player2 : _player1; 
    }
  }));
  return {

  }
})();