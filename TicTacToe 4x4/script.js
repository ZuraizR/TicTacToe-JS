const boxes = document.querySelectorAll('.box')
const resetBtn = document.querySelector('#reset-btn')
const msg = document.querySelector('#msg')
const msgContainer = document.querySelector('.msg-container')
const newGameBtn = document.querySelector('#newGame')
const countContainer = document.querySelector('#count-container')
const playerTurn = document.querySelector('.plyerTurn')
const p = document.querySelector('.p')

let turnO = true // PlayerX, PlayerO
let count = 0
let time = 10
let interv

const winPatterns = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
]

const resetGame = () => {
  turnO = true
  enableBoxes()
  msgContainer.classList.add('hide')
  count = 0
  time = 10
  p.classList.remove('hide')
  p.innerText = `Player O Turn`
}

function showTurnMsg(msg) {
  p.innerText = msg
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnO) {
      let X = `${turnO ? 'X' : 'O'}`
      showTurnMsg(`Player ${X} Turn`)
      box.innerText = 'O'
      turnO = false
    } else {
      let O = `${!turnO ? 'O' : 'X'}`
      showTurnMsg(`Player ${O} Turn`)
      box.innerText = 'X'
      turnO = true
    }
    box.disabled = true
    count++

    let isWinner = checkWinner()

    if (count === 16 && !isWinner) {
      gameDraw()
    }
  })
})

const gameDraw = () => {
  msg.innerText = 'Game was a Draw.'
  interv = setInterval(showTimer, 1000)
  msgContainer.classList.remove('hide')
  p.classList.add('hide')
  if (time === 0) {
    clearInterval(interv)
  }
  disableBoxes()
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true
  }
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false
    box.innerText = ''
  }
}

function updateTime() {
  time--
  time = time < 0 ? 0 : time
}

function showTimer() {
  updateTime()
  countContainer.innerText = `Game will restart in ${time} seconds`
  if (time === 0) {
    resetGame()
    clearInterval(interv)
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulation, winner is ${winner}`
  interv = setInterval(showTimer, 1000)
  msgContainer.classList.remove('hide')
  p.classList.add('hide')
  disableBoxes()
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText
    let pos2 = boxes[pattern[1]].innerText
    let pos3 = boxes[pattern[2]].innerText
    let pos4 = boxes[pattern[3]].innerText

    if ((pos1 !== '', pos2 !== '', pos3 !== '', pos4 !== '')) {
      if (pos1 === pos2 && pos2 === pos3 && pos3 === pos4) {
        showWinner(pos1)
      }
    }
  }
}

newGameBtn.addEventListener('click', resetGame)
resetBtn.addEventListener('click', resetGame)
document.addEventListener('DOMContentLoaded', resetGame)
