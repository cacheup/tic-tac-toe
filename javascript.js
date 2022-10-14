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
  return {
    resetBoard,
    displayBoard
  };
})();

const playerFactory = (name, marker) => {
  return { name, marker };
}

const game = (() => {
  const _player1 = playerFactory("P1", "x");
  const _player2 = playerFactory("P2", "o");
})();