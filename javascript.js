const gameBoard = (() => {
  const _board = [];
  const initializeBoard = () => {
   for(let i = 0; i < 9; i++){
      _board.push("");
    }
  }
  return {
    initializeBoard
  };
})();