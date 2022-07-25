'use strict';

// query selectors

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
// Player 1 total score
let score0 = document.querySelector('#score--0');
// Player 2 total score
let score1 = document.querySelector('#score--1');
// player 1 current score
let cScore0 = document.querySelector('#current--0');
// player 2 current score
let cScore1 = document.querySelector('#current--1');
// dice image
let diceEl = document.querySelector('.dice');
// start a new game
let btnNew = document.querySelector('.btn--new');
// roll the dice
let btnRoll = document.querySelector('.btn--roll');
// hold button
let btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

let init = function () {
  // set starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  // set player 1 scores to zero
  score0.textContent = 0;
  cScore0.textContent = 0;
  // set player 1 scores to zero
  score1.textContent = 0;
  cScore1.textContent = 0;
  // remove winner class
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  // make player 1 the active player
  player0.classList.add(`player--active`);
  player1.classList.remove('player--active');
};

init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate a random dice roll
    let dice = Math.ceil(Math.random() * 6);
    console.log(dice);
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;
    // Check if rolled 1. If true, switch to next player.
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player....if roll is 1
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if players score is >= 100.
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
