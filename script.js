'use strict';


const player0El = document.querySelector('.player_0');
const player1El = document.querySelector('.player_1');
const score0El = document.querySelector('#score_0');
const score1El = document.getElementById('score_1');
const current0El = document.getElementById('current_0');
const current1El = document.getElementById('current_1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn_new');
const btnRoll = document.querySelector('.btn_roll');
const btnHold = document.querySelector('.btn_hold');

let scores, currentScore, activePlayer, playing;


const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player_winner');
  player1El.classList.remove('player_winner');
  player0El.classList.add('player_active');
  player1El.classList.remove('player_active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current_${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player_active');
  player1El.classList.toggle('player_active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {

    const dice = Math.trunc(Math.random() * 6) + 1;

 
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-six-faces-${dice}.png`;


    if (dice !== 1) {
     
      currentScore += dice;
      document.getElementById(
        `current_${activePlayer}`
      ).textContent = currentScore;
    } else {
   
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    
    scores[activePlayer] += currentScore;
   

    document.getElementById(`score_${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
     
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player_${activePlayer}`)
        .classList.add('player_winner');
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.remove('player_active');
    } else {
     
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);