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
  //確保人類玩家不是按到已經按過的方塊
  if(typeof origBoard[square.target.id] === 'number'){
    turn(square.target.id, humanPlayer);
    //不是平手，則換電腦回合
    if (document.querySelector('.end-game').style.display === 'none'){
      if (!checkTie()){
        setTimeout(turn, 300, bestSpot(), aiPlayer);
        // turn(bestSpot(), aiPlayer);
      }
    }
  }
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
  declareWinner(gameWin.player === humanPlayer ? "You win!" : "You lose:(")
};



const emptySquares = (boardType) => {
  return boardType.filter(s => typeof s === 'number');
};



const bestSpot = () => {
  // return emptySquares(origBoard)[0];
  return minmax(origBoard, aiPlayer).index;
};



const declareWinner = (sentence) => {
  document.querySelector('.end-game').style.display = 'block';
  document.querySelector(".end-game h2").textContent = sentence;
}



const checkTie = () => {
  if (emptySquares(origBoard).length === 0){
    for(let i = 0 ; i < cells.length ; i++){
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie");
    return true;
  }
  return false;
};



const minmax = (newBoard, player) => {
  let availableSpots = emptySquares(newBoard);

  if (checkWin(newBoard, humanPlayer))
    return {score: -10};
  else if (checkWin(newBoard, aiPlayer))
    return {score: 10};
  else if (availableSpots.length === 0)
    return {score: 0};

  let moves = [];
  for (let i = 0 ; i < availableSpots.length ; i++){
    let move = {};

    //紀錄原始數據到index中，暫時替換board上的數據
    move.index = newBoard[availableSpots[i]];
    newBoard[availableSpots[i]] = player;

    if(player === aiPlayer){
      let result = minmax(newBoard, humanPlayer);
      move.score = result.score;
    }else{
      let result = minmax(newBoard, aiPlayer);
      move.score = result.score;
    }
    newBoard[availableSpots[i]] = move.index; //回復原始數據
    moves.push(move); //將數據記錄在moves中
  }

  let bestMove;
  if(player === aiPlayer){
    let bestScore = -10000;
    for(let x = 0 ; x < moves.length ; x++){
      if(moves[x].score > bestScore){
        bestScore = moves[x].score;
        bestMove = x;
      }
    }
  }else {
    let bestScore = 10000;
    for(let x = 0 ; x < moves.length ; x++){
      if(moves[x].score < bestScore){
        bestScore = moves[x].score;
        bestMove = x;
      }
    }
  }
  return moves[bestMove];
};

startGame();
