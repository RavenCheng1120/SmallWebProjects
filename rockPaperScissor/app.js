const game = () => {
  let pScore = 0;
  let cScore = 0;

  const startGame = () => {
    const playBtn = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const matchScreen = document.querySelector('.match');
    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      matchScreen.classList.add("fadeIn");
    });
  }

  const playMatch = () => {
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const threeOption = ['rock', 'paper', 'scissors'];
    const hands = document.querySelectorAll('.hands img');

    //delete animation
    hands.forEach(hand => {
      hand.addEventListener('animationend', function(){
        this.style.animation = "";
      });
    });

    //player choose an option
    options.forEach(option => {
      //check which button is pressed
      option.addEventListener('click', function(){
        //computer option
        const computerOption = Math.floor(Math.random() * 3);
        const computerChoice = threeOption[computerOption];
        const playerChoice = this.className;

        //wait for animation
        setTimeout(() => {
          compareHands(playerChoice, computerChoice);
          updateScore();
          //update images
          playerHand.src = `./images/${playerChoice}.png`;
          computerHand.src = `./images/${computerChoice}.png`;
        }, 1300);

        //animation
        playerHand.style.animation = "shakePlayer 1.5s ease-out";
        computerHand.style.animation = "shakeComputer 1.5s ease-out";
      });
    });

    const updateScore = () => {
      const playerScore = document.querySelector('.player-score p');
      const computerScore = document.querySelector('.computer-score p');
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    }

    const compareHands = (pHand, cHand) => {
      let winner = document.querySelector('.winner');

      //平手
      if(pHand === cHand){
        winner.textContent = "It's a tie.";
        return;
      }
      //出石頭
      if(pHand === 'rock'){
        if(cHand === 'scissors'){
          winner.textContent = "Player wins!";
          pScore++;
          return;
        }else{
          winner.textContent = "Computer wins!";
          cScore++;
          return;
        }
      }
      //出布
      if(pHand === 'paper'){
        if(cHand === 'rock'){
          winner.textContent = "Player wins!";
          pScore++;
          return;
        }else{
          winner.textContent = "Computer wins!";
          cScore++;
          return;
        }
      }
      //出剪刀
      if(pHand === 'scissors'){
        if(cHand === 'paper'){
          winner.textContent = "Player wins!";
          pScore++;
          return;
        }else{
          winner.textContent = "Computer wins!";
          cScore++;
          return;
        }
      }
    }

  }

  startGame();
  playMatch();
}

game();
