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
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
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
  // const p = document.createElement('p')
  // p.classList.add('playerTurn')
  // document.querySelector('.gameHeading').append(p)
  p.innerText = msg
  // console.log(p)
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    //  console.log('box was clicked')
    if (turnO) {
      // showTurnMsg('Player X Turn')
      let X = `${turnO ? 'X' : 'O'}`
      showTurnMsg(`Player ${X} Turn`)
      box.innerText = 'O'
      turnO = false
    } else {
      // showTurnMsg('Player O Turn')
      let O = `${!turnO ? 'O' : 'X'}`
      showTurnMsg(`Player ${O} Turn`)
      box.innerText = 'X'
      turnO = true
    }
    box.disabled = true
    count++
    // console.log(count)

    let isWinner = checkWinner()

    if (count === 9 && !isWinner) {
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
  // showTimer()
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
    // showTurnMsg('Player O Turn')
  }
  // console.log(time)
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
    //  console.log(pattern[0], pattern[1], pattern[2])
    let pos1 = boxes[pattern[0]].innerText
    let pos2 = boxes[pattern[1]].innerText
    let pos3 = boxes[pattern[2]].innerText

    if ((pos1 !== '', pos2 !== '', pos3 !== '')) {
      if (pos1 === pos2 && pos2 === pos3) {
        //   console.log('Winner', pos1)
        showWinner(pos1)
        // setInterval(showTimer, 1000)
      }
    }
  }
}

newGameBtn.addEventListener('click', resetGame)
resetBtn.addEventListener('click', resetGame)
document.addEventListener('DOMContentLoaded', resetGame)
