const gameBoard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];
  const resetBoard = () => {
   for(let i = 0; i < 9; i++){
      _board[i] = "";
    }
  }
  return {
    resetBoard
  };
})();