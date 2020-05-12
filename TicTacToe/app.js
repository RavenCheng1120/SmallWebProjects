let origBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8],
];
const cells = document.querySelectorAll('.cell');

//開始遊戲、重新開始遊戲
const startGame = () => {
  document.querySelector('.end-game').style.display = 'none';
  origBoard = Array.from(Array(9).keys()); //產生0-9到陣列中

  for(let i = 0 ; i < cells.length ; i++){
    cells[i].innerText = "";
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
};

//人類玩家放下圓圈
const turnClick = (square) => {
  turn(square.target.id, humanPlayer);
};

//玩家放下圖案，並檢查是否贏遊戲
const turn = (squareId, player) => {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  let gameWin = checkWin(origBoard, player);
  if (gameWin)
    gameOver(gameWin);
}

//檢查是否勝利
const checkWin = (board, player) => {
  let plays = board.reduce((a,e,i) => (e===player) ? a.concat(i) : a, []);
  let gameWin = null;

  //檢查每種贏的方式
  for (let [index, win] of winCombos.entries()){
    //此種贏的方式裡，會出現的index也出現在plays中
    if(win.every(element => plays.indexOf(element) > -1)){
      gameWin = {index: index, player: player};
      break;
    }
  }
  //沒有人贏，則gameWin為null
  return gameWin;
};

//遊戲結束，顯示勝利者
const gameOver = (gameWin) => {
  for (let index of winCombos[gameWin.index]){
    document.getElementById(index).style.backgroundColor = (gameWin.player === humanPlayer) ? "rgba(235, 108, 108, 0.8)" : "rgba(102, 154, 227, 0.8)";
  }
  for (let i = 0 ; i < cells.length ; i++){
    cells[i].removeEventListener('click', turnClick, false);
  }
};
