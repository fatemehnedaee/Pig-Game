'use strict';
const diceEl = document.querySelector('.dice')
const rollEl = document.querySelector('.btn--roll')
const holdEl = document.querySelector('.btn--hold')
const newEl = document.querySelector('.btn--new')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

let currentscore = 0
let playerActive = 0
let scores = [0, 0]
let player = true

const init = function () {

    currentscore = 0
    playerActive = 0
    scores = [0, 0]
    player = true

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')

}
init()

const switchPlayer = function () {

    if (player) {
        document.getElementById(`current--${playerActive}`).textContent = 0
        player0El.classList.toggle('player--active')
        player1El.classList.toggle('player--active')
        playerActive = playerActive === 0 ? 1 : 0
        currentscore = 0
    }
}

rollEl.addEventListener('click', function () {

    if (player) {
        const dice = Math.trunc(Math.random() * 6) + 1
        diceEl.classList.remove('hide')
        diceEl.src = `dice-${dice}.png`

        if (dice !== 1) {

            currentscore += dice
            document.getElementById(`current--${playerActive}`).textContent = currentscore

        } else {
            switchPlayer()
        }
    }
})

holdEl.addEventListener('click', function () {

    if (player) {
        scores[playerActive] += currentscore
        document.getElementById(`score--${playerActive}`).textContent = scores[playerActive]

        if (scores[playerActive] >= 20) {

            player = false
            diceEl.classList.add('hide')
            document.querySelector(`.player--${playerActive}`).classList.add('player--winner')
            document.querySelector(`.player--${playerActive}`).classList.remove('player--active')

        } else {
            switchPlayer()
        }
    }
})

newEl.addEventListener('click', init)
